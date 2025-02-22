import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { AppHeader } from '../../components/app-header';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
    activePageSelector,
    setActivePage,
} from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';
import {
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const activePage = useAppSelector(activePageSelector);

    const navigationProfileClasses: string = `${styles['navigation-item']} ${
        activePage === ROUTE_PATH.PROFILE ? '' : 'text_color_inactive'
    }`;
    const navigationOrderListClasses: string = `${styles['navigation-item']} ${
        activePage === ROUTE_PATH.ORDER_LIST ? '' : 'text_color_inactive'
    }`;
    const navigationExitClasses: string = `${
        styles['navigation-item']
    } ${'text_color_inactive'}`;

    const [name, setName] = useState<string>('Марк');
    const [email, setEmail] = useState<string>('mail@stellar.burgers');
    const [password, setPassword] = useState<string>('123456');

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.PROFILE }));
    }, [dispatch]);

    return (
        <>
            <AppHeader />
            <div className={styles.container}>
                <div className={styles.navigation}>
                    <div className="text_type_main-medium">
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
                                console.log('EXIT');
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
                <div className={styles['user-data']}>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Имя"
                        name="name"
                        value={name}
                        icon="EditIcon"
                    ></Input>
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Логин"
                        name="email"
                        value={email}
                        icon="EditIcon"
                    ></Input>
                    <PasswordInput
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        name="password"
                        icon="EditIcon"
                    ></PasswordInput>
                </div>
            </div>
        </>
    );
};
