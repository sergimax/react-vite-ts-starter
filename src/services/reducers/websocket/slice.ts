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
            state.isConnected = false;
            state.error = null;
        },
        wsConnectionEstablished: state => {
            state.isConnected = true;
        },
        wsReceiveMessage: (state, action) => {
            state.message = action.payload;
        },
        wsDisconnect: state => {
            state.isConnected = false;
        },
        wsErrorOccurred: (state, action) => {
            state.error = action.payload;
        },
        wsSendMessage: () => {},
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
