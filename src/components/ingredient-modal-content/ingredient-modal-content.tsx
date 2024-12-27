import { IngredientModalContentProps } from './types';
import styles from './style.module.css';

export const IngredientModalContent = ({
    data,
}: IngredientModalContentProps) => {
    const characteristicsClass: string = `${styles.characteristics}`;
    const characteristicClass: string = `text_type_main-default text_color_inactive ${styles.characteristic}`;
    const characteristicValueClass: string = `text_type_digits-default mt-2`;

    return (
        <>
            <img
                src={data.image_large}
                className="mb-4"
            ></img>
            <div className="mb-8 text_type_main-medium">{data.name}</div>
            <ul className={characteristicsClass}>
                <li className={characteristicClass}>
                    Калории, ккал
                    <span className={characteristicValueClass}>
                        {data.calories}
                    </span>
                </li>
                <li className={characteristicClass}>
                    Белки, г
                    <span className={characteristicValueClass}>
                        {data.proteins}
                    </span>
                </li>
                <li className={characteristicClass}>
                    Жиры, г
                    <span className={characteristicValueClass}>{data.fat}</span>
                </li>
                <li className={characteristicClass}>
                    Углеводы, г
                    <span className={characteristicValueClass}>
                        {data.carbohydrates}
                    </span>
                </li>
            </ul>
        </>
    );
};
