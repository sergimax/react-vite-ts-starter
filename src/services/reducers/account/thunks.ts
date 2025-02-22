import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINT, API_URL } from '../../../constants/constants';
import {
    ResetData,
    ResetPasswordAsyncThunkConfig,
    ResetPasswordDTO,
} from './types';
import { ACCOUNT_STATE_NAME } from './constants';

export const resetPassword = createAsyncThunk<
    ResetPasswordDTO,
    ResetData,
    ResetPasswordAsyncThunkConfig
>(
    `${ACCOUNT_STATE_NAME}/password-reset`,
    async (resetData, { rejectWithValue }) => {
        try {
            const passwordResetResponse = await fetch(
                `${API_URL}/${API_ENDPOINT.PASSWORD_RESET}`,
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

            if (!passwordResetResponse.ok) {
                throw new Error(
                    `Статус ответа: ${passwordResetResponse.status}`
                );
            }

            const resetPasswordData: ResetPasswordDTO =
                await passwordResetResponse.json();

            // Проверка успешности выполнения запроса
            if (!resetPasswordData.success) {
                throw new Error(`Неуспешный статус сброса пароля`);
            }

            return resetPasswordData;
        } catch (error) {
            console.error('Произошла ошибка: ', error);

            return rejectWithValue(error as string);
        }
    }
);
