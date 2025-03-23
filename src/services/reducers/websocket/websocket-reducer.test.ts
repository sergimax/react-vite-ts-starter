import { ORDER_STATUS, OrdersDataWSResponse } from '../../../types/types';
import {
    websocketReducer,
    wsConnectionEstablished,
    wsDisconnect,
    wsErrorOccurred,
    wsReceiveMessage,
    wsResetState,
    wsSendMessage,
    wsStartConnecting,
} from './slice';
import { WebSocketState } from './types';

describe('websocket slice', () => {
    const initialState: WebSocketState = {
        isConnected: false,
        message: undefined,
        error: null,
    };

    it('should return the initial state', () => {
        expect(websocketReducer(undefined, { type: 'unknown' })).toEqual(
            initialState,
        );
    });

    it('should handle wsResetState', () => {
        const previousState: WebSocketState = {
            isConnected: true,
            message: {
                success: true,
                orders: [],
                total: 0,
                totalToday: 0,
            },
            error: 'Some error',
        };

        expect(websocketReducer(previousState, wsResetState())).toEqual(
            initialState,
        );
    });

    it('should handle wsStartConnecting', () => {
        const previousState: WebSocketState = {
            isConnected: true,
            message: undefined,
            error: 'Some error',
        };

        const newState = websocketReducer(previousState, wsStartConnecting({}));

        expect(newState.isConnected).toBe(false);
        expect(newState.error).toBe(null);
    });

    it('should handle wsConnectionEstablished', () => {
        const previousState: WebSocketState = {
            isConnected: false,
            message: undefined,
            error: null,
        };

        const newState = websocketReducer(
            previousState,
            wsConnectionEstablished(),
        );

        expect(newState.isConnected).toBe(true);
    });

    it('should handle wsReceiveMessage', () => {
        const previousState: WebSocketState = {
            isConnected: true,
            message: undefined,
            error: null,
        };

        const mockMessage: OrdersDataWSResponse = {
            success: true,
            orders: [
                {
                    _id: '1',
                    ingredients: ['ingredient1', 'ingredient2'],
                    status: ORDER_STATUS.DONE,
                    name: 'Order 1',
                    createdAt: '2023-10-01T00:00:00Z',
                    updatedAt: '2023-10-01T00:00:00Z',
                    number: 1,
                },
            ],
            total: 1,
            totalToday: 1,
        };

        const newState = websocketReducer(
            previousState,
            wsReceiveMessage(mockMessage),
        );

        expect(newState.message).toEqual(mockMessage);
    });

    it('should handle wsDisconnect', () => {
        const previousState: WebSocketState = {
            isConnected: true,
            message: undefined,
            error: null,
        };

        const newState = websocketReducer(previousState, wsDisconnect());

        expect(newState.isConnected).toBe(false);
    });

    it('should handle wsErrorOccurred', () => {
        const previousState: WebSocketState = {
            isConnected: true,
            message: undefined,
            error: null,
        };

        const errorMessage = 'Connection error';
        const newState = websocketReducer(
            previousState,
            wsErrorOccurred(errorMessage),
        );

        expect(newState.error).toBe(errorMessage);
    });

    it('should handle wsSendMessage (no state change)', () => {
        const previousState: WebSocketState = {
            isConnected: true,
            message: undefined,
            error: null,
        };

        const newState = websocketReducer(previousState, wsSendMessage());

        expect(newState).toEqual(previousState);
    });
});
