import { AppState } from '../../store';

const rootSelector = (state: AppState) => state.model.account;

export const isResetPasswordLoadingSelector = (state: AppState) =>
    rootSelector(state).isLoading;

export const isResetPasswordLoadedSelector = (state: AppState) =>
    rootSelector(state).isLoaded;

export const isResetPasswordSuccessfullSelector = (state: AppState) =>
    rootSelector(state).isResetSuccessfull;

export const resetPasswordErrorSelector = (state: AppState) =>
    rootSelector(state).error;
