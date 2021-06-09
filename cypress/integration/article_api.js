import "cypress-localstorage-commands";

// test if list of articles is returned
describe('Retrieve article from id(s)', () => {

    context('Given I go to the articles/ endpoint with an id', () => {
        it('When I call the endpoint with an article id it provides me with the articles', () => {
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/articles',
                body: {
                    "ids": ["24fde03d-0559-5f0a-b546-6235148c1e7f"]
                }
            }).then(
                (response) => {
                    expect(response.body).to.have.property("result");
                    const {result} = response.body;
                    expect(result.length).to.eq(1);
                }
            )
        });
    });

    context('Given I go to the articles/ endpoint a list of ids', () => {
        it('When I call the endpoint it provides me with a list of articles', () => {
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/articles',
                body: {
                    "ids": ["24fde03d-0559-5f0a-b546-6235148c1e7f", "d6f2806d-d221-5444-9003-c865d5f954d8"]
                }
            }).then(
                (response) => {
                    expect(response.body).to.have.property("result");
                    const {result} = response.body;
                    expect(result.length).to.eq(2);
                }
            )
        });
    });

});

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

// test like article
describe('Like an article', () => {
    before(() => {
        cy.login();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    context('Given I have the article id and logged in', () => {
        it('When I like the article, it returns with a success message', () => {
            cy.getLocalStorage("jwt").then((token) => {
                cy.request({
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/like',
                    body: {
                        "action": "add",
                        "id": "24fde03d-0559-5f0a-b546-6235148c1e7f"
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

        it('When I unlike the article, it returns with a success message', () => {
            cy.getLocalStorage("jwt").then((token) => {
                cy.request({
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/like',
                    body: {
                        "action": "delete",
                        "id": "24fde03d-0559-5f0a-b546-6235148c1e7f"
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

    context('Given I have the article id but not logged in', () => {
        it('When I like the article, it returns with 401 not authorized message', () => {
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/like',
                body: {
                    "action": "add",
                    "id": "24fde03d-0559-5f0a-b546-6235148c1e7f"
                },
                'failOnStatusCode': false
            }).then(
                (resp) => {
                    expect(resp.status).to.eq(401)
                }
            );
        });

        it('When I unlike the article, it returns with 401 not authorized message', () => {
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/like',
                body: {
                    "action": "delete",
                    "id": "24fde03d-0559-5f0a-b546-6235148c1e7f"
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

// commenting on article
describe('comment on an article', () => {
    before(() => {
        cy.login();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    context('Given I have an article id and logged in', () =>{
        it('When I comment on the article, it returns with a comment added message', () => {
            cy.getLocalStorage('jwt').then((token) => {
                cy.request({
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/comment',
                    body: {
                        "article_id": "24fde03d-0559-5f0a-b546-6235148c1e7f",
                        "comment": "This is a test comment"
                    },
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then(
                    (resp) => {
                        expect(resp.status).to.eq(200)
                        expect(resp.body).to.have.property('msg', 'comment added')
                    }
                );
            });
        });
    });

    context('Given I have the article id but not logged in', () => {
        it('When I comment the article, it returns with 401 not authorized message', () => {
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/comment',
                body: {
                    "article_id": "24fde03d-0559-5f0a-b546-6235148c1e7f",
                    "comment": "This is a test comment"
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

// repost an article
describe('repost an article', () => {
    before(() => {
        cy.login();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    context('Given I have an article id and logged in', () =>{
        it('When I repost an article, it returns with a successful repost message', () => {
            cy.getLocalStorage('jwt').then((token) => {
                cy.request({
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/repost',
                    body: {
                        "action": "add",
                        "id": "24fde03d-0559-5f0a-b546-6235148c1e7f"
                    },
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then(
                    (resp) => {
                        expect(resp.status).to.eq(200)
                        expect(resp.body).to.have.property('msg', 'liked article')
                    }
                );
            });
        });

        it('When I try to remove a reposted article, it returns with a successfully removed repost message', () => {
            cy.getLocalStorage('jwt').then((token) => {
                cy.request({
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/repost',
                    body: {
                        "action": "remove",
                        "id": "24fde03d-0559-5f0a-b546-6235148c1e7f"
                    },
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then(
                    (resp) => {
                        expect(resp.status).to.eq(200)
                        expect(resp.body).to.have.property('msg', 'removed article')
                    }
                );
            });
        });
    });

    context('Given I have an article id but not logged in', () => {
        it('When I repost the article, it returns with 401 not authorized message', () => {
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/repost',
                body: {
                    "action": "add",
                    "id": "24fde03d-0559-5f0a-b546-6235148c1e7f"
                },
                'failOnStatusCode': false
            }).then(
                (resp) => {
                    expect(resp.status).to.eq(401)
                }
            );
        });

        it('When I remove a reposted article, it returns with 401 not authorized message', () => {
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/repost',
                body: {
                    "action": "remove",
                    "id": "24fde03d-0559-5f0a-b546-6235148c1e7f"
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

// saving an article
describe('save an article', () => {
    before(() => {
        cy.login();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    context('Given I have an article id and logged in', () =>{
        it('When I try to save an article, it successfully saves the article', () => {
            cy.getLocalStorage('jwt').then((token) => {
                cy.request({
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/save',
                    body: {
                        "action": "add",
                        "id": "24fde03d-0559-5f0a-b546-6235148c1e7f"
                    },
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then(
                    (resp) => {
                        expect(resp.status).to.eq(200)
                        expect(resp.body).to.have.property('msg', 'liked article')
                    }
                );
            });
        });

        it('When I try to unsave an article, it successfully removes the saved article', () => {
            cy.getLocalStorage('jwt').then((token) => {
                cy.request({
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/save',
                    body: {
                        "action": "remove",
                        "id": "24fde03d-0559-5f0a-b546-6235148c1e7f"
                    },
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then(
                    (resp) => {
                        expect(resp.status).to.eq(200)
                        expect(resp.body).to.have.property('msg', 'removed liked article')
                    }
                );
            });
        });
    });

    context('Given I have an article id but not logged in', () => {
        it('When I try to save an article, a 401 unauthorized error message occurs', () => {
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/save',
                body: {
                    "action": "add",
                    "id": "24fde03d-0559-5f0a-b546-6235148c1e7f"
                },
                'failOnStatusCode': false
            }).then(
                (resp) => {
                    expect(resp.status).to.eq(401)
                }
            );
        });

        it('When I try to unsave an article, a 401 unauthorized error message occurs', () => {
            cy.request({
                method: 'POST',
                url: 'http://127.0.0.1:8000/save',
                body: {
                    "action": "remove",
                    "id": "24fde03d-0559-5f0a-b546-6235148c1e7f"
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

// template
// describe('', () => {

//     context('', () => {
//         it('', () => {

//         });
//     });
// });