import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DataForModal } from '../../types/types';
import {
    ingredientsErrorSelector,
    ingredientsIsLoadingSelector,
    ingredientsListSelector,
} from '../../services/reducers/ingredients';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { BurgerIngredients } from '../../components/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor';
import { setActivePage } from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';
import styles from './styles.module.css';

export const OrderConstructor = ({
    openModal,
}: {
    openModal: (data: DataForModal) => void;
}) => {
    const dispatch = useAppDispatch();

    const isIngredientsLoading = useAppSelector(ingredientsIsLoadingSelector);
    const ingredientsList = useAppSelector(ingredientsListSelector);
    const errorWithIngredientsFetch = useAppSelector(ingredientsErrorSelector);

    // Загрузка данных об ингредиентах
    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.DEFAULT }));
    }, [dispatch]);

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                {/* Блок основного содержимого страницы */}
                <main className={styles.main}>
                    {isIngredientsLoading ? (
                        <h1 className='text_type_main-large pt-10 pb-5'>
                            Загрузка списка продуктов
                        </h1>
                    ) : errorWithIngredientsFetch ? (
                        <h1 className='text_type_main-large pt-10 pb-5'>
                            {errorWithIngredientsFetch}
                        </h1>
                    ) : (
                        ingredientsList.length > 0 && (
                            <>
                                <BurgerIngredients
                                    onIngredientClick={openModal}
                                />
                                <BurgerConstructor
                                    onFormAnOrderClick={openModal}
                                />
                            </>
                        )
                    )}
                </main>
            </DndProvider>
        </>
    );
};
