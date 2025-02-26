import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import { useAppDispatch } from '../../services/hooks.ts';
import { AppHeader } from '../app-header';

function App() {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const background = location.state?.background;

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <>
            <AppHeader />
            <Routes location={background || location}>
                <Route
                    path={ROUTE_PATH.NOT_FOUND}
                    element={<PageNotFound />}
                />
                <Route
                    path={ROUTE_PATH.DEFAULT}
                    element={<OrderConstructor />}
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
                    <Route
                        path={ROUTE_PATH.PROFILE}
                        element={<Profile />}
                    />
                </Route>
                <Route path={ROUTE_PATH.INGREDIENTS}>
                    <Route
                        path=':ingredientId'
                        element={<IngredientInfo />}
                    />
                </Route>
                <Route
                    path={ROUTE_PATH.ORDER_LIST}
                    element={<OrderList />}
                />
                <Route path={ROUTE_PATH.HISTORY} />
            </Routes>
        </>
    );
}

export default App;
