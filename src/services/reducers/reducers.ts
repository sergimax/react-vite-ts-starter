import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { pagesReducer } from './pages';
import { accountReducer } from './account';

export const modelReducers = combineReducers({
    ingredients: ingredientsReducer,
    pages: pagesReducer,
    account: accountReducer,
});

export const rootReducer = {
    model: modelReducers,
};
