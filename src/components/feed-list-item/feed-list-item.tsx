export type FeedListItemProps = {
    item: {
        name: string;
        time: string;
        number: string;
        ingredients: {
            bunId: string;
            ingredientsIds: Array<string>;
        };
        price: number;
    };
};

export const FeedListItem = ({ item }: FeedListItemProps) => {
    return (
        <div>
            {item.number} {item.time} {item.name} {item.ingredients.bunId}{' '}
            {item.ingredients.ingredientsIds}
            {item.price}
        </div>
    );
};
