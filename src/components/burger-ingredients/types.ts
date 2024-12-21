import { IngredientTypeName, IngredientWithCounter } from '../../types/types';

export type IngredientCategory = {
    value: string;
    title: string;
    typeName: IngredientTypeName;
};

export type BurgerIngredientsProps = {
    // FIXME убрать undefined после проработки запроса за данными
    ingredients: Map<string, Array<IngredientWithCounter>> | undefined;
};
