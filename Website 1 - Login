describe('Automated test case for login on http://quotes.toscrape.com/login', () => {
  const dummyUsername = 'dummy_user';
  const dummyPassword = 'dummy_password';
  const invalidUsername = 'invalid_user';
  const invalidPassword = 'invalid_password';

  beforeEach(() => {
    cy.visit('http://quotes.toscrape.com/login');
  });

  it('should successfully log in with valid credentials', () => {
    cy.get('input[name="username"]').type(dummyUsername);
    cy.get('input[name="password"]').type(dummyPassword);
    cy.get('input[value="Login"]').click();

    // Asserting that the login was successful, e.g., by checking the URL or a unique element on the page
    cy.url().should('eq', 'http://quotes.toscrape.com/');
    cy.contains('h1', 'Top Ten tags').should('exist');
    // Clicking on a tag and asserting that it filters the results
    cy.get('.tag').first().click();
    cy.get('.quote').should('have.length.gt', 0);

    // Clicking on the 'About' link for an author and asserting that it opens the author about page
    cy.get('.author').first().within(() => {
      cy.contains('a', 'About').click();
    });
    cy.url().should('include', '/author/');
    cy.contains('h3', 'Author Details').should('exist');
  });

  it('should display an error message with invalid credentials', () => {
    cy.get('input[name="username"]').type(invalidUsername);
    cy.get('input[name="password"]').type(invalidPassword);
    cy.get('input[value="Login"]').click();

    // Asserting that the error message is displayed
    cy.contains('span.error').should('contain', 'Invalid credentials');
  });
});
