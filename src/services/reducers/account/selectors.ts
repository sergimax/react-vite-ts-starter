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

export const isExecuteResetPasswordLoadingSelector = (state: AppState) =>
    rootSelector(state).isExecuteResetLoading;

export const isExecuteResetPasswordLoadedSelector = (state: AppState) =>
    rootSelector(state).isExecuteResetLoaded;

export const isExecuteResetPasswordSuccessfullSelector = (state: AppState) =>
    rootSelector(state).isExecuteResetSuccessfull;

export const executeResetPasswordErrorSelector = (state: AppState) =>
    rootSelector(state).executeResetError;

export const isRegisterAccountLoadingSelector = (state: AppState) =>
    rootSelector(state).isRegisterLoaded;

export const isRegisterAccountLoadedSelector = (state: AppState) =>
    rootSelector(state).isRegisterLoading;

export const isRegisterAccountSuccessfullSelector = (state: AppState) =>
    rootSelector(state).isRegisterSuccessfull;

export const registerAccountErrorSelector = (state: AppState) =>
    rootSelector(state).registerError;
