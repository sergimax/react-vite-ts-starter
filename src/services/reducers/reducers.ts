import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';

export const modelReducers = combineReducers({
    ingredients: ingredientsReducer,
});

export const rootReducer = {
    model: modelReducers,
};
