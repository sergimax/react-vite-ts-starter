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
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const Register = () => {
    const dispatch = useAppDispatch();

    const activePage = useAppSelector(activePageSelector);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.REGISTER }));
    }, [dispatch]);

    return (
        <>
            <AppHeader activePage={activePage} />
            <div className={styles.container}>
                <div className={styles['register-form']}>
                    <div className="text_type_main-medium">Регистрация</div>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Имя"
                        name="name"
                        value={name}
                    ></Input>
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
                        onClick={() => console.log('REGISTER')}
                    >
                        Зарегистрироваться
                    </Button>
                </div>
                <div className={styles['additional-actions']}>
                    <div
                        className={
                            'text text_type_main-default text_color_inactive'
                        }
                    >
                        Уже зарегистрированы?{' '}
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
