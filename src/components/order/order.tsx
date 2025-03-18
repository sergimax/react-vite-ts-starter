import { useLocation, useParams } from 'react-router-dom';
import { MOCK_FEED_LIST_DATA } from '../../utils/data';
import { FeedListItemStatus } from '../feed-list/types';
import { Price } from '../price';
import { ImageContainer } from '../image-container';
import { useAppSelector } from '../../services/hooks';
import { ingredientsListSelector } from '../../services/reducers/ingredients/selectors';
import { Background, IngredientWithCounter } from '../../types/types';
import { getTextDay } from '../../utils';
import styles from './styles.module.css';

export const Order = () => {
    const params = useParams();
    const ingredients = useAppSelector(ingredientsListSelector);
    const location = useLocation();
    const background: Background = location.state?.background;

    const containerClass: string = background
        ? `${styles['item-container-modal']}`
        : `${styles['item-container-page']}`;

    // TODO заменить на результат запроса к серверу
    //    const allOrders = useAppSelector(allOrdersSelector);
    const chosenOrder = MOCK_FEED_LIST_DATA.find(
        order => order.number === params.id,
    );

    if (!chosenOrder) {
        return <>Информация для указанного заказа не найдена</>;
    }

    const ingredientsIds: Array<string> = [
        chosenOrder.ingredients.bunId,
        chosenOrder.ingredients.bunId,
        ...chosenOrder.ingredients.ingredientsIds,
    ];

    const ingredientsList = ingredientsIds.map(id => {
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

    function getStatusClass(status?: FeedListItemStatus): string {
        if (status === FeedListItemStatus.COMPLETED) {
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
                    <div className={statusClass}>{chosenOrder.status}</div>
                )}

                <div className='text text_type_main-medium pb-6'>Состав:</div>

                <div className={`mb-10 ${styles['ingredients-list']}`}>
                    {orderIngredientsList}
                </div>

                <div className={`${styles['item-time-and-price']}`}>
                    <div className='text text_type_main-default text_color_inactive'>
                        {getTextDay(chosenOrder.time)}
                    </div>

                    <Price value={chosenOrder.price} />
                </div>
            </div>
        </div>
    );
};
