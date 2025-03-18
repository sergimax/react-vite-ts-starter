import { useEffect } from 'react';
import { FeedStats } from '../../components';
import { FeedList } from '../../components/feed-list';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { setActivePage } from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';
import { DataForModal, OrdersDataWSResponse } from '../../types/types';
import {
    MOCK_COMPLETED_ORDERS_LIST,
    MOCK_PROCESSING_ORDERS_LIST,
} from '../../utils/data';
import styles from './styles.module.css';
import {
    wsDisconnect,
    wsMessagesSelector,
    wsStartConnecting,
} from '../../services/reducers/websocket';
import { WS_URL } from '../../constants/constants';

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

    const ordersResponse: OrdersDataWSResponse | undefined = useAppSelector(wsMessagesSelector);
    console.log(ordersResponse);
    

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.FEED }));

        dispatch(wsStartConnecting(WS_URL));

        return () => {
            dispatch(wsDisconnect());
        };
    }, [dispatch]);
    
    if (!ordersResponse) {
        // TODO
        return <>sdasd</>
    }

    return (
        <main className={styles.main}>
            <FeedList
                orders={ordersResponse.orders}
                title='Лента заказов'
                onItemClick={openModal}
            />
            <FeedStats
                completedOrdersList={MOCK_COMPLETED_ORDERS_LIST}
                processingOrdersList={MOCK_PROCESSING_ORDERS_LIST}
                totalCounterValue={ordersResponse.total}
                dailyCounterValue={ordersResponse.totalToday}
            />
        </main>
    );
};
