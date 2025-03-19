import { ORDER_STATUS } from '../../types/types';

export function getStatusTitle(status: ORDER_STATUS) {
    switch (status) {
        case ORDER_STATUS.DONE:
            return 'Готово';
        case ORDER_STATUS.PENDING:
        case ORDER_STATUS.CREATED:
        default:
            return 'В работе';
    }
}
