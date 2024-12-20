import { MenuButtonProps } from './types';
import styles from './style.module.css';

export const MenuButton = ({ icon, title }: MenuButtonProps) => {
    return (
        <div className={styles['menu-button']}>
            {icon}
            <span className="ml-2 text_type_main-default">{title}</span>
        </div>
    );
};
