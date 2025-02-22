import { createSlice } from '@reduxjs/toolkit';
import { ACCOUNT_STATE_NAME } from './constants';
import { AccountState } from './types';
import {
    askResetPassword,
    executeResetPassword,
    registerAccount,
} from './thunks';

const initialState: AccountState = {
    email: '',
    name: '',
    password: '',
    askResetError: undefined,
    isAskResetLoaded: false,
    isAskResetLoading: false,
    isAskResetSuccessfull: false,
    executeResetError: undefined,
    isExecuteResetLoaded: false,
    isExecuteResetLoading: false,
    isExecuteResetSuccessfull: false,

    registerError: undefined,
    isRegisterLoaded: false,
    isRegisterLoading: false,
    isRegisterSuccessfull: false,
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

                state.isRegisterSuccessfull = action.payload.success;
            })
            .addCase(registerAccount.rejected, (state, action) => {
                state.registerError = action.payload as string;
            });
    },
});

export const { resetAccountState } = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
