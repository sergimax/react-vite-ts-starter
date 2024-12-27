import styles from './modal-overlay.module.css';
import { ModalOverlayProps } from './types';

export const ModalOverlay = ({ onClose }: ModalOverlayProps) => {
    return (
        <div
            className={styles.overlay}
            onClick={onClose}
        />
    );
};
