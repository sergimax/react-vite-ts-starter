import { DataForModal } from "../../types/types";

// TODO заменить на описание ответа от сервера
export type FeedListItemContent = {
    name: string;
    status?: FeedListItemStatus;
    time: string;
    number: string;
    ingredients: {
        bunId: string;
        ingredientsIds: Array<string>;
    };
    price: number;
};

export enum FeedListItemStatus {
    CREATED = 'Создан',
    PROCESSING = 'Готовится',
    COMPLETED = 'Выполнен',
}

export type FeedListProps = {
    data: Array<FeedListItemContent>;
    onItemClick: (data: DataForModal) => void;
    title?: string;
};
