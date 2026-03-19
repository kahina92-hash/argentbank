describe("Authentication", () => {

  it("Login avec succès", () => {
    cy.login("steve@rogers.com", "password456")

    cy.url().should("include", "/profile")
    cy.contains("Welcome back").should("exist")
    
  })

  it("Login échoué - mauvais mot de passe", () => {
    cy.visit("http://localhost:3000")

    cy.contains("Sign In").click()

    cy.get('#email').type("steve@rogers.com")
    cy.get('#password').type("wrongpassword")

    cy.get('.sign-in-button').click()

    cy.contains("Error: Password is invalid").should("exist")
  })

  it("Champs obligatoires", () => {
    cy.visit("http://localhost:3000")

    cy.contains("Sign In").click()

    cy.get('.sign-in-button').click()

    cy.get('#email').should("exist")
  })
})