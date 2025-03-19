import { IngredientWithCounter } from '../../types/types';

/**
 * Расчет стоимости заказа
 * @param ids Список id ингредиентов из заказа
 * @param ingredientsList Общий список ингредиентов
 * @returns
 */
export function getIngredientsPrice(
    ids: Array<string>,
    ingredientsList: Array<IngredientWithCounter>,
): number {
    const orderIngredients: IngredientWithCounter[] = ids
        .map(id => {
            return ingredientsList.find(item => item._id === id);
        })
        .filter(ingredient => !!ingredient);

    const sum = orderIngredients.reduce((accum, current) => {
        return accum + current.price;
    }, 0);

    return sum;
}
