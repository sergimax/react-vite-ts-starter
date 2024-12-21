export enum IngredientTypeName {
    BUN = 'bun',
    MAIN = 'main',
    SAUCE = 'sauce',
}

export type IngredientCategory = {
    value: string;
    title: string;
    typeName: IngredientTypeName;
};

export type Ingredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export type IngredientWithCounter = Ingredient & {
    quantity?: number;
};

export type BurgerIngredientsProps = {
    // FIXME убрать undefined после проработки запроса за данными
    ingredients: Map<string, Array<IngredientWithCounter>> | undefined;
};
