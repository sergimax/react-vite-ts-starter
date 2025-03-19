import { DataForModal, OrderDataFromWS } from "../../types/types";

export type FeedListProps = {
    orders: Array<OrderDataFromWS>;
    onItemClick: (data: DataForModal) => void;
    title?: string;
};
