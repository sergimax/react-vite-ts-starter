import { FeedListItem } from '../feed-list-item';
import { FeedListProps } from './types';
import styles from './styles.module.css';

export const FeedList = ({ data, title }: FeedListProps) => {
    const titleClasses = `text_type_main-large pt-10 pb-5 ${styles.title}`;

    return (
        <section className={styles['container']}>
            {title && <h1 className={titleClasses}>{title}</h1>}
            <div className={styles['feed-items']}>
                {data.length > 0 &&
                    data.map((item, index) => {
                        return <FeedListItem key={index} item={item} />;
                    })}
            </div>
        </section>
    );
};
