import { FeedStats } from '../../components';
import { FeedList } from '../../components/feed-list';
import styles from './styles.module.css';

/**
 * Cтраница ленты заказов
 * @returns
 */
export const Feed = () => {
    const MOCK_COMPLETED_ORDERS_LIST = [
        '034533',
        '034532',
        '034530',
        '034527',
        '034525',
    ];
    const MOCK_PROCESSING_ORDERS_LIST = ['034538', '034541', '034542'];
    const MOCK_TOTAL_COUNTER_VALUE = 28_752;
    const MOCK_DAILY_COUNTER_VALUE = 138;

    return (
        <main className={styles.main}>
            <FeedList />
            <FeedStats
                completedOrdersList={MOCK_COMPLETED_ORDERS_LIST}
                processingOrdersList={MOCK_PROCESSING_ORDERS_LIST}
                totalCounterValue={MOCK_TOTAL_COUNTER_VALUE}
                dailyCounterValue={MOCK_DAILY_COUNTER_VALUE}
            />
        </main>
    );
};
