import { BurgerIngredientsCategoryProps } from './types';
import styles from './style.module.css';

export const BurgerIngredientsCategory = ({
    title,
    category,
}: BurgerIngredientsCategoryProps) => {
    const categoryTitleClass: string = `text_type_main-medium ${styles.title}`;

    return (
        <>
            <h2 className={categoryTitleClass}>{title}</h2>
            <div className={styles.content}>
                {category.map((element, index) => {
                    return <>{element.name}</>
                })}
            </div>
        </>
    );
};
