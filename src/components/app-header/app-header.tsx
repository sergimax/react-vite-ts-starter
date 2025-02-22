import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { AppHeaderProps } from './types';
import styles from './style.module.css';
import { ROUTE_PATH } from '../app/constants';

/**
 * Шапка приложения
 */
export const AppHeader = ({ activePage }: AppHeaderProps) => {
    return (
        <header>
            <nav className={styles.navigation}>
                <div className={styles['left-icons']}>
                    <a className={styles['menu-button']}>
                        <BurgerIcon
                            type={
                                activePage === ROUTE_PATH.DEFAULT
                                    ? 'primary'
                                    : 'secondary'
                            }
                        />
                        <span className="ml-2 text_type_main-default">
                            Конструктор
                        </span>
                    </a>
                    <a className={styles['menu-button']}>
                        <ListIcon
                            type={
                                activePage === ROUTE_PATH.ORDER_LIST
                                    ? 'primary'
                                    : 'secondary'
                            }
                        />
                        <span className="ml-2 text_type_main-default">
                            Лента заказов
                        </span>
                    </a>
                </div>
                <Logo className={styles.logo} />
                <div className={styles['right-icons']}>
                    <a className={styles['menu-button']}>
                        <ProfileIcon
                            type={
                                activePage === ROUTE_PATH.PROFILE
                                    ? 'primary'
                                    : 'secondary'
                            }
                        />
                        <span className="ml-2 text_type_main-default">
                            Личный кабинет
                        </span>
                    </a>
                </div>
            </nav>
        </header>
    );
};
