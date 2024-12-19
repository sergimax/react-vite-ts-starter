import { AppContentBlock } from '../app-content-block';
import { BurgerConstructor } from '../burger-constructor';
import { BurgerIngredients } from '../burger-ingredients';
import styles from './style.module.css';

export const AppContent = () => {
    const ActiveBlocks = [
        {
            content: <BurgerConstructor />,
            title: 'Соберите бургер',
        },
        {
            content: <BurgerIngredients />,
        },
    ];

    return (
        <main className={styles.main}>
            {ActiveBlocks.map((block) => {
                return (
                    <AppContentBlock
                        content={block.content}
                        title={block.title}
                    />
                );
            })}
        </main>
    );
};
