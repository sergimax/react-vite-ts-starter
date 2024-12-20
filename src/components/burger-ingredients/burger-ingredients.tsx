import { useEffect, useState } from 'react';
import styles from './style.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import { ingredientCategories } from './constants';
import { IngredientWithCounter } from './types';
import { BurgerIngredientsCategory } from '../burger-ingredients-category';

/**
 * Cписок ингредиентов
 */
export const BurgerIngredients = () => {
    const [current, setCurrent] = useState(ingredientCategories[0].value);
    const [ingredients, setIngredients] =
        useState<Map<string, Array<IngredientWithCounter>>>();
    const categoriesClass: string = `custom-scroll ${styles.categories}`;

    useEffect(() => {
        const sortedIngredients = new Map<string, Array<IngredientWithCounter>>();
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
            }
        });

        setIngredients(sortedIngredients);
    }, []);

    return (
        <>
            <div style={{ display: 'flex' }}>
                {ingredientCategories.map((category, index) => {
                    return (
                        <Tab
                            key={index}
                            value={category.value}
                            active={current === category.value}
                            onClick={setCurrent}
                        >
                            {category.title}
                        </Tab>
                    );
                })}
            </div>
            <div className={categoriesClass}>
                {/* TODO Заменить на функцию ? */}
                {/* TODO Вариант при отсутствии данных в категории */}
                {ingredientCategories.map((category, index) => {
                    return (
                        ingredients &&
                        ingredients.has(category.typeName) && (
                            <BurgerIngredientsCategory
                                category={ingredients.get(category.typeName)!}
                                title={category.title}
                                key={index}
                            />
                        )
                    );
                })}
            </div>
        </>
    );
};
