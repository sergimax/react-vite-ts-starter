import { AppContentBlockProps } from './types';
import styles from './style.module.css';

export const AppContentBlock = ({
    content,
    title = '',
}: AppContentBlockProps) => {
    const titleClasses = `text_type_main-large pt-10 pb-5 ${
        title ? styles.title : styles['title-empty']
    }`;

    return (
        <div className={styles['app-content-block']}>
            <h1 className={titleClasses}>{title}</h1>
            {content}
        </div>
    );
};
