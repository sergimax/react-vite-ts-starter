import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
    return (
        <>
            <BrowserRouter>
                {/* TODO app header as separate component outside of Routes ?*/}
                <Routes>
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
            </BrowserRouter>
        </>
    );
}

export default App;
