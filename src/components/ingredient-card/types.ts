import { IngredientWithCounter } from "../../types/types";

export type IngredientCardProps = {
    data: IngredientWithCounter;
    onIngredientClick: (ingredientId: string) => void;
};
