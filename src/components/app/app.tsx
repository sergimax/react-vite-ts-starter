import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
    ForgotPassword,
    Login,
    OrderConstructor,
    OrderList,
    PageNotFound,
    Profile,
    Register,
    ResetPassword,
} from '../../pages';
import { ROUTE_PATH } from './constants';
import { ProtectedRouteElement } from '../protected-route-element';
import { IngredientInfo } from '../../pages/ingredient-info';
import { fetchIngredients } from '../../services/reducers/ingredients/thunks.ts';
import { useAppDispatch, useAppSelector } from '../../services/hooks.ts';
import { AppHeader } from '../app-header';
import { Modal } from '../modal';
import { DataForModal, ModalContent } from '../../types/types.ts';
import { MODAL_TYPE } from '../../constants/constants.ts';
import { OrderDetails } from '../order-details';
import { IngredientDetails } from '../ingredient-details';
import {
    resetOrderValue,
    ingredientsListSelector,
} from '../../services/reducers/ingredients';

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const ingredientsList = useAppSelector(ingredientsListSelector);

    const background = location.state?.background;

    // Управление модальным окном
    const [isModalShown, setIsModalShown] = useState(false);
    const [modalData, setModalData] = useState<ModalContent | null>(null);

    // Закрытие модального окна
    const closeModal = () => {
        navigate(`${ROUTE_PATH.DEFAULT}`, {
            state: {
                background: undefined,
            },
        });
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

        if (
            data.type === MODAL_TYPE.INGREDIENT_DETAILS &&
            data.ingredientData
        ) {
            const ingredientData = ingredientsList.find(
                element => element._id === data.ingredientData?.ingredientId,
            );

            if (ingredientData) {
                navigate(
                    `${ROUTE_PATH.INGREDIENTS}/${data.ingredientData.ingredientId}`,
                    {
                        state: {
                            background: location,
                        },
                    },
                );
            }
        }
    };

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <>
            <AppHeader />
            <Routes>
                {background && (
                    <Route path={ROUTE_PATH.INGREDIENTS}>
                        <Route
                            path=':ingredientId'
                            element={
                                <Modal
                                    title={'Детали ингредиента'}
                                    children={<IngredientDetails />}
                                    onClose={closeModal}
                                ></Modal>
                            }
                        />
                    </Route>
                )}
            </Routes>
            <Routes location={background || location}>
                <Route path={ROUTE_PATH.NOT_FOUND} element={<PageNotFound />} />
                <Route
                    path={ROUTE_PATH.DEFAULT}
                    element={
                        <>
                            <OrderConstructor openModal={openModal} />
                            {/* Блок модального окна */}
                            {isModalShown && modalData && (
                                <Modal
                                    title={modalData.title}
                                    children={modalData.content}
                                    onClose={closeModal}
                                ></Modal>
                            )}
                        </>
                    }
                />
                <Route path={ROUTE_PATH.LOGIN} element={<Login />} />
                <Route path={ROUTE_PATH.REGISTER} element={<Register />} />
                <Route
                    path={ROUTE_PATH.FORGOT_PASSWORD}
                    element={<ForgotPassword />}
                />
                <Route
                    path={ROUTE_PATH.RESET_PASSWORD}
                    element={<ResetPassword />}
                />
                <Route
                    path={ROUTE_PATH.PROFILE}
                    element={<ProtectedRouteElement />}
                >
                    <Route path={ROUTE_PATH.PROFILE} element={<Profile />} />
                </Route>
                <Route path={ROUTE_PATH.INGREDIENTS}>
                    <Route path=':ingredientId' element={<IngredientInfo />} />
                </Route>
                <Route path={ROUTE_PATH.ORDER_LIST} element={<OrderList />} />
                <Route path={ROUTE_PATH.HISTORY} />
            </Routes>
        </>
    );
}

export default App;
