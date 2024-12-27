import { useMemo, useState } from 'react';
import styles from './style.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientCategories } from './constants';
import { BurgerIngredientsProps } from './types';
import { BurgerIngredientsCategory } from '../burger-ingredients-category';
import { Ingredient, IngredientTypeName } from '../../types/types';

/**
 * Cписок ингредиентов
 */
export const BurgerIngredients = ({
    ingredients,
    onIngredientClick,
}: BurgerIngredientsProps) => {
    const titleClasses = `text_type_main-large pt-10 pb-5 ${styles.title}`;
    const [currentTab, setCurrentTab] = useState(ingredientCategories[0].value);

    const bunsList: Array<Ingredient> = useMemo(
        () =>
            ingredients.filter(
                (ingredient) => ingredient.type === IngredientTypeName.BUN
            ),
        [ingredients]
    );
    const saucesList: Array<Ingredient> = useMemo(
        () =>
            ingredients.filter(
                (ingredient) => ingredient.type === IngredientTypeName.SAUCE
            ),
        [ingredients]
    );
    const mainsList: Array<Ingredient> = useMemo(
        () =>
            ingredients.filter(
                (ingredient) => ingredient.type === IngredientTypeName.MAIN
            ),
        [ingredients]
    );

    return (
        <section className={styles['app-content-block']}>
            <h1 className={titleClasses}>Соберите бургер</h1>
            {/* Блок переключения вкладок */}
            <div className={styles.tabs}>
                {ingredientCategories.map((category, index) => {
                    return (
                        <Tab
                            key={index}
                            value={category.value}
                            active={currentTab === category.value}
                            onClick={setCurrentTab}
                        >
                            {category.title}
                        </Tab>
                    );
                })}
            </div>
            {/* Блок категорий продуктов */}
            <div className={styles.categories}>
                <BurgerIngredientsCategory
                    category={bunsList}
                    title={'Булки'}
                    onIngredientClick={onIngredientClick}
                />
                <BurgerIngredientsCategory
                    category={saucesList}
                    title={'Соусы'}
                    onIngredientClick={onIngredientClick}
                />
                <BurgerIngredientsCategory
                    category={mainsList}
                    title={'Начинки'}
                    onIngredientClick={onIngredientClick}
                />
            </div>
        </section>
    );
};
