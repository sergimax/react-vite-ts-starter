import { BurgerIngredientsCategoryProps } from './types';
import styles from './style.module.css';

export const BurgerIngredientsCategory = ({
    title,
    category,
}: BurgerIngredientsCategoryProps) => {
    const categoryTitleClass: string = `text_type_main-medium ${styles.title}`;
    const categoryContentClass: string = `pb-10 pl-4 pr-4 pt-6 ${styles.content}`;

    return (
        <>
            <h2 className={categoryTitleClass}>{title}</h2>
            <div className={categoryContentClass}>
                {category.map((element, index) => {
                    return <>{element.name}</>
                })}
            </div>
        </>
    );
};
