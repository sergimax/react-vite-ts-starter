import { FeedStatsProps } from './types';
import styles from './styles.module.css';

export const FeedStats = ({
    completedOrdersList,
    processingOrdersList,
    totalCounterValue,
    dailyCounterValue,
}: FeedStatsProps) => {
    const containerClass: string = `pl-4 pt-25 ${styles.container}`;
    const headerClass: string = `text text_type_main-medium`;

    return (
        <section className={containerClass}>
            <div>
                <div>
                    <div className={headerClass}>Готовы:</div>
                    <div>{completedOrdersList}</div>
                </div>
                <div>
                    <div className={headerClass}>В работе:</div>
                    <div>{processingOrdersList}</div>
                </div>
            </div>
            <div>
                <div className={headerClass}>Выполнено за все время:</div>
                <div>{totalCounterValue}</div>
            </div>
            <div>
                <div className={headerClass}>Выполнено за сегодня:</div>
                <div>{dailyCounterValue}</div>
            </div>
        </section>
    );
};
