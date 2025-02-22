import { useEffect, useState } from 'react';
import { ROUTE_PATH } from '../../components/app/constants';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
    activePageSelector,
    setActivePage,
} from '../../services/reducers/pages';
import { AppHeader } from '../../components/app-header';
import styles from './styles.module.css';
import {
    Button,
    EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
    isAskResetPasswordSuccessfullSelector,
    askResetPassword,
} from '../../services/reducers/account';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const activePage = useAppSelector(activePageSelector);
    const isAskResetSuccessfull = useAppSelector(
        isAskResetPasswordSuccessfullSelector
    );

    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.LOGIN }));
    }, [dispatch]);

    function sendResetPasswordRequest() {
        // optional email validation
        if (email) {
            dispatch(
                askResetPassword({
                    email: email,
                })
            );
        }
    }

    useEffect(() => {
        if (isAskResetSuccessfull) {
            console.log('isResetSuccessfull');
            setEmail('');
            navigate(ROUTE_PATH.RESET_PASSWORD);
        }
    }, [isAskResetSuccessfull, navigate]);

    return (
        <>
            <AppHeader activePage={activePage} />
            <div className={styles.container}>
                <div className={styles['login-form']}>
                    <div className="text_type_main-medium">
                        Восстановление пароля
                    </div>
                    <EmailInput
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        placeholder="Укажите e-mail"
                        isIcon={false}
                        value={email}
                    ></EmailInput>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        onClick={sendResetPasswordRequest}
                    >
                        Восстановить
                    </Button>
                </div>
                <div className={styles['additional-actions']}>
                    <div
                        className={
                            'text text_type_main-default text_color_inactive'
                        }
                    >
                        Вспомнили пароль?{' '}
                        <a
                            className="text_color_accent"
                            href={`${ROUTE_PATH.LOGIN}`}
                        >
                            Войти
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
