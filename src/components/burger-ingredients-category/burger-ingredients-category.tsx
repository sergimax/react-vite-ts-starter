import { BurgerIngredientsCategoryProps } from './types';

export const BurgerIngredientsCategory = ({
    title,
    children,
}: BurgerIngredientsCategoryProps) => {
    return (
        <>
            <h2>{title}</h2>
            {children}
        </>
    );
};
