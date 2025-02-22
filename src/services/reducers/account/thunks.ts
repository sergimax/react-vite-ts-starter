import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINT, API_URL } from '../../../constants/constants';
import {
    AskResetPasswordData,
    AskResetPasswordAsyncThunkConfig,
    AskResetPasswordDTO,
    ExecuteResetPasswordData,
    ExecuteResetPasswordDTO,
    ExecuteResetPasswordAsyncThunkConfig,
    RegisterAccountDTO,
    RegisterAccountAsyncThunkConfig,
    RegisterAccountData,
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

export const executeResetPassword = createAsyncThunk<
    ExecuteResetPasswordDTO,
    ExecuteResetPasswordData,
    ExecuteResetPasswordAsyncThunkConfig
>(
    `${ACCOUNT_STATE_NAME}/password-reset/reset`,
    async (resetData, { rejectWithValue }) => {
        try {
            const executePasswordResetResponse = await fetch(
                `${API_URL}/${API_ENDPOINT.PASSWORD_RESET_EXECUTE}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password: resetData.password,
                        token: resetData.token,
                    }),
                }
            );

            if (!executePasswordResetResponse.ok) {
                throw new Error(
                    `Статус ответа: ${executePasswordResetResponse.status}`
                );
            }

            const executePasswordResetData: ExecuteResetPasswordDTO =
                await executePasswordResetResponse.json();

            // Проверка успешности выполнения запроса
            if (!executePasswordResetData.success) {
                throw new Error(`Неуспешный статус сброса пароля`);
            }

            return executePasswordResetData;
        } catch (error) {
            console.error('Произошла ошибка: ', error);

            return rejectWithValue(error as string);
        }
    }
);

export const registerAccount = createAsyncThunk<
    RegisterAccountDTO,
    RegisterAccountData,
    RegisterAccountAsyncThunkConfig
>(
    `${ACCOUNT_STATE_NAME}/register`,
    async (accountData, { rejectWithValue }) => {
        try {
            const RegisterAccountResponse = await fetch(
                `${API_URL}/${API_ENDPOINT.REGISTER_ACCOUNT}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: accountData.email,
                        password: accountData.password,
                        name: accountData.name,
                    }),
                }
            );
            console.log('RegisterAccountResponse', RegisterAccountResponse);

            if (!RegisterAccountResponse.ok) {
                throw new Error(
                    `Статус ответа: ${RegisterAccountResponse.status}`
                );
            }

            const RegisterAccountData: RegisterAccountDTO =
                await RegisterAccountResponse.json();
            console.log('RegisterAccountData', RegisterAccountData);

            // Проверка успешности выполнения запроса
            if (!RegisterAccountData.success) {
                throw new Error(`Неуспешный статус регистрации аккаунта`);
            }

            return RegisterAccountData;
        } catch (error) {
            console.error('Произошла ошибка: ', error);

            return rejectWithValue(error as string);
        }
    }
);
