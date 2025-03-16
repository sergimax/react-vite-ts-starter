import { FeedStats } from '../../components';
import { FeedList } from '../../components/feed-list';
import styles from './styles.module.css';

/**
 * Cтраница ленты заказов
 * @returns
 */
export const Feed = () => {
    return (
        <main className={styles.main}>
            <FeedList />
            <FeedStats />
        </main>
    );
};
