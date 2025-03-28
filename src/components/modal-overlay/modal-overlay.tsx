import { ModalOverlayProps } from './types';
import styles from './styles.module.css';

export const ModalOverlay = ({ onClose }: ModalOverlayProps) => {
    return <div className={styles.overlay} onClick={onClose} />;
};
