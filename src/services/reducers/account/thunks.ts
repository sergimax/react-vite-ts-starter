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
    CustomError,
    LoginAccountDTO,
    LoginAccountData,
    LoginAccountAsyncThunkConfig,
} from './types';
import { ACCOUNT_STATE_NAME } from './constants';
import { setCookie } from './utils';

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
            const customError: CustomError = {
                status: undefined,
                message: undefined,
            };

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

            if (!RegisterAccountResponse.ok) {
                customError.status = RegisterAccountResponse.status;
            }
            console.log('RegisterAccountResponse', RegisterAccountResponse);

            const RegisterAccountData: RegisterAccountDTO =
                await RegisterAccountResponse.json();
            console.log('RegisterAccountData', RegisterAccountData);

            // Проверка успешности выполнения запроса
            if (!RegisterAccountData.success) {
                throw customError;
            }

            return RegisterAccountData;
        } catch (error) {
            console.error('Произошла ошибка регистрации: ', error);
            if (
                (error as CustomError).status ||
                (error as CustomError).message
            ) {
                return rejectWithValue(error as CustomError);
            }

            return rejectWithValue({ message: error as string });
        }
    }
);

export const loginAccount = createAsyncThunk<
    LoginAccountDTO,
    LoginAccountData,
    LoginAccountAsyncThunkConfig
>(`${ACCOUNT_STATE_NAME}/login`, async (accountData, { rejectWithValue }) => {
    try {
        const customError: CustomError = {
            status: undefined,
            message: undefined,
        };

        const LoginAccountResponse = await fetch(
            `${API_URL}/${API_ENDPOINT.LOGIN_ACCOUNT}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: accountData.email,
                    password: accountData.password,
                }),
            }
        );

        if (!LoginAccountResponse.ok) {
            customError.status = LoginAccountResponse.status;
        }
        console.log('LoginAccountResponse', LoginAccountResponse);

        const LoginAccountData: LoginAccountDTO =
            await LoginAccountResponse.json();
        console.log('LoginAccountData', LoginAccountData);

        // Проверка успешности выполнения запроса
        if (!LoginAccountData.success) {
            throw customError;
        }

        let authToken: string = '';

        if (LoginAccountData.accessToken) {
            if (LoginAccountData.accessToken.indexOf('Bearer') === 0) {
                authToken = LoginAccountData.accessToken.split('Bearer ')[1];
            }
        }

        if (LoginAccountData.refreshToken) {
            localStorage.setItem('refreshToken', LoginAccountData.refreshToken);
        }

        if (authToken.length) {
            console.log('authToken', authToken);
            // Сохраняем токен в куку token
            setCookie('token', authToken);
        }

        return LoginAccountData;
    } catch (error) {
        console.error('Произошла ошибка входа: ', error);
        if ((error as CustomError).status || (error as CustomError).message) {
            return rejectWithValue(error as CustomError);
        }

        return rejectWithValue({ message: error as string });
    }
});
