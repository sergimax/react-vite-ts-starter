import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
    Button, EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ROUTE_PATH } from '../../components/app/constants';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { setActivePage } from '../../services/reducers/pages';
import {
    isAskResetPasswordSuccessfulSelector, askResetPassword, isAuthorizedSelector, setAccountEmail,
} from '../../services/reducers/account';
import styles from './styles.module.css';

export const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAskResetSuccessful = useAppSelector(isAskResetPasswordSuccessfulSelector);
    const isAuthorized = useAppSelector(isAuthorizedSelector);

    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.LOGIN }));
    }, [dispatch]);

    function sendResetPasswordRequest(event: SyntheticEvent) {
        // optional email validation
        if (email) {
            event.preventDefault();
            dispatch(setAccountEmail({
                email: email,
            }));
            dispatch(askResetPassword({
                email: email,
            }));
        }
    }

    useEffect(() => {
        if (isAskResetSuccessful) {
            console.log('Successful password reset');
            setEmail('');
            navigate(ROUTE_PATH.RESET_PASSWORD);
        }
    }, [isAskResetSuccessful, navigate]);

    if (isAuthorized) {
        return <Navigate to={ROUTE_PATH.DEFAULT} />;
    }

    return (<>
            <div className={styles.container}>
                <form onSubmit={sendResetPasswordRequest} className={styles['login-form']}>
                    <div className='text_type_main-medium'>
                        Восстановление пароля
                    </div>
                    <EmailInput
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        placeholder='Укажите e-mail'
                        isIcon={false}
                        value={email}
                    ></EmailInput>
                    <Button
                        htmlType='submit'
                        type='primary'
                        size='medium'
                    >
                        Восстановить
                    </Button>
                </form>
                <div className={styles['additional-actions']}>
                    <div
                        className={'text text_type_main-default text_color_inactive'}
                    >
                        Вспомнили пароль?{' '}
                        <Link
                            className='text_color_accent'
                            to={`${ROUTE_PATH.LOGIN}`}
                        >
                            Войти
                        </Link>
                    </div>
                </div>
            </div>
        </>);
};
