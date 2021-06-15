describe('Url Shortener', () => {
  beforeEach(() => {
    cy.fixture('url.json')
        .then((data) => {
          cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
            statusCode: 200,
            body: data
          })
          cy.visit('http://localhost:3000/')
        })
  })
    it('should display the site title and existing shortened URLs', () => {
      cy.get('header').children('h1').should('contain', 'URL Shortener')
      cy.get("section").children('.url').should('have.length', 1)
    })
  it('should have a form section with the proper input fields', () => {
    cy.get('form').children('input').should('have.length', 2)
  })

  it('should display the input information in the input fields', () => {
    cy.get('input[name="title"]')
        .type('So it goes...')
        .should('have.value', 'So it goes...')
  })
  })

