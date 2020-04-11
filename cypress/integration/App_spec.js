describe('My First Test', () => {
  beforeEach(() => {
    cy.visit("http://localhost:19006/")
  })
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
  it('should have Get Shakin button on page load', () => {
      cy.get('div')
      cy.contains('Get Shakin')
  })

  it.only('should load form labels properly', () => {
      cy.get('div').contains('Get Shakin').click()
      cy.contains('Type')
      cy.contains('Travel')
      cy.contains('Cost')
  })
  it.only('should load form inputs properly', () => {
    cy.get('div').contains('Get Shakin').click()
    cy.get('select')
    cy.get('option')
  })

})