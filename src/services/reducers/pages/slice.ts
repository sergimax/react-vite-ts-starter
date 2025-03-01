import { createSlice } from '@reduxjs/toolkit';
import { PAGES_STATE_NAME } from './constants';
import { ROUTE_PATH } from '../../../components/app/constants';
import { PagesState } from './types';

const initialState: PagesState = {
    active: ROUTE_PATH.DEFAULT,
};

const pagesSlice = createSlice({
    name: PAGES_STATE_NAME,
    initialState,
    reducers: {
        resetPagesState: () => initialState,
        setActivePage: (state, action) => {
            const { value }: { value: ROUTE_PATH } = action.payload;

            state.active = value;
        },
    },
});

export const { resetPagesState, setActivePage } = pagesSlice.actions;

export const pagesReducer = pagesSlice.reducer;
