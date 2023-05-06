// Using JavaScript with Cypress

// Importing the Axios library
const axios = require('axios');

// Defining the API endpoint URL
const apiUrl = 'http://quotes.toscrape.com/api/quotes';

// Defining the Cypress test case 1 - Test endpoint
describe('API testing for quotes endpoint', () => {
  it('should return a list of quotes', () => {
    // Making a GET request to the API endpoint using Axios
    cy.wrap(axios.get(apiUrl)).as('quotes');

    // Asserting that the response has a status code of 200
    cy.get('@quotes').its('status').should('eq', 200);

    // Asserting that the response contains an array of quotes
    cy.get('@quotes').its('data').should('be.an', 'array');

    // Asserting that the response contains at least one quote
    cy.get('@quotes').its('data').should('have.length.at.least', 1);

    // Asserting that each quote in the response has a text, author, and tags field
    cy.get('@quotes').its('data').each((quote) => {
      expect(quote).to.have.property('text');
      expect(quote).to.have.property('author');
      expect(quote).to.have.property('tags');
    });
  });
});

// Defining the Cypress test case 2 - Test response time
describe('API testing for quotes endpoint', () => {
  it('should have an acceptable response time', () => {
    cy.clock();
    cy.intercept('GET', 'http://quotes.toscrape.com/api/quotes').as('quotes');
    cy.tick(1000);
    cy.wait('@quotes');
    cy.get('@quotes').then((response) => {
      expect(response.responseTime).to.be.lessThan(2000);
    });
  });
});

// Defining the Cypress test case 3 - Test quotes by author
describe('API testing for quotes endpoint', () => {
  it('should return quotes by a specific author', () => {
    const author = 'Albert Einstein';
    cy.intercept(`GET`, `http://quotes.toscrape.com/api/quotes?author=${author}`).as('authorQuotes');
    cy.request(`GET`, `http://quotes.toscrape.com/api/quotes?author=${author}`).then((response) => {
      cy.wait('@authorQuotes');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body.every((quote) => quote.author === author)).to.be.true;
    });
  });
});

// Defining the Cypress test case 4 - Test API 404 error
describe('API testing for quotes endpoint', () => {
  it('should return a 404 error for an invalid URL', () => {
    const invalidUrl = 'http://quotes.toscrape.com/api/invalid-url';
    cy.request({
      url: invalidUrl,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
});

// Defining the Cypress test case 5 - Test that the API returns the correct content type in the response header
describe('API testing for quotes endpoint', () => {
  it('should return the correct content type in the response header', () => {
    const apiUrl = 'http://quotes.toscrape.com/api/quotes';
    cy.request(apiUrl).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.headers['content-type']).to.include('application/json');
    });
  });
});
