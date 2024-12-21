import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import { BurgerConstructorProps } from './types';
import { useEffect, useState } from 'react';
import {
    IngredientTypeName,
    IngredientWithCounter,
} from '../burger-ingredients/types';

/**
 * Текущий состав бургера
 */
export const BurgerConstructor = ({
    ingredients,
    chosenBunsId,
    chosenIngredientsIdList,
}: BurgerConstructorProps) => {
    const containerClass: string = `pl-4 ${styles.container}`;
    const calculationClass: string = `mt-10 mr-4 ${styles.calculation}`;

    const [chosenBunData, setChosenBunData] = useState<
        IngredientWithCounter | undefined
    >();
    const [chosenIngredientsData, setIngredientsData] = useState<
        Array<IngredientWithCounter>
    >([]);

    useEffect(() => {
        if (!ingredients) return;

        if (chosenBunsId) {
            setChosenBunData(
                ingredients
                    .get(IngredientTypeName.BUN)
                    ?.find((bun) => bun._id === chosenBunsId)
            );
        }

        if (chosenIngredientsIdList.length) {
            // FIXME возможно, упростить хранение ингредиентов и их разбивку на типы
            const sauseList: IngredientWithCounter[] =
                ingredients.get(IngredientTypeName.SAUCE) || [];
            const mainList: IngredientWithCounter[] =
                ingredients.get(IngredientTypeName.MAIN) || [];
            const ingredientList = [...sauseList, ...mainList];

            const chosenIngredientList: Array<IngredientWithCounter> = [];

            chosenIngredientsIdList.forEach((ingredientId) => {
                ingredientList.find((element) => {
                    if (element._id === ingredientId)
                        chosenIngredientList.push(element);
                });
            });

            chosenIngredientList.length &&
                setIngredientsData(chosenIngredientList);
        }
    }, [ingredients, chosenBunsId, chosenIngredientsIdList]);

    return (
        <div className={containerClass}>
            <div className={styles.burgerConstructor}>
                {chosenBunData && (
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={chosenBunData.name}
                        price={chosenBunData.price}
                        thumbnail={chosenBunData.image_mobile}
                        extraClass="ml-8 mb-4"
                    />
                )}
                <div className={styles.ingredients}>
                    {chosenIngredientsData &&
                        chosenIngredientsData.map((ingredient, index) => (
                            <div key={index}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image_mobile}
                                    extraClass="ml-2 mb-4"
                                />
                            </div>
                        ))}
                </div>

                {chosenBunData && (
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={chosenBunData.name}
                        price={chosenBunData.price}
                        thumbnail={chosenBunData.image_mobile}
                        extraClass="ml-8 mt-4"
                    />
                )}
            </div>
            {/* Блок калькуляции и кнопки */}
            <div className={calculationClass}>
                <span className="text_type_digits-medium pr-2">610</span>
                <CurrencyIcon type="primary" />
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    extraClass="ml-10"
                >
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
};
