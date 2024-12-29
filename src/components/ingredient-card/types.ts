import { DataForModal, IngredientWithCounter } from '../../types/types';

export type IngredientCardProps = {
    data: IngredientWithCounter;
    onIngredientClick: (data: DataForModal) => void;
};
