import { OrdersDataWSResponse } from '../../../types/types';
import { AppState } from '../../store';

const rootSelector = (state: AppState) => state.model.webSocket;

export const wsMessagesSelector = (state: AppState): OrdersDataWSResponse | undefined =>
    rootSelector(state).message;
