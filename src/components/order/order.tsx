import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Price } from '../price';
import { ImageContainer } from '../image-container';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { ingredientsListSelector } from '../../services/reducers/ingredients';
import {
    Background,
    IngredientWithCounter,
    ORDER_STATUS,
    OrdersDataWSResponse,
} from '../../types/types';
import { getIngredientsPrice, getStatusTitle, getTextDay } from '../../utils';
import {
    wsDisconnect,
    wsMessagesSelector,
    wsStartConnecting,
} from '../../services/reducers/websocket';
import { WS_URL } from '../../constants/constants';
import styles from './styles.module.css';

export const Order = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const ingredients = useAppSelector(ingredientsListSelector);
    const ordersResponse: OrdersDataWSResponse | undefined =
        useAppSelector(wsMessagesSelector);

    const background: Background = location.state?.background;

    const containerClass: string = background
        ? `${styles['item-container-modal']}`
        : `${styles['item-container-page']}`;

    useEffect(() => {
        dispatch(wsStartConnecting(WS_URL));

        return () => {
            dispatch(wsDisconnect());
        };
    }, [dispatch]);

    if (!ordersResponse) {
        return (
            <span className='text_type_main-large'>
                Данные о заказах недоступны
            </span>
        );
    }

    const chosenOrder = ordersResponse.orders.find(
        order => order.number === Number(params.id),
    );

    if (!chosenOrder) {
        return (
            <span className='text_type_main-large'>
                Данные о заказе недоступны
            </span>
        );
    }

    const ingredientsPrice: number = getIngredientsPrice(
        chosenOrder.ingredients,
        ingredients,
    );

    const orderStatusTitle = getStatusTitle(chosenOrder.status);

    const ingredientsList = chosenOrder.ingredients.map(id => {
        return ingredients.find(item => item._id === id);
    });

    if (!ingredientsList) {
        return <>Список ингредиентов в заказе пуст</>;
    }

    const uniqueIngredientsMap = new Map<string, IngredientWithCounter>();

    // Подсчет количества каждого ингредиента
    ingredientsList.forEach(ingredient => {
        if (ingredient && uniqueIngredientsMap.has(ingredient._id)) {
            const existingIngredient = uniqueIngredientsMap.get(
                ingredient._id,
            )!;

            existingIngredient.quantity =
                (existingIngredient.quantity || 1) + 1;
        } else {
            ingredient &&
                uniqueIngredientsMap.set(ingredient._id, {
                    ...ingredient,
                    quantity: 1,
                });
        }
    });

    // Преобразуем Map обратно в массив
    const uniqueIngredientsWithCounter: IngredientWithCounter[] = Array.from(
        uniqueIngredientsMap.values(),
    );

    const orderIngredientsList = uniqueIngredientsWithCounter.map(
        (ingredient, index) => {
            return (
                <div key={index} className={styles['ingredient-item']}>
                    <div className={styles['ingredient-item-title']}>
                        <ImageContainer src={ingredient.image_mobile || ''} />
                        <div className='text_type_main-default'>
                            {ingredient.name}
                        </div>
                    </div>
                    <Price
                        value={`${ingredient.quantity} x ${ingredient.price}`}
                    />
                </div>
            );
        },
    );

    const statusClass: string = getStatusClass(chosenOrder.status);

    function getStatusClass(status?: ORDER_STATUS): string {
        if (status === ORDER_STATUS.DONE) {
            return `text_type_main-default pb-15 ${styles['item-status-completed']}`;
        }

        return `text_type_main-default pb-15 ${styles['item-status']}`;
    }

    return (
        <div className={containerClass}>
            <div className={background ? styles.wrapper : ''}>
                <div className='text_type_digits-default pb-10 '>
                    #{chosenOrder.number}
                </div>

                <div className='text_type_main-medium'>{chosenOrder.name}</div>

                {chosenOrder.status && (
                    <div className={statusClass}>{orderStatusTitle}</div>
                )}

                <div className='text text_type_main-medium pb-6'>Состав:</div>

                <div className={`mb-10 ${styles['ingredients-list']}`}>
                    {orderIngredientsList}
                </div>

                <div className={`${styles['item-time-and-price']}`}>
                    <div className='text text_type_main-default text_color_inactive'>
                        {getTextDay(chosenOrder.createdAt)}
                    </div>

                    <Price value={ingredientsPrice} />
                </div>
            </div>
        </div>
    );
};
