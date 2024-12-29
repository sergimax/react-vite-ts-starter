import { useEffect, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsCategory } from '../burger-ingredients-category';
import { BurgerIngredientsProps } from './types';
import {
    Ingredient,
    IngredientCategoryTypeLocalName,
    IngredientTypeName,
} from '../../types/types';
import { ingredientCategories } from './constants';
import styles from './style.module.css';

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

    const bunsRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainsRef = useRef<HTMLDivElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const categoriesRefCurrent = categoriesRef.current;
        if (!categoriesRefCurrent) {
            return;
        }

        switch (currentTab) {
            case IngredientCategoryTypeLocalName.BUN:
                bunsRef.current &&
                    categoriesRefCurrent.scrollTo({
                        top:
                            bunsRef.current.getBoundingClientRect().y -
                            categoriesRefCurrent.getBoundingClientRect().y,
                        behavior: 'smooth',
                    });
                return;
            case IngredientCategoryTypeLocalName.SAUCE:
                saucesRef.current &&
                    categoriesRefCurrent.scrollTo({
                        top:
                            saucesRef.current.getBoundingClientRect().y -
                            categoriesRefCurrent.getBoundingClientRect().y,
                        behavior: 'smooth',
                    });
                return;
            case IngredientCategoryTypeLocalName.MAIN:
                mainsRef.current &&
                    categoriesRefCurrent.scrollTo({
                        top:
                            mainsRef.current.getBoundingClientRect().y -
                            categoriesRefCurrent.getBoundingClientRect().y,
                        behavior: 'smooth',
                    });
                return;
        }
    }, [currentTab]);

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
            <div
                className={styles.categories}
                ref={categoriesRef}
            >
                <BurgerIngredientsCategory
                    category={bunsList}
                    title={'Булки'}
                    onIngredientClick={onIngredientClick}
                    innerRef={bunsRef}
                />
                <BurgerIngredientsCategory
                    category={saucesList}
                    title={'Соусы'}
                    onIngredientClick={onIngredientClick}
                    innerRef={saucesRef}
                />
                <BurgerIngredientsCategory
                    category={mainsList}
                    title={'Начинки'}
                    onIngredientClick={onIngredientClick}
                    innerRef={mainsRef}
                />
            </div>
        </section>
    );
};
