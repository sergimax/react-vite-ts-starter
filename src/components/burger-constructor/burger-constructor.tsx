import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import { BurgerConstructorProps } from './types';
import { OrderDetails } from '../order-details';
import { DEFAULT_ORDER_ID } from './constants';

/**
 * Текущий состав бургера
 */
export const BurgerConstructor = ({
    chosenIngredients,
    onFormAnOrderClick,
}: BurgerConstructorProps) => {
    const containerClass: string = `pl-4 pt-25 ${styles.container}`;
    const calculationClass: string = `mt-10 mr-4 ${styles.calculation}`;

    if (!chosenIngredients.bun) {
        return <></>;
    }

    return (
        <section className={containerClass}>
            {/* Верхняя булка бургера */}
            {chosenIngredients.bun && (
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={chosenIngredients.bun.name + ' (верх)'}
                    price={chosenIngredients.bun.price}
                    thumbnail={chosenIngredients.bun.image_mobile}
                    extraClass="ml-8 mb-4 mr-4"
                />
            )}

            {/* Начинка бургера */}
            <div className={styles.ingredients}>
                {chosenIngredients.ingredients &&
                    chosenIngredients.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image_mobile}
                                extraClass="ml-2 mb-4"
                            />
                        </div>
                    ))}
            </div>

            {/* Нижняя булка бургера */}
            {chosenIngredients.bun && (
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={chosenIngredients.bun.name + ' (низ)'}
                    price={chosenIngredients.bun.price}
                    thumbnail={chosenIngredients.bun.image_mobile}
                    extraClass="ml-8 mt-4"
                />
            )}

            {/* Блок калькуляции и кнопки */}
            <div className={calculationClass}>
                <span className="text_type_digits-medium pr-2">610</span>
                <CurrencyIcon type="primary" />
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    extraClass="ml-10"
                    onClick={() =>
                        onFormAnOrderClick({
                            content: (
                                <OrderDetails orderId={DEFAULT_ORDER_ID} />
                            ),
                        })
                    }
                >
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};
