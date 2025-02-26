import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
    getAccountInformation,
    isAuthorizedSelector,
} from '../../services/reducers/account';
import { ROUTE_PATH } from '../app/constants';

export const ProtectedRouteElement = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const isAuthorized = useAppSelector(isAuthorizedSelector);

    const [isUserLoaded, setIsUserLoaded] = useState(false);

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

    if (!isAuthorized) {
        return <Navigate to={ROUTE_PATH.LOGIN} state={{ from: location }} />;
    }

    return <Outlet />;
};
