import { Price } from '../price';
import styles from './styles.module.css';

export type FeedListItemProps = {
    item: {
        name: string;
        time: string;
        number: string;
        ingredients: {
            bunId: string;
            ingredientsIds: Array<string>;
        };
        price: number;
    };
};

export const FeedListItem = ({ item }: FeedListItemProps) => {
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
            <div className='text text_type_main-medium'>{item.name}</div>
            <div>
                <div>
                    {item.ingredients.bunId}
                    {item.ingredients.ingredientsIds}
                </div>
                <Price value={item.price} />
            </div>
        </div>
    );
};
