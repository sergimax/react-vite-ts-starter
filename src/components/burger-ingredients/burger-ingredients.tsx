import { useEffect, useState } from 'react';
import styles from './style.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import { ingredientCategories } from './constants';
import { Ingredient } from './types';
import { BurgerIngredientsCategory } from '../burger-ingredients-category';

/**
 * Cписок ингредиентов
 */
export const BurgerIngredients = () => {
    // TODO: Из библиотеки UI-компонентов возьмите следующие:
    // счётчики,
    // иконки,
    // переключатели,
    // типографику,
    // систему отступов.
    // TODO: У компонента свой кастомизированный скроллбар. Подумайте над реализацией и возможным ограничением высоты блока, в том числе и на разных разрешениях экранов.
    const [current, setCurrent] = useState(ingredientCategories[0].value);
    const [ingredients, setIngredients] =
        useState<Map<string, Array<Ingredient>>>();

    useEffect(() => {
        const sortedIngredients = new Map<string, Array<Ingredient>>();
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
        console.log('sortedIngredients', sortedIngredients);
        setIngredients(sortedIngredients);
    }, []);

    return (
        <div className={styles.container}>
            <div
                style={{ display: 'flex' }}
                className="mb-10"
            >
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
            <div>
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
        </div>
    );
};
