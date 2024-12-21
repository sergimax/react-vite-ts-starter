import { useEffect, useState } from 'react';
import { AppHeader } from '../app-header';
import styles from './app.module.css';
import {
    ChosenIngredients,
    IngredientTypeName,
    IngredientWithCounter,
    Page,
} from '../../types/types';
import { AppContentBlock } from '../app-content-block';
import { BurgerIngredients } from '../burger-ingredients';
import { BurgerConstructor } from '../burger-constructor';
import { data } from '../../utils/data';

function App() {
    const [activePage, setActivePage] = useState<Page>(Page.CONSTRUCTOR);

    useEffect(() => {
        setActivePage(Page.CONSTRUCTOR);
    }, []);

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
        <>
            <AppHeader activePage={activePage} />
            <main className={styles.main}>
                <AppContentBlock
                    content={
                        <BurgerIngredients ingredients={ingredientsByType} />
                    }
                    title="Соберите бургер"
                />
                <AppContentBlock
                    content={
                        <BurgerConstructor
                            chosenIngredients={chosenIngredients}
                        />
                    }
                />
            </main>
        </>
    );
}

export default App;
