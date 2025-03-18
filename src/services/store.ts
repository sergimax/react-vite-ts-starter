import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/reducers';
import { webSocketMiddleware } from './middleWare/webSocketMiddleware';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware().concat(webSocketMiddleware())
    }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
