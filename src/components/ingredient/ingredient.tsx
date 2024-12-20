import { IngredientProps } from './types';
import styles from './style.module.css';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const Ingredient = ({ data }: IngredientProps) => {
    const imageClass: string = `pl-4 pr-4 pb-1 ${styles.image}`;
    const priceClass: string = `pb-1 ${styles.price}`;
    const nameClass: string = `text_type_main-default ${styles.name}`;
    const counterClass: string = `m-1`;

    return (
        <div className={styles.content}>
            {data.quantity && data.quantity > 0 && <Counter
                count={data.quantity}
                size="default"
                extraClass={counterClass}
            />}
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
