import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalProps } from './types';
import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay';

export const Modal = ({ title = '', children, onClose }: ModalProps) => {
    const modalClasses: string = `${styles.container}`;
    const modalHeadingClasses: string = `pt-10 pl-10 pr-10 ${styles['modal-heading']}`;
    const titleClasses: string = `text_type_main-large  ${styles.title}`;
    const contentClasses: string = `pb-15 ${styles.content}`;

    return createPortal(
        <>
            <div className={modalClasses}>
                <div className={modalHeadingClasses}>
                    <h2 className={titleClasses}>{title}</h2>
                    <CloseIcon
                        type="primary"
                        onClick={onClose}
                    />
                </div>
                <div className={contentClasses}>{children}</div>
            </div>
            <ModalOverlay onClose={onClose} />
        </>,
        document.body
    );
};
