describe('Changing user profile information', () => {
    it('Log in to discuss.flarum.org', () => {
        cy.visit('https://discuss.flarum.org/')
        cy.get('ul[class="Header-controls"] li[class="item-logIn"]')
            .click()

        let username;
        let password;

        cy.fixture('users').then(user => {
            username = user[0].login;
            password = user[0].password;

            cy.get('input[name="identification"]')
                .type(username, { force: true })
                .should('have.value', username)

            cy.get('input[name="password"]')
                .type(password)
                .should('have.value', password)
        })

        cy.get('button[type=submit]').click()
    })

    it('Will change user info', () => {
        cy.get('ul[class="Header-controls"] li[class="item-session"]')
            .click()

        cy.get('li[class="item-profile"]')
            .click()

        cy.get('div[class="UserBio-content"]')
            .wait(2000) // because the text was not completely added
            .type('Alexander Khoma{enter}')

        cy.get('li[class="item-bio"]').contains('Alexander Khoma')
    })

    it('Verifying if user info is displayed', () => {
        cy.visit('https://discuss.flarum.org/')
        cy.get('ul[class="Header-controls"] li[class="item-logIn"]')
            .click()

        let username;
        let password;

        cy.fixture('users').then(user => {
            username = user[0].login;
            password = user[0].password;
            console.log(username, password)

            cy.get('input[name="identification"]')
                .type(username, { force: true })
                .should('have.value', username)

            cy.get('input[name="password"]')
                .type(password)
                .should('have.value', password)
        })

        cy.get('button[type=submit]').click()

        cy.get('ul[class="Header-controls"] li[class="item-session"]')
            .click()

        cy.get('li[class="item-profile"]')
            .click()

        cy.get('li[class="item-bio"]').contains('Alexander Khoma')
    })
})