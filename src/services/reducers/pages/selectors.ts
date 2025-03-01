import { AppState } from '../../store';

const rootSelector = (state: AppState) => state.model.pages;

export const activePageSelector = (state: AppState) =>
    rootSelector(state).active;
