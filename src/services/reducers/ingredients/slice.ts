import { createSlice } from '@reduxjs/toolkit';
import { INGREDIENTS_STATE_NAME } from './constants';
import { createOrder, fetchIngredients } from './thunks';
import { IngredientsState } from './types';
import {
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
            const { value, uniqueId } = action.payload;
            const newIngredient: UniqueIngredientItem = {
                ...value,
                uniqueId: uniqueId,
            };

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
        deleteConstructorIngredient: (state, action) => {
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
        resetOrderValue: (state) => {
            state.order = undefined;
        },
        moveIngredientsInConstructor: (state, action) => {
            const { movedIngredientIndex, targetIngredientIndex } =
                action.payload;
            const newIngredientsOrder = [
                ...state.constructorContent.ingredients,
            ];

            // Смена мест ингредиентов
            [
                newIngredientsOrder[movedIngredientIndex],
                newIngredientsOrder[targetIngredientIndex],
            ] = [
                newIngredientsOrder[targetIngredientIndex],
                newIngredientsOrder[movedIngredientIndex],
            ];

            state.constructorContent.ingredients = newIngredientsOrder;
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
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.error = action.payload;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.constructorContent.ingredients = [];
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
    resetOrderValue,
    deleteConstructorIngredient,
    moveIngredientsInConstructor,
} = ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;
