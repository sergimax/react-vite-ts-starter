import { createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDIENTS_STATE_NAME } from './constants';
import { API_ENDPOINT, API_URL } from '../../../constants/constants';
import {
    FetchIngredientsAsyncThunkConfig,
    GetIngredientsDTO,
    PostOrderAsyncThunkConfig,
    PostOrderDTO,
} from './types';
import { getCookie } from '../account/utils';

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

export const createOrder = createAsyncThunk<
    PostOrderDTO,
    unknown,
    PostOrderAsyncThunkConfig
>(
    `${INGREDIENTS_STATE_NAME}/createOrder`,
    async (ingredientList, { rejectWithValue }) => {
        try {
            const orderResponse = await fetch(
                `${API_URL}/${API_ENDPOINT.ORDERS}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCookie('token')}`,
                    },
                    body: JSON.stringify({
                        ingredients: ingredientList,
                    }),
                }
            );

            if (!orderResponse.ok) {
                throw new Error(`Статус ответа: ${orderResponse.status}`);
            }

            const orderData: PostOrderDTO = await orderResponse.json();

            // Проверка успешности выполнения запроса
            if (!orderData.success) {
                throw new Error(`Неуспешный статус загрузки`);
            }

            return orderData;
        } catch (error) {
            console.error('Произошла ошибка: ', error);

            return rejectWithValue(error as string);
        }
    }
);
