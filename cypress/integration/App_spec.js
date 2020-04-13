describe('My First Test', () => {
  beforeEach(() => {
    cy.visit("http://localhost:19006/")
  })
  it('should have Get Shakin button on page load', () => {
      cy.get('div')
      cy.contains('Get Shakin')
  })

  describe('After clicking Get Shakin', () => {
    beforeEach(() => {
      cy.get('div').contains('Get Shakin').click()
    })
    it('should load form labels properly', () => {
      cy.contains('Type')
      cy.contains('Travel')
      cy.contains('Cost')
    })
    it('should load form inputs properly', () => {
      cy.get('select')
      cy.get('option')
    })
  })

  describe('After clicking Shake It', () => {
    beforeEach(() => {
      cy.get('div').contains('Get Shakin').click()
      cy.get('select').get('[data-testid="Cost"]').select("3")
      cy.get('div').contains('Shake It').click()
    })
    it('should load title properly', () => {
      cy.get('[aria-label="title"]')
    })
    it('should load phone number properly', () => {
      cy.get('[datadetectortype="phoneNumber"]')
    })
    it.skip('should load cost that user selected', () => {
      cy.get('div').contains("3")
    })
    it('should load button properly', () => {
      cy.get('[role="button"]')
    })
    it('should load images properly', () => {
      cy.get('img')
    })
  })

})