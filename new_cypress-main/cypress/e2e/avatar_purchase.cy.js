describe('Покупка аватара', function () {                                // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
         cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
         cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN');                   // вводим логин
         cy.get('#password').type('USER_PASSWORD');               // вводим пароль
         cy.get('.auth__button').click();                        // нажимаем кнопку Подтвердить
         cy.wait(2000);
         cy.get('.header__container > .header__id').click({ force: true }); // Клик в шапке на аву тренера
         cy.get('[href="/shop"] > .history-info').click();                               // нажимаем кнопку смена аватара
         cy.get('.available > button').first().click({ force: true });   // кликаем Купить у первого доступного аватара
         cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996');                     // вводим номер карты
         cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125');                             // вводим CVV карты
         cy.get(':nth-child(1) > .pay_base-input-v2').type('1225');                           // вводим срок действия карты
         cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('NAME');                           // вводим имя владельца действия карты
         cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
         cy.wait(2000);
         cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
         cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
         cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
     });
 });
