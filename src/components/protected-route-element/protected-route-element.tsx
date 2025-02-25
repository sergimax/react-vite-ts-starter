import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
    getAccountInformation,
    isAuthorizedSelector,
} from '../../services/reducers/account';
import { ROUTE_PATH } from '../app/constants';

export const ProtectedRouteElement = () => {
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const isAuthorized = useAppSelector(isAuthorizedSelector);
    const dispatch = useAppDispatch();

    const init = async () => {
        await dispatch(getAccountInformation());
        setIsUserLoaded(true);
    };

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return isAuthorized ? <Outlet /> : <Navigate to={ROUTE_PATH.LOGIN} />;
};
