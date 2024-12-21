import { Ingredient, IngredientWithCounter } from '../../types/types';

export type BurgerConstructorProps = {
    // FIXME убрать undefined после проработки запроса за данными
    ingredients: Map<string, Array<IngredientWithCounter>> | undefined;
    chosenIngredientsIdList: Array<string>;
    chosenBunsId: string;
};

export type ChosenIngredients = {
    bun: Ingredient | null;
    ingredients: Ingredient[];
};
