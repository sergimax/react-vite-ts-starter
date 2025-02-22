import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OrderConstructor } from '../../pages';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<OrderConstructor />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
