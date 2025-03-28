export const API_URL: string = 'https://norma.nomoreparties.space/api';

export const WS_URL: string = 'wss://norma.nomoreparties.space/orders/all';
export const WS_PERSONAL_URL: string = 'wss://norma.nomoreparties.space/orders';


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
    /**
     * эндпоинт получения данных о пользователе
     */
    GET_OR_UPDATE_ACCOUNT = 'auth/user',
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
     * Информация по оформленному заказу
     */
    ORDER = 'ORDER',
    /**
     * Информация по заказу из Ленты заказов
     */
    FEED = 'FEED',
    /**
     * Информация по заказу из Истории заказов
     */
    ORDERS_FEED = 'ORDERS_FEED',
}
