import * as data from "../helpers/default_data.json"

import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
    });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
    });  
    
    it('Правильный пароль и правильный логин', function () {
         
         cy.get(main_page.email).type(data.login);// ввели верный логин
         cy.get(main_page.password).type(data.password);// ввели верный пароль
         cy.get(main_page.login_button).click()// нажали войти

         cy.get(result_page.title).contains('Авторизация прошла успешно');// проверили, что после аториз. надпись
         cy.get(result_page.title).should('be.visible'); // надпись видна пользователю
         
    })

    it('Забыли пароль', function () {
               
        cy.get(main_page.fogot_pass_btn).click() // нажали забыли пароль

        cy.get(recovery_password_page.email).type(data.login);// ввели имейл
        cy.get(recovery_password_page.send_button).click() //нажали отправить код

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверили, что появилась надпись об отправке пароля        cy.get('#messageHeader').should('be.visible'); // надпись видна пользователю
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
        
    })

    it('Неправильный пароль и правильный логин', function () {
        
        cy.get(main_page.email).type(data.login); // ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio12'); // ввели неверный пароль
        cy.get(main_page.login_button).click() // нажали войти

        cy.get(result_page.title).contains('Такого логина или пароля нет');// проверили, что после аториз. надпись
        cy.get(result_page.title).should('be.visible'); // надпись видна пользователю
    })

    it('Правильный пароль и неправильный логин', function () {
        
        cy.get(main_page.email).type('german@dolnikov1.ru'); // ввели неверный логин
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click() // нажали войти

        cy.get(result_page.title).contains('Такого логина или пароля нет');// проверили, что после аториз. надпись
        cy.get(result_page.title).should('be.visible'); // надпись видна пользователю
    })
    
    it('Правильный пароль и без @ логин', function () {
        
        cy.get('#mail').type('germandolnikov.ru'); // ввели логин без @
        cy.get('#pass').type(data.password); // ввели верный пароль
        cy.get('#loginButton').click() // нажали войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');// проверили, что после аториз. надпись
        cy.get('#messageHeader').should('be.visible'); // надпись видна пользователю
    })

    it('Приведение к строчным буквам в логине', function () {
   
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // ввели логин
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click() // нажали войти

        cy.get(result_page.title).contains('Авторизация прошла успешно');// проверили, что после аториз. надпись
        cy.get(result_page.title).should('be.visible'); // надпись видна пользователю
    })
 }) 