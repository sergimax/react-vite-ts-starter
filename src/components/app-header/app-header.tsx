import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import { MenuButton } from '../menu-button';
import { AppHeaderProps } from './types';
import { Page } from '../app/types';

/**
 * Шапка приложения
 */
export const AppHeader = ({ activePage }: AppHeaderProps) => {
    return (
        <header>
            <nav className={styles.navigation}>
                <div className={styles['left-icons']}>
                    <MenuButton title="Конструктор">
                        <BurgerIcon
                            type={
                                activePage === Page.CONSTRUCTOR
                                    ? 'primary'
                                    : 'secondary'
                            }
                        />
                    </MenuButton>
                    <MenuButton title="Лента заказов">
                        <ListIcon
                            type={
                                activePage === Page.ORDERS
                                    ? 'primary'
                                    : 'secondary'
                            }
                        />
                    </MenuButton>
                </div>
                <Logo className={styles.logo} />
                <div className={styles['right-icons']}>
                    <MenuButton title="Личный кабинет">
                        <ProfileIcon
                            type={
                                activePage === Page.ACCOUNT
                                    ? 'primary'
                                    : 'secondary'
                            }
                        />
                    </MenuButton>
                </div>
            </nav>
        </header>
    );
};
