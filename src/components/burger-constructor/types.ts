import { ChosenIngredients, DataForModal } from '../../types/types';

export type BurgerConstructorProps = {
    chosenIngredients: ChosenIngredients;
    onFormAnOrderClick: (data: DataForModal) => void;
};
