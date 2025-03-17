import { CSSProperties } from 'react';
import { ImageContainerProps } from './types';
import styles from './styles.module.css';

export const ImageContainer = ({ src, index = 0 }: ImageContainerProps) => {
    function getImageStyle(imageIndex: number): CSSProperties | undefined {
        return {
            transform: `translate(-${16 * imageIndex}px)`,
            zIndex: 10 - imageIndex,
        };
    }

    return (
        <img
            src={src}
            className={styles['item-image-container']}
            style={getImageStyle(index)}
        />
    );
};
