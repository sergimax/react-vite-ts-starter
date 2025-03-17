import { useParams } from 'react-router-dom';
import { MOCK_FEED_LIST_DATA } from '../../utils/data';
import styles from './styles.module.css';
import { FeedListItemStatus } from '../feed-list/types';
import { Price } from '../price';
import { ImageContainer } from '../image-container';
import { useAppSelector } from '../../services/hooks';
import { ingredientsListSelector } from '../../services/reducers/ingredients/selectors';

export const Order = () => {
    const params = useParams();
    const ingredients = useAppSelector(ingredientsListSelector);

    // TODO заменить на результат запроса к серверу
    //    const allOrders = useAppSelector(allOrdersSelector);
    const chosenOrder = MOCK_FEED_LIST_DATA.find(
        order => order.number === params.id,
    );

    if (!chosenOrder) {
        return <>Информация для указанного заказа не найдена</>;
    }

    const ingredientsIds: Array<string> = [
        chosenOrder.ingredients.bunId,
        chosenOrder.ingredients.bunId,
        ...chosenOrder.ingredients.ingredientsIds,
    ];

    const ingredientsList = ingredientsIds.map(id => {
        return ingredients.find(item => item._id === id);
    });

    const orderContent = ingredientsList.map((ingredient, index) => {
        return (
            <div key={index}>
                <ImageContainer
                    src={ingredient?.image_mobile || ''}
                    index={0}
                />
            </div>
        );
    });

    const statusClass: string = getStatusClass(chosenOrder.status);

    function getStatusClass(status?: FeedListItemStatus): string {
        if (status === FeedListItemStatus.COMPLETED) {
            return `text_type_main-default pb-15 ${styles['item-status-completed']}`;
        }

        return `text_type_main-default pb-15 ${styles['item-status']}`;
    }

    return (
        <div className={styles['item-container']}>
            <div className='text_type_digits-default pb-10'>
                #{chosenOrder.number}
            </div>
            <div className='text_type_main-medium'>{chosenOrder.name}</div>

            {chosenOrder.status && (
                <div className={statusClass}>{chosenOrder.status}</div>
            )}
            <div className='text text_type_main-medium pb-6'>Состав:</div>
            <div className='pb-10'>
                {orderContent}
                {/* {chosenOrder.ingredients.bunId} */}
                {/* {chosenOrder.ingredients.ingredientsIds} */}
            </div>
            <div className={styles['item-time-and-price']}>
                <div className='text text_type_main-default text_color_inactive'>
                    {chosenOrder.time}
                </div>
                <Price value={chosenOrder.price} />
            </div>
        </div>
    );
};
