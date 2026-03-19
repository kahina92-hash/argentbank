describe("Security", () => {

  it("Accès interdit sans login", () => {
    cy.visit("http://localhost:3000/profile")

    cy.url().should("include", "/login")
  })

  it("Token supprimé = déconnexion", () => {
    cy.login("steve@rogers.com", "password456")

    cy.window().then((win) => {
      win.localStorage.removeItem("token")
    })

    cy.visit("http://localhost:3000/profile")

    cy.url().should("include", "/login")
  })
})