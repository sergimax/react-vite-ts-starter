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
