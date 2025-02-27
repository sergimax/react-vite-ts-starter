import { SyntheticEvent, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector, useForm } from '../../services/hooks';
import { setActivePage } from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';
import {
    isAuthorizedSelector,
    isRegisterAccountSuccessfulSelector,
    registerAccount,
} from '../../services/reducers/account';
import styles from './styles.module.css';

export const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isRegisterSuccessful = useAppSelector(
        isRegisterAccountSuccessfulSelector
    );
    const isAuthorized = useAppSelector(isAuthorizedSelector);

    const { values, handleChange } = useForm({
        inputValues: {
            name: '', email: '', password: '',
        },
    });

    function registerNewAccount(event: SyntheticEvent): void {
        if (!values.name || !values.email || !values.password) {
            console.error('no registration data set');
            return;
        }

        event.preventDefault();
        dispatch(registerAccount({
            name: values.name, email: values.email, password: values.password,
        }));
    }

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.REGISTER }));
    }, [dispatch]);

    useEffect(() => {
        if (isRegisterSuccessful) {
            console.log('Successful registration :', values.name, values.email, values.password);
            navigate(ROUTE_PATH.LOGIN);
        }
    }, [isRegisterSuccessful, navigate]);

    if (isAuthorized) {
        return <Navigate to={ROUTE_PATH.DEFAULT} />;
    }

    return (
        <>
            <div className={styles.container}>
                <form onSubmit={registerNewAccount} className={styles['register-form']}>
                    <div className='text_type_main-medium'>Регистрация</div>
                    <Input
                        onChange={handleChange}
                        placeholder='Имя'
                        name='name'
                        value={values.name}
                    />
                    <EmailInput
                        onChange={handleChange}
                        name='email'
                        isIcon={false}
                        value={values.email}
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name='password'
                        icon='ShowIcon'
                    />
                    <Button
                        htmlType='submit'
                        type='primary'
                        size='medium'
                    >
                        Зарегистрироваться
                    </Button>
                </form>
                <div className={styles['additional-actions']}>
                    <div
                        className={
                            'text text_type_main-default text_color_inactive'
                        }
                    >
                        Уже зарегистрированы?{' '}
                        <Link
                            className='text_color_accent'
                            to={`${ROUTE_PATH.LOGIN}`}
                        >
                            Войти
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
