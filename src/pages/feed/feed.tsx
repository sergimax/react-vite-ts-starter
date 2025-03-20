import { useEffect } from 'react';
import { FeedStats } from '../../components';
import { FeedList } from '../../components/feed-list';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { setActivePage } from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';
import {
    DataForModal,
    ORDER_STATUS,
    OrdersDataWSResponse,
} from '../../types/types';
import {
    wsDisconnect,
    wsIsConnectedSelector,
    wsMessagesSelector,
    wsStartConnecting,
} from '../../services/reducers/websocket';
import { WS_URL } from '../../constants/constants';
import styles from './styles.module.css';

/**
 * Cтраница ленты заказов
 * @returns
 */
export const Feed = ({
    openModal,
}: {
    openModal: (data: DataForModal) => void;
}) => {
    const dispatch = useAppDispatch();

    const ordersResponse: OrdersDataWSResponse | undefined =
        useAppSelector(wsMessagesSelector);
    const wsIsConnected = useAppSelector(wsIsConnectedSelector);

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.FEED }));

        if (!wsIsConnected) {
            dispatch(wsStartConnecting(WS_URL));
        }

        return () => {
            wsIsConnected && dispatch(wsDisconnect());
        };
    }, [dispatch, wsIsConnected]);

    if (!ordersResponse) {
        return (
            <div className={styles.centered}>
                <span className='text_type_main-large'>
                    Данные о заказах недоступны
                </span>
            </div>
        );
    }

    // Список номеров исполненных заказов
    const completedOrdersIds: Array<number> = ordersResponse.orders
        .filter(order => order.status === ORDER_STATUS.DONE)
        .map(ingredient => ingredient.number)
        .slice(0, 30);

    // Список номеров заказов в работе
    const processingOrdersIds: Array<number> = ordersResponse.orders
        .filter(
            order =>
                order.status === ORDER_STATUS.CREATED ||
                order.status === ORDER_STATUS.PENDING,
        )
        .map(ingredient => ingredient.number)
        .slice(0, 30);

    return (
        <main className={styles.main}>
            <FeedList
                orders={ordersResponse.orders}
                title='Лента заказов'
                onItemClick={openModal}
            />
            <FeedStats
                completedOrdersList={completedOrdersIds}
                processingOrdersList={processingOrdersIds}
                totalCounterValue={ordersResponse.total}
                dailyCounterValue={ordersResponse.totalToday}
            />
        </main>
    );
};
