/* eslint-disable no-undef */
describe('threads feature tests', () => {    
  context('given I am not logged in', () => {
    before(() => {
    cy.window().then((win) => {
    win.sessionStorage.clear()
  })
  })
  it('When I go to threads page I should see generic articles', () => {
    cy.visit('http://localhost:3000/threads/');
    cy.contains('Not for me')
    cy.contains('signup')
    cy.url().should('include', '/threads')
  });
  });


  context('given I am logged in', () => {

  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.visit('http://localhost:3000/');
    cy.contains('Login').click();
    cy.get('.email-input').type('cy@pre.ss');
    cy.get('.password-input').type('cypress');
    cy.get('.submitBtn').click();
  })
  it('When I go to my threads page I should see articles', () => {
    cy.contains('Not for me')
    cy.url().should('include', '/threads')
  });
  });


}); 