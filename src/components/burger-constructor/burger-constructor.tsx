import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorProps } from './types';
import { MODAL_TYPE } from '../../constants/constants';
import styles from './style.module.css';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useDrop } from 'react-dnd';
import {
    deleteCoonstructorIngredient,
    setConstructorBun,
    setConstructorIngredients,
} from '../../services/reducers/ingredients';
import { Ingredient, UniqueIngredientItem } from '../../types/types';
import { createOrder } from '../../services/reducers/ingredients/thunks';
import {
    ingredientsConstructorContentSelector,
    ingredientsOrderSelector,
} from '../../services/reducers/ingredients/selectors';
import { useEffect, useMemo } from 'react';
import { BurgerConstructorIngredient } from '../burger-constructor-ingredient';
import { v4 as uuidv4 } from 'uuid';
import { isAuthorizedSelector } from '../../services/reducers/account';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../app/constants.ts';

/**
 * Текущий состав бургера
 */
export const BurgerConstructor = ({
    onFormAnOrderClick,
}: BurgerConstructorProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const orderNumber = useAppSelector(ingredientsOrderSelector);
    const chosenIngredients = useAppSelector(
        ingredientsConstructorContentSelector
    );
    const isAuthorized = useAppSelector(isAuthorizedSelector);

    const containerClass: string = `pl-4 pt-25 ${styles.container}`;
    const calculationClass: string = `mt-10 mr-4 ${styles.calculation}`;

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            if ((item as Ingredient).type === 'bun') {
                dispatch(
                    setConstructorBun({
                        value: item,
                        uniqueId: uuidv4(),
                    })
                );
            } else {
                dispatch(
                    setConstructorIngredients({
                        value: item,
                        uniqueId: uuidv4(),
                    })
                );
            }
        },
    });

    const totalSum = useMemo(() => {
        let sum = 0;
        if (chosenIngredients.bun) {
            sum += chosenIngredients.bun?.price * 2;
        }

        if (chosenIngredients.ingredients.length) {
            sum += chosenIngredients.ingredients.reduce(
                (accumulator, current) => accumulator + current.price,
                0
            );
        }

        return sum;
    }, [chosenIngredients]);

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

    function handleDeleteIngredient(ingredient: UniqueIngredientItem) {
        dispatch(
            deleteCoonstructorIngredient({
                value: ingredient,
            })
        );
    }

    if (!chosenIngredients.bun) {
        return <></>;
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
                    chosenIngredients.ingredients.map((ingredient, index) => (
                        <BurgerConstructorIngredient
                            ingredient={ingredient}
                            handleClose={() =>
                                handleDeleteIngredient(ingredient)
                            }
                            key={ingredient.uniqueId}
                            index={index}
                        />
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
                <span className="text_type_digits-medium pr-2">{totalSum}</span>
                <CurrencyIcon type="primary" />
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    extraClass="ml-10"
                    onClick={() => {
                        if (isAuthorized) {
                            const list = [
                                chosenIngredients.bun?._id,
                                ...chosenIngredients.ingredients.map(
                                    (ingredient) => ingredient._id
                                ),
                            ];

                            dispatch(createOrder(list));
                        } else {
                            navigate(`${ROUTE_PATH.LOGIN}`)
                        }
                    }}
                >
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};
