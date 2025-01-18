import { createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDIENTS_STATE_NAME } from './constants';
import { API_ENDPOINT, API_URL } from '../../../constants/constants';
import { FetchIngredientsAsyncThunkConfig } from './types';
import { GetIngredientsDTO } from '../../../components/app/types';

export const fetchIngredients = createAsyncThunk<
    GetIngredientsDTO,
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

        if (!ingredientsResponse.ok) {
            throw new Error(`Статус ответа: ${ingredientsResponse.status}`);
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

        return ingredientsData;
    } catch (error) {
        console.error('Произошла ошибка: ', error);

        return rejectWithValue(error as string);
    }
});
