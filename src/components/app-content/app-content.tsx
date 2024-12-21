import { useEffect, useState } from 'react';
import { AppContentBlock } from '../app-content-block';
import { BurgerConstructor } from '../burger-constructor';
import { BurgerIngredients } from '../burger-ingredients';
import { data } from '../../utils/data';
import styles from './style.module.css';
import { IngredientTypeName, IngredientWithCounter } from '../../types/types';

export const AppContent = () => {
    const [ingredients, setIngredients] =
        useState<Map<string, Array<IngredientWithCounter>>>();
    const [chosenIngredientsIdList, setChosenIngredientsIdList] = useState<
        Array<string>
    >([]);
    const [chosenBunsId, setChosenBunsId] = useState<string>('');

    useEffect(() => {
        const sortedIngredients = new Map<
            string,
            Array<IngredientWithCounter>
        >();
        // TODO вынести загрузку и обработку
        // TODO перенести в /utils
        data.forEach((ingredient) => {
            const ingredientType = sortedIngredients.get(ingredient.type);
            if (ingredientType) {
                sortedIngredients.set(ingredient.type, [
                    ...ingredientType,
                    ingredient,
                ]);
            } else {
                sortedIngredients.set(ingredient.type, [ingredient]);
                // Установка первой встреченной булки как булки по умолчанию
                if (
                    !chosenBunsId &&
                    ingredient.type === IngredientTypeName.BUN
                ) {
                    setChosenBunsId(ingredient._id);
                }
            }
        });

        setIngredients(sortedIngredients);

        setChosenIngredientsIdList([]);
    }, []);

    return (
        <main className={styles.main}>
            <AppContentBlock
                content={<BurgerIngredients ingredients={ingredients} />}
                title="Соберите бургер"
            />
            <AppContentBlock
                content={
                    <BurgerConstructor
                        ingredients={ingredients}
                        chosenBunsId={chosenBunsId}
                        chosenIngredientsIdList={chosenIngredientsIdList}
                    />
                }
            />
        </main>
    );
};
