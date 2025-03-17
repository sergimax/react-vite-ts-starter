import { useEffect } from 'react';
import { FeedStats } from '../../components';
import { FeedList } from '../../components/feed-list';
import { useAppDispatch } from '../../services/hooks';
import { setActivePage } from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';
import { DataForModal } from '../../types/types';
import {
    MOCK_COMPLETED_ORDERS_LIST,
    MOCK_DAILY_COUNTER_VALUE,
    MOCK_FEED_LIST_DATA,
    MOCK_PROCESSING_ORDERS_LIST,
    MOCK_TOTAL_COUNTER_VALUE,
} from '../../utils/data';
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

    // TODO обработка данных от сервера

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.FEED }));
    }, [dispatch]);

    return (
        <main className={styles.main}>
            <FeedList
                data={MOCK_FEED_LIST_DATA}
                title='Лента заказов'
                onItemClick={openModal}
            />
            <FeedStats
                completedOrdersList={MOCK_COMPLETED_ORDERS_LIST}
                processingOrdersList={MOCK_PROCESSING_ORDERS_LIST}
                totalCounterValue={MOCK_TOTAL_COUNTER_VALUE}
                dailyCounterValue={MOCK_DAILY_COUNTER_VALUE}
            />
        </main>
    );
};
