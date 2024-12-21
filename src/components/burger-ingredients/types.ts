import { Ingredient } from "../../types/types";

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

export type IngredientWithCounter = Ingredient & {
    quantity?: number;
};

export type BurgerIngredientsProps = {
    // FIXME убрать undefined после проработки запроса за данными
    ingredients: Map<string, Array<IngredientWithCounter>> | undefined;
};
