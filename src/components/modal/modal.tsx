import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay';
import { ModalProps } from './types';
import styles from './modal.module.css';

export const Modal = ({ title = '', children, onClose }: ModalProps) => {
    const modalClasses: string = `${styles.container}`;
    const modalHeadingClasses: string = `pt-10 pl-10 pr-10 ${styles['modal-heading']}`;
    const titleClasses: string = `text_type_main-large  ${styles.title}`;
    const contentClasses: string = `pb-15 ${styles.content}`;

    function handleEscapeKeyPress(event: KeyboardEvent): void {
        event.key === 'Escape' && onClose();
    }

    /**
     * Реакция на нажатие Escape
     */
    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKeyPress, false);

        return () => {
            document.removeEventListener(
                'keydown',
                handleEscapeKeyPress,
                false
            );
        };
    }, []);

    return createPortal(
        <>
            <div className={modalClasses}>
                <div className={modalHeadingClasses}>
                    <h2 className={titleClasses}>{title}</h2>
                    <CloseIcon
                        type="primary"
                        onClick={onClose}
                        className={styles['close-icon']}
                    />
                </div>
                <div className={contentClasses}>{children}</div>
            </div>
            <ModalOverlay onClose={onClose} />
        </>,
        document.body
    );
};
