import { createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDIENTS_STATE_NAME } from './constants';
import { API_ENDPOINT, API_URL } from '../../../constants/constants';
import { FetchIngredientsAsyncThunkConfig } from './types';

export const fetchIngredients = createAsyncThunk<
    Response,
    void,
    FetchIngredientsAsyncThunkConfig
>(`${INGREDIENTS_STATE_NAME}/fetch`, async (_, { rejectWithValue }) => {
    try {
        const ingredientsResponse = await fetch(
            `${API_URL}/${API_ENDPOINT.INGREDIENTS}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return ingredientsResponse;
    } catch (error) {
        console.error('Произошла ошибка: ', error);

        return rejectWithValue(error as string);
    }
});
