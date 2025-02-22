import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OrderConstructor } from '../../pages';
import { ROUTE_PATH } from './constants';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path={ROUTE_PATH.NOT_FOUND}
                        element={<>404</>}
                    />
                    <Route path="*" />
                    <Route
                        path="/"
                        element={<OrderConstructor />}
                    />
                    <Route path={ROUTE_PATH.LOGIN} />
                    <Route path={ROUTE_PATH.REGISTER} />
                    <Route path={ROUTE_PATH.FORGOT_PASSWORD} />
                    <Route path={ROUTE_PATH.RESET_PASSWORD} />
                    <Route path={ROUTE_PATH.PROFILE} />
                    <Route path={ROUTE_PATH.INGREDIENTS} />
                    <Route path={ROUTE_PATH.ORDER_LIST} />
                    <Route path={ROUTE_PATH.HISTORY} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
