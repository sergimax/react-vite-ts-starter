import { ORDER_STATUS } from '../../types/types';

/**
 * Сформировать текстовый статус заказа на основании значения с сервера
 * @param status Значение с сервера
 * @returns
 */
export function getStatusTitle(status: ORDER_STATUS): string {
    /**
     * По чеклисту имеются три статуса:
     * - Отменён
     * - Готовится
     * - Выполнен
     *
     * Но по описанию задания 'Поле status у заказа может иметь значения created, pending, done'
     *
     * Какое значение statu для 'Отменён' - не указано
     */
    switch (status) {
        case ORDER_STATUS.DONE:
            return 'Выполнен';
        case ORDER_STATUS.PENDING:
        case ORDER_STATUS.CREATED:
            return 'Готовится';
        default:
            return 'Отменён';
    }
}
