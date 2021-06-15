describe('Url Shortener', () => {
  beforeEach(() => {
    cy.fixture('urls').then((urls) => {
      cy.intercept('http://localhost:3001/api/v1/urls', { body: urls }).as('urls')
        })
    cy.visit('http://localhost:3000/')
  })

    it('should display the site title and existing shortened URLs', () => {
      cy.get('header').children('h1').should('contain', 'URL Shortener')
      cy.get("section").children('.url').should('have.length', 1)
    })
  it('should have a form section with the proper input fields', () => {
    cy.get('form').children('input').should('have.length', 2)
  })

  it('should display the input information in the input field', () => {
    cy.get('input[name="title"]')
        .type('So it goes...')
        .should('have.value', 'So it goes...')
  })

  it('should display the URL input in the form input field', () => {
    cy.get('input[name="urlToShorten"]')
        .type('https://www.quickanddirtytips.com/sites/default/files/styles/article_main_image/public/images/21731/gardening%20with%20dogs.png?itok=0OEOl6sd')
        .should('have.value', 'https://www.quickanddirtytips.com/sites/default/files/styles/article_main_image/public/images/21731/gardening%20with%20dogs.png?itok=0OEOl6sd')
  })

  })

