import { AppState } from '../../store';

export type AccountState = {
    email: string;
    name: string;
    password: string;
    error?: string;

    isLoaded: boolean;
    isLoading: boolean
    isResetSuccessfull: boolean;
};

export type ResetPasswordAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};

export type ResetPasswordDTO = {
    success: boolean;
    message: string;
};
