describe('Lien test', () => {
    const baseUrl = 'http://localhost:5173'

    beforeEach(() => {
        cy.visit(baseUrl)
    })

    it('should click on sign In', () => {
        cy.contains('Sign In').click()

    })

    beforeEach(() => {
        cy.visit(baseUrl + '/sign-in')
    })
    it('should display login form', () => {
        cy.get('.sign-in-content').should('exist')
         cy.get('#username').type('steve@rogers.com')
        cy.get('#password').type('password456')
        cy.get('.sign-in-button').click()
    })




})