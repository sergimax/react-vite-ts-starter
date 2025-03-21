import { FeedListItem } from '../feed-list-item';
import { FeedListProps } from './types';
import styles from './styles.module.css';

/**
 * Список заказов для отображения на страницах Лента заказов и История заказов
 * @returns
 */
export const FeedList = ({ orders, title, onItemClick }: FeedListProps) => {
    const titleClasses = `text_type_main-large pt-10 pb-5 ${styles.title}`;

    return (
        <section className={styles['container']}>
            {title && <h1 className={titleClasses}>{title}</h1>}
            <div className={styles['feed-items']}>
                {orders.length > 0 &&
                    orders.map((order, index) => {
                        return (
                            <FeedListItem
                                key={index}
                                item={order}
                                onItemClick={onItemClick}
                            />
                        );
                    })}
            </div>
        </section>
    );
};
