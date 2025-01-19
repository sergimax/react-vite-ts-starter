import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorProps } from './types';
import { DEFAULT_ORDER_ID } from './constants';
import { MODAL_TYPE } from '../../constants/constants';
import styles from './style.module.css';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useDrop } from 'react-dnd';
import {
    deleteCoonstructorIngredient,
    setConstructorBun,
    setConstructorIngredients,
} from '../../services/reducers/ingredients';
import { UniqueIngredientItem } from '../../types/types';
import { createOrder } from '../../services/reducers/ingredients/thunks';
import { ingredientsOrderSelector } from '../../services/reducers/ingredients/selectors';
import { useEffect } from 'react';

/**
 * Текущий состав бургера
 */
export const BurgerConstructor = ({
    chosenIngredients,
    onFormAnOrderClick,
}: BurgerConstructorProps) => {
    const dispatch = useAppDispatch();

    const orderNumber = useAppSelector(ingredientsOrderSelector);

    const containerClass: string = `pl-4 pt-25 ${styles.container}`;
    const calculationClass: string = `mt-10 mr-4 ${styles.calculation}`;

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            if (item.type === 'bun') {
                console.log('BUN');
                console.log('item', item);
                dispatch(
                    setConstructorBun({
                        value: item,
                        uniqueId: Date.now(),
                    })
                );
            } else {
                dispatch(
                    setConstructorIngredients({
                        value: item,
                        uniqueId: Date.now(),
                    })
                );
            }
        },
    });

    useEffect(() => {
        if (orderNumber) {
            onFormAnOrderClick({
                type: MODAL_TYPE.ORDER,
                orderData: {
                    orderId: orderNumber,
                    chosenIngredients,
                },
            });
        }
    }, [orderNumber]);

    if (!chosenIngredients.bun) {
        return <></>;
    }

    function handleDeleteIngredient(ingredient: UniqueIngredientItem) {
        dispatch(
            deleteCoonstructorIngredient({
                value: ingredient,
            })
        );
    }

    return (
        <section
            className={containerClass}
            ref={dropTarget}
        >
            {/* Верхняя булка бургера */}
            {chosenIngredients.bun && (
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={chosenIngredients.bun.name + ' (верх)'}
                    price={chosenIngredients.bun.price}
                    thumbnail={chosenIngredients.bun.image_mobile}
                    extraClass="ml-8 mb-4 mr-4"
                />
            )}

            {/* Начинка бургера */}
            <div className={styles.ingredients}>
                {chosenIngredients.ingredients &&
                    chosenIngredients.ingredients.map((ingredient) => (
                        <div key={ingredient.uniqueId}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image_mobile}
                                handleClose={() =>
                                    handleDeleteIngredient(ingredient)
                                }
                                extraClass="ml-2 mb-4"
                            />
                        </div>
                    ))}
            </div>

            {/* Нижняя булка бургера */}
            {chosenIngredients.bun && (
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={chosenIngredients.bun.name + ' (низ)'}
                    price={chosenIngredients.bun.price}
                    thumbnail={chosenIngredients.bun.image_mobile}
                    extraClass="ml-8 mt-4"
                />
            )}

            {/* Блок калькуляции и кнопки */}
            <div className={calculationClass}>
                <span className="text_type_digits-medium pr-2">610</span>
                <CurrencyIcon type="primary" />
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    extraClass="ml-10"
                    onClick={() => {
                        const list = [
                            chosenIngredients.bun?._id,
                            ...chosenIngredients.ingredients.map(
                                (ingredient) => ingredient._id
                            ),
                        ];

                        dispatch(createOrder(list));
                    }}
                >
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};
