describe("Profile Page", () => {

  beforeEach(() => {
    cy.login("steve@rogers.com", "password456")
  })

  it("Login + affichage du nom", () => {

    cy.intercept("POST", "/api/v1/user/profile").as("profile")

    cy.login("steve@rogers.com", "password456")

    cy.wait("@profile")

    cy.get('.main-nav-item').should("contain", "Steve")

    cy.visit("/profile")

    cy.contains("Steve Rogers").should("exist")
  })
  it("Afficher le profil utilisateur", () => {
    cy.contains("Steve").should("exist")
    cy.contains("Rogers").should("exist")
  })

 
})