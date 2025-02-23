import { createSlice } from '@reduxjs/toolkit';
import { ACCOUNT_STATE_NAME } from './constants';
import { AccountState } from './types';
import {
    askResetPassword,
    executeResetPassword,
    loginAccount,
    registerAccount,
} from './thunks';

const initialState: AccountState = {
    email: '',
    name: '',
    password: '',
    isAuthorized: false,

    askResetError: undefined,
    isAskResetLoaded: false,
    isAskResetLoading: false,
    isAskResetSuccessfull: false,

    executeResetError: undefined,
    isExecuteResetLoaded: false,
    isExecuteResetLoading: false,
    isExecuteResetSuccessfull: false,

    registerError: {
        message: undefined,
        status: undefined,
    },
    isRegisterLoaded: false,
    isRegisterLoading: false,
    isRegisterSuccessfull: false,

    loginError: {
        message: undefined,
        status: undefined,
    },
    isLoginLoaded: false,
    isLoginLoading: false,
    isLoginSuccessfull: false,
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

                state.isAskResetSuccessfull = action.payload.success;
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

                state.isExecuteResetSuccessfull = action.payload.success;
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

                state.isRegisterSuccessfull = action.payload.success;
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
                state.password = action.payload.user.password || "";
                state.isAuthorized = true;
                state.isLoginSuccessfull = action.payload.success;
            })
            .addCase(loginAccount.rejected, (state, action) => {
                const error = action.payload;

                state.loginError.status = error!.status;
                state.loginError.message = error!.message;
            });
    },
});

export const { resetAccountState } = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
