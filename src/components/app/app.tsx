import { useEffect, useState } from 'react';
import { AppHeader } from '../app-header';
import { BurgerConstructor } from '../burger-constructor';
import { BurgerIngredients } from '../burger-ingredients';
import { IngredientDetails } from '../ingredient-details';
import { Modal } from '../modal';
import { OrderDetails } from '../order-details';
import {
    DataForModal,
    ModalContent,
    Page,
} from '../../types/types';
import { MODAL_TYPE } from '../../constants/constants';
import styles from './app.module.css';
import { fetchIngredients } from '../../services/reducers/ingredients/thunks';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
    ingredientsConstructorContentSelector,
    ingredientsErrorSelector,
    ingredientsIsLoadedSelector,
    ingredientsIsLoadingSelector,
    ingredientsListSelector,
} from '../../services/reducers/ingredients/selectors';

function App() {
    const dispatch = useAppDispatch();

    const isIngredientsLoaded = useAppSelector(ingredientsIsLoadedSelector);
    const isIngredientsLoding = useAppSelector(ingredientsIsLoadingSelector);
    const ingredientsList = useAppSelector(ingredientsListSelector);
    const errorWithIngredientsFetch = useAppSelector(ingredientsErrorSelector);
    const constructorContent = useAppSelector(
        ingredientsConstructorContentSelector
    );

    const [activePage, setActivePage] = useState<Page>(Page.CONSTRUCTOR);

    // Управление модальным окном
    // TODO Вынести в кастомный хук
    const [isModalShown, setIsModalShown] = useState(false);
    const [modalData, setModalData] = useState<ModalContent | null>(null);

    const closeModal = () => {
        setModalData(null);
        setIsModalShown(false);
    };

    const openModal = (data: DataForModal): void => {
        if (data.type === MODAL_TYPE.ORDER && data.orderData) {
            setModalData({
                content: <OrderDetails orderId={data.orderData.orderId} />,
            });
            setIsModalShown(true);
        }

        if (
            data.type === MODAL_TYPE.INGREDIENT_DETAILS &&
            data.ingredientData
        ) {
            const ingredientData = ingredientsList.find(
                (element) => element._id === data.ingredientData?.ingredientId
            );

            ingredientData &&
                setModalData({
                    title: data.ingredientData.title,
                    content: <IngredientDetails data={ingredientData} />,
                });
            setIsModalShown(true);
        }
    };

    // Загрузка данных об ингредиентах
    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    useEffect(() => {
        if (isIngredientsLoaded && !errorWithIngredientsFetch) {
            console.log('isIngredientsLoaded');
            console.log('ingredientsList', ingredientsList);
        }
    }, [isIngredientsLoaded, errorWithIngredientsFetch]);

    useEffect(() => {
        setActivePage(Page.CONSTRUCTOR);
    }, []);

    return (
        <>
            {/* Блок заголовка страницы */}
            <AppHeader activePage={activePage} />

            {/* Блок основного содержимого страницы */}
            <main className={styles.main}>
                {isIngredientsLoding ? (
                    <h1 className="text_type_main-large pt-10 pb-5">
                        Загрузка списка продуктов
                    </h1>
                ) : errorWithIngredientsFetch ? (
                    <h1 className="text_type_main-large pt-10 pb-5">
                        {errorWithIngredientsFetch}
                    </h1>
                ) : (
                    ingredientsList.length > 0 && (
                        <>
                            <BurgerIngredients
                                ingredients={ingredientsList}
                                onIngredientClick={openModal}
                            />
                            <BurgerConstructor
                                chosenIngredients={constructorContent}
                                onFormAnOrderClick={openModal}
                            />
                        </>
                    )
                )}
            </main>

            {/* Блок модального окна */}
            {isModalShown && modalData && (
                <Modal
                    title={modalData.title}
                    children={modalData.content}
                    onClose={closeModal}
                ></Modal>
            )}
        </>
    );
}

export default App;
