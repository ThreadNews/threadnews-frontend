/* eslint-disable no-undef */
describe('Login feature tests', () => {
    

        it('should log in properly', () => {
            cy.window().then((win) => {
            win.sessionStorage.clear()
          })
            cy.visit('http://localhost:3000/');
            cy.contains('Login').click();
            cy.get('.email-input').type('cy@pre.ss');
            cy.get('.password-input').type('cypress');
            cy.get('.submitBtn').click();
            cy.contains('cypressTester');
            cy.url().should('include', '/threads')
        });

        it('should be able to create a new account', () =>{
            cy.window().then((win) => {
                win.sessionStorage.clear()
              })
            cy.visit('http://localhost:3000/');
            cy.contains('signup').click();
            cy.get('.username-input').type('mom');
            cy.get('.email-input').type('mom@mom.mom');
            cy.get('.password-input').type('mom');
            cy.intercept('/newUser')
            cy.get('.submitBtn').click();
            cy.url().should('include', '/threads')
        })

        
        it('should not log in with a wrong passwork', () => {
            cy.window().then((win) => {
            win.sessionStorage.clear()
          })
            cy.visit('http://localhost:3000/');
            cy.contains('Login').click();
            cy.get('.email-input').type('cy@pre.ss');
            cy.get('.password-input').type('wrongpass');
            cy.get('.submitBtn').click();
            cy.intercept('/login')
            cy.contains('signup');
            cy.url().should('include', '/threads')
        });

}); 