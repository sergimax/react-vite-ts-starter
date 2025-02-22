import { AppState } from '../../store';

const rootSelector = (state: AppState) => state.model.account;

export const isAskResetPasswordLoadingSelector = (state: AppState) =>
    rootSelector(state).isAskResetLoading;

export const isAskResetPasswordLoadedSelector = (state: AppState) =>
    rootSelector(state).isAskResetLoaded;

export const isAskResetPasswordSuccessfullSelector = (state: AppState) =>
    rootSelector(state).isAskResetSuccessfull;

export const askResetPasswordErrorSelector = (state: AppState) =>
    rootSelector(state).askResetError;
