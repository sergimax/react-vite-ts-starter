import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';

/**
 * Шапка приложения
 */
export const AppHeader = () => {
    // TODO: Из библиотеки UI-компонентов возьмите следующие:
    // типографику, text text_type_main-default
    // систему отступов. p-1
    // TODO: Остальную вёрстку выполните самостоятельно.
    return (
        <header className={styles.container}>
            <nav>
                {/* TODO выполнить в виде списка и грузить сюда через map */}
                <BurgerIcon type="primary" /> Конструктор
                <ListIcon type="primary" /> Лента заказов
                <Logo />
                <ProfileIcon type="primary" /> Личный кабинет
            </nav>
        </header>
    );
};
