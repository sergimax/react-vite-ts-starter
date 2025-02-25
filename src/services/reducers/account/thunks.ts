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
    RefreshTokenAccountData,
    RefreshTokenAccountDTO,
    RefreshTokenAccountAsyncThunkConfig,
    LogoutAccountDTO,
    LogoutAccountAsyncThunkConfig,
    GetAccountInformationDTO,
    GetAccountInformationAsyncThunkConfig,
    UpdateAccountInformationDTO,
    UpdateAccountInformationData,
    UpdateAccountInformationAsyncThunkConfig,
} from './types';
import { ACCOUNT_STATE_NAME } from './constants';
import { deleteCookie, getCookie, setCookie } from './utils';

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

        // При успешном логине также запоминаем пароль
        LoginAccountData.user.password = accountData.password;

        return LoginAccountData;
    } catch (error) {
        console.error('Произошла ошибка входа: ', error);
        if ((error as CustomError).status || (error as CustomError).message) {
            return rejectWithValue(error as CustomError);
        }

        return rejectWithValue({ message: error as string });
    }
});

export const refreshToken = createAsyncThunk<
    RefreshTokenAccountDTO,
    RefreshTokenAccountData,
    RefreshTokenAccountAsyncThunkConfig
>(`${ACCOUNT_STATE_NAME}/refresh-token`, async (_, { rejectWithValue }) => {
    try {
        const customError: CustomError = {
            status: undefined,
            message: undefined,
        };

        const refreshTokenAccountResponse = await fetch(
            `${API_URL}/${API_ENDPOINT.REFRESH_TOKEN_ACCOUNT}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: localStorage.getItem('refreshToken'),
                }),
            }
        );

        if (!refreshTokenAccountResponse.ok) {
            customError.status = refreshTokenAccountResponse.status;
        }
        console.log('refreshTokenAccountResponse', refreshTokenAccountResponse);

        const refreshTokenAccountData: RefreshTokenAccountDTO =
            await refreshTokenAccountResponse.json();
        console.log('refreshTokenAccountData', refreshTokenAccountData);

        // Проверка успешности выполнения запроса
        if (!refreshTokenAccountData.success) {
            throw customError;
        }

        let authToken: string = '';

        if (refreshTokenAccountData.accessToken) {
            if (refreshTokenAccountData.accessToken.indexOf('Bearer') === 0) {
                authToken =
                    refreshTokenAccountData.accessToken.split('Bearer ')[1];
            }
        }

        if (refreshTokenAccountData.refreshToken) {
            localStorage.setItem(
                'refreshToken',
                refreshTokenAccountData.refreshToken
            );
        }

        if (authToken.length) {
            console.log('authToken', authToken);
            // Сохраняем токен в куку token
            setCookie('token', authToken);
        }

        return refreshTokenAccountData;
    } catch (error) {
        console.error('Произошла ошибка входа: ', error);
        if ((error as CustomError).status || (error as CustomError).message) {
            return rejectWithValue(error as CustomError);
        }

        return rejectWithValue({ message: error as string });
    }
});

export const logoutAccount = createAsyncThunk<
    LogoutAccountDTO,
    void,
    LogoutAccountAsyncThunkConfig
>(`${ACCOUNT_STATE_NAME}/logout`, async (_, { rejectWithValue }) => {
    try {
        const customError: CustomError = {
            status: undefined,
            message: undefined,
        };

        const LogoutAccountResponse = await fetch(
            `${API_URL}/${API_ENDPOINT.LOGOUT_ACCOUNT}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: localStorage.getItem('refreshToken'),
                }),
            }
        );

        if (!LogoutAccountResponse.ok) {
            customError.status = LogoutAccountResponse.status;
        }
        console.log('LogoutAccountResponse', LogoutAccountResponse);

        const LogoutAccountData: LogoutAccountDTO =
            await LogoutAccountResponse.json();
        console.log('LogoutAccountData', LogoutAccountData);

        // Проверка успешности выполнения запроса
        if (!LogoutAccountData.success) {
            throw customError;
        }

        deleteCookie('token');
        localStorage.removeItem('refreshToken');

        return LogoutAccountData;
    } catch (error) {
        console.error('Произошла ошибка выхода: ', error);
        if ((error as CustomError).status || (error as CustomError).message) {
            return rejectWithValue(error as CustomError);
        }

        return rejectWithValue({ message: error as string });
    }
});

export const getAccountInformation = createAsyncThunk<
    GetAccountInformationDTO,
    void,
    GetAccountInformationAsyncThunkConfig
>(`${ACCOUNT_STATE_NAME}/get-information`, async (_, { rejectWithValue }) => {
    try {
        const customError: CustomError = {
            status: undefined,
            message: undefined,
        };

        const getAccountInformationResponse = await fetch(
            `${API_URL}/${API_ENDPOINT.GET_OR_UPDATE_ACCOUNT}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${getCookie('token')}`,
                },
            }
        );

        if (!getAccountInformationResponse.ok) {
            customError.status = getAccountInformationResponse.status;
        }
        console.log(
            'getAccountInformationResponse',
            getAccountInformationResponse
        );

        const getAccountInformationData: GetAccountInformationDTO =
            await getAccountInformationResponse.json();
        console.log('getAccountInformationData', getAccountInformationData);

        // Проверка успешности выполнения запроса
        if (!getAccountInformationData.success) {
            throw customError;
        }

        return getAccountInformationData;
    } catch (error) {
        console.error('Произошла ошибка выхода: ', error);
        if ((error as CustomError).status || (error as CustomError).message) {
            return rejectWithValue(error as CustomError);
        }

        return rejectWithValue({ message: error as string });
    }
});

export const updateAccountInformation = createAsyncThunk<
    UpdateAccountInformationDTO,
    UpdateAccountInformationData,
    UpdateAccountInformationAsyncThunkConfig
>(
    `${ACCOUNT_STATE_NAME}/update-information`,
    async (accountData, { rejectWithValue }) => {
        try {
            const customError: CustomError = {
                status: undefined,
                message: undefined,
            };

            const updateAccountInformationResponse = await fetch(
                `${API_URL}/${API_ENDPOINT.GET_OR_UPDATE_ACCOUNT}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        Authorization: `Bearer ${getCookie('token')}`,
                    },
                    body: JSON.stringify({
                        name: accountData.name,
                        email: accountData.email,
                        password: accountData.password,
                    }),
                }
            );

            if (!updateAccountInformationResponse.ok) {
                customError.status = updateAccountInformationResponse.status;
            }
            console.log(
                'updateAccountInformationResponse',
                updateAccountInformationResponse
            );

            const updateAccountInformationData: GetAccountInformationDTO =
                await updateAccountInformationResponse.json();
            console.log(
                'updateAccountInformationData',
                updateAccountInformationData
            );

            // Проверка успешности выполнения запроса
            if (!updateAccountInformationData.success) {
                throw customError;
            }

            return updateAccountInformationData;
        } catch (error) {
            console.error('Произошла ошибка выхода: ', error);
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
