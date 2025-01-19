import { Ingredient } from '../../types/types';

export type GetIngredientsDTO = {
    success: boolean;
    data: Array<Ingredient>;
};

export type PostOrderDTO = {
    success: boolean;
    name: string;
    order: {
        number: number;
    };
};
