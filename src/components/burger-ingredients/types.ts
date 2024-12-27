import {
    Ingredient,
    IngredientTypeName,
    ModalContent,
} from '../../types/types';

export type IngredientCategory = {
    value: string;
    title: string;
    typeName: IngredientTypeName;
};

export type BurgerIngredientsProps = {
    ingredients: Array<Ingredient>;
    onIngredientClick: (content: ModalContent) => void;
};
