import { useEffect, useState } from 'react';
import { AppHeader } from '../../components/app-header';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { setActivePage } from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';
import styles from './styles.module.css';
import {
    Button,
    EmailInput,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
    isAuthorizedSelector,
    isLoginSuccessfullSelector,
    loginAccount,
} from '../../services/reducers/account';
import { Link, useNavigate, Navigate } from 'react-router-dom';

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isLoginSuccessfull = useAppSelector(isLoginSuccessfullSelector);
    const isAuthorized = useAppSelector(isAuthorizedSelector);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function login(email: string, password: string): void {
        if (!email || !password) {
            console.error('no login data set');
            return;
        }

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
        if (isLoginSuccessfull) {
            console.log('Successfull login:', email, password);
            navigate(ROUTE_PATH.DEFAULT);
        }
    }, [isLoginSuccessfull, navigate]);

    if (isAuthorized) {
        return <Navigate to={ROUTE_PATH.DEFAULT} />;
    }

    return (
        <>
            <AppHeader />
            <div className={styles.container}>
                <div className={styles['login-form']}>
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
                        htmlType='button'
                        type='primary'
                        size='medium'
                        onClick={() => login(email, password)}
                    >
                        Войти
                    </Button>
                </div>
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
