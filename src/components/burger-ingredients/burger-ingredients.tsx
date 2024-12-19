import { useState } from 'react';
import styles from './style.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
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
    const [current, setCurrent] = useState('Булки');

    // const categories: JSX.Element[] = [];

    return (
        <div className={styles.container}>
            {/* TODO выделить в компонент  */}
            <div
                style={{ display: 'flex' }}
                className="mb-10"
            >
                <Tab
                    value="Булки"
                    active={current === 'Булки'}
                    onClick={setCurrent}
                >
                    Булки
                </Tab>
                <Tab
                    value="Соусы"
                    active={current === 'Соусы'}
                    onClick={setCurrent}
                >
                    Соусы
                </Tab>
                <Tab
                    value="Начинки"
                    active={current === 'Начинки'}
                    onClick={setCurrent}
                >
                    Начинки
                </Tab>
            </div>
            <div>
                <BurgerIngredientsCategory title='Булки'>
                    {[<></>]}
                </BurgerIngredientsCategory>
            </div>
        </div>
    );
};
