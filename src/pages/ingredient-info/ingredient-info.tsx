import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetails } from '../../components/ingredient-details';
import { Ingredient } from '../../types/types';
import { useAppSelector } from '../../services/hooks';
import { ingredientsListSelector } from '../../services/reducers/ingredients/selectors';
import styles from './styles.module.css';

export const IngredientInfo = () => {

    const ingredients = useAppSelector(ingredientsListSelector);

    const { ingredientId } = useParams();

    const [ingredientData, setIngredientData] = useState<
        Ingredient | undefined
    >();

    /**
     * Получение данных об ингредиенте
     */
    useEffect(() => {
        if (ingredientId && ingredients.length) {
            setIngredientData(
                ingredients.find((element) => element._id === ingredientId)
            );
        }
    }, [ingredientId, ingredients]);

    return (
        <>
            <div className={styles.container}>
                {ingredientData ? (
                    <>
                        <h2 className='text_type_main-large'>
                            Детали ингредиента
                        </h2>
                        <IngredientDetails data={ingredientData} />
                    </>
                ) : (
                    <>
                        <h2 className='text_type_main-large'>
                            Ингредиент не обнаружен
                        </h2>
                    </>
                )}
            </div>
        </>
    );
};
