import { useEffect, useState } from 'react';
import { AppHeader } from '../app-header';
import styles from './app.module.css';
import {
    ChosenIngredients,
    IngredientTypeName,
    IngredientWithCounter,
    Page,
} from '../../types/types';
import { BurgerIngredients } from '../burger-ingredients';
import { BurgerConstructor } from '../burger-constructor';
import { API_ENDPOINT, API_URL } from '../../constants/constants';
import { GetIngredientsDTO } from './types';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorWithLoading, setErrorWithLoading] = useState('');

    // TODO Подключитесь к API
    const [activePage, setActivePage] = useState<Page>(Page.CONSTRUCTOR);

    useEffect(() => {
        setActivePage(Page.CONSTRUCTOR);
    }, []);

    const [ingredientsByType, setIngredientsByType] =
        useState<Map<string, Array<IngredientWithCounter>>>();

    const [chosenIngredients, setChosenIngredients] =
        useState<ChosenIngredients>({ bun: null, ingredients: [] });

    useEffect(() => {
        async function fetchIngredients() {
            try {
                setIsLoading(true);
                const ingredientsResponse = await fetch(
                    `${API_URL}/${API_ENDPOINT.INGREDIENTS}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!ingredientsResponse.ok) {
                    throw new Error(
                        `Response status: ${ingredientsResponse.status}`
                    );
                }

                const ingredientsData: GetIngredientsDTO =
                    await ingredientsResponse.json();

                if (!ingredientsData.success) {
                    throw new Error(`Unsuccessfull loading`);
                }

                if (!ingredientsData.data || !ingredientsData.data.length) {
                    throw new Error(`Empty list`);
                }

                ingredientsData.data.forEach((ingredient) => {
                    const ingredientType = sortedIngredients.get(
                        ingredient.type
                    );
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
                            setChosenIngredients({
                                ...chosenIngredients,
                                bun: ingredient,
                            });
                        }
                    }
                });

                setIsLoading(false);
                setIsLoaded(true);
            } catch (error) {
                setIsLoading(false);
                setErrorWithLoading('ERROR');

                console.error('error', error);
            }
        }

        const sortedIngredients = new Map<
            string,
            Array<IngredientWithCounter>
        >();

        fetchIngredients();

        setIngredientsByType(sortedIngredients);
    }, []);

    return (
        <>
            <AppHeader activePage={activePage} />
            <main className={styles.main}>
                <BurgerIngredients ingredients={ingredientsByType} />
                <BurgerConstructor chosenIngredients={chosenIngredients} />
            </main>
        </>
    );
}

export default App;
