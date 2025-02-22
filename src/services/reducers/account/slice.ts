import { createSlice } from '@reduxjs/toolkit';
import { ACCOUNT_STATE_NAME } from './constants';
import { AccountState } from './types';
import { askResetPassword } from './thunks';

const initialState: AccountState = {
    email: '',
    name: '',
    password: '',
    askResetError: undefined,
    isAskResetLoaded: false,
    isAskResetLoading: false,
    isAskResetSuccessfull: false,
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
    },
});

export const { resetAccountState } = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
