import './app.css';
import { AppHeader } from './components/app-header';
import { BurgerConstructor } from './components/burger-constructor';
import { BurgerIngredients } from './components/burger-ingredients';

function App() {
    return (
        <>
            <AppHeader />
            <main>
                <BurgerConstructor />
                <BurgerIngredients />
            </main>
        </>
    );
}

export default App;
