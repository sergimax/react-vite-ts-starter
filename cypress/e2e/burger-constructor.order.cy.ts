/// <reference types="cypress" />

describe('Главная страница - процесс оформления заказа', () => {
    const ingredientData = {
        name: 'Краторная булка N-200i',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
    };

    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {
            fixture: 'get.ingredients.json',
        });
        cy.intercept('POST', 'api/auth/login', { fixture: 'post.login.json' });
        cy.intercept('POST', 'api/orders', { fixture: 'post.orders.json' });
        cy.visit('http://localhost:5173');
    });

    it('добавление ингредиентов в состав бургера', () => {
        cy.get('[class^=constructor-element]').as('burger-bun');
        cy.get('[class^=_ingredients_]').as('burger-ingredients');
        cy.get('@burger-bun').contains(ingredientData.name).should('not.exist');

        cy.get('[class^=_categories_]')
            .contains(ingredientData.name)
            .should('exist')
            .as('bun');
        cy.get('@bun').trigger('dragstart');
        cy.get('@burger-ingredients').trigger('drop');

        cy.get('@burger-bun').contains(ingredientData.name).should('exist');
    });

    it('добавление ингредиентов в состав бургера и попытка оформления заказа', () => {
        cy.get('[class^=constructor-element]').as('burger-bun');
        cy.get('[class^=_ingredients_]').as('burger-ingredients');
        cy.get('@burger-bun').contains(ingredientData.name).should('not.exist');

        // Добавление ингредиентов
        cy.get('[class^=_categories_]')
            .contains(ingredientData.name)
            .should('exist')
            .as('bun');
        cy.get('@bun').trigger('dragstart');
        cy.get('@burger-ingredients').trigger('drop');
        cy.get('@burger-bun').contains(ingredientData.name).should('exist');

        // Попытка оформления заказа без авторизации
        cy.get('button').contains('Оформить заказ').click();
        cy.get('[class^=input__icon]').first().click();

        // Авторизация пользователя
        cy.get('form input[type=email]').type('12eajosf@asofida.qwr');
        cy.get('form input[type=password]').type('qwe123qwe123!');
        cy.contains('Войти').click();
        cy.contains('Вход').should('not.exist');

        // Оформление заказа после авторизации
        cy.get('button').contains('Оформить заказ').click();
        cy.get('[class^=_modal-container_]').should('exist');
        cy.contains('71828').should('exist');
        cy.contains('Ваш заказ начали готовить').should('exist');

        // Закрытие модального окна
        cy.get('[class^=_close-icon_]').should('exist');
        cy.get('[class^=_close-icon_]').click();
        cy.get('[class^=_modal-container_]').should('not.exist');

        // Проверка очистки ингредиентов конструктора
        cy.get('@burger-bun').contains(ingredientData.name).should('not.exist');
    });
});
