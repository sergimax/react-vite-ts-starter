import { Link, useNavigate } from 'react-router-dom';
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ROUTE_PATH } from '../app/constants';
import { useAppSelector } from '../../services/hooks';
import { activePageSelector } from '../../services/reducers/pages';
import { ButtonParams } from './types';
import styles from './styles.module.css';

/**
 * Шапка приложения
 */
export const AppHeader = () => {
    const navigate = useNavigate();

    const activePage = useAppSelector(activePageSelector);

    const constructorButtonParams: ButtonParams = getButtonParams(
        ROUTE_PATH.DEFAULT
    );
    const orderListButtonParams: ButtonParams = getButtonParams(
        ROUTE_PATH.ORDER_LIST
    );
    const profileButtonParams: ButtonParams = getButtonParams(
        ROUTE_PATH.PROFILE
    );

    function getButtonParams(path: ROUTE_PATH): ButtonParams {
        return {
            class: `text_type_main-default ${styles['menu-button']} ${
                path === activePage
                    ? 'text_color_active'
                    : 'text_color_inactive'
            }`,
            type: activePage === path ? 'primary' : 'secondary',
        };
    }

    function handleClick(target: ROUTE_PATH): void {
        navigate(target);
    }

    return (
        <header>
            <nav className={styles.navigation}>
                <div className={styles['left-icons']}>
                    <div
                        className={constructorButtonParams.class}
                        onClick={() => handleClick(ROUTE_PATH.DEFAULT)}
                    >
                        <BurgerIcon type={constructorButtonParams.type} />
                        <span>Конструктор</span>
                    </div>
                    <div
                        className={orderListButtonParams.class}
                        onClick={() => handleClick(ROUTE_PATH.ORDER_LIST)}
                    >
                        <ListIcon type={orderListButtonParams.type} />
                        <span>Лента заказов</span>
                    </div>
                </div>
                <Link to={ROUTE_PATH.DEFAULT}>
                    <Logo className={styles.logo} />
                </Link>
                <div className={styles['right-icons']}>
                    <div
                        className={profileButtonParams.class}
                        onClick={() => handleClick(ROUTE_PATH.PROFILE)}
                    >
                        <ProfileIcon type={profileButtonParams.type} />
                        <span>Личный кабинет</span>
                    </div>
                </div>
            </nav>
        </header>
    );
};
