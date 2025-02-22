import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { pagesReducer } from './pages/slice';

export const modelReducers = combineReducers({
    ingredients: ingredientsReducer,
    pages: pagesReducer,
});

export const rootReducer = {
    model: modelReducers,
};
