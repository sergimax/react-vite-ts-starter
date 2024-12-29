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
 * Данные об ингридиенте с учетом количества выбранных для использования
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
    bun: Ingredient | null;
    ingredients: Array<Ingredient>;
};

/**
 * Содержимое модального окна
 */
export type ModalContent = {
    title?: string;
    content: JSX.Element;
};
