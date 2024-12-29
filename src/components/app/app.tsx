import { useEffect, useState } from 'react';
import { AppHeader } from '../app-header';
import { BurgerConstructor } from '../burger-constructor';
import { BurgerIngredients } from '../burger-ingredients';
import { IngredientDetails } from '../ingredient-details';
import { Modal } from '../modal';
import { OrderDetails } from '../order-details';
import {
    ChosenIngredients,
    DataForModal,
    Ingredient,
    IngredientTypeName,
    ModalContent,
    Page,
} from '../../types/types';
import { GetIngredientsDTO } from './types';
import { API_ENDPOINT, API_URL, MODAL_TYPE } from '../../constants/constants';
import styles from './app.module.css';

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
            const ingredientData = ingredients.find(
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
            {/* Блок заголовка страницы */}
            <AppHeader activePage={activePage} />

            {/* Блок основного содержимого страницы */}
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
                                onIngredientClick={openModal}
                            />
                            <BurgerConstructor
                                chosenIngredients={chosenIngredients}
                                onFormAnOrderClick={openModal}
                            />
                        </>
                    )
                )}
            </main>

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
