import TodoList from "../../src/components/TodoList";

describe('List items', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })
  it('properly displays completed items', () => {
    cy.get('.todo-list li')
      .filter('.completed')
      .should('have.length', 1)
      .and('contain', 'Eggs')
      .find('.toggle')
      .should('be.checked')
  })

  it('Shows remaining todos in the footer', () => {
    cy.get('.todo-count')
      .should('contain', 3)
  })

  it('Removes a todo', () => {
    cy.route({
      url: '/api/todos/1',
      method: 'DELETE',
      status: 200,
      response: {}
    })
  

    /* We are making alias for this item so we can use it on defferent occasions */
    cy.get('.todo-list li')
      .as('list')

    /* Using the alias */
    cy.get('@list')
      .first()
      .find('.destroy')

      /* Element is only visible on hover but we can force the click if we want but this is not recomended*/
      /* .click({force: true}) */

      /* Instead of forcing the click on element that is not visible we can do it like this */
      .invoke('show')
      .click()
    
    cy.get('@list')
      .should('have.length', 3)
      .and('not.contain', 'Milk')
  })
})