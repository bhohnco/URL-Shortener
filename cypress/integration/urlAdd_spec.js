describe('UrlContainer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  it('should display the new shortened URL after being filled out', () => {
    cy.get('input').eq(0).type('Testing URL')
    cy.get('input').eq(1).type('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    cy.get('button').click()
    cy.get('.url').eq(1)
        .get('h3').eq(1).should('have.text', 'Testing URL')
        .get('a').eq(1).should('include.text', 'http://localhost:3001/useshorturl/')
        .get('p').eq(1).should('have.text', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  });
})
