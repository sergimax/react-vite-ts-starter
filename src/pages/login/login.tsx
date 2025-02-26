import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { setActivePage } from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';
import {
    Button,
    EmailInput,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
    isAuthorizedSelector,
    isLoginSuccessfulSelector,
    loginAccount,
} from '../../services/reducers/account';
import styles from './styles.module.css';

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isLoginSuccessful = useAppSelector(isLoginSuccessfulSelector);
    const isAuthorized = useAppSelector(isAuthorizedSelector);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function login(event: SyntheticEvent): void {
        if (!email || !password) {
            console.error('Error: no login data set');
            return;
        }

        event.preventDefault();
        dispatch(
            loginAccount({
                email: email,
                password: password,
            })
        );
    }

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.LOGIN }));
    }, [dispatch]);

    useEffect(() => {
        if (isLoginSuccessful) {
            console.log('Successful login:', email, password);
            navigate(ROUTE_PATH.DEFAULT);
        }
    }, [isLoginSuccessful, navigate]);

    if (isAuthorized) {
        return <Navigate to={ROUTE_PATH.DEFAULT} />;
    }

    return (
        <>
            <div className={styles.container}>
                <form onSubmit={(e) => login(e)} className={styles['login-form']}>
                    <div className='text_type_main-medium'>Вход</div>
                    <EmailInput
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        isIcon={false}
                        value={email}
                    ></EmailInput>
                    <PasswordInput
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        name='password'
                        icon='ShowIcon'
                    ></PasswordInput>
                    <Button
                        htmlType='submit'
                        type='primary'
                        size='medium'
                    >
                        Войти
                    </Button>
                </form>
                <div className={styles['additional-actions']}>
                    <div
                        className={
                            'text text_type_main-default text_color_inactive'
                        }
                    >
                        Вы - новый пользователь?{' '}
                        <Link
                            className='text_color_accent'
                            to={`${ROUTE_PATH.REGISTER}`}
                        >
                            Зарегистрироваться
                        </Link>
                    </div>
                    <div
                        className={
                            'text text_type_main-default text_color_inactive'
                        }
                    >
                        Забыли пароль?{' '}
                        <Link
                            className='text_color_accent'
                            to={`${ROUTE_PATH.FORGOT_PASSWORD}`}
                        >
                            Восстановить пароль
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
