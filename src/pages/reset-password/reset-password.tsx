import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ROUTE_PATH } from '../../components/app/constants';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { setActivePage } from '../../services/reducers/pages';
import { AppHeader } from '../../components/app-header';
import {
    executeResetPassword,
    isAuthorizedSelector, isExecuteResetPasswordSuccessfulSelector,
} from '../../services/reducers/account';
import styles from './styles.module.css';

export const ResetPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuthorized = useAppSelector(isAuthorizedSelector);
    const isPasswordResetSuccessful = useAppSelector(isExecuteResetPasswordSuccessfulSelector);

    const [newPassword, setNewPassword] = useState<string>('');
    const [code, setCode] = useState<string>('');

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

    return (
        <>
            <AppHeader />
            <div className={styles.container}>
                <div className={styles['login-form']}>
                    <div className='text_type_main-medium'>
                        Восстановление пароля
                    </div>
                    <Input
                        onChange={(e) => setNewPassword(e.target.value)}
                        name='newPassword'
                        placeholder='Введите новый пароль'
                        value={newPassword}
                    ></Input>
                    <Input
                        onChange={(e) => setCode(e.target.value)}
                        placeholder='Введите код из письма'
                        name='code'
                        value={code}
                    ></Input>
                    <Button
                        htmlType='button'
                        type='primary'
                        size='medium'
                        onClick={async () => {
                            dispatch(executeResetPassword({
                                password: newPassword,
                                token: code
                            }))
                        }}
                    >
                        Сохранить
                    </Button>
                </div>
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
