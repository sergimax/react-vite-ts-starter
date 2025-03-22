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

    isRegisterLoaded: false,
    isRegisterLoading: false,
    isRegisterSuccessful: false,

    isLoginLoaded: false,
    isLoginLoading: false,
    isLoginSuccessful: false,

    isLogoutSuccessful: false,

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
        setAccountEmail: (state, action) => {
            const { email } = action.payload;

            state.email = email;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(askResetPassword.pending, state => {
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
            .addCase(executeResetPassword.pending, state => {
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
            .addCase(registerAccount.pending, state => {
                state.isRegisterLoading = true;
            })
            .addCase(registerAccount.fulfilled, (state, action) => {
                state.isRegisterLoading = false;
                state.isRegisterLoaded = true;

                state.isRegisterSuccessful = action.payload.success;
            })
            .addCase(registerAccount.rejected, (_state, action) => {
                const error = action.payload;

                console.error(error);
            });
        builder
            .addCase(loginAccount.pending, state => {
                state.isLoginLoading = true;
            })
            .addCase(loginAccount.fulfilled, (state, action) => {
                state.isLoginLoading = false;
                state.isLoginLoaded = true;

                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.password = action.payload.user.password || '';
                state.isAuthorized = true;
                state.isLoginSuccessful = action.payload.success;
            })
            .addCase(loginAccount.rejected, (_state, action) => {
                const error = action.payload;

                console.error(error);
            });
        builder
            .addCase(logoutAccount.fulfilled, (state, action) => {
                state.isLogoutSuccessful = action.payload.success;
                state.isAuthorized = false;
                state.name = '';
                state.email = '';
                state.password = '';
            })
            .addCase(logoutAccount.rejected, (_state, action) => {
                const error = action.payload;

                console.error(error);
            });
        builder
            .addCase(getAccountInformation.pending, state => {
                state.isAccountInformationLoading = true;
            })
            .addCase(getAccountInformation.fulfilled, (state, action) => {
                state.isAccountInformationLoading = false;
                state.isAccountInformationLoaded = true;

                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.isAuthorized = true;

                state.isAccountInformationSuccessful = action.payload.success;
            })
            .addCase(getAccountInformation.rejected, (_state, action) => {
                const error = action.payload;

                console.error(error);
            });
        builder
            .addCase(updateAccountInformation.pending, state => {
                state.isAccountInformationLoading = true;
            })
            .addCase(updateAccountInformation.fulfilled, (state, action) => {
                state.isAccountInformationLoading = false;
                state.isAccountInformationLoaded = true;

                state.name = action.payload.user.name;
                state.email = action.payload.user.email;
                state.isAuthorized = true;

                state.isAccountInformationUpdateSuccessful =
                    action.payload.success;
            })
            .addCase(updateAccountInformation.rejected, (_state, action) => {
                const error = action.payload;

                console.error(error);
            });
    },
});

export const { resetAccountState, setAccountEmail } = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
