import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINT, API_URL } from '../../../constants/constants';
import {
    AskResetPasswordAsyncThunkConfig,
    AskResetPasswordData,
    AskResetPasswordDTO, CustomError,
    ExecuteResetPasswordAsyncThunkConfig,
    ExecuteResetPasswordData,
    ExecuteResetPasswordDTO,
    GetAccountInformationAsyncThunkConfig,
    GetAccountInformationDTO,
    LoginAccountAsyncThunkConfig,
    LoginAccountData,
    LoginAccountDTO,
    LogoutAccountAsyncThunkConfig,
    LogoutAccountDTO,
    RefreshTokenAccountAsyncThunkConfig,
    RefreshTokenAccountDTO,
    RegisterAccountAsyncThunkConfig,
    RegisterAccountData,
    RegisterAccountDTO,
    UpdateAccountInformationAsyncThunkConfig,
    UpdateAccountInformationData,
    UpdateAccountInformationDTO,
} from './types';
import { ACCOUNT_STATE_NAME } from './constants';
import { deleteCookie, getCookie, request, setCookie } from './utils';

export const askResetPassword = createAsyncThunk<
  AskResetPasswordDTO,
  AskResetPasswordData,
  AskResetPasswordAsyncThunkConfig
>(
  `${ACCOUNT_STATE_NAME}/password-reset`,
  async (resetData): Promise<AskResetPasswordDTO> => {
    return request(API_ENDPOINT.PASSWORD_RESET_ASK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: resetData.email,
      }),
    });
  },
);

export const executeResetPassword = createAsyncThunk<
  ExecuteResetPasswordDTO,
  ExecuteResetPasswordData,
  ExecuteResetPasswordAsyncThunkConfig
>(
  `${ACCOUNT_STATE_NAME}/password-reset/reset`,
  async (resetData): Promise<ExecuteResetPasswordDTO> => {
    return request(`${API_ENDPOINT.PASSWORD_RESET_EXECUTE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: resetData.password,
        token: resetData.token,
      }),
    });
  },
);

export const registerAccount = createAsyncThunk<
  RegisterAccountDTO,
  RegisterAccountData,
  RegisterAccountAsyncThunkConfig
>(`${ACCOUNT_STATE_NAME}/register`, async (accountData) => {
  return request<RegisterAccountDTO>(`${API_ENDPOINT.REGISTER_ACCOUNT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: accountData.email,
      password: accountData.password,
      name: accountData.name,
    }),
  });
});

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
    void,
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

/**
 * Исполнение запроса с проверкой актуальности токена авторизации
 * @param path URL обращения
 * @param options Параметры исполняемого fetch запроса
 */
async function executeWithTokenRefresh(path: string, options: RequestInit) {
    console.log("executeWithTokenRefresh");
    try {
        const result = await fetch(path, options);

        if (!result.ok) {
            throw await result.json();
        }

        return await result.json();
    } catch (error) {
        // Если причина ошибки - просроченный токен
        if ((error as Error).message === 'jwt expired') {
            try {
                await refreshToken();
                const requestWithNewToken = await fetch(path, {
                    ...options, headers: {
                        'Content-Type': 'application/json;charset=utf-8', Authorization: `Bearer ${getCookie('token')}`,
                    },
                });

                return requestWithNewToken.json();
            } catch (e) {
                console.log('Ошибка повторного запроса с обновлением токена:', e)
            }

        } else {
            return Promise.reject(error);
        }
    }
}

export const getAccountInformation = createAsyncThunk<
    GetAccountInformationDTO,
    void,
    GetAccountInformationAsyncThunkConfig
>(`${ACCOUNT_STATE_NAME}/get-information`, async (_, { rejectWithValue }) => {
    console.log("getAccountInformation");
    try {
        const customError: CustomError = {
            status: undefined,
            message: undefined,
        };


        const getAccountInformationData = await executeWithTokenRefresh(
            `${API_URL}/${API_ENDPOINT.GET_OR_UPDATE_ACCOUNT}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${getCookie('token')}`,
                },
            }
        );
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

            const updateAccountInformationData = await executeWithTokenRefresh(
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
