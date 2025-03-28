import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCardProps } from './types';
import { MODAL_TYPE } from '../../constants/constants';
import styles from './style.module.css';
import { useDrag } from 'react-dnd';

export const IngredientCard = ({
    data,
    onIngredientClick,
}: IngredientCardProps) => {
    const ingredientCardClass: string = `ml-4 mt-6 ${styles['ingredient-card-content']}`;
    const imageClass: string = `pl-4 pr-4 pb-1 ${styles.image}`;
    const priceClass: string = `pb-1 ${styles.price}`;
    const nameClass: string = `text_type_main-default ${styles.name}`;

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: data,
    });

    return (
        <div
            className={ingredientCardClass}
            onClick={() =>
                onIngredientClick({
                    type: MODAL_TYPE.INGREDIENT_DETAILS,
                    ingredientData: {
                        title: 'Детали ингредиента',
                        ingredientId: data._id,
                    },
                })
            }
            ref={dragRef}
        >
            {!!data.quantity && data.quantity > 0 && (
                <Counter
                    count={data.quantity}
                    size='default'
                    extraClass='m-1'
                />
            )}
            <img src={data.image} className={imageClass}></img>
            <div className={priceClass}>
                <span className='text_type_digits-default pr-2'>
                    {data.price}
                </span>
                <CurrencyIcon type='primary' />
            </div>
            <div className={nameClass}>{data.name}</div>
        </div>
    );
};
