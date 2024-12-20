import { IngredientCategory, IngredientTypeName } from "./types";

export const ingredientCategories: Array<IngredientCategory> = [
    {
        value: 'Булки',
        title: 'Булки',
        typeName: IngredientTypeName.BUN,
    },
    {
        value: 'Соусы',
        title: 'Соусы',
        typeName: IngredientTypeName.SAUCE,
    },
    {
        value: 'Начинки',
        title: 'Начинки',
        typeName: IngredientTypeName.MAIN,
    },
];
