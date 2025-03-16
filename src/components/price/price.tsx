import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { PriceProps } from './types';
import styles from './styles.module.css';

export const Price = ({ value }: PriceProps) => {
    const priceClass: string = `pb-1 ${styles.price}`;

    return (
        <div className={priceClass}>
            <span className='text_type_digits-default pr-2'>{value}</span>
            <CurrencyIcon type='primary' />
        </div>
    );
};
