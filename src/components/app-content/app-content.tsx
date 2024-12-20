import { AppContentBlock } from '../app-content-block';
import { BurgerConstructor } from '../burger-constructor';
import { BurgerIngredients } from '../burger-ingredients';
import styles from './style.module.css';

export const AppContent = () => {
    const ActiveBlocks = [
        {
            content: <BurgerIngredients />,
            title: 'Соберите бургер',
        },
        {
            content: <BurgerConstructor />,
        },
    ];

    return (
        <main className={styles.main}>
            {ActiveBlocks.map((block, index) => {
                return (
                    <AppContentBlock
                        key={index}
                        content={block.content}
                        title={block.title}
                    />
                );
            })}
        </main>
    );
};
