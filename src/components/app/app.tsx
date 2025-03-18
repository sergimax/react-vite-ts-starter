import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
    Feed,
    ForgotPassword,
    Login,
    OrderConstructor,
    Orders,
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
import { Background, DataForModal, ModalContent } from '../../types/types.ts';
import { MODAL_TYPE } from '../../constants/constants.ts';
import { OrderDetails } from '../order-details';
import { IngredientDetails } from '../ingredient-details';
import {
    resetOrderValue,
    ingredientsListSelector,
} from '../../services/reducers/ingredients';
import { Order } from '../order/order.tsx';

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const ingredientsList = useAppSelector(ingredientsListSelector);

    const background: Background = location.state?.background;

    // Управление модальным окном
    const [isModalShown, setIsModalShown] = useState(false);
    const [modalData, setModalData] = useState<ModalContent | null>(null);

    // Закрытие модального окна
    const closeModal = () => {
        navigate(`${location.state.background.pathname}`, {
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

        if (data.type === MODAL_TYPE.FEED && data.feedItemData) {
            navigate(`${ROUTE_PATH.FEED}/${data.feedItemData.number}`, {
                state: {
                    background: location,
                },
            });
        }

        if (data.type === MODAL_TYPE.ORDERS_FEED && data.feedItemData) {
            navigate(`${ROUTE_PATH.ORDERS}/${data.feedItemData.number}`, {
                state: {
                    background: location,
                },
            });
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
                {background && (
                    <Route path={ROUTE_PATH.ORDERS}>
                        <Route
                            path=':id'
                            element={
                                <Modal
                                    children={<Order />}
                                    onClose={closeModal}
                                ></Modal>
                            }
                        />
                    </Route>
                )}
                {background && (
                    <Route path={ROUTE_PATH.FEED}>
                        <Route
                            path=':id'
                            element={
                                <Modal
                                    children={<Order />}
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

                {/* Представление ингредиента для открытия в отдельном окне со страницы Конструктора*/}
                <Route path={ROUTE_PATH.INGREDIENTS}>
                    <Route path=':ingredientId' element={<IngredientInfo />} />
                </Route>

                {/*
                 * История заказов
                 */}
                {/* Основной экран Истории заказов */}
                <Route
                    path={ROUTE_PATH.ORDERS}
                    element={<ProtectedRouteElement />}
                >
                    <Route
                        path={ROUTE_PATH.ORDERS}
                        element={<Orders openModal={openModal} />}
                    ></Route>
                </Route>

                {/* Представление заказа для открытия в отдельном окне со страницы История заказов */}
                <Route
                    path={ROUTE_PATH.ORDERS}
                    element={<ProtectedRouteElement />}
                >
                    <Route
                        path={`${ROUTE_PATH.ORDERS}/:id`}
                        element={<Order />}
                    ></Route>
                </Route>

                {/*
                 * Лента заказов
                 */}
                {/* Основной экран Ленты заказов */}
                <Route
                    path={ROUTE_PATH.FEED}
                    element={<Feed openModal={openModal} />}
                ></Route>

                {/* Представление заказа для открытия в отдельном окне со страницы Ленты заказов */}
                <Route
                    path={`${ROUTE_PATH.FEED}/:id`}
                    element={<Order />}
                ></Route>
            </Routes>
        </>
    );
}

export default App;
