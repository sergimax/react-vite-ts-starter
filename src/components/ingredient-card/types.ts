import { IngredientWithCounter, ModalContent } from '../../types/types';

export type IngredientCardProps = {
    data: IngredientWithCounter;
    onIngredientClick: (modalData: ModalContent) => void;
};
