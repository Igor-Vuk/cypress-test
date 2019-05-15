import { isContext } from "vm";

describe('Input form', () => {

  /* Run nefore each individual test. We can add the whole link here or define it in cypress.json as baseUrl */
  beforeEach(() => {
    /* Visit the page */
    cy.seedAndVisit([])
  })

  it('focuses input on load', () => {
    cy.visit("http://localhost:3030")
    cy.focused()
      .should('have.class', 'new-todo')
  })

  /* By adding "it.only" test will run by itself without creating dependencies between them */
  it('accepts input', () => {
    const typedText = 'Buy Milk'
    
    /* Select the input by class */
    cy.get('.new-todo')
      /* Type in input */
      .type(typedText)
      /* Check if value is what we typed */
      .should('have.value', typedText)
  })

  /* Context like describe is a way to group and organize out tests */
  context('Form submission', () => {
    beforeEach(() => {
      /* Start a server */
      cy.server()
    })
    

    it('Shows an error message on failed submission', () => {
      cy.route({
        method: 'POST',
        url: '/api/todos',
        status: 500,
        response: {}
      })

      cy.get('.new-todo')
      /* type "test" and press enter */
        .type('test{enter}')
      cy.get('.todo-list li')
        .should('not.exist')
      cy.get('.error')
        .should('be.visible')
    })

    it('Adds a new todo on submit', () => {
      const itemText = 'Buy eggs'
      
      /* Define a request we want to handle. Even though we don't have API, we are making our own response. This way we can test even before API is ready */
      cy.route('POST', '/api/todos', {
        name: itemText,
        id: 1,
        isComplete: false
      })
      cy.get('.new-todo')
        .type(itemText)
        /* Press and enter by wrapping it in curly brackets */
        .type('{enter}')
        .should('have.value', '')
      cy.get('.todo-list li')
        .should('have.length', 1)
        /* "and" is exactly like "should". We use it to chain actions */
        .and('contain', itemText)

    })
  })
})