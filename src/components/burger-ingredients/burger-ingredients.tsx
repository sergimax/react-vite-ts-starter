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
    const [isScrolling, setIsScrolling] = useState(false);

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

    /**
     * Переключение категорий ингредиентов с скроллом до выбранной
     * @param tabName Наименование выбранной вкладки
     * @param isOnClick Производится переключение по клику
     */
    function changeCurrentTab(
        tabName: string,
        isOnClick: boolean = false
    ): void {
        setCurrentTab(tabName);

        if (!isOnClick) {
            return;
        }

        const categoriesRefCurrent = categoriesRef.current;
        if (!categoriesRefCurrent) {
            return;
        }

        setIsScrolling(true);

        switch (tabName) {
            case IngredientCategoryTypeLocalName.BUN:
                bunsRef.current &&
                    categoriesRefCurrent.scrollBy({
                        top:
                            bunsRef.current.getBoundingClientRect().y -
                            categoriesRefCurrent.getBoundingClientRect().y,
                        behavior: 'smooth',
                    });
                break;
            case IngredientCategoryTypeLocalName.SAUCE:
                saucesRef.current &&
                    categoriesRefCurrent.scrollBy({
                        top:
                            saucesRef.current.getBoundingClientRect().y -
                            categoriesRefCurrent.getBoundingClientRect().y,
                        behavior: 'smooth',
                    });
                break;
            case IngredientCategoryTypeLocalName.MAIN:
                mainsRef.current &&
                    categoriesRefCurrent.scrollBy({
                        top:
                            mainsRef.current.getBoundingClientRect().y -
                            categoriesRefCurrent.getBoundingClientRect().y,
                        behavior: 'smooth',
                    });
                break;
        }
        setIsScrolling(false);
    }

    function onCategoriesScroll() {
        if (!categoriesRef.current || !bunsRef.current) {
            return;
        }

        const delta =
            categoriesRef.current.getBoundingClientRect().y -
            bunsRef.current.getBoundingClientRect().y;

        if (delta >= 0 && delta < 195) {
            changeCurrentTab(IngredientCategoryTypeLocalName.BUN);
        } else if (delta >= 195 && delta < 812) {
            changeCurrentTab(IngredientCategoryTypeLocalName.SAUCE);
        } else {
            changeCurrentTab(IngredientCategoryTypeLocalName.MAIN);
        }
    }

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
                            onClick={(value) => changeCurrentTab(value, true)}
                        >
                            {category.title}
                        </Tab>
                    );
                })}
            </div>
            {/* Блок категорий продуктов */}
            <div
                className={styles.categories}
                onScroll={() => !isScrolling && onCategoriesScroll()}
                ref={categoriesRef}
            >
                <BurgerIngredientsCategory
                    category={bunsList}
                    title={IngredientCategoryTypeLocalName.BUN}
                    onIngredientClick={onIngredientClick}
                    innerRef={bunsRef}
                />
                <BurgerIngredientsCategory
                    category={saucesList}
                    title={IngredientCategoryTypeLocalName.SAUCE}
                    onIngredientClick={onIngredientClick}
                    innerRef={saucesRef}
                />
                <BurgerIngredientsCategory
                    category={mainsList}
                    title={IngredientCategoryTypeLocalName.MAIN}
                    onIngredientClick={onIngredientClick}
                    innerRef={mainsRef}
                />
            </div>
        </section>
    );
};
