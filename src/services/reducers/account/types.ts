import { AppState } from '../../store';

export type AccountState = {
    email: string;
    name: string;
    password: string;
    isAuthorized: boolean;

    askResetError?: string;
    isAskResetLoaded: boolean;
    isAskResetLoading: boolean;
    isAskResetSuccessfull: boolean;

    executeResetError?: string;
    isExecuteResetLoaded: boolean;
    isExecuteResetLoading: boolean;
    isExecuteResetSuccessfull: boolean;

    registerError: CustomError;
    isRegisterLoaded: boolean;
    isRegisterLoading: boolean;
    isRegisterSuccessfull: boolean;

    loginError: CustomError;
    isLoginLoaded: boolean;
    isLoginLoading: boolean;
    isLoginSuccessfull: boolean;
};

export type CustomError = {
    status?: number;
    message?: string;
};

export type CookieParams = { [key: string]: string | number | Date | boolean };

/**
 * Данные для запроса возможности сброса пароля
 */
export type AskResetPasswordData = {
    email: string;
};

export type AskResetPasswordAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};

export type AskResetPasswordDTO = {
    success: boolean;
    message: string;
};

/**
 * Данные для исполнения сброса пароля
 */
export type ExecuteResetPasswordData = {
    password: string;
    token: string;
};

export type ExecuteResetPasswordDTO = {
    success: boolean;
    message: string;
};

export type ExecuteResetPasswordAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};

/**
 * Данные для регистрации пользователя
 */
export type RegisterAccountData = {
    email: string;
    password: string;
    name: string;
};

export type RegisterAccountDTO = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
    /**
     * Токен для получения и обновления данных пользователя через auth/user
     *
     * Передается в заголовке authorization
     */
    accessToken: string;
    /**
     * Токен для выхода из системы и для получения нового accessToken , если последний перестал подходить и просрочился
     *
     * Хранится в localStorage
     */
    refreshToken: string;
    message?: string;
};

export type RegisterAccountAsyncThunkConfig = {
    state: AppState;
    rejectValue: CustomError;
};

/**
 * Данные для авторизации пользователя
 */
export type LoginAccountData = {
    email: string;
    password: string;
};

export type LoginAccountDTO = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
    /**
     * Токен для получения и обновления данных пользователя через auth/user
     *
     * Передается в заголовке authorization
     */
    accessToken: string;
    /**
     * Токен для выхода из системы и для получения нового accessToken , если последний перестал подходить и просрочился.
     *
     * Хранится в localStorage
     */
    refreshToken: string;
};

export type LoginAccountAsyncThunkConfig = {
    state: AppState;
    rejectValue: CustomError;
};

/**
 * Данные для выхода пользователя из системы
 */
export type LogoutAccountData = {
    /**
     * refreshToken
     */
    token: string;
};

export type LogoutAccountDTO = {
    success: boolean;
    message: string;
};

export type LogoutAccountAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};

/**
 * Данные для обновления токена пользователя
 */
export type RefreshTokenAccountData = {
    /**
     * refreshToken
     */
    token: string;
};

export type RefreshTokenAccountDTO = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
};

export type RefreshTokenAccountAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};
