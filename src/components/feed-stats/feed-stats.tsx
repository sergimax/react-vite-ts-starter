import { FeedStatsProps } from './types';
import styles from './styles.module.css';

export const FeedStats = ({
    completedOrdersList,
    processingOrdersList,
    totalCounterValue,
    dailyCounterValue,
}: FeedStatsProps) => {
    const containerClass: string = `pt-25 ${styles.container}`;
    const ordersListItemClass: string = `text text_type_digits-default ${styles['order-list-item']}`;
    const counterClass: string = `text_type_digits-large ${styles['counter']}`;

    return (
        <section className={containerClass}>
            <div className={styles.orders}>
                <div className={styles['orders-list']}>
                    <div className={'text text_type_main-medium pb-6'}>
                        Готовы:
                    </div>
                    <div
                        style={{ color: '#00CCCC' }}
                        className={styles['order-list-items']}
                    >
                        {completedOrdersList.map((order, index) => (
                            <div key={index} className={ordersListItemClass}>
                                {order}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles['orders-list']}>
                    <div className={'text text_type_main-medium pb-6'}>
                        В работе:
                    </div>
                    <div className={styles['order-list-items']}>
                        {processingOrdersList.map((order, index) => (
                            <div key={index} className={ordersListItemClass}>
                                {order}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className={'text text_type_main-medium'}>
                    Выполнено за все время:
                </div>
                <div className={counterClass}>{totalCounterValue}</div>
            </div>
            <div>
                <div className={'text text_type_main-medium'}>
                    Выполнено за сегодня:
                </div>
                <div className={counterClass}>{dailyCounterValue}</div>
            </div>
        </section>
    );
};
