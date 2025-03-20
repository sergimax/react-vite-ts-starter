import { deleteConstructorIngredient, ingredientsReducer, moveIngredientsInConstructor, resetIngredientsState, resetOrderValue, setConstructorBun, setConstructorIngredients, setIngredientInfo, setOrderValue } from './slice';
import { createOrder, fetchIngredients } from './thunks';
import { IngredientsState } from './types';

describe('ingredientsReducer', () => {
    const initialState: IngredientsState = {
        ingredients: [],
        constructorContent: { bun: null, ingredients: [] },
        ingredientInfo: undefined,
        order: undefined,

        isLoaded: false,
        isLoading: false,
        error: undefined,
    };
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
            initialState,
        );
    });

    it('should handle resetIngredientsState', () => {
        const state = {
            ...initialState,
            ingredients: [{ _id: '1', name: 'Ingredient 1', quantity: 1 }],
            constructorContent: {
                bun: { _id: '2', name: 'Bun', uniqueId: 'bun1' },
                ingredients: [
                    { _id: '1', name: 'Ingredient 1', uniqueId: 'ing1' },
                ],
            },
        };

        expect(ingredientsReducer(state, resetIngredientsState())).toEqual(
            initialState,
        );
    });

    it('should handle setConstructorIngredients', () => {
        const ingredient = { _id: '1', name: 'Ingredient 1' };
        const action = setConstructorIngredients({
            value: ingredient,
            uniqueId: 'ing1',
        });

        const expectedState = {
            ...initialState,
            constructorContent: {
                ...initialState.constructorContent,
                ingredients: [{ ...ingredient, uniqueId: 'ing1' }],
            },
            ingredients: [{ ...ingredient, quantity: 1 }],
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle deleteConstructorIngredient', () => {
        const ingredient = { _id: '1', name: 'Ingredient 1', uniqueId: 'ing1' };
        const state = {
            ...initialState,
            constructorContent: {
                ...initialState.constructorContent,
                ingredients: [ingredient],
            },
            ingredients: [{ ...ingredient, quantity: 1 }],
        };

        const action = deleteConstructorIngredient({ value: ingredient });

        const expectedState = {
            ...initialState,
            constructorContent: {
                ...initialState.constructorContent,
                ingredients: [],
            },
            ingredients: [{ ...ingredient, quantity: 0 }],
        };

        expect(ingredientsReducer(state, action)).toEqual(expectedState);
    });

    it('should handle setConstructorBun', () => {
        const bun = { _id: '2', name: 'Bun' };
        const action = setConstructorBun({ value: bun, uniqueId: 'bun1' });

        const expectedState = {
            ...initialState,
            constructorContent: {
                ...initialState.constructorContent,
                bun: { ...bun, uniqueId: 'bun1' },
            },
            ingredients: [{ ...bun, quantity: 1 }],
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle setIngredientInfo', () => {
        const ingredient = { _id: '1', name: 'Ingredient 1' };
        const action = setIngredientInfo({ value: ingredient });

        const expectedState = {
            ...initialState,
            ingredientInfo: ingredient,
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle setOrderValue', () => {
        const orderNumber = 12345;
        const action = setOrderValue({ value: orderNumber });

        const expectedState = {
            ...initialState,
            order: orderNumber,
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle resetOrderValue', () => {
        const state = {
            ...initialState,
            order: 12345,
        };

        expect(ingredientsReducer(state, resetOrderValue())).toEqual(
            initialState,
        );
    });

    it('should handle moveIngredientsInConstructor', () => {
        const ingredient1 = {
            _id: '1',
            name: 'Ingredient 1',
            uniqueId: 'ing1',
        };
        const ingredient2 = {
            _id: '2',
            name: 'Ingredient 2',
            uniqueId: 'ing2',
        };
        const state = {
            ...initialState,
            constructorContent: {
                ...initialState.constructorContent,
                ingredients: [ingredient1, ingredient2],
            },
        };

        const action = moveIngredientsInConstructor({
            movedIngredientIndex: 0,
            targetIngredientIndex: 1,
        });

        const expectedState = {
            ...initialState,
            constructorContent: {
                ...initialState.constructorContent,
                ingredients: [ingredient2, ingredient1],
            },
        };

        expect(ingredientsReducer(state, action)).toEqual(expectedState);
    });

    it('should handle fetchIngredients.pending', () => {
        const action = { type: fetchIngredients.pending.type };

        const expectedState = {
            ...initialState,
            isLoading: true,
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle fetchIngredients.fulfilled', () => {
        const ingredients = [{ _id: '1', name: 'Ingredient 1' }];
        const action = {
            type: fetchIngredients.fulfilled.type,
            payload: { data: ingredients },
        };

        const expectedState = {
            ...initialState,
            isLoading: false,
            isLoaded: true,
            ingredients,
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle fetchIngredients.rejected', () => {
        const error = 'Error message';
        const action = {
            type: fetchIngredients.rejected.type,
            payload: error,
        };

        const expectedState = {
            ...initialState,
            isLoading: false,
            isLoaded: true,
            error,
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle createOrder.fulfilled', () => {
        const orderNumber = 12345;
        const state = {
            ...initialState,
            constructorContent: {
                bun: { _id: '2', name: 'Bun', uniqueId: 'bun1' },
                ingredients: [
                    { _id: '1', name: 'Ingredient 1', uniqueId: 'ing1' },
                ],
            },
        };

        const action = {
            type: createOrder.fulfilled.type,
            payload: { order: { number: orderNumber } },
        };

        const expectedState = {
            ...initialState,
            constructorContent: {
                bun: null,
                ingredients: [],
            },
            order: orderNumber,
        };

        expect(ingredientsReducer(state, action)).toEqual(expectedState);
    });

    it('should handle createOrder.rejected', () => {
        const error = 'Error message';
        const action = {
            type: createOrder.rejected.type,
            payload: error,
        };

        const expectedState = {
            ...initialState,
            error,
        };

        expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
    });
});
