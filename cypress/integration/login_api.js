describe('Login to ThreadNews with login', () => {
    
    context('Given I go to the login page (API)', () => {
        
        it('When I enter correct username and password it provides me with a login', () => {
            cy.request(
                'POST',
                'http://127.0.0.1:8000/login', 
                {
                    "email": "temp@gmail.com",
                    "password": "1234"
                }
            ).then(
                (response) => {
                    expect(response.body).to.have.nested.property('user.user_id', '45af47b4-9bb8-11eb-961d-acde48001122')
                }
            )
        });
    });
});

describe('Login to ThreadNews with invalid login', () => {
    
    context('Given I go to the login page (API)', () => {
        
        it('When I enter incorrect username and password it doesn\'t allow me to login', () => {
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/login',
                body: {
                    "email": "bad@gmail.com",
                    "password": "1234"
                },
                'failOnStatusCode': false
            }).then(
                (response) => {
                    expect(response.status).to.eq(404)
                    expect(response.body).to.have.property('msg', 'no user found')
                }
            )
        });
    });
});