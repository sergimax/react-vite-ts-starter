import { createSlice } from '@reduxjs/toolkit';
import { INGREDIENTS_STATE_NAME } from './constants';
import { createOrder, fetchIngredients } from './thunks';
import { IngredientsState } from './types';
import {
    IngredientTypeName,
    IngredientWithCounter,
    UniqueIngredientItem,
} from '../../../types/types';

const initialState: IngredientsState = {
    ingredients: [],
    constructorContent: { bun: null, ingredients: [] },
    ingredientInfo: undefined,
    order: undefined,

    isLoaded: false,
    isLoading: false,
    error: undefined,
};

const ingredientsSlice = createSlice({
    name: INGREDIENTS_STATE_NAME,
    initialState,
    reducers: {
        resetIngredientsState: () => initialState,
        setConstructorIngredients: (state, action) => {
            console.log('> setConstructorIngredients');

            const { value, uniqueId } = action.payload;
            const newIngredient: UniqueIngredientItem = {
                ...value,
                uniqueId: uniqueId,
            };
            console.log(uniqueId);

            state.constructorContent = {
                ...state.constructorContent,
                ingredients: [
                    ...state.constructorContent.ingredients,
                    newIngredient,
                ],
            };

            // Обновление счетчика ингредиента
            state.ingredients = [...state.ingredients].map((ingredient) => {
                if (ingredient._id !== newIngredient._id) {
                    return ingredient;
                }
                if (ingredient.quantity) {
                    ingredient.quantity++;
                } else {
                    ingredient.quantity = 1;
                }
                return ingredient;
            });
        },
        deleteCoonstructorIngredient: (state, action) => {
            console.log('> deleteCoonstructorIngredient');

            const { value } = action.payload;

            state.constructorContent = {
                ...state.constructorContent,
                ingredients: state.constructorContent.ingredients.filter(
                    (ingredient) => ingredient.uniqueId != value.uniqueId
                ),
            };

            // Обновление счетчика ингредиента при удалении
            state.ingredients = [...state.ingredients].map((ingredient) => {
                if (ingredient._id !== value._id) {
                    return ingredient;
                }
                if (ingredient.quantity) {
                    ingredient.quantity--;
                }
                return ingredient;
            });
        },
        setConstructorBun: (state, action) => {
            console.log('setConstructorBun');

            const { value, uniqueId } = action.payload;
            const newBun: UniqueIngredientItem = {
                ...value,
                uniqueId: uniqueId,
            };

            state.constructorContent = {
                ...state.constructorContent,
                bun: newBun,
            };

            // Обновление счетчика булки
            state.ingredients = [...state.ingredients].map((ingredient) => {
                if (ingredient._id !== newBun._id) {
                    ingredient.quantity = 0;
                    return ingredient;
                } else {
                    ingredient.quantity = 1;
                    return ingredient;
                }
            });
        },
        setIngredientInfo: (state, action) => {
            const { value } = action.payload;

            state.ingredientInfo = value;
        },
        setOrderValue: (state, action) => {
            const { value } = action.payload;

            state.order = value;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.ingredients = action.payload.data;

                /**
                 * Проверка наличия и выбор булки для отображения в конструкторе бургера
                 *
                 * Поскольку в макетах и по заданию спринта 1:
                 * 1. по умолчанию присутсвует булка
                 * 2. не было обозначено возможности отсуствия булки в бургере, отсутсвует макет
                 * 3. все расчеты (лента заказов, единичный заказ) ведутся с учетом наличия булки
                 */

                // Булка для подстановки в конструктор по умолчанию
                const defaultBun: IngredientWithCounter | undefined =
                    action.payload.data.find(
                        (ingredient) =>
                            ingredient.type === IngredientTypeName.BUN
                    );

                if (!defaultBun) {
                    state.error =
                        'Ошибка получения списка ингредиентов. Отсутствуют булки среди ингредиентов';

                    console.error(
                        'Ошибка получения списка ингредиентов. Отсутствуют булки среди ингредиентов'
                    );
                } else {
                    defaultBun.quantity = 1;

                    state.constructorContent = {
                        ...state.constructorContent,
                        bun: { ...defaultBun, uniqueId: Date.now() },
                    };
                }
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.error = action.payload;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.order = action.payload.order.number;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const {
    resetIngredientsState,
    setConstructorIngredients,
    setConstructorBun,
    setIngredientInfo,
    setOrderValue,
    deleteCoonstructorIngredient,
} = ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;
