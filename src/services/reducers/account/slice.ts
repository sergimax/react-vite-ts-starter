import { createSlice } from '@reduxjs/toolkit';
import { ACCOUNT_STATE_NAME } from './constants';
import { AccountState } from './types';
import { passwordReset } from './thunks';

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
            .addCase(passwordReset.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(passwordReset.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;

                state.isResetSuccessfull = action.payload.success;
            })
            .addCase(passwordReset.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { resetAccountState } = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
