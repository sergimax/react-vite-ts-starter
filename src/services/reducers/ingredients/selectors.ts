import { AppState } from '../../store';

const rootSelector = (state: AppState) => state.model.ingredients;

export const ingredientsIsLoadedSelector = (state: AppState) =>
    rootSelector(state).isLoaded;

export const ingredientsIsLoadingSelector = (state: AppState) =>
    rootSelector(state).isLoading;

export const ingredientsErrorSelector = (state: AppState) =>
    rootSelector(state).error;

export const ingredientsListSelector = (state: AppState) =>
    rootSelector(state).ingredients;

export const ingredientsConstructorContentSelector = (state: AppState) =>
    rootSelector(state).constructorContent;

export const ingredientsOrderSelector = (state: AppState) =>
    rootSelector(state).constructorContent;

export const ingredientsInfoSelector = (state: AppState) =>
    rootSelector(state).ingredientInfo;
