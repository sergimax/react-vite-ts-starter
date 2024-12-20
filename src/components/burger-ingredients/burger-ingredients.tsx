import { useEffect, useState } from 'react';
import styles from './style.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
// import { data } from '../../utils/data';
// import { Ingredient } from './types';
import { ingredientCategories } from './constants';

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
    const [current, setCurrent] = useState('Булки');
    // const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);

    useEffect(() => {
        // TODO ingredients loading and statuses
        // setIngredients(data);
    }, []);

    // const categories: JSX.Element[] = [];

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
                {/* {ingredients.length && ingredients[0].calories} */}
                {/* <BurgerIngredientsCategory title='Булки'> */}
                {/* {[<>{ingredients[0]._id}</>]} */}
                {/* </BurgerIngredientsCategory> */}
            </div>
        </div>
    );
};
