import { useState } from 'react';
import styles from './style.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientCategories } from './constants';
import { BurgerIngredientsProps } from './types';
import { BurgerIngredientsCategory } from '../burger-ingredients-category';

/**
 * Cписок ингредиентов
 */
export const BurgerIngredients = ({ ingredients }: BurgerIngredientsProps) => {
    const titleClasses = `text_type_main-large pt-10 pb-5 ${styles.title}`;
    const [current, setCurrent] = useState(ingredientCategories[0].value);

    return (
        <section className={styles['app-content-block']}>
            <h1 className={titleClasses}>Соберите бургер</h1>
            <div className={styles.tabs}>
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
            <div className={styles.categories}>
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
        </section>
    );
};
