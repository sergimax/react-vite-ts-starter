import {
    DataForModal,
    IngredientTypeName,
} from '../../types/types';

export type IngredientCategory = {
    value: string;
    title: string;
    typeName: IngredientTypeName;
};

export type BurgerIngredientsProps = {
    onIngredientClick: (data: DataForModal) => void;
};
