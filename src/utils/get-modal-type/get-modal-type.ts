import { ROUTE_PATH } from '../../components/app/constants';
import { MODAL_TYPE } from '../../constants/constants';

/**
 * Получить тип модального окна Заказа на основании текущего расположения
 * @returns
 */
export function getOrderModalType(path: string): MODAL_TYPE {
    if (path === ROUTE_PATH.FEED) {
        return MODAL_TYPE.FEED;
    }

    return MODAL_TYPE.ORDERS_FEED;
}
