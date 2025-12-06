/// <reference types="cypress" />

// Расширяем типы Cypress
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Авторизация пользователя
       */
      login(): Chainable<void>
      
      /**
       * Собрать тестовый бургер
       */
      buildTestBurger(): Chainable<void>
      
      /**
       * Проверить пустой конструктор
       */
      assertEmptyConstructor(): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', () => {
  const ACCESS_TOKEN = 'fake-access-token';
  const REFRESH_TOKEN = 'fake-refresh-token';
  
  cy.setCookie('accessToken', ACCESS_TOKEN);
  cy.window().then((win: Window) => {
    win.localStorage.setItem('refreshToken', REFRESH_TOKEN);
  });
});

Cypress.Commands.add('buildTestBurger', () => {
  cy.contains('Краторная булка N-200i').parent().within(() => {
    cy.get('button').click();
  });
  
  cy.contains('Биокотлета из марсианской Магнолии').parent().within(() => {
    cy.get('button').click();
  });
  
  cy.contains('Соус Spicy-X').parent().within(() => {
    cy.get('button').click();
  });
});

Cypress.Commands.add('assertEmptyConstructor', () => {
  cy.get('[data-testid="constructor-bun-top"]').should('not.contain.text', 'Краторная булка N-200i');
  cy.get('[data-testid="constructor-ingredients"]').should('be.empty');
  cy.get('[data-testid="constructor-bun-bottom"]').should('not.contain.text', 'Краторная булка N-200i');
});

export {};