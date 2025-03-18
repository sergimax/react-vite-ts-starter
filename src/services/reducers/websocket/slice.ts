import { createSlice } from '@reduxjs/toolkit';
import { WebSocketState } from './types';
import { WEBSOCKET_STATE_NAME } from './constants';

const initialState: WebSocketState = {
    isConnected: false,
    message: undefined,
    error: null,
};

const websocketSlice = createSlice({
    name: WEBSOCKET_STATE_NAME,
    initialState,
    reducers: {
        wsResetState: () => initialState,
        wsStartConnecting: (state, action) => {
            console.log('startConnecting to ', action.payload);

            state.isConnected = false;
            state.error = null;
        },
        wsConnectionEstablished: state => {
            console.log('connectionEstablished');
            state.isConnected = true;
        },
        wsReceiveMessage: (state, action) => {
            console.log('receiveMessage');

            state.message = action.payload;
        },
        wsDisconnect: state => {
            console.log('disconnect');
            state.isConnected = false;
        },
        wsErrorOccurred: (state, action) => {
            console.log('errorOccurred');
            console.log('action.payload', action.payload);

            state.error = action.payload;
        },
        wsSendMessage: (state, action) => {
            console.log('sendMessage');
            console.log(state);
            console.log(action);

            // Отправка сообщения через middleware
        },
    },
});

export const {
    wsResetState,
    wsStartConnecting,
    wsConnectionEstablished,
    wsReceiveMessage,
    wsDisconnect,
    wsErrorOccurred,
    wsSendMessage,
} = websocketSlice.actions;
export const websocketReducer = websocketSlice.reducer;
