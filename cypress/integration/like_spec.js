/* eslint-disable no-undef */
describe('like tests', () => {
    

  it('should like an article properly', () => {
    cy.window().then((win) => {
    win.sessionStorage.clear()
  })
  
  cy.visit('http://localhost:3000/');
  cy.contains('Login').click();
  cy.get('.email-input').type('cy@pre.ss');
  cy.get('.password-input').type('cypress');
  cy.get('.submitBtn').click();
    cy.intercept('/like');
    cy.get('.likeBtn').eq(0).click();
});

it('should like an article properly', () => {
    cy.window().then((win) => {
    win.sessionStorage.clear()
  })
  
  cy.visit('http://localhost:3000/threads/');
    cy.get('.likeBtn').eq(0).click();
    cy.contains('Opps...')
});

  it('should unlike an article properly', () => {
      cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    
    cy.visit('http://localhost:3000/');
    cy.contains('Login').click();
    cy.get('.email-input').type('cy@pre.ss');
    cy.get('.password-input').type('cypress');
    cy.get('.submitBtn').click();
    cy.intercept('/like');
    cy.get('.likeBtn').eq(0).click();
    cy.intercept('/like');
    cy.get('.likeBtn').eq(0).click();
  });

}); 