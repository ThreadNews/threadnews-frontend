/* eslint-disable no-undef */
describe('Login feature tests', () => {

    context('given I am not logged in', () => {
        before(() => {
        cy.window().then((win) => {
        win.sessionStorage.clear()
      })
      cy.visit('http://localhost:3000/');
      })
      it('When I put in my credentials to login and click submit it should log me in ', () => {
        cy.contains('Login').click();
        cy.get('.email-input').type('cy@pre.ss');
        cy.get('.password-input').type('cypress');
        cy.get('.submitBtn').click();
        cy.contains('cypressTester');
        cy.url().should('include', '/threads')
      });
      });

      
    context('given I am not logged in', () => {
        before(() => {
        cy.window().then((win) => {
        win.sessionStorage.clear()
      })
      cy.visit('http://localhost:3000/');
      })
      it('When I put in my credentials to signup and click submit it should create a new account', () => {
        cy.contains('signup').click();
        cy.get('.username-input').type('mom');
        cy.get('.email-input').type('mom@mom.mom');
        cy.get('.password-input').type('mom');
        cy.intercept('/newUser')
        cy.get('.submitBtn').click();
        cy.url().should('include', '/threads')
      });
      });

      
      
    context('given I am not logged in', () => {
        before(() => {
        cy.window().then((win) => {
        win.sessionStorage.clear()
      })
      cy.visit('http://localhost:3000/');
      })
      it('When I put in the wrong credentials to login and click submit it should not log me in ', () => {
        cy.contains('Login').click();
        cy.get('.email-input').type('cy@pre.ss');
        cy.get('.password-input').type('wrongpass');
        cy.get('.submitBtn').click();
        cy.intercept('/login')
        cy.contains('signup');
        cy.url().should('include', '/threads')
      });
      });
        

      

}); 