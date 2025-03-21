import { accountReducer, resetAccountState, setAccountEmail } from './slice';
import {
    askResetPassword,
    executeResetPassword,
    getAccountInformation,
    loginAccount,
    logoutAccount,
    registerAccount,
    updateAccountInformation,
} from './thunks';
import { AccountState } from './types';

describe('accountReducer', () => {
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

    it('should return the initial state', () => {
        expect(accountReducer(undefined, { type: 'unknown' })).toEqual(
            initialState,
        );
    });

    it('should handle resetAccountState', () => {
        const state: AccountState = {
            ...initialState,
            email: 'test@example.com',
            isAuthorized: true,
        };

        expect(accountReducer(state, resetAccountState())).toEqual(
            initialState,
        );
    });

    it('should handle setAccountEmail', () => {
        const email = 'test@example.com';
        const action = setAccountEmail({ email });

        expect(accountReducer(initialState, action)).toEqual({
            ...initialState,
            email,
        });
    });
    it('should handle askResetPassword.pending', () => {
        const action = { type: askResetPassword.pending.type };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            isAskResetLoading: true,
        });
    });

    it('should handle askResetPassword.fulfilled', () => {
        const payload = { success: true };
        const action = { type: askResetPassword.fulfilled.type, payload };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            isAskResetLoading: false,
            isAskResetLoaded: true,
            isAskResetSuccessful: true,
        });
    });

    it('should handle askResetPassword.rejected', () => {
        const error = 'Error message';
        const action = { type: askResetPassword.rejected.type, payload: error };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            askResetError: error,
        });
    });

    it('should handle executeResetPassword.pending', () => {
        const action = { type: executeResetPassword.pending.type };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            isExecuteResetLoading: true,
        });
    });

    it('should handle executeResetPassword.fulfilled', () => {
        const payload = { success: true };
        const action = { type: executeResetPassword.fulfilled.type, payload };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            isExecuteResetLoading: false,
            isExecuteResetLoaded: true,
            isExecuteResetSuccessful: true,
        });
    });

    it('should handle executeResetPassword.rejected', () => {
        const error = 'Error message';
        const action = {
            type: executeResetPassword.rejected.type,
            payload: error,
        };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            executeResetError: error,
        });
    });

    it('should handle registerAccount.pending', () => {
        const action = { type: registerAccount.pending.type };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            isRegisterLoading: true,
        });
    });

    it('should handle registerAccount.fulfilled', () => {
        const payload = { success: true };
        const action = { type: registerAccount.fulfilled.type, payload };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            isRegisterLoading: false,
            isRegisterLoaded: true,
            isRegisterSuccessful: true,
        });
    });

    it('should handle registerAccount.rejected', () => {
        const error = 'Error message';
        const action = { type: registerAccount.rejected.type, payload: error };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
        });
    });

    it('should handle loginAccount.pending', () => {
        const action = { type: loginAccount.pending.type };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            isLoginLoading: true,
        });
    });

    it('should handle loginAccount.fulfilled', () => {
        const payload = {
            success: true,
            user: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            },
        };
        const action = { type: loginAccount.fulfilled.type, payload };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            isLoginLoading: false,
            isLoginLoaded: true,
            isLoginSuccessful: true,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            isAuthorized: true,
        });
    });

    it('should handle loginAccount.rejected', () => {
        const error = 'Error message';
        const action = { type: loginAccount.rejected.type, payload: error };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
        });
    });

    it('should handle logoutAccount.fulfilled', () => {
        const payload = { success: true };
        const action = { type: logoutAccount.fulfilled.type, payload };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            isLogoutSuccessful: true,
            isAuthorized: false,
            name: '',
            email: '',
            password: '',
        });
    });

    it('should handle logoutAccount.rejected', () => {
        const error = 'Error message';
        const action = { type: logoutAccount.rejected.type, payload: error };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
        });
    });

    it('should handle getAccountInformation.pending', () => {
        const action = { type: getAccountInformation.pending.type };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            isAccountInformationLoading: true,
        });
    });

    it('should handle getAccountInformation.fulfilled', () => {
        const payload = {
            success: true,
            user: {
                name: 'John Doe',
                email: 'john@example.com',
            },
        };
        const action = { type: getAccountInformation.fulfilled.type, payload };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            isAccountInformationLoading: false,
            isAccountInformationLoaded: true,
            isAccountInformationSuccessful: true,
            name: 'John Doe',
            email: 'john@example.com',
            isAuthorized: true,
        });
    });

    it('should handle getAccountInformation.rejected', () => {
        const error = 'Error message';
        const action = {
            type: getAccountInformation.rejected.type,
            payload: error,
        };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
        });
    });

    it('should handle updateAccountInformation.pending', () => {
        const action = { type: updateAccountInformation.pending.type };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            isAccountInformationLoading: true,
        });
    });

    it('should handle updateAccountInformation.fulfilled', () => {
        const payload = {
            success: true,
            user: {
                name: 'John Doe',
                email: 'john@example.com',
            },
        };
        const action = {
            type: updateAccountInformation.fulfilled.type,
            payload,
        };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            isAccountInformationLoading: false,
            isAccountInformationLoaded: true,
            isAccountInformationUpdateSuccessful: true,
            name: 'John Doe',
            email: 'john@example.com',
            isAuthorized: true,
        });
    });

    it('should handle updateAccountInformation.rejected', () => {
        const error = 'Error message';
        const action = {
            type: updateAccountInformation.rejected.type,
            payload: error,
        };
        const state = accountReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
        });
    });
});
