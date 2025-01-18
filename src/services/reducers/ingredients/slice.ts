import { createSlice } from '@reduxjs/toolkit';
import { INGREDIENTS_STATE_NAME } from './constants';
import { fetchIngredients } from './thunks';
import { IngredientsState } from './types';

const initialState: IngredientsState = {
    ingredients: [],
    constructorContent: { bun: null, ingredients: [] },
    ingredientInfo: undefined,
    order: undefined,

    isLoaded: false,
    error: undefined,
};

const ingredientsSlice = createSlice({
    name: INGREDIENTS_STATE_NAME,
    initialState,
    reducers: {
        resetIngredientsState: () => initialState,
    },
    extraReducers(builder) {
        builder
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                console.log('fetchIngredients.fulfilled');
                console.log(action);
                state.isLoaded = true;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                console.log('fetchIngredients.rejected');
                console.log(action);

                state.isLoaded = true;
                state.error = action.payload;
            });
    },
});

export const { resetIngredientsState } = ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;
