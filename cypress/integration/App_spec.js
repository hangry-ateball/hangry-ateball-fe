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
      cy.contains('Price')
    })
    it('should load form inputs properly', () => {
      cy.get('select')
      cy.get('option')
    })
  })

  describe('After clicking Shake It', () => {
    beforeEach(() => {
      cy.get('div').contains('Get Shakin').click()
      cy.get('select').get('[data-testid="Type"]').select("American")
      cy.get('select').get('[data-testid="Price"]').select("1")
      cy.get('select').get('[data-testid="Travel"]').select("Drive")
      cy.get('input').get('[name="enteredAddress"]').type('Topeka, KS.')
      cy.get('div').contains('Shake It').click()
    })
    it('should load title properly', () => {
      cy.get('[data-testid="title"]')
    })
    it('should load phone number properly', () => {
      cy.get('[data-testid="phoneNumber"]')
    })
    it('should load price that user selected', () => {
      cy.get('div').contains("$")
    })
    it('should load address of found restaurant', () => {
      cy.get('div').contains("KS")
    })
    it('should load rating of found restaurant', () => {
      cy.get('div').contains(3)
    })
    it('should load button properly', () => {
      cy.get('[role="button"]')
    })
    it('should load Lets Go! button', () => {
      cy.get('[data-testid="Lets Go!"]')
    })
    it('should load Send to Friends button', () => {
      cy.get('[data-testid="Send to Friends"]')
    })
    it('should load images properly', () => {
      cy.get('img')
    })
  })
  describe('Favorites', () => {
    beforeEach(() => {
      cy.get('div').contains('Get Shakin').click()
      cy.get('select').get('[data-testid="Type"]').select("American")
      cy.get('select').get('[data-testid="Price"]').select("1")
      cy.get('select').get('[data-testid="Travel"]').select("Drive")
      cy.get('input').get('[name="enteredAddress"]').type('Topeka, KS.')
      cy.get('div').contains('Shake It').click()
    })
    it('should have an unfavorite img', () => {
      cy.get('img').get('[src="/static/media/unfavorite.2958a6aa.png"]')
    })
    it('should turn to active favorite img after press', () => {
      cy.get('img').get('[src="/static/media/unfavorite.2958a6aa.png"]').click()
      cy.get('img').get('[src="/static/media/favorite.72d04ac7.png"]')
    })
    it('should open favorites after pressing favorites tab', () => {
      cy.get('[role="button"]').get('[data-testid="favoritesTab"]').click()
    })
    it('should have no favorites', () => {
      cy.get('[role="button"]').get('[data-testid="favoritesTab"]').click()
      cy.get('[data-testid="noFavoritesMsg"]')
    })
    it('should have one favorite', () => {
      cy.get('img').get('[src="/static/media/unfavorite.2958a6aa.png"]').click()
      cy.get('[role="button"]').get('[data-testid="favoritesTab"]').click()
      cy.get('[data-testid="favoriteRestaurant"]')
    })
  })
})
