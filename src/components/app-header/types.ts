import { ROUTE_PATH } from '../app/constants';

export type AppHeaderProps = {
    activePage: ROUTE_PATH;
};

export type ButtonParams = {
    class: string;
    type: 'primary' | 'secondary';
};
