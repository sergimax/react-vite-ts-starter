import { DataForModal, OrderDataFromWS } from "../../types/types";

export enum FeedListItemTextStatus {
    CREATED = 'Создан',
    PROCESSING = 'Готовится',
    COMPLETED = 'Выполнен',
}

export type FeedListProps = {
    orders: Array<OrderDataFromWS>;
    onItemClick: (data: DataForModal) => void;
    title?: string;
};
