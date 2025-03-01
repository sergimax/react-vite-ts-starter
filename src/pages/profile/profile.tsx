import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector, useForm } from '../../services/hooks';
import {
    activePageSelector,
    setActivePage,
} from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';
import {
    emailSelector,
    getAccountInformation,
    isAccountInformationUpdateSuccessfulSelector, logoutAccount,
    nameSelector,
    passwordSelector,
    updateAccountInformation,
} from '../../services/reducers/account';
import styles from './styles.module.css';

export const Profile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const activePage = useAppSelector(activePageSelector);
    const userName = useAppSelector(nameSelector);
    const userEmail = useAppSelector(emailSelector);
    const userPassword = useAppSelector(passwordSelector);
    const isAccountInformationUpdateSuccessful = useAppSelector(
        isAccountInformationUpdateSuccessfulSelector
    );

    const navigationProfileClasses: string = `${styles['navigation-item']} ${
        activePage === ROUTE_PATH.PROFILE ? '' : 'text_color_inactive'
    }`;
    const navigationOrderListClasses: string = `${styles['navigation-item']} ${
        activePage === ROUTE_PATH.ORDER_LIST ? '' : 'text_color_inactive'
    }`;
    const navigationExitClasses: string = `${
        styles['navigation-item']
    } ${'text_color_inactive'}`;

    const { values, handleChange, setValues } = useForm({
        inputValues: {
            name: userName, email: userEmail, password: userPassword,
        },
    });
    const [isFormChanged, setIsFormChanged] = useState<boolean>(false);

    function resetForm(event?: SyntheticEvent) {
        event && event.preventDefault();
        setValues({
            name: userName, email: userEmail, password: userPassword,
        });
    }

    function saveForm(event: SyntheticEvent) {
        event.preventDefault();
        dispatch(
            updateAccountInformation({
                name: values.name,
                email: values.email,
                password: values.password,
            })
        );
    }

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.PROFILE }));
        dispatch(getAccountInformation());
    }, [dispatch]);

    useEffect(() => {
        if (isAccountInformationUpdateSuccessful) {
            resetForm();
        }
    }, [isAccountInformationUpdateSuccessful]);

    useEffect(() => {
        setIsFormChanged(userPassword !== values.password || userEmail !== values.email || userName !== values.name);
    }, [values, userEmail, userName, userPassword]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.navigation}>
                    <div className='text_type_main-medium'>
                        <div
                            className={navigationProfileClasses}
                            onClick={() => navigate(ROUTE_PATH.PROFILE)}
                        >
                            Профиль
                        </div>
                        <div
                            className={navigationOrderListClasses}
                            onClick={() => navigate(ROUTE_PATH.ORDER_LIST)}
                        >
                            История заказов
                        </div>
                        <div
                            className={navigationExitClasses}
                            onClick={() => {
                                dispatch(logoutAccount());
                            }}
                        >
                            Выход
                        </div>
                    </div>

                    <div
                        className={'text_type_main-default text_color_inactive'}
                    >
                        В этом разделе вы можете изменить свои персональные
                        данные
                    </div>
                </div>
                <form onSubmit={saveForm} className={styles['user-data']} onReset={resetForm}>
                    <Input
                        onChange={handleChange}
                        placeholder='Имя'
                        name='name'
                        value={values.name}
                        icon='EditIcon'
                    />
                    <Input
                        onChange={handleChange}
                        placeholder='Логин'
                        name='email'
                        value={values.email}
                        icon='EditIcon'
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name='password'
                        icon='EditIcon'
                    />
                    {isFormChanged && (
                        <div className={styles['update-actions']}>
                            <Button
                                type={'secondary'}
                                htmlType='reset'
                            >
                                Отмена
                            </Button>
                            <Button
                                type={'primary'}
                                htmlType='submit'
                            >
                                Сохранить
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
};
