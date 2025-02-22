import { createSlice } from '@reduxjs/toolkit';
import { ACCOUNT_STATE_NAME } from './constants';
import { AccountState } from './types';
import { resetPassword } from './thunks';

const initialState: AccountState = {
    email: '',
    name: '',
    password: '',
    error: undefined,
    isLoaded: false,
    isLoading: false,
    isResetSuccessfull: false,
};

const accountSlice = createSlice({
    name: ACCOUNT_STATE_NAME,
    initialState,
    reducers: {
        resetAccountState: () => initialState,
    },
    extraReducers(builder) {
        builder
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;

                state.isResetSuccessfull = action.payload.success;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { resetAccountState } = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
