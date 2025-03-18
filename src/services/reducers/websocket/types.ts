import { OrdersDataWSResponse } from "../../../types/types";

export type WebSocketState = {
    isConnected: boolean;
    message: OrdersDataWSResponse | undefined;
    error: string | null;
};
