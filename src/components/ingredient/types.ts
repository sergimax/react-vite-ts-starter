import { IngredientWithCounter } from '../burger-ingredients/types';

export type IngredientProps = {
    data: IngredientWithCounter;
    onClick?: () => void;
};
