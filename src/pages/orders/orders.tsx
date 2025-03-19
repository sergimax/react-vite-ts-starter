import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../components/app/constants';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { logoutAccount } from '../../services/reducers/account';
import {
    activePageSelector,
    setActivePage,
} from '../../services/reducers/pages';
import { FeedList } from '../../components';
import { DataForModal, OrdersDataWSResponse } from '../../types/types';
import { WS_PERSONAL_URL } from '../../constants/constants';
import {
    wsDisconnect,
    wsMessagesSelector,
    wsStartConnecting,
} from '../../services/reducers/websocket';
import { getCookie } from '../../services/reducers/account/utils';
import styles from './styles.module.css';

/**
 * страница истории заказов пользователя
 * @returns
 */
export const Orders = ({
    openModal,
}: {
    openModal: (data: DataForModal) => void;
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const activePage = useAppSelector(activePageSelector);
    const ordersResponse: OrdersDataWSResponse | undefined =
        useAppSelector(wsMessagesSelector);

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

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.ORDERS }));

        const accessToken = getCookie('token')?.replace('Bearer ', '');

        accessToken &&
            dispatch(
                wsStartConnecting(`${WS_PERSONAL_URL}?token=${accessToken}`),
            );

        return () => {
            dispatch(wsDisconnect());
        };
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

                {ordersResponse ? (
                    <div className={styles['feed-list']}>
                        <FeedList
                            orders={ordersResponse.orders}
                            onItemClick={openModal}
                        />
                    </div>
                ) : (
                    <div className={styles.centered}>
                        <span className='text_type_main-large'>
                            Данные о заказах недоступны
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};
