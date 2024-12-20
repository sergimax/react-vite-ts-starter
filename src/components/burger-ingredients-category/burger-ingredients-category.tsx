import { BurgerIngredientsCategoryProps } from './types';

export const BurgerIngredientsCategory = ({
    title,
    category,
}: BurgerIngredientsCategoryProps) => {
    return (
        <>
            <h2 className="category-title text_type_main-medium">{title}</h2>
            {/* {category} */}
        </>
    );
};
