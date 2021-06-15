describe('Url Shortener', () => {
  beforeEach(() => {
    cy.fixture('url')
        .then((data) => {
          cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
            statusCode: 200,
            body: data
          })
        })
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        id: 100,
        long_url: 'https://www.quickanddirtytips.com/sites/default/files/styles/article_main_image/public/images/21731/gardening%20with%20dogs.png?itok=0OEOl6sd',
        short_url: 'http://localhost:3001/useshorturl/100',
        title: 'The dog is working in the garden again...',
      }
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

  it('The user should be able to fill out each input on the form element, click the submit button, and have the new shortened URL render', () => {
    cy.get('input[name="title"]')
        .type(`The dog is working in the garden again...`)
        .get('input[name="urlToShorten"]')
        .type(`https://www.quickanddirtytips.com/sites/default/files/styles/article_main_image/public/images/21731/gardening%20with%20dogs.png?itok=0OEOl6sd`)
        .get('button').click()
        // .get('section').children('.url').should('have.length', 2)
        .get('div[id="100"] > h3').should('have.text', `The dog is working in the garden again...`)
  })

  })

