/* eslint-disable no-undef */
describe('threads feature tests', () => {
    

  it('should show the articles when not logged in', () => {
    cy.window().then((win) => {
    win.sessionStorage.clear()
  })
    cy.visit('http://localhost:3000/threads/');
    cy.contains('Not for me')
    cy.contains('signup')
    cy.url().should('include', '/threads')
});

it('should show the articles when logged in', () => {
    cy.window().then((win) => {
    win.sessionStorage.clear()
  })
    cy.visit('http://localhost:3000/');
    cy.contains('Login').click();
    cy.get('.email-input').type('cy@pre.ss');
    cy.get('.password-input').type('cypress');
    cy.get('.submitBtn').click();
    cy.contains('Not for me')
    cy.url().should('include', '/threads')
});


}); 