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
