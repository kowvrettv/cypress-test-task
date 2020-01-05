describe('Posting a reply in discussion', () => {
    it('Log in to discuss.flarum.org', () => {
        cy.visit('http://discuss.flarum.org/t/sandbox')
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

    it('Finding a discussion and post a reply', () => {
        let userTitle;

        cy.fixture('titles').then(title => {
            userTitle = title[0].title;

            cy.get('h3')
                .contains(userTitle)
                .then(($header) => {
                    $header.click()
                })
        })

        cy.get('button[class=" SplitDropdown-button Button Button--primary hasIcon"]').click()

        let randomNumber = Math.floor(Math.random() * 999);
        cy.get('textarea[class="FormControl Composer-flexible"]').type(`Note #${randomNumber}`)

        cy.get('span').contains('Post Reply').click()

        cy.reload()

        cy.get('div[class="Post-body"]')
            .contains('Note')
    })
})