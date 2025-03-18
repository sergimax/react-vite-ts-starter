import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks.ts';
import { ingredientsListSelector } from '../../services/reducers/ingredients';
import styles from './style.module.css';

export const IngredientDetails = () => {
    const params = useParams();
    const ingredients = useAppSelector(ingredientsListSelector);
    const chosenIngredient = ingredients.find(
        ingredient => ingredient._id === params.ingredientId,
    );

    const characteristicsClass: string = `${styles.characteristics}`;
    const characteristicClass: string = `text_type_main-default text_color_inactive ${styles.characteristic}`;
    const characteristicValueClass: string = `text_type_digits-default mt-2`;

    if (!chosenIngredient) {
        return <>Информация для указанного ингредиента не найдена</>;
    }

    return (
        <>
            <img src={chosenIngredient.image_large} className='mb-4'></img>
            <div className='mb-8 text_type_main-medium'>
                {chosenIngredient.name}
            </div>
            <ul className={characteristicsClass}>
                <li className={characteristicClass}>
                    Калории, ккал
                    <span className={characteristicValueClass}>
                        {chosenIngredient.calories}
                    </span>
                </li>
                <li className={characteristicClass}>
                    Белки, г
                    <span className={characteristicValueClass}>
                        {chosenIngredient.proteins}
                    </span>
                </li>
                <li className={characteristicClass}>
                    Жиры, г
                    <span className={characteristicValueClass}>
                        {chosenIngredient.fat}
                    </span>
                </li>
                <li className={characteristicClass}>
                    Углеводы, г
                    <span className={characteristicValueClass}>
                        {chosenIngredient.carbohydrates}
                    </span>
                </li>
            </ul>
        </>
    );
};
