export const API_URL: string = 'https://norma.nomoreparties.space/api';

export enum API_ENDPOINT {
    INGREDIENTS = 'ingredients',
    ORDERS = 'orders',
    PASSWORD_RESET_ASK = 'password-reset',
    PASSWORD_RESET_EXECUTE = 'password-reset/reset',
    /**
     * эндпоинт для авторизации
     */
    LOGIN_ACCOUNT = 'auth/login',
    /**
     * эндпоинт для регистрации пользователя
     */
    REGISTER_ACCOUNT = 'auth/register',
    /**
     * эндпоинт для выхода из системы
     */
    LOGOUT_ACCOUNT = 'auth/logout',
    /**
     * эндпоинт обновления токена
     */
    REFRESH_TOKEN_ACCOUNT = 'auth/token',
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
