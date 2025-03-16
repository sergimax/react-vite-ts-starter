import { FeedListItem } from '../feed-list-item';
import styles from './styles.module.css';
import { FeedListProps } from './types';

export const FeedList = ({ data }: FeedListProps) => {
    const titleClasses = `text_type_main-large pt-10 pb-5 ${styles.title}`;

    return (
        <section className={styles['app-content-block']}>
            <h1 className={titleClasses}>Лента заказов</h1>
            <div className={styles['feed-items']}>
                {data.length > 0 &&
                    data.map((item, index) => {
                        return <FeedListItem key={index} item={item} />;
                    })}
            </div>
        </section>
    );
};
