import { FeedListItem } from '../feed-list-item';
import styles from './styles.module.css';
import { FeedListItemContent, FeedListItemStatus } from './types';

export const FeedList = () => {
    const titleClasses = `text_type_main-large pt-10 pb-5 ${styles.title}`;

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

    return (
        <section className={styles['app-content-block']}>
            <h1 className={titleClasses}>Лента заказов</h1>
            <div className={styles['feed-items']}>
                {MOCK_FEED_LIST_DATA.length > 0 &&
                    MOCK_FEED_LIST_DATA.map((item, index) => {
                        return <FeedListItem key={index} item={item} />;
                    })}
            </div>
        </section>
    );
};
