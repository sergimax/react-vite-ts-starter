import { SyntheticEvent, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ROUTE_PATH } from '../../components/app/constants';
import { useAppDispatch, useAppSelector, useForm } from '../../services/hooks';
import { setActivePage } from '../../services/reducers/pages';
import {
    executeResetPassword,
    isAuthorizedSelector, isExecuteResetPasswordSuccessfulSelector,
} from '../../services/reducers/account';
import styles from './styles.module.css';

export const ResetPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isAuthorized = useAppSelector(isAuthorizedSelector);
    const isPasswordResetSuccessful = useAppSelector(isExecuteResetPasswordSuccessfulSelector);

    const { values, handleChange } = useForm({
        inputValues: {
            newPassword: '', code: '',
        },
    });

    function resetPassword(event: SyntheticEvent) {
        if (values.newPassword && values.code) {
            event.preventDefault();
            dispatch(executeResetPassword({
                password: values.newPassword, token: values.code,
            }));
        }
    }

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.RESET_PASSWORD }));
    }, [dispatch]);

    useEffect(() => {
        if (isPasswordResetSuccessful) {
            navigate(ROUTE_PATH.LOGIN);
        }
    }, [isPasswordResetSuccessful]);

    if (isAuthorized) {
        return <Navigate to={ROUTE_PATH.DEFAULT} />;
    }

    if (!location.state || location.state?.pathname !== ROUTE_PATH.FORGOT_PASSWORD) {
        return <Navigate to={ROUTE_PATH.FORGOT_PASSWORD} />
    }

    return (
        <>
            <div className={styles.container}>
                <form onSubmit={resetPassword} className={styles['login-form']}>
                    <div className='text_type_main-medium'>
                        Восстановление пароля
                    </div>
                    <Input
                        onChange={handleChange}
                        name='newPassword'
                        placeholder='Введите новый пароль'
                        value={values.newPassword}
                    />
                    <Input
                        onChange={handleChange}
                        placeholder='Введите код из письма'
                        name='code'
                        value={values.code}
                    />
                    <Button
                        htmlType='button'
                        type='primary'
                        size='medium'
                    >
                        Сохранить
                    </Button>
                </form>
                <div className={styles['additional-actions']}>
                    <div
                        className={
                            'text text_type_main-default text_color_inactive'
                        }
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
        </>
    );
};
