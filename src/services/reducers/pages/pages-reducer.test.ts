import { ROUTE_PATH } from '../../../components/app/constants';
import { pagesReducer, resetPagesState, setActivePage } from './slice';
import { PagesState } from './types';

describe('pages reducer', () => {
    const initialState: PagesState = {
        active: ROUTE_PATH.DEFAULT,
    };
    it('should return the initial state', () => {
        expect(pagesReducer(undefined, { type: 'unknown' })).toEqual(
            initialState,
        );
    });

    it('should handle resetPagesState', () => {
        const previousState: PagesState = {
            active: ROUTE_PATH.PROFILE,
        };

        expect(pagesReducer(previousState, resetPagesState())).toEqual(
            initialState,
        );
    });

    it('should handle setActivePage', () => {
        const previousState: PagesState = {
            active: ROUTE_PATH.DEFAULT,
        };

        const newState = pagesReducer(
            previousState,
            setActivePage({ value: ROUTE_PATH.PROFILE }),
        );

        expect(newState.active).toEqual(ROUTE_PATH.PROFILE);
    });

    it('should handle setActivePage with another route', () => {
        const previousState: PagesState = {
            active: ROUTE_PATH.DEFAULT,
        };

        const newState = pagesReducer(
            previousState,
            setActivePage({ value: ROUTE_PATH.LOGIN }),
        );

        expect(newState.active).toEqual(ROUTE_PATH.LOGIN);
    });
});
