import { createSlice } from '@reduxjs/toolkit';
import { BURGER_STATE_NAME } from './constants';

const initialState = {
    // список всех полученных ингредиентов,
    ingredients: [],
    // список всех ингредиентов в текущем конструкторе бургера,
    constructorContent: [],
    // объект текущего просматриваемого ингредиента,
    ingredient: {},
    // объект созданного заказа.
    order: undefined,
};

const burgerSlice = createSlice({
    name: BURGER_STATE_NAME,
    initialState,
    reducers: {
        resetBurgerState: () => initialState,
    },
    // extraReducers(builder): {}
});

export const { resetBurgerState } = burgerSlice.actions;

export const burgerReducer = burgerSlice.reducer;
