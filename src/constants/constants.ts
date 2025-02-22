export const API_URL: string = 'https://norma.nomoreparties.space/api';

export enum API_ENDPOINT {
    INGREDIENTS = 'ingredients',
    ORDERS = 'orders',
    PASSWORD_RESET = 'password-reset',
}

/**
 * Типы назначения модального окна
 */
export enum MODAL_TYPE {
    /**
     * Подробная информация по ингредиенту
     */
    INGREDIENT_DETAILS = 'INGREDIENT_DETAILS',
    /**
     * Информация по заказу
     */
    ORDER = 'ORDER',
}
