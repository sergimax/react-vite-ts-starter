import { CSSProperties, ReactNode } from 'react';
import { FeedListItemStatus } from '../feed-list/types';
import { Price } from '../price';
import { FeedListItemProps } from './types';
import { useAppSelector } from '../../services/hooks';
import { ingredientsListSelector } from '../../services/reducers/ingredients/selectors';
import { MODAL_TYPE } from '../../constants/constants';
import styles from './styles.module.css';

export const FeedListItem = ({ item, onItemClick }: FeedListItemProps) => {
    const ingredients = useAppSelector(ingredientsListSelector);
    const statusClass: string = getStatusClass(item.status);
    const ingredientsIds: Array<string> = [
        item.ingredients.bunId,
        ...item.ingredients.ingredientsIds,
    ];
    const ingredientsPreviews: ReactNode[] =
        getIngredientPreviews(ingredientsIds);

    /**
     * Сформировать изображения первых 6 ингредиентов.
     *
     * Ингредиенты 7 и далее - скрываются, вместо них отображается число скрытых ингредиентов.
     * @param ids
     * @returns
     */
    function getIngredientPreviews(ids: Array<string>): ReactNode[] {
        const idsToShow = ids.slice(0, 6);

        const previews = idsToShow.map(id => {
            return ingredients.find(item => item._id === id);
        });

        function getImageStyle(imageIndex: number): CSSProperties | undefined {
            return {
                transform: `translate(-${16 * imageIndex}px)`,
                zIndex: 10 - imageIndex,
            };
        }

        const previewImages = previews.map((item, index) => (
            <img
                src={item?.image_mobile}
                className={styles['item-image-container']}
                key={index}
                style={getImageStyle(index)}
            />
        ));

        if (ids.length > 6) {
            const remainderClass = `${styles['remainded-ingredients-number']} text_type_main-default`;
            previewImages[5] = (
                <div className={styles['ingredient-item-with-number']} key={5}>
                    {previewImages[5]}
                    <div className={remainderClass} style={getImageStyle(5)}>
                        +{ids.length - 5}
                    </div>
                </div>
            );
        }

        return previewImages;
    }

    function getStatusClass(status?: FeedListItemStatus): string {
        if (status === FeedListItemStatus.COMPLETED) {
            return `text_type_main-default ${styles['item-status-completed']}`;
        }

        return `text_type_main-default ${styles['item-status']}`;
    }

    return (
        <div
            className={styles['item-container']}
            onClick={() =>
                onItemClick({
                    type: MODAL_TYPE.FEED,
                    feedItemData: item,
                })
            }
        >
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
                    {ingredientsPreviews}
                </div>
                <Price value={item.price} />
            </div>
        </div>
    );
};
