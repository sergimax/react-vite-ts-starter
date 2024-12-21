import { useEffect, useState } from 'react';
import { AppContentBlock } from '../app-content-block';
import { BurgerConstructor } from '../burger-constructor';
import { BurgerIngredients } from '../burger-ingredients';
import { data } from '../../utils/data';
import styles from './style.module.css';
import {
    ChosenIngredients,
    IngredientTypeName,
    IngredientWithCounter,
} from '../../types/types';

export const AppContent = () => {
    const [ingredientsByType, setIngredientsByType] =
        useState<Map<string, Array<IngredientWithCounter>>>();

    const [chosenIngredients, setChosenIngredients] =
        useState<ChosenIngredients>({ bun: null, ingredients: [] });

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
                    !chosenIngredients.bun &&
                    ingredient.type === IngredientTypeName.BUN
                ) {
                    console.log('ingredient.type', ingredient);
                    setChosenIngredients({
                        ...chosenIngredients,
                        bun: ingredient,
                    });
                }
            }
        });

        setIngredientsByType(sortedIngredients);
    }, []);

    return (
        <main className={styles.main}>
            <AppContentBlock
                content={<BurgerIngredients ingredients={ingredientsByType} />}
                title="Соберите бургер"
            />
            <AppContentBlock
                content={
                    <BurgerConstructor chosenIngredients={chosenIngredients} />
                }
            />
        </main>
    );
};
