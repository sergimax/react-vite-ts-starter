import { ChosenIngredients, Ingredient, IngredientWithCounter } from '../../../types/types';
import { AppState } from '../../store';

export type FetchIngredientsAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};

export type PostOrderAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};

export type IngredientsState = {
    // список всех полученных ингредиентов,
    ingredients: Array<IngredientWithCounter>;
    // список всех ингредиентов в текущем конструкторе бургера,
    constructorContent: ChosenIngredients;
    // объект текущего просматриваемого ингредиента,
    ingredientInfo?: Ingredient;
    // объект созданного заказа.
    order?: number;

    // Завершена ли загрузка
    isLoaded: boolean;
    // Производится ли загрузка
    isLoading: boolean
    error?: string;
};
