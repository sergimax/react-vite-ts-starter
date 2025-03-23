import { Ingredient, UniqueIngredientItem } from '../../../types/types';
import {
    deleteConstructorIngredient,
    ingredientsReducer,
    moveIngredientsInConstructor,
    resetIngredientsState,
    resetOrderValue,
    setConstructorBun,
    setConstructorIngredients,
    setIngredientInfo,
    setOrderValue,
} from './slice';
import { createOrder, fetchIngredients } from './thunks';
import { GetIngredientsDTO, IngredientsState, PostOrderDTO } from './types';

describe('ingredientsSlice', () => {
    const initialState: IngredientsState = {
        ingredients: [],
        constructorContent: { bun: null, ingredients: [] },
        ingredientInfo: undefined,
        order: undefined,
        isLoaded: false,
        isLoading: false,
        error: undefined,
    };

    const mockIngredient: Ingredient = {
        _id: '1',
        name: 'Ingredient 1',
        type: 'main',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'image.png',
        image_mobile: 'image_mobile.png',
        image_large: 'image_large.png',
        __v: 0,
    };

    const mockUniqueIngredient: UniqueIngredientItem = {
        ...mockIngredient,
        uniqueId: 1,
    };

    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
            initialState,
        );
    });

    it('should handle resetIngredientsState', () => {
        const previousState: IngredientsState = {
            ...initialState,
            ingredients: [mockIngredient],
            constructorContent: {
                bun: mockUniqueIngredient,
                ingredients: [mockUniqueIngredient],
            },
            ingredientInfo: mockIngredient,
            order: 123,
            isLoaded: true,
            isLoading: true,
            error: 'Some error',
        };

        expect(
            ingredientsReducer(previousState, resetIngredientsState()),
        ).toEqual(initialState);
    });

    it('should handle setConstructorIngredients', () => {
        const previousState: IngredientsState = {
            ...initialState,
            ingredients: [{ ...mockIngredient, quantity: 0 }],
            constructorContent: { bun: null, ingredients: [] },
        };

        const newState = ingredientsReducer(
            previousState,
            setConstructorIngredients({ value: mockIngredient, uniqueId: 1 }),
        );

        expect(newState.constructorContent.ingredients).toEqual([
            mockUniqueIngredient,
        ]);
        expect(newState.ingredients[0].quantity).toBe(1);
    });

    it('should handle deleteConstructorIngredient', () => {
        const previousState: IngredientsState = {
            ...initialState,
            ingredients: [{ ...mockIngredient, quantity: 1 }],
            constructorContent: {
                bun: null,
                ingredients: [mockUniqueIngredient],
            },
        };

        const newState = ingredientsReducer(
            previousState,
            deleteConstructorIngredient({ value: mockUniqueIngredient }),
        );

        expect(newState.constructorContent.ingredients).toEqual([]);
        expect(newState.ingredients[0].quantity).toBe(0);
    });

    it('should handle setConstructorBun', () => {
        const previousState: IngredientsState = {
            ...initialState,
            ingredients: [{ ...mockIngredient, quantity: 0 }],
            constructorContent: { bun: null, ingredients: [] },
        };

        const newState = ingredientsReducer(
            previousState,
            setConstructorBun({ value: mockIngredient, uniqueId: 1 }),
        );

        expect(newState.constructorContent.bun).toEqual(mockUniqueIngredient);
        expect(newState.ingredients[0].quantity).toBe(1);
    });

    it('should handle setIngredientInfo', () => {
        const previousState: IngredientsState = {
            ...initialState,
            ingredientInfo: undefined,
        };

        const newState = ingredientsReducer(
            previousState,
            setIngredientInfo({ value: mockIngredient }),
        );

        expect(newState.ingredientInfo).toEqual(mockIngredient);
    });

    it('should handle setOrderValue', () => {
        const previousState: IngredientsState = {
            ...initialState,
            order: undefined,
        };

        const newState = ingredientsReducer(
            previousState,
            setOrderValue({ value: 123 }),
        );

        expect(newState.order).toBe(123);
    });

    it('should handle resetOrderValue', () => {
        const previousState: IngredientsState = {
            ...initialState,
            order: 123,
        };

        const newState = ingredientsReducer(previousState, resetOrderValue());

        expect(newState.order).toBeUndefined();
    });

    it('should handle moveIngredientsInConstructor', () => {
        const previousState: IngredientsState = {
            ...initialState,
            constructorContent: {
                bun: null,
                ingredients: [
                    mockUniqueIngredient,
                    { ...mockUniqueIngredient, uniqueId: 2 },
                ],
            },
        };

        const newState = ingredientsReducer(
            previousState,
            moveIngredientsInConstructor({
                movedIngredientIndex: 0,
                targetIngredientIndex: 1,
            }),
        );

        expect(newState.constructorContent.ingredients).toEqual([
            { ...mockUniqueIngredient, uniqueId: 2 },
            mockUniqueIngredient,
        ]);
    });

    it('should handle fetchIngredients.pending', () => {
        const newState = ingredientsReducer(
            initialState,
            fetchIngredients.pending('', undefined),
        );

        expect(newState.isLoading).toBe(true);
        expect(newState.isLoaded).toBe(false);
    });

    it('should handle fetchIngredients.fulfilled', () => {
        const mockPayload: GetIngredientsDTO = {
            success: true,
            data: [mockIngredient],
        };
        const newState = ingredientsReducer(
            initialState,
            fetchIngredients.fulfilled(mockPayload, '', undefined),
        );

        expect(newState.isLoading).toBe(false);
        expect(newState.isLoaded).toBe(true);
        expect(newState.ingredients).toEqual(mockPayload.data);
    });

    it('should handle fetchIngredients.rejected', () => {
        const error = 'Error message';
        const action = {
            type: fetchIngredients.rejected.type,
            payload: error,
        };
        const newState = ingredientsReducer(initialState, action);

        expect(newState.isLoading).toBe(false);
        expect(newState.isLoaded).toBe(true);
        expect(newState.error).toBe('Error message');
    });

    it('should handle createOrder.fulfilled', () => {
        const previousState: IngredientsState = {
            ...initialState,
            constructorContent: {
                bun: mockUniqueIngredient,
                ingredients: [mockUniqueIngredient],
            },
        };

        const mockPayload: PostOrderDTO = {
            success: true,
            name: '',
            order: { number: 123 },
        };
        const newState = ingredientsReducer(
            previousState,
            createOrder.fulfilled(mockPayload, '', undefined),
        );

        expect(newState.constructorContent.ingredients).toEqual([]);
        expect(newState.constructorContent.bun).toEqual(null);
        expect(newState.order).toBe(123);
    });

    it('should handle createOrder.rejected', () => {
        const error = 'Error message';
        const action = {
            type: createOrder.rejected.type,
            payload: error,
        };
        const newState = ingredientsReducer(initialState, action);

        expect(newState.error).toBe('Error message');
    });
});
