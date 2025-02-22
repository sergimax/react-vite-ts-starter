import { AppState } from '../../store';

export type AccountState = {
    email: string;
    name: string;
    password: string;

    askResetError?: string;
    isAskResetLoaded: boolean;
    isAskResetLoading: boolean;
    isAskResetSuccessfull: boolean;

    executeResetError?: string;
    isExecuteResetLoaded: boolean;
    isExecuteResetLoading: boolean;
    isExecuteResetSuccessfull: boolean;

    registerError?: string;
    isRegisterLoaded: boolean;
    isRegisterLoading: boolean;
    isRegisterSuccessfull: boolean;
};

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
    accessToken: string;
    refreshToken: string;
};

export type RegisterAccountAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};

/**
 * Данные для авторизации пользователя
 */
export type LoginAccountData = {
    email: string;
    password: string;
    name: string;
};

export type LoginAccountDTO = {
    success: boolean;
    message: string;
};

export type LoginAccountAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};

/**
 * Данные для выхода пользователя из системы
 */
export type LogoutAccountData = {
    email: string;
    password: string;
    name: string;
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
    email: string;
    password: string;
    name: string;
};

export type RefreshTokenAccountDTO = {
    success: boolean;
    message: string;
};

export type RefreshTokenAccountAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};
