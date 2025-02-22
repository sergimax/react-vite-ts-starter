import { AppState } from '../../store';

export type AccountState = {
    email: string;
    name: string;
    password: string;
    askResetError?: string;

    isAskResetLoaded: boolean;
    isAskResetLoading: boolean;
    isAskResetSuccessfull: boolean;
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
