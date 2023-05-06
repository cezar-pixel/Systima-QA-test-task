describe('Automated test case for scrolling on http://quotes.toscrape.com/scroll', () => {
  beforeEach(() => {
    cy.visit('http://quotes.toscrape.com/scroll');
  });

  it('should load additional quotes when scrolling to the bottom', () => {
    cy.get('.quote').should('have.length', 10);
    
    // Scroll to the bottom of the page
    cy.scrollTo('bottom');
    
    // Wait for additional quotes to load
    cy.get('.quote').should('have.length.greaterThan', 10);
  });
});
