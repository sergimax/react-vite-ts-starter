import { useEffect } from 'react';
import { AppHeader } from '../../components/app-header';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
    activePageSelector,
    setActivePage,
} from '../../services/reducers/pages';
import { ROUTE_PATH } from '../../components/app/constants';

export const Register = () => {
    const dispatch = useAppDispatch();

    const activePage = useAppSelector(activePageSelector);

    useEffect(() => {
        dispatch(setActivePage({ value: ROUTE_PATH.REGISTER }));
    }, []);

    return (
        <>
            <AppHeader activePage={activePage} />
            register
        </>
    );
};
