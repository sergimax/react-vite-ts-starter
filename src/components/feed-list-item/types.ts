import { DataForModal, OrderDataFromWS } from "../../types/types";

export type FeedListItemProps = {
    item: OrderDataFromWS;
    onItemClick: (data: DataForModal) => void;
};
