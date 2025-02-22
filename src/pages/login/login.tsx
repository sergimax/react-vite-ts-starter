import { useEffect, useState } from 'react';
import { AppHeader } from '../../components/app-header';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
    activePageSelector,
    setActivePage,
} from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';
import styles from './styles.module.css';
import {
    Button,
    EmailInput,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const Login = () => {
    const dispatch = useAppDispatch();

    const activePage = useAppSelector(activePageSelector);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.LOGIN }));
    }, []);

    return (
        <>
            <AppHeader activePage={activePage} />
            <div className={styles.container}>
                <div className={styles['login-form']}>
                    <div className="text_type_main-medium">Вход</div>
                    <EmailInput
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        isIcon={false}
                        value={email}
                    ></EmailInput>
                    <PasswordInput
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        name="password"
                        icon="ShowIcon"
                    ></PasswordInput>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        extraClass={styles.button}
                        onClick={() => console.log('ENTER')}
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
                        <a
                            className="text_color_accent"
                            href={`${ROUTE_PATH.REGISTER}`}
                        >
                            Зарегистрироваться
                        </a>
                    </div>
                    <div
                        className={
                            'text text_type_main-default text_color_inactive'
                        }
                    >
                        Забыли пароль?{' '}
                        <a
                            className="text_color_accent"
                            href={`${ROUTE_PATH.FORGOT_PASSWORD}`}
                        >
                            Восстановить пароль
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
