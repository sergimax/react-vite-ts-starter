import { useEffect, useState } from 'react';
import { AppHeader } from '../app-header';
import { BurgerConstructor } from '../burger-constructor';
import { BurgerIngredients } from '../burger-ingredients';
import { IngredientDetails } from '../ingredient-details';
import { Modal } from '../modal';
import { OrderDetails } from '../order-details';
import { DataForModal, ModalContent, Page } from '../../types/types';
import { MODAL_TYPE } from '../../constants/constants';
import styles from './app.module.css';
import { fetchIngredients } from '../../services/reducers/ingredients/thunks';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
    ingredientsErrorSelector,
    ingredientsIsLoadingSelector,
    ingredientsListSelector,
} from '../../services/reducers/ingredients/selectors';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    const dispatch = useAppDispatch();

    const isIngredientsLoding = useAppSelector(ingredientsIsLoadingSelector);
    const ingredientsList = useAppSelector(ingredientsListSelector);
    const errorWithIngredientsFetch = useAppSelector(ingredientsErrorSelector);

    const [activePage, setActivePage] = useState<Page>(Page.CONSTRUCTOR);

    // Управление модальным окном
    // TODO Вынести в кастомный хук
    const [isModalShown, setIsModalShown] = useState(false);
    const [modalData, setModalData] = useState<ModalContent | null>(null);

    // Закрытие модального окна
    const closeModal = () => {
        setModalData(null);
        setIsModalShown(false);
    };

    /**
     * Открыть модальное окно с передачей данный для отображения
     * @param { DataForModal } data Описание отображаемых данных
     */
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
        setActivePage(Page.CONSTRUCTOR);
    }, []);

    return (
        <>
            {/* Блок заголовка страницы */}
            <AppHeader activePage={activePage} />

            <DndProvider backend={HTML5Backend}>
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
