import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { pagesReducer } from './pages';
import { accountReducer } from './account';
import { websocketReducer } from './websocket';

export const modelReducers = combineReducers({
    ingredients: ingredientsReducer,
    pages: pagesReducer,
    account: accountReducer,
    webSocket: websocketReducer,
});

export const rootReducer = {
    model: modelReducers,
};
