import { createSlice } from '@reduxjs/toolkit';
import { INGREDIENTS_STATE_NAME } from './constants';
import { fetchIngredients } from './thunks';
import { IngredientsState } from './types';
import { Ingredient, IngredientTypeName } from '../../../types/types';

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
            const { value } = action.payload;

            // TODO Добавить добравление ингредиента в список?
            state.constructorContent = {
                ...state.constructorContent,
                ingredients: value,
            };
        },
        setConstructorBun: (state, action) => {
            const { value } = action.payload;

            state.constructorContent = {
                ...state.constructorContent,
                bun: value,
            };
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
            .addCase(fetchIngredients.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.ingredients = action.payload.data;

                const someBun: Ingredient | undefined =
                    action.payload.data.find(
                        (ingredient) =>
                            ingredient.type === IngredientTypeName.BUN
                    );

                if (!someBun) {
                    state.error =
                        'Ошибка получения списка ингредиентов. Отсутствуют булки среди ингредиентов';

                    console.error(
                        'Ошибка получения списка ингредиентов. Отсутствуют булки среди ингредиентов'
                    );
                } else {
                    state.constructorContent = {
                        ...state.constructorContent,
                        bun: someBun,
                    };
                }
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.error = action.payload;
            });
    },
});

export const { resetIngredientsState } = ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;
