import { MenuButtonProps } from './types';
import styles from './style.module.css';

export const MenuButton = ({ title, children }: MenuButtonProps) => {
    return (
        <div className={styles['menu-button']}>
            {children}
            <span className="ml-2 text_type_main-default">{title}</span>
        </div>
    );
};
