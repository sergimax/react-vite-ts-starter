/// <reference types="cypress" />

/**
 * После подготовки инфраструктуры напишите полноценный тест для функциональности страницы «Конструктор».
 * Протестировать нужно:
 * - [ ] функциональность перетаскивания ингредиента
 * - [ ] создания заказа
 * - [x] работу модальных окон на странице «Конструктор».
 *
 * Другими словами, нужно протестировать путь пользователя от сбора бургера перетаскиванием ингредиентов до получения информации о созданном заказе.
 */

describe('Главная страница', () => {
    const ingredientData = {
        name: 'Флюоресцентная булка R2-D3',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
    };

    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {
            fixture: 'get.ingredients.json',
        });
        cy.intercept('POST', 'api/orders', { fixture: 'post.orders.json' });
        cy.intercept('POST', 'api/auth/login', { fixture: 'post.login.json' });
        cy.visit('http://localhost:5173');
    });

    it('открывается на вкладке "Конструктор" с заголовком "Соберите бургер"', function () {
        cy.contains('Соберите бургер');
    });

    it('по клику на ингредиент открывается модальное окно с информацией о нём', () => {
        cy.contains(ingredientData.name).click();
        cy.get('[class^=_modal-container_]').should('exist');
        cy.contains('Детали ингредиента');
        cy.contains(ingredientData.name);
        cy.contains('Калории');
        cy.contains(ingredientData.calories);
        cy.contains('Белки');
        cy.contains(ingredientData.proteins);
        cy.contains('Жиры');
        cy.contains(ingredientData.fat);
        cy.contains('Углеводы');
        cy.contains(ingredientData.carbohydrates);
    });

    it('по клику на ингредиент открывает модальное окно, по клику Esc - закрывает модальное окно', () => {
        cy.contains(ingredientData.name).click();
        cy.get('[class^=_modal-container_]').should('exist');
        cy.get('body').type('{esc}');
        cy.get('[class^=_modal-container_]').should('not.exist');
    });

    it('по клику на ингредиент открывает модальное окно, по клику на кнопку закрытия - закрывает модальное окно', () => {
        cy.contains(ingredientData.name).click();
        cy.get('[class^=_modal-container_]').should('exist');
        cy.get('[class^=_close-icon_]').should('exist');
        cy.get('[class^=_close-icon_]').click();
        cy.get('[class^=_modal-container_]').should('not.exist');
    });
});
