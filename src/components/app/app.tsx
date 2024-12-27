import { useEffect, useState } from 'react';
import { AppHeader } from '../app-header';
import styles from './app.module.css';
import {
    ChosenIngredients,
    Ingredient,
    IngredientTypeName,
    ModalContent,
    Page,
} from '../../types/types';
import { BurgerIngredients } from '../burger-ingredients';
import { BurgerConstructor } from '../burger-constructor';
import { API_ENDPOINT, API_URL } from '../../constants/constants';
import { GetIngredientsDTO } from './types';
import { Modal } from '../modal';

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
    const [activePage, setActivePage] = useState<Page>(Page.CONSTRUCTOR);
    const [chosenIngredients, setChosenIngredients] =
        useState<ChosenIngredients>({ bun: null, ingredients: [] });

    // Управление модальным окном
    // TODO Вынести в кастомный хук
    const [isModalShown, setIsModalShown] = useState(false);
    const [modalData, setModalData] = useState<ModalContent | null>(null);
    const closeModal = () => {
        setModalData(null);
        setIsModalShown(false);
    };
    const openModal = (content: ModalContent) => {
        setModalData(content);
        setIsModalShown(true);
    };

    useEffect(() => {
        setActivePage(Page.CONSTRUCTOR);
    }, []);

    useEffect(() => {
        async function fetchIngredients() {
            try {
                setIsLoading(true);

                const ingredientsResponse = await fetch(
                    `${API_URL}/${API_ENDPOINT.INGREDIENTS}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!ingredientsResponse.ok) {
                    throw new Error(
                        `Статус ответа: ${ingredientsResponse.status}`
                    );
                }

                const ingredientsData: GetIngredientsDTO =
                    await ingredientsResponse.json();

                // Проверка успешности выполнения запроса
                if (!ingredientsData.success) {
                    throw new Error(`Неуспешный статус загрузки`);
                }

                // Проверка пришедшего массива на наличие данных
                if (!ingredientsData.data?.length) {
                    throw new Error(`Пустой список ингредиентов`);
                }

                // FIXME заменить при реализации функционала выбора состава бургера
                const someBun: Ingredient | undefined =
                    ingredientsData.data.find(
                        (ingredient) =>
                            ingredient.type === IngredientTypeName.BUN
                    );

                if (!someBun) {
                    throw new Error(`Отсутствуют булки среди ингредиентов`);
                }

                setChosenIngredients({
                    bun: someBun,
                    ingredients: [],
                });

                setIngredients(ingredientsData.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Произошла ошибка: ', error);
                setIsLoading(false);
                setError(`Произошла ошибка: ${error as string}`);
            }
        }

        fetchIngredients();
    }, []);

    return (
        <>
            <AppHeader activePage={activePage} />
            <main className={styles.main}>
                {isLoading ? (
                    <h1 className="text_type_main-large pt-10 pb-5">
                        Загрузка списка продуктов
                    </h1>
                ) : error ? (
                    <h1 className="text_type_main-large pt-10 pb-5">{error}</h1>
                ) : (
                    ingredients.length > 0 && (
                        <>
                            <BurgerIngredients
                                ingredients={ingredients}
                                onIngredientClick={(
                                    ingredient?: Ingredient
                                ) => {
                                    console.log('click');
                                    console.log(ingredient);
                                }}
                            />
                            <BurgerConstructor
                                chosenIngredients={chosenIngredients}
                            />
                        </>
                    )
                )}
            </main>
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
