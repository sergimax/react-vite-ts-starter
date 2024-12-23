import { IngredientWithCounter } from "../../types/types";

export type IngredientCardProps = {
    data: IngredientWithCounter;
    onClick?: () => void;
};
