import "cypress-localstorage-commands";

// login function for jwt token
Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'http://127.0.0.1:8000/login',
        body: {
            email: 'gb@gmail.com',
            password: 'gb'
        }
    }).then(
        (resp) => {
            cy.setLocalStorage('jwt', resp.body.access_token);
        }
    );
});

// update user interests
describe('Update user interests', () => {
    before(() => {
        cy.login();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    context('Given I want to change my user interests and logged in', () =>{
        it('When I update my user interests, it returns with a success message', () => {
            cy.getLocalStorage('jwt').then((token) => {
                cy.request({
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/update_interests',
                    body: {
                        "add": ["Health"],
                        "remove": ["Stocks"]
                    },
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then(
                    (resp) => {
                        expect(resp.status).to.eq(200)
                        expect(resp.body).to.have.property('msg', 'success')
                    }
                );
            });
        });
    });

    context('Given I want to change my user interests but not logged in', () => {
        it('When I update my user interests, it returns with 401 not authorized message', () => {
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/update_interests',
                body: {
                    "add": ["Health"],
                    "remove": ["Stocks"]
                },
                'failOnStatusCode': false
            }).then(
                (resp) => {
                    expect(resp.status).to.eq(401)
                }
            );
        });
    });
});