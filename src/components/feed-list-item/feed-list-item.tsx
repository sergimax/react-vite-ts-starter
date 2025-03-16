import { FeedListItemStatus } from '../feed-list/types';
import { Price } from '../price';
import { FeedListItemProps } from './types';
import styles from './styles.module.css';

export const FeedListItem = ({ item }: FeedListItemProps) => {
    const statusClass: string = getStatusClass(item.status);

    function getStatusClass(status?: FeedListItemStatus): string {
        if (status === FeedListItemStatus.COMPLETED) {
            return `text_type_main-default ${styles['item-status-completed']}`;
        }

        return `text_type_main-default ${styles['item-status']}`;
    }

    return (
        <div className={styles['item-container']}>
            <div className={styles['item-title']}>
                <div className='text text_type_digits-default'>
                    #{item.number}
                </div>
                <div className='text text_type_main-default text_color_inactive'>
                    {item.time}
                </div>
            </div>
            <div className='text text_type_main-medium'>
                {item.name}
                {item.status && (
                    <div className={statusClass}>{item.status}</div>
                )}
            </div>
            <div className={styles['item-content-and-price']}>
                <div className={styles['item-content']}>
                    {item.ingredients.bunId}
                    {item.ingredients.ingredientsIds}
                </div>
                <Price value={item.price} />
            </div>
        </div>
    );
};
