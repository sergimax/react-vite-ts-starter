import { IngredientWithCounter } from '../burger-ingredients/types';

export type IngredientCardProps = {
    data: IngredientWithCounter;
    onClick?: () => void;
};
