import { createSlice } from '@reduxjs/toolkit';
import { ACCOUNT_STATE_NAME } from './constants';
import { AccountState } from './types';
import {
    askResetPassword,
    executeResetPassword,
    getAccountInformation,
    loginAccount,
    logoutAccount,
    registerAccount,
    updateAccountInformation,
} from './thunks';

const initialState: AccountState = {
    email: '',
    name: '',
    password: '',
    isAuthorized: false,

    askResetError: undefined,
    isAskResetLoaded: false,
    isAskResetLoading: false,
    isAskResetSuccessful: false,

    executeResetError: undefined,
    isExecuteResetLoaded: false,
    isExecuteResetLoading: false,
    isExecuteResetSuccessful: false,

    registerError: {
        message: undefined,
        status: undefined,
    },
    isRegisterLoaded: false,
    isRegisterLoading: false,
    isRegisterSuccessful: false,

    loginError: {
        message: undefined,
        status: undefined,
    },
    isLoginLoaded: false,
    isLoginLoading: false,
    isLoginSuccessful: false,

    logoutError: {
        message: undefined,
        status: undefined,
    },
    isLogoutSuccessful: false,

    accountInformationError: {
        message: undefined,
        status: undefined,
    },
    isAccountInformationLoaded: false,
    isAccountInformationLoading: false,
    isAccountInformationSuccessful: false,

    isAccountInformationUpdateSuccessful: false,
};

const accountSlice = createSlice({
    name: ACCOUNT_STATE_NAME,
    initialState,
    reducers: {
        resetAccountState: () => initialState,
    },
    extraReducers(builder) {
        builder
            .addCase(askResetPassword.pending, (state) => {
                state.isAskResetLoading = true;
            })
            .addCase(askResetPassword.fulfilled, (state, action) => {
                state.isAskResetLoading = false;
                state.isAskResetLoaded = true;

                state.isAskResetSuccessful = action.payload.success;
            })
            .addCase(askResetPassword.rejected, (state, action) => {
                state.askResetError = action.payload as string;
            });
        builder
            .addCase(executeResetPassword.pending, (state) => {
                state.isExecuteResetLoading = true;
            })
            .addCase(executeResetPassword.fulfilled, (state, action) => {
                state.isExecuteResetLoading = false;
                state.isExecuteResetLoaded = true;

                state.isExecuteResetSuccessful = action.payload.success;
            })
            .addCase(executeResetPassword.rejected, (state, action) => {
                state.executeResetError = action.payload as string;
            });
        builder
            .addCase(registerAccount.pending, (state) => {
                state.isRegisterLoading = true;
            })
            .addCase(registerAccount.fulfilled, (state, action) => {
                state.isRegisterLoading = false;
                state.isRegisterLoaded = true;
                console.log('registerAccount.fulfilled', action.payload);

                state.isRegisterSuccessful = action.payload.success;
            })
            .addCase(registerAccount.rejected, (state, action) => {
                const error = action.payload;

                state.registerError.status = error!.status;
                state.registerError.message = error!.message;
            });
        builder
            .addCase(loginAccount.pending, (state) => {
                state.isLoginLoading = true;
            })
            .addCase(loginAccount.fulfilled, (state, action) => {
                state.isLoginLoading = false;
                state.isLoginLoaded = true;
                console.log('loginAccount.fulfilled', action.payload);

                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.password = action.payload.user.password || '';
                state.isAuthorized = true;
                state.isLoginSuccessful = action.payload.success;
            })
            .addCase(loginAccount.rejected, (state, action) => {
                const error = action.payload;

                state.loginError.status = error!.status;
                state.loginError.message = error!.message;
            });
        builder
            .addCase(logoutAccount.fulfilled, (state, action) => {
                console.log('logoutAccount.fulfilled', action.payload);

                state.isLogoutSuccessful = action.payload.success;
                state.isAuthorized = false;
                state.name = '';
                state.email = '';
                state.password = '';
            })
            .addCase(logoutAccount.rejected, (state, action) => {
                const error = action.payload;

                state.logoutError.status = error!.status;
                state.logoutError.message = error!.message;
            });
        builder
            .addCase(getAccountInformation.pending, (state) => {
                state.isAccountInformationLoading = true;
            })
            .addCase(getAccountInformation.fulfilled, (state, action) => {
                state.isAccountInformationLoading = false;
                state.isAccountInformationLoaded = true;
                console.log('getAccountInformation.fulfilled', action.payload);

                state.name = action.payload.user.name;
                state.email = action.payload.user.email;

                state.isAccountInformationSuccessful = action.payload.success;
            })
            .addCase(getAccountInformation.rejected, (state, action) => {
                const error = action.payload;

                state.accountInformationError.status = error!.status;
                state.accountInformationError.message = error!.message;
            });
        builder
            .addCase(updateAccountInformation.pending, (state) => {
                state.isAccountInformationLoading = true;
            })
            .addCase(updateAccountInformation.fulfilled, (state, action) => {
                state.isAccountInformationLoading = false;
                state.isAccountInformationLoaded = true;
                console.log(
                    'updateAccountInformation.fulfilled',
                    action.payload
                );

                state.name = action.payload.user.name;
                state.email = action.payload.user.email;

                state.isAccountInformationUpdateSuccessful =
                    action.payload.success;
            })
            .addCase(updateAccountInformation.rejected, (state, action) => {
                const error = action.payload;

                state.accountInformationError.status = error!.status;
                state.accountInformationError.message = error!.message;
            });
    },
});

export const { resetAccountState } = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
