describe('Automated test cases for http://quotes.toscrape.com/js-delayed/', () => {
  beforeEach(() => {
    cy.visit('http://quotes.toscrape.com/js-delayed/');
  });

  it('should display the delayed quote after the specified delay', () => {
    cy.contains('This quote is delayed').should('not.exist');
    cy.contains('Load Delayed Quote').click();
    cy.contains('This quote is delayed').should('exist');
  });

  it('should display an error message if the delayed quote fails to load', () => {
    cy.intercept('GET', '**/api/quotes', {
      statusCode: 500,
      body: 'Internal Server Error',
    });

    cy.contains('This quote is delayed').should('not.exist');
    cy.contains('Load Delayed Quote').click();
    cy.contains('Error loading quote').should('exist');
  });

  it('should navigate to the previous and next quote using the buttons', () => {
    cy.contains('This quote is delayed').should('not.exist');
    cy.contains('Load Delayed Quote').click();
    cy.get('.quote').as('quoteContainer');

    // Click on the next button and assert that the next quote is displayed
    cy.get('@quoteContainer').then(($quoteContainer) => {
      const currentQuoteText = $quoteContainer.text();
      cy.get('.next').click();
      cy.get('@quoteContainer').should(($newQuoteContainer) => {
        expect($newQuoteContainer.text()).not.to.equal(currentQuoteText);
      });
    });

    // Click on the previous button and assert that the previous quote is displayed
    cy.get('@quoteContainer').then(($quoteContainer) => {
      const currentQuoteText = $quoteContainer.text();
      cy.get('.prev').click();
      cy.get('@quoteContainer').should(($newQuoteContainer) => {
        expect($newQuoteContainer.text()).not.to.equal(currentQuoteText);
      });
    });
  });
});
