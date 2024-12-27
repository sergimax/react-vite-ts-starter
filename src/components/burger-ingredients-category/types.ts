import { Ingredient } from "../../types/types";

export type BurgerIngredientsCategoryProps = {
    title: string;
    category: Array<Ingredient>;
    onIngredientClick: () => void;
};
