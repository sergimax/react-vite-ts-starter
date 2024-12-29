import {
    DataForModal,
    Ingredient,
    IngredientTypeName,
} from '../../types/types';

export type IngredientCategory = {
    value: string;
    title: string;
    typeName: IngredientTypeName;
};

export type BurgerIngredientsProps = {
    ingredients: Array<Ingredient>;
    onIngredientClick: (data: DataForModal) => void;
};
