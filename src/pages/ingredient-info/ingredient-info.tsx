import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppHeader } from '../../components/app-header';
import { IngredientDetails } from '../../components/ingredient-details';
import { Ingredient } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { ingredientsListSelector } from '../../services/reducers/ingredients/selectors';
import { fetchIngredients } from '../../services/reducers/ingredients/thunks';
import styles from './styles.module.css';

export const IngredientInfo = () => {
    const dispatch = useAppDispatch();

    const ingredients = useAppSelector(ingredientsListSelector);

    const { ingredientId } = useParams();

    const [ingredientData, setIngredientData] = useState<
        Ingredient | undefined
    >();

    /**
     * Запрос данных ингредиентов в случае отсутствия данных по ним
     */
    useEffect(() => {
        if (!ingredients.length) {
            dispatch(fetchIngredients());
        }
    }, [dispatch, ingredients]);

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
            <AppHeader />
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
