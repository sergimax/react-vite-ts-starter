import { CSSProperties, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { FeedListItemStatus } from '../feed-list/types';
import { Price } from '../price';
import { FeedListItemProps } from './types';
import { useAppSelector } from '../../services/hooks';
import { ingredientsListSelector } from '../../services/reducers/ingredients/selectors';
import { MODAL_TYPE } from '../../constants/constants';
import { ROUTE_PATH } from '../app/constants';
import { ImageContainer } from '../image-container';
import { getTextDay } from '../../utils';
import { IngredientWithCounter } from '../../types/types';
import styles from './styles.module.css';

export const FeedListItem = ({ item, onItemClick }: FeedListItemProps) => {
    const location = useLocation();

    const ingredients = useAppSelector(ingredientsListSelector);
    const statusClass: string = getStatusClass(item.status);
    const ingredientsIds: Array<string> = item.ingredients;
    const ingredientsPreviews: ReactNode[] =
        getIngredientPreviews(ingredientsIds);
    const ingredientsPrice: number = getIngredientsPrice(ingredientsIds);

    /**
     * Расчет стоимости заказа
     * @param ids Список id ингредиентов
     * @returns 
     */
    function getIngredientsPrice(ids: Array<string>): number {
        const orderIngredients: IngredientWithCounter[] = ids
            .map(id => {
                return ingredients.find(item => item._id === id);
            })
            .filter(ingredient => !!ingredient);

        const sum = orderIngredients.reduce((accum, current) => {
            return accum + current.price;
        }, 0);

        return sum;
    }

    /**
     * Сформировать изображения первых 6 ингредиентов.
     *
     * Ингредиенты 7 и далее - скрываются, вместо них отображается число скрытых ингредиентов.
     * @param ids Список id ингредиентов
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
            <ImageContainer
                src={item?.image_mobile || ''}
                key={index}
                index={index}
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

    function getStatusClass(status?: string): string {
        if (status === FeedListItemStatus.COMPLETED) {
            return `text_type_main-default ${styles['item-status-completed']}`;
        }

        return `text_type_main-default ${styles['item-status']}`;
    }

    /**
     * Получить тип модального окна на основании текущего расположения
     * @returns
     */
    function getModalType(): MODAL_TYPE {
        if (location.pathname === ROUTE_PATH.FEED) {
            return MODAL_TYPE.FEED;
        }

        return MODAL_TYPE.ORDERS_FEED;
    }

    return (
        <div
            className={styles['item-container']}
            onClick={() =>
                onItemClick({
                    type: getModalType(),
                    feedItemData: item,
                })
            }
        >
            <div className={styles['item-title']}>
                <div className='text text_type_digits-default'>
                    #{item.number}
                </div>
                <div className='text text_type_main-default text_color_inactive'>
                    {getTextDay(item.createdAt)}
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
                <Price value={ingredientsPrice} />
            </div>
        </div>
    );
};
