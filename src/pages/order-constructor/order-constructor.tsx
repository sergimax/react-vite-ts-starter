import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DataForModal, ModalContent } from '../../types/types';
import { fetchIngredients } from '../../services/reducers/ingredients/thunks';
import { IngredientDetails } from '../../components/ingredient-details';
import {
    ingredientsErrorSelector,
    ingredientsIsLoadingSelector,
    ingredientsListSelector,
} from '../../services/reducers/ingredients/selectors';
import { MODAL_TYPE } from '../../constants/constants';
import { OrderDetails } from '../../components/order-details';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { Modal } from '../../components/modal';
import { BurgerIngredients } from '../../components/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor';
import { AppHeader } from '../../components/app-header';
import { setActivePage } from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';
import { resetOrderValue } from '../../services/reducers/ingredients';
import styles from './styles.module.css';

export const OrderConstructor = () => {
    const dispatch = useAppDispatch();

    const isIngredientsLoding = useAppSelector(ingredientsIsLoadingSelector);
    const ingredientsList = useAppSelector(ingredientsListSelector);
    const errorWithIngredientsFetch = useAppSelector(ingredientsErrorSelector);

    // Управление модальным окном
    // TODO Вынести в кастомный хук
    const [isModalShown, setIsModalShown] = useState(false);
    const [modalData, setModalData] = useState<ModalContent | null>(null);

    // Закрытие модального окна
    const closeModal = () => {
        window.history.replaceState(`${ROUTE_PATH.INGREDIENTS}`, ``, `/`);
        dispatch(resetOrderValue());
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

        if (data.type === MODAL_TYPE.INGREDIENT_DETAILS && data.ingredientData) {
            const ingredientData = ingredientsList.find((element) => element._id === data.ingredientData?.ingredientId);

            if (ingredientData) {
                window.history.pushState(`${ROUTE_PATH.INGREDIENTS}/${data.ingredientData.ingredientId}`, '', `${ROUTE_PATH.INGREDIENTS}/${data.ingredientData.ingredientId}`);
                setModalData({
                    title: data.ingredientData.title, content: <IngredientDetails data={ingredientData} />,
                });
                setIsModalShown(true);
            }
        }
    };

    // Загрузка данных об ингредиентах
    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.DEFAULT }));
        dispatch(fetchIngredients());
        return () => {
            closeModal();
        }
    }, [dispatch]);

    return (
        <>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                {/* Блок основного содержимого страницы */}
                <main className={styles.main}>
                    {isIngredientsLoding ? (
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
};
