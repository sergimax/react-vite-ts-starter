import { RefObject } from 'react';
import { DataForModal, Ingredient } from '../../types/types';

export type BurgerIngredientsCategoryProps = {
    title: string;
    category: Array<Ingredient>;
    onIngredientClick: (data: DataForModal) => void;
    innerRef: RefObject<HTMLDivElement>;
};
