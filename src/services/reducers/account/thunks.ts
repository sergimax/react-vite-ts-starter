import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINT, API_URL } from '../../../constants/constants';
import {
    AskResetPasswordData,
    AskResetPasswordAsyncThunkConfig,
    AskResetPasswordDTO,
} from './types';
import { ACCOUNT_STATE_NAME } from './constants';

export const askResetPassword = createAsyncThunk<
    AskResetPasswordDTO,
    AskResetPasswordData,
    AskResetPasswordAsyncThunkConfig
>(
    `${ACCOUNT_STATE_NAME}/password-reset`,
    async (resetData, { rejectWithValue }) => {
        try {
            const askPasswordResetResponse = await fetch(
                `${API_URL}/${API_ENDPOINT.PASSWORD_RESET_ASK}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: resetData.email,
                    }),
                }
            );

            if (!askPasswordResetResponse.ok) {
                throw new Error(
                    `Статус ответа: ${askPasswordResetResponse.status}`
                );
            }

            const askPasswordResetData: AskResetPasswordDTO =
                await askPasswordResetResponse.json();

            // Проверка успешности выполнения запроса
            if (!askPasswordResetData.success) {
                throw new Error(`Неуспешный статус сброса пароля`);
            }

            return askPasswordResetData;
        } catch (error) {
            console.error('Произошла ошибка: ', error);

            return rejectWithValue(error as string);
        }
    }
);
