import { IngredientCard } from '../ingredient-card';
import { BurgerIngredientsCategoryProps } from './types';
import styles from './style.module.css';

export const BurgerIngredientsCategory = ({
    title,
    category,
    onIngredientClick,
    innerRef,
}: BurgerIngredientsCategoryProps) => {
    const categoryTitleClass: string = `text_type_main-medium pt-10 ${styles.title}`;

    return (
        <>
            <h2 className={categoryTitleClass} ref={innerRef}>
                {title}
            </h2>
            <div>
                {category.map((element, index) => {
                    return (
                        <IngredientCard
                            data={element}
                            key={index}
                            onIngredientClick={onIngredientClick}
                        />
                    );
                })}
            </div>
        </>
    );
};
