import { Ingredient } from '../../types/types';

export type BurgerConstructorIngredientProps = {
    ingredient: Ingredient;
    handleClose: () => void;
    index: number;
};
