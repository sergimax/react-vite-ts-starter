import { IngredientWithCounter } from '../burger-ingredients/types';

export type BurgerConstructorProps = {
    // FIXME убрать undefined после проработки запроса за данными
    ingredients: Map<string, Array<IngredientWithCounter>> | undefined;
    chosenIngredientsIdList: Array<string>;
    chosenBunsId: string;
};
