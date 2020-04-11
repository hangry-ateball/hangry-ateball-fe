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
})