import { useEffect } from 'react';
import { FeedStats } from '../../components';
import { FeedList } from '../../components/feed-list';
import {
    FeedListItemContent,
    FeedListItemStatus,
} from '../../components/feed-list/types';
import { useAppDispatch } from '../../services/hooks';
import { setActivePage } from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';
import styles from './styles.module.css';

/**
 * Cтраница ленты заказов
 * @returns
 */
export const Feed = () => {
    const dispatch = useAppDispatch();

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
        dispatch(setActivePage({ value: ROUTE_PATH.FEED }));
    }, [dispatch]);

    return (
        <main className={styles.main}>
            <FeedList data={MOCK_FEED_LIST_DATA} title='Лента заказов' />
            <FeedStats
                completedOrdersList={MOCK_COMPLETED_ORDERS_LIST}
                processingOrdersList={MOCK_PROCESSING_ORDERS_LIST}
                totalCounterValue={MOCK_TOTAL_COUNTER_VALUE}
                dailyCounterValue={MOCK_DAILY_COUNTER_VALUE}
            />
        </main>
    );
};
