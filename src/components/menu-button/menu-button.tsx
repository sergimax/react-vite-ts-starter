import { MenuButtonProps } from './types';
import styles from './style.module.css';

export const MenuButton = ({ icon, title, key }: MenuButtonProps) => {
    return (
        <div
            key={key}
            className={styles['menu-button']}
        >
            {icon}
            <span className="ml-2">{title}</span>
        </div>
    );
};
