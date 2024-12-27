import { ChosenIngredients, ModalContent } from '../../types/types';

export type BurgerConstructorProps = {
    chosenIngredients: ChosenIngredients;
    onFormAnOrderClick: (content: ModalContent) => void;
};
