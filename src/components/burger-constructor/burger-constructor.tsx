import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import { useState } from 'react';

/**
 * Текущий состав бургера
 */
export const BurgerConstructor = () => {
    // TODO: Из библиотеки UI-компонентов возьмите следующие:
    // элементы списка,
    // иконки,
    // кнопку,
    // типографику,
    // систему отступов.
    // TODO: Отображение списка организуйте самостоятельно. Подумайте над реализацией и возможным ограничением высоты блока, в том числе и на разных разрешениях экранов. Скроллбар не распространяется на заблокированные позиции конструктора.

    const [current, setCurrent] = useState('Булки');

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
        </div>
    );
};
