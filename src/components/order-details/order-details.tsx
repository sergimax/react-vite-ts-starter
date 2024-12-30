import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetailsProps } from './types';
import vectorImage1 from '../../images/Vector 1.svg';
import vectorImage2 from '../../images/Vector 2.svg';
import vectorImage3 from '../../images/Vector 3.svg';
import styles from './style.module.css';

export const OrderDetails = ({ orderId }: OrderDetailsProps) => {
    const orderIdClasses: string = `text_type_digits-large mb-8 ${styles['order-id']}`;

    return (
        <>
            <div className={orderIdClasses}>{orderId}</div>

            <div className="text_type_main-medium mb-15">
                идентификатор заказа
            </div>
            <div className="mt-15 mb-15">
                <CheckMarkIcon
                    type="primary"
                    className={styles['check-mark']}
                />
                <img
                    src={vectorImage1}
                    className={styles.image}
                ></img>
                <img
                    src={vectorImage2}
                    className={styles.image}
                ></img>
                <img
                    src={vectorImage3}
                    className={styles.image}
                ></img>
            </div>

            <div className="text_type_main-default mb-2 mt-15">
                Ваш заказ начали готовить
            </div>

            <div className="text_type_main-default text_color_inactive mb-15">
                Дождитесь готовности на орбитальной станции
            </div>
        </>
    );
};
