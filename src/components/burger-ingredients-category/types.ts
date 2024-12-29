import { RefObject } from 'react';
import { Ingredient, ModalContent } from '../../types/types';

export type BurgerIngredientsCategoryProps = {
    title: string;
    category: Array<Ingredient>;
    onIngredientClick: (content: ModalContent) => void;
    innerRef: RefObject<HTMLDivElement>;
};
