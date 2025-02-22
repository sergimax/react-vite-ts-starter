import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINT, API_URL } from '../../../constants/constants';
import { PasswordResetAsyncThunkConfig, PasswordResetDTO } from './types';
import { ACCOUNT_STATE_NAME } from './constants';

export const passwordReset = createAsyncThunk<
    PasswordResetDTO,
    void,
    PasswordResetAsyncThunkConfig
>(
    `${ACCOUNT_STATE_NAME}/password-reset`,
    async (email, { rejectWithValue }) => {
        try {
            const passwordResetResponse = await fetch(
                `${API_URL}/${API_ENDPOINT.PASSWORD_RESET}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                    }),
                }
            );

            if (!passwordResetResponse.ok) {
                throw new Error(
                    `Статус ответа: ${passwordResetResponse.status}`
                );
            }

            const resetData: PasswordResetDTO =
                await passwordResetResponse.json();

            // Проверка успешности выполнения запроса
            if (!resetData.success) {
                throw new Error(`Неуспешный статус сброса пароля`);
            }

            return resetData;
        } catch (error) {
            console.error('Произошла ошибка: ', error);

            return rejectWithValue(error as string);
        }
    }
);
