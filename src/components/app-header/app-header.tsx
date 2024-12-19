import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import { MenuButton } from '../menu-button';

/**
 * Шапка приложения
 */
export const AppHeader = () => {
    const leftMenuItems = [
        {
            text: 'Конструктор',
            icon: <BurgerIcon type="primary" />,
        },
        {
            text: 'Лента заказов',
            icon: <ListIcon type="primary" />,
        },
    ];
    const righMenuItems = [
        {
            text: 'Личный кабинет',
            icon: <ProfileIcon type="primary" />,
        },
    ];

    return (
        <header>
            <nav className={styles.navigation}>
                <div className={styles['left-icons']}>
                    {leftMenuItems.map((item, index) => (
                        <MenuButton
                            title={item.text}
                            icon={item.icon}
                            key={index}
                        />
                    ))}
                </div>
                <Logo className={styles.logo} />
                <div className={styles['right-icons']}>
                    {righMenuItems.map((item, index) => (
                        <MenuButton
                            title={item.text}
                            icon={item.icon}
                            key={index}
                        />
                    ))}
                </div>
            </nav>
        </header>
    );
};
