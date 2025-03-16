import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../components/app/constants';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { logoutAccount } from '../../services/reducers/account';
import {
    activePageSelector,
    setActivePage,
} from '../../services/reducers/pages';
import { useEffect } from 'react';
import styles from './styles.module.css';
import { FeedList } from '../../components';
import {
    FeedListItemContent,
    FeedListItemStatus,
} from '../../components/feed-list/types';

/**
 * страница истории заказов пользователя
 * @returns
 */
export const Orders = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const activePage = useAppSelector(activePageSelector);

    const navigationProfileClasses: string = `${styles['navigation-item']} ${
        activePage === ROUTE_PATH.PROFILE ? '' : 'text_color_inactive'
    }`;
    const navigationOrderListClasses: string = `${styles['navigation-item']} ${
        activePage === ROUTE_PATH.ORDERS ? '' : 'text_color_inactive'
    }`;
    const navigationExitClasses: string = `${
        styles['navigation-item']
    } ${'text_color_inactive'}`;

    // TODO обработка данных от сервера
    const MOCK_FEED_LIST_DATA: Array<FeedListItemContent> = [
        {
            name: 'Death Star Starship Main бургер',
            time: '16:20',
            number: '034535',
            ingredients: {
                bunId: '643d69a5c3f7b9001cfa093d',
                ingredientsIds: [
                    '643d69a5c3f7b9001cfa0943',
                    '643d69a5c3f7b9001cfa0945',
                    '643d69a5c3f7b9001cfa0946',
                    '643d69a5c3f7b9001cfa0947',
                    '643d69a5c3f7b9001cfa0949',
                ],
            },
            status: FeedListItemStatus.COMPLETED,
            price: 480,
        },
        {
            name: 'Interstellar бургер',
            time: '13:20',
            number: '034534',
            ingredients: {
                bunId: '643d69a5c3f7b9001cfa093d',
                ingredientsIds: [
                    '643d69a5c3f7b9001cfa0943',
                    '643d69a5c3f7b9001cfa0945',
                    '643d69a5c3f7b9001cfa0946',
                    '643d69a5c3f7b9001cfa0947',
                    '643d69a5c3f7b9001cfa0949',
                    '643d69a5c3f7b9001cfa0943',
                    '643d69a5c3f7b9001cfa0943',
                ],
            },
            price: 560,
        },
        {
            name: 'Death Star Starship Main бургер',
            time: '13:50',
            number: '034533',
            ingredients: {
                bunId: '643d69a5c3f7b9001cfa093d',
                ingredientsIds: [
                    '643d69a5c3f7b9001cfa0943',
                    '643d69a5c3f7b9001cfa0943',
                ],
            },
            price: 510,
        },
        {
            name: 'Death Star Starship Main бургер',
            time: '13:50',
            number: '034533',
            ingredients: {
                bunId: '643d69a5c3f7b9001cfa093d',
                ingredientsIds: [
                    '643d69a5c3f7b9001cfa0943',
                    '643d69a5c3f7b9001cfa0943',
                ],
            },
            price: 510,
        },
        {
            name: 'Death Star Starship Main бургер',
            time: '13:50',
            number: '034533',
            ingredients: {
                bunId: '643d69a5c3f7b9001cfa093d',
                ingredientsIds: [
                    '643d69a5c3f7b9001cfa0943',
                    '643d69a5c3f7b9001cfa0943',
                ],
            },
            price: 510,
        },
        {
            name: 'Death Star Starship Main бургер',
            time: '13:50',
            number: '034533',
            ingredients: {
                bunId: '643d69a5c3f7b9001cfa093d',
                ingredientsIds: [
                    '643d69a5c3f7b9001cfa0943',
                    '643d69a5c3f7b9001cfa0943',
                ],
            },
            price: 510,
        },
    ];

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.ORDERS }));
    }, [dispatch]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.navigation}>
                    <div className='text_type_main-medium'>
                        <div
                            className={navigationProfileClasses}
                            onClick={() => navigate(ROUTE_PATH.PROFILE)}
                        >
                            Профиль
                        </div>
                        <div
                            className={navigationOrderListClasses}
                            onClick={() => navigate(ROUTE_PATH.ORDERS)}
                        >
                            История заказов
                        </div>
                        <div
                            className={navigationExitClasses}
                            onClick={() => {
                                dispatch(logoutAccount());
                            }}
                        >
                            Выход
                        </div>
                    </div>

                    <div
                        className={'text_type_main-default text_color_inactive'}
                    >
                        В этом разделе вы можете просмотреть свою историю
                        заказов
                    </div>
                </div>
                <div className={styles['feed-list']}>
                    <FeedList data={MOCK_FEED_LIST_DATA} />
                </div>
            </div>
        </>
    );
};
