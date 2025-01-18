import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCardProps } from './types';
import { MODAL_TYPE } from '../../constants/constants';
import styles from './style.module.css';

export const IngredientCard = ({
    data,
    onIngredientClick,
}: IngredientCardProps) => {
    const contentClass: string = `ml-4 mt-6 ${styles.content}`;
    const imageClass: string = `pl-4 pr-4 pb-1 ${styles.image}`;
    const priceClass: string = `pb-1 ${styles.price}`;
    const nameClass: string = `text_type_main-default ${styles.name}`;

    return (
        <div
            className={contentClass}
            onClick={() =>
                onIngredientClick({
                    type: MODAL_TYPE.INGREDIENT_DETAILS,
                    ingredientData: {
                        title: 'Детали ингредиента',
                        ingredientId: data._id,
                    },
                })
            }
        >
            {data.quantity && data.quantity > 0 && (
                <Counter
                    count={data.quantity}
                    size="default"
                    extraClass="m-1"
                />
            )}
            <img
                src={data.image}
                className={imageClass}
            ></img>
            <div className={priceClass}>
                <span className="text_type_digits-default pr-2">
                    {data.price}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={nameClass}>{data.name}</div>
        </div>
    );
};
