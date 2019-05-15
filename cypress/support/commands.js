/* Start a new Cypress comand */
/* When cypress see "fixture" keyword it will load the files from fixtures folder that match the name after the colon */
/* Use fixtures:todos as default data if nothing is passeed in */
Cypress.Commands.add('seedAndVisit', (seedData='fixture:todos') => {
  cy.server()
    
  cy.route('GET', '/api/todos',seedData )
  /* We must visit appliaction after configuring the route, othervise the page would load and make a request before stub requst is in place */
  cy.visit('/')
})