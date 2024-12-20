import { BurgerIngredientsCategoryProps } from './types';
import styles from './style.module.css';
import { Ingredient } from '../ingredient';

export const BurgerIngredientsCategory = ({
    title,
    category,
}: BurgerIngredientsCategoryProps) => {
    const categoryTitleClass: string = `text_type_main-medium pt-10 ${styles.title}`;

    return (
        <>
            <h2 className={categoryTitleClass}>{title}</h2>
            <div>
                {category.map((element, index) => {
                    return <Ingredient data={element} key={index}/>
                })}
            </div>
        </>
    );
};
