import { AppState } from '../../store';

export type AccountState = {
    email: string;
    name: string;
    password: string;
    isAuthorized: boolean;

    askResetError?: string;
    isAskResetLoaded: boolean;
    isAskResetLoading: boolean;
    isAskResetSuccessful: boolean;

    executeResetError?: string;
    isExecuteResetLoaded: boolean;
    isExecuteResetLoading: boolean;
    isExecuteResetSuccessful: boolean;

    isRegisterLoaded: boolean;
    isRegisterLoading: boolean;
    isRegisterSuccessful: boolean;

    isLoginLoaded: boolean;
    isLoginLoading: boolean;
    isLoginSuccessful: boolean;

    isLogoutSuccessful: boolean;

    isAccountInformationLoaded: boolean;
    isAccountInformationLoading: boolean;
    isAccountInformationSuccessful: boolean;

    isAccountInformationUpdateSuccessful: boolean;
};

export type CustomError = {
    status?: number;
    message?: string;
};

export type CookieParams = { [key: string]: string | number | Date | boolean };

export type BasicResponse = { success: boolean };

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

export type AskResetPasswordDTO = BasicResponse & {
    message: string;
};

/**
 * Данные для исполнения сброса пароля
 */
export type ExecuteResetPasswordData = {
    password: string;
    token: string;
};

export type ExecuteResetPasswordDTO = BasicResponse & {
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

export type RegisterAccountDTO = BasicResponse & {
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
};

/**
 * Данные для авторизации пользователя
 */
export type LoginAccountData = {
    email: string;
    password: string;
};

export type LoginAccountDTO = BasicResponse & {
    user: {
        email: string;
        name: string;
        password?: string;
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
};

/**
 * Результат обращения к бэку по выходу пользователя из системы
 */
export type LogoutAccountDTO = BasicResponse & {
    message: string;
};

export type LogoutAccountAsyncThunkConfig = {
    state: AppState;
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

export type RefreshTokenAccountDTO = BasicResponse & {
    accessToken: string;
    refreshToken: string;
};

export type RefreshTokenAccountAsyncThunkConfig = {
    state: AppState;
};

/**
 * Данные для получения информации пользователя
 */
export type GetAccountInformationData = {
    /**
     * accessToken
     */
    token: string;
};

export type GetAccountInformationDTO = BasicResponse & {
    user: {
        email: string;
        name: string;
    };
};

export type GetAccountInformationAsyncThunkConfig = {
    state: AppState;
};

/**
 * Данные для обновления информации пользователя
 */
export type UpdateAccountInformationData = {
    email: string;
    name: string;
    password: string;
};

export type UpdateAccountInformationDTO = BasicResponse & {
    user: {
        email: string;
        name: string;
    };
};

export type UpdateAccountInformationAsyncThunkConfig = {
    state: AppState;
};
