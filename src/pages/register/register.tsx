import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { AppHeader } from '../../components/app-header';
import { setActivePage } from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';

import styles from './styles.module.css';
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
    isRegisterAccountSuccessfullSelector,
    registerAccount,
} from '../../services/reducers/account';

export const Register = () => {
    const dispatch = useAppDispatch();

    const isRegisterSuccessfull = useAppSelector(
        isRegisterAccountSuccessfullSelector
    );

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function registerNewAccount(
        name: string,
        email: string,
        password: string
    ): void {
        if (!name || !email || !password) {
            console.log('no registration data set');
            return;
        }

        dispatch(
            registerAccount({
                name: name,
                email: email,
                password: password,
            })
        );
    }

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.REGISTER }));
    }, [dispatch]);

    useEffect(() => {
        if (isRegisterSuccessfull) {
            // TODO navigation to ???
            console.log('Success!');
        }
    }, [isRegisterSuccessfull]);

    return (
        <>
            <AppHeader />
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
                        onClick={() =>
                            registerNewAccount(name, email, password)
                        }
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
