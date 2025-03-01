import { AppState } from '../../store';

const rootSelector = (state: AppState) => state.model.account;

export const emailSelector = (state: AppState) => rootSelector(state).email;

export const nameSelector = (state: AppState) => rootSelector(state).name;

export const passwordSelector = (state: AppState) =>
    rootSelector(state).password;

export const isAccountInformationUpdateSuccessfulSelector = (state: AppState) =>
    rootSelector(state).isAccountInformationUpdateSuccessful;

export const isAuthorizedSelector = (state: AppState) =>
    rootSelector(state).isAuthorized;

export const isAskResetPasswordLoadingSelector = (state: AppState) =>
    rootSelector(state).isAskResetLoading;

export const isAskResetPasswordLoadedSelector = (state: AppState) =>
    rootSelector(state).isAskResetLoaded;

export const isAskResetPasswordSuccessfulSelector = (state: AppState) =>
    rootSelector(state).isAskResetSuccessful;

export const isExecuteResetPasswordLoadingSelector = (state: AppState) =>
    rootSelector(state).isExecuteResetLoading;

export const isExecuteResetPasswordLoadedSelector = (state: AppState) =>
    rootSelector(state).isExecuteResetLoaded;

export const isExecuteResetPasswordSuccessfulSelector = (state: AppState) =>
    rootSelector(state).isExecuteResetSuccessful;

export const isRegisterAccountLoadingSelector = (state: AppState) =>
    rootSelector(state).isRegisterLoaded;

export const isRegisterAccountLoadedSelector = (state: AppState) =>
    rootSelector(state).isRegisterLoading;

export const isRegisterAccountSuccessfulSelector = (state: AppState) =>
    rootSelector(state).isRegisterSuccessful;

export const isLoginLoadingSelector = (state: AppState) =>
    rootSelector(state).isLoginLoaded;

export const isLoginLoadedSelector = (state: AppState) =>
    rootSelector(state).isLoginLoading;

export const isLoginSuccessfulSelector = (state: AppState) =>
    rootSelector(state).isLoginSuccessful;
