// cypress/integration/token_spec.js

describe('Teste de Autenticação API - Token', () => {
    const clientID = '67823c6d-58de-494f-96d9-86a4c22682cb';
    const clientSecret = 'c2d6a06f-5f31-448b-9079-7e170e8536e4';

    it('Deve obter um token de autenticação com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${clientID}:${clientSecret}`),
            },
            form: true,
            body: {
                grant_type: 'client_credentials',
                scope: 'oob'
            }
        }).then((response) => {
            expect(response.status).to.eq(200); // Validação do Status Code
            expect(response.body).to.have.property('access_token'); // Validação do contrato da API
            expect(response.body).to.have.property('token_type', 'bearer');
            expect(response.body).to.have.property('expires_in');
        });
    });

    it('Deve retornar erro ao enviar client_id incorreto', () => {
        cy.request({
            method: 'POST',
            url: 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token',
            failOnStatusCode: false, // Para lidar com respostas de erro sem que o Cypress falhe
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`client_id_incorreto:${clientSecret}`),
            },
            form: true,
            body: {
                grant_type: 'client_credentials',
                scope: 'oob'
            }
        }).then((response) => {
            expect(response.status).to.eq(401); // Validação do Status Code para erro
            expect(response.body).to.have.property('error'); // Validação do contrato da API em caso de erro
        });
    });

    it('Deve retornar erro ao enviar client_secret incorreto', () => {
        cy.request({
            method: 'POST',
            url: 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token',
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${clientID}:client_secret_incorreto`),
            },
            form: true,
            body: {
                grant_type: 'client_credentials',
                scope: 'oob'
            }
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('error');
        });
    });

    it('Deve retornar erro ao omitir o parâmetro grant_type', () => {
        cy.request({
            method: 'POST',
            url: 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token',
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${clientID}:${clientSecret}`),
            },
            form: true,
            body: {
                scope: 'oob'
            }
        }).then((response) => {
            expect(response.status).to.eq(400); // Status code 400 Bad Request
            expect(response.body).to.have.property('error'); // Contrato da API para erro
        });
    });

    it('Deve retornar erro ao enviar um escopo inválido', () => {
        cy.request({
            method: 'POST',
            url: 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token',
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${clientID}:${clientSecret}`),
            },
            form: true,
            body: {
                grant_type: 'client_credentials',
                scope: 'escopo_invalido'
            }
        }).then((response) => {
            expect(response.status).to.eq(400); // Status code 400 para escopo inválido
            expect(response.body).to.have.property('error'); // Contrato da API para erro
        });
    });

    it('Deve retornar erro ao omitir o cabeçalho de autorização', () => {
        cy.request({
            method: 'POST',
            url: 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token',
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            form: true,
            body: {
                grant_type: 'client_credentials',
                scope: 'oob'
            }
        }).then((response) => {
            expect(response.status).to.eq(401); // Status code 401 Unauthorized
            expect(response.body).to.have.property('error'); // Contrato da API para erro
        });
    });
    
    it('Deve retornar erro ao omitir o parâmetro scope', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.getnet.com.br/auth/oauth/v2/token',
            failOnStatusCode: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${clientID}:${clientSecret}`),
            },
            form: true,
            body: {
                grant_type: 'client_credentials'
            }
        }).then((response) => {
            expect(response.status).to.eq(400); // Status code 400 Bad Request
            expect(response.body).to.have.property('error'); // Contrato da API para erro
        });
    });
    
});
