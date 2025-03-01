import { MODAL_TYPE } from '../constants/constants';

/**
 * Данные по ингредиенту
 */
export type Ingredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

/**
 * Наименования типов ингредиентов в ответе API
 */
export enum IngredientTypeName {
    BUN = 'bun',
    MAIN = 'main',
    SAUCE = 'sauce',
}

/**
 * Наименования категорий ингредиентов на русском
 */
export enum IngredientCategoryTypeLocalName {
    BUN = 'Булки',
    MAIN = 'Начинки',
    SAUCE = 'Соусы',
}

/**
 * Данные об ингредиенте с учетом количества выбранных для использования
 */
export type IngredientWithCounter = Ingredient & {
    quantity?: number;
};

/**
 * Страницы проекта
 */
export enum Page {
    CONSTRUCTOR = 'constructor',
    ORDERS = 'orders',
    ACCOUNT = 'account',
}

/**
 * Состав бургера
 */
export type ChosenIngredients = {
    bun: UniqueIngredientItem | null;
    ingredients: Array<UniqueIngredientItem>;
};

export type UniqueIngredientItem = Ingredient & {
    uniqueId: number;
};

/**
 * Содержимое модального окна
 */
export type ModalContent = {
    title?: string;
    content: JSX.Element;
};

/**
 * Типы модального окна
 */
export type ModalType = keyof typeof MODAL_TYPE;

/**
 * Данные для модального окна Деталей об ингредиенте
 */
export type IngredientDeatilsData = {
    title: string;
    ingredientId: string;
};

/**
 * Данные для модального окна Заказа
 */
export type OrderData = {
    orderId: number;
    chosenIngredients: ChosenIngredients;
};

/**
 * Данные для модального окна
 */
export type DataForModal = {
    type: ModalType;
    orderData?: OrderData;
    ingredientData?: IngredientDeatilsData;
};

/**
 * Содержимое полей ввода
 */
export type InputValues = {
    [key: string]: string;
};
