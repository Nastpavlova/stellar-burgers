describe('Конструктор бургера: тесты', () => {

  const BUN_NAME = 'Краторная булка N-200i';
  const MAIN_INGREDIENT_NAME = 'Биокотлета из марсианской Магнолии';
  const SAUCE_INGREDIENT_NAME = 'Соус Spicy-X';

      beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');

        cy.setCookie('accessToken', 'test-access');
        window.localStorage.setItem('refreshToken', 'test-refresh');

        cy.visit('/');
        cy.wait('@getUser');
        cy.wait('@getIngredients');
    });

    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    });

    describe('добавление ингредиентов в конструктор', () => {
        it('добавление булки в конструктор', () => {
            cy.contains(BUN_NAME).parent().within(() => {
                cy.get('button').click();
            });

            cy.get('[data-testid="constructor-bun-top"]').should('contain.text', BUN_NAME);
            cy.get('[data-testid="constructor-bun-bottom"]').should('contain.text', BUN_NAME);
        });

        it('добавление начинки main в конструктор', () => {
            cy.contains(MAIN_INGREDIENT_NAME).parent().within(() => {
                cy.get('button').click();
            });

            cy.get('[data-testid="constructor-ingredients"]').should('contain.text', MAIN_INGREDIENT_NAME);
        });

        it('добавление соуса в конструктор', () => {
            cy.contains(SAUCE_INGREDIENT_NAME).parent().within(() => {
                cy.get('button').click();
            });

            cy.get('[data-testid="constructor-ingredients"]').should('contain.text', SAUCE_INGREDIENT_NAME);
        });

        it('сборка полного бургера (булка + начинка + соус)', () => {
            // добавление булки
            cy.contains(BUN_NAME).parent().within(() => {
                cy.get('button').click();
            });

            // добавление начинки main
            cy.contains(MAIN_INGREDIENT_NAME).parent().within(() => {
                cy.get('button').click();
            });

            // добавление соуса
            cy.contains(SAUCE_INGREDIENT_NAME).parent().within(() => {
                cy.get('button').click();
            });

            cy.get('[data-testid="constructor-bun-top"]').should('contain.text', BUN_NAME);
            cy.get('[data-testid="constructor-ingredients"]').should('contain.text', MAIN_INGREDIENT_NAME);
            cy.get('[data-testid="constructor-ingredients"]').should('contain.text', SAUCE_INGREDIENT_NAME);
            cy.get('[data-testid="constructor-bun-bottom"]').should('contain.text', BUN_NAME);
        });
    });

    describe('модальные окна ингредиентов', () => {
        it('открытие модального окна при клике на ингредиент', () => {
            cy.contains(MAIN_INGREDIENT_NAME).click();
            
            cy.get('[data-testid="modal"]').should('be.visible');
            cy.get('[data-testid="modal"]').should('contain.text', MAIN_INGREDIENT_NAME);
        });

        it('закрытие модального окна при клике на крестик', () => {
            cy.contains(MAIN_INGREDIENT_NAME).click();
            cy.get('[data-testid="modal"]').should('be.visible');
            
            cy.get('[data-testid="modal-close"]').click();
            cy.get('[data-testid="modal"]').should('not.exist');
        });

        it('закрытие модального окна при клике на оверлей', () => {
            cy.contains(MAIN_INGREDIENT_NAME).click();
            cy.get('[data-testid="modal"]').should('be.visible');
            
            cy.get('[data-testid="modal-overlay"]').click({ force: true });
            cy.get('[data-testid="modal"]').should('not.exist');
        });
    });

    describe('создаёт заказ', () => {
        it('Должен создать заказ и очистить конструктор', () => {
            cy.contains(BUN_NAME).parent().within(() => {
                cy.get('button').click();
            });
            
            cy.contains(MAIN_INGREDIENT_NAME).parent().within(() => {
                cy.get('button').click();
            });

            cy.contains(SAUCE_INGREDIENT_NAME).parent().within(() => {
                cy.get('button').click();
            });

            // Проверяем, что кнопка оформления заказа активна
            cy.get('[data-testid="order-button"]').should('not.be.disabled');
            
            // Нажимаем кнопку оформления заказа
            cy.get('[data-testid="order-button"]').click();
            
            // Проверяем, что открылось модальное окно с номером заказа
            cy.get('[data-testid="modal"]').should('be.visible');
            cy.get('[data-testid="order-number"]').should('contain.text', 12345);
            
            // Закрываем модальное окно
            cy.get('[data-testid="modal-close"]').click();
            cy.get('[data-testid="order-modal"]').should('not.exist');
            
            // Проверяем, что конструктор очистился
            cy.contains('Выберите булки').should('exist');
            cy.contains('Выберите начинку').should('exist');
        });

        it('не должен создать заказ без булки', () => {
            // Добавляем только начинку (без булки)
            cy.contains(MAIN_INGREDIENT_NAME).parent().within(() => {
                cy.get('button').click();
            });

            // Кнопка должна быть неактивна
            cy.get('[data-testid="order-button"]').should('be.disabled');
        });

        it('не должен создать заказ без начинок', () => {
            // Добавляем только булку (без начинок)
            cy.contains(BUN_NAME).parent().within(() => {
                cy.get('button').click();
            });

            // Кнопка должна быть неактивна (нужна хотя бы одна начинка)
            cy.get('[data-testid="order-button"]').should('be.disabled');
        });
    });
});