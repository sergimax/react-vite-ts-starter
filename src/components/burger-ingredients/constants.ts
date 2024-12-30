import {
    IngredientCategoryTypeLocalName,
    IngredientTypeName,
} from '../../types/types';
import { IngredientCategory } from './types';

export const ingredientCategories: Array<IngredientCategory> = [
    {
        value: IngredientCategoryTypeLocalName.BUN,
        title: IngredientCategoryTypeLocalName.BUN,
        typeName: IngredientTypeName.BUN,
    },
    {
        value: IngredientCategoryTypeLocalName.SAUCE,
        title: IngredientCategoryTypeLocalName.SAUCE,
        typeName: IngredientTypeName.SAUCE,
    },
    {
        value: IngredientCategoryTypeLocalName.MAIN,
        title: IngredientCategoryTypeLocalName.MAIN,
        typeName: IngredientTypeName.MAIN,
    },
];
