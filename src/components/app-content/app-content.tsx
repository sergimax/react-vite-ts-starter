import { useEffect, useState } from 'react';
import { AppContentBlock } from '../app-content-block';
import { BurgerConstructor } from '../burger-constructor';
import { BurgerIngredients } from '../burger-ingredients';
import { IngredientTypeName, IngredientWithCounter } from '../burger-ingredients/types';
import { data } from '../../utils/data';
import styles from './style.module.css';

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
                if (!chosenBunsId && ingredient.type === IngredientTypeName.BUN) {
                    setChosenBunsId(ingredient._id);
                }
            }
        });

        setIngredients(sortedIngredients);

        setChosenIngredientsIdList([]);
    }, []);

    const ActiveBlocks = [
        {
            content: <BurgerIngredients ingredients={ingredients} />,
            title: 'Соберите бургер',
        },
        {
            content: (
                <BurgerConstructor
                    ingredients={ingredients}
                    chosenBunsId={chosenBunsId}
                    chosenIngredientsIdList={chosenIngredientsIdList}
                />
            ),
        },
    ];

    return (
        <main className={styles.main}>
            {ActiveBlocks.map((block, index) => {
                return (
                    <AppContentBlock
                        key={index}
                        content={block.content}
                        title={block.title}
                    />
                );
            })}
        </main>
    );
};
