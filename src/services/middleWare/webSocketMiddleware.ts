import { Middleware } from 'redux';
import {
    wsStartConnecting,
    wsConnectionEstablished,
    wsReceiveMessage,
    wsDisconnect,
    wsErrorOccurred,
    wsSendMessage,
} from '../reducers/websocket';

export const webSocketMiddleware = (): Middleware => {
    return store => {
        let socket: WebSocket | null = null;

        return next => action => {
            const { dispatch } = store;

            if (wsStartConnecting.match(action)) {
                socket = new WebSocket(action.payload as unknown as string);

                socket.onopen = event => {
                    console.log('onopen', event);
                    dispatch(wsConnectionEstablished());
                };

                socket.onclose = () => {
                    dispatch(wsDisconnect());
                };

                socket.onerror = () => {
                    dispatch(wsErrorOccurred('error'));
                };

                socket.onmessage = event => {
                    const data = JSON.parse(event.data);
                    dispatch(wsReceiveMessage(data));
                };
            }

            if (wsDisconnect.match(action)) {
                if (socket) {
                    socket.close();
                    socket = null;
                }
            }

            if (wsSendMessage.match(action)) {
                if (socket) {
                    socket.send(JSON.stringify(action.payload));
                }
            }

            next(action);
        };
    };
};
