import { AppState } from '../../store';

export type PasswordResetAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};

export type AccountState = {
    email: string;
    name: string;
    password: string;
    error?: string;

    isLoaded: boolean;
    isLoading: boolean
    isResetSuccessfull: boolean;
};

export type PasswordResetDTO = {
    success: boolean;
    message: string;
};
