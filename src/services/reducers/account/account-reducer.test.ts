import { accountReducer } from './slice';
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

    test('should return the initial state', () => {
        expect(accountReducer(undefined, { type: 'unknown' })).toEqual(
            initialState,
        );
    });
});
