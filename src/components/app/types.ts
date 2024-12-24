import { Ingredient } from '../../types/types';

export type GetIngredientsDTO = {
    success: boolean;
    data: Array<Ingredient>;
}
