/* eslint-disable no-undef */
describe('like tests', () => {
    

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
it('when I like an article it sends a like request to the backend', () => {
    cy.intercept('/like');
    cy.get('.likeBtn').eq(0).click();
});
});

context('given I am not logged in', () => {
  before(() => {
  cy.window().then((win) => {
  win.sessionStorage.clear()
})
cy.visit('http://localhost:3000/threads/');
})
it('when I try to like an article a modal shows up stopping me', () => {
  cy.get('.likeBtn').eq(0).click();
  cy.contains('Opps...')
});
});



  context('given I am logged in and already liked an article', () => {
    before(() => {
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
  })
  it('when I unlike it, the backend recieves a request', () => {
    cy.intercept('/like');
    cy.get('.likeBtn').eq(0).click();
  });
  });

}); 