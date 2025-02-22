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

export type AskResetPasswordAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};

export type AskResetPasswordDTO = {
    success: boolean;
    message: string;
};

export type AskResetPasswordData = {
    email: string;
};

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

export type RegisterAccountData = {
    email: string;
    password: string;
    name: string;
};

export type RegisterAccountDTO = {
    success: boolean;
    message: string;
};

export type RegisterAccountAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};

