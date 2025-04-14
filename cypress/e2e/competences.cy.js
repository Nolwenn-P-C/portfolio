describe('Vérification des cards compétences', () => {

    beforeEach(() => {
      cy.visit('') 
      cy.getBySel('skills-section').should('exist')
    })
    
    it('La card "Tests et Outils" doit être visible et contenir une image ou un titre', () => {
      cy.getBySel('card-tests-outils').should('exist')  
      cy.getBySel('card-tests-outils').within(() => {
        cy.getBySel('skills-img').should('have.length.at.least', 1)
        cy.getBySel('skills-title-img').should('have.length.at.least', 1)
      })
    })
    
    it('La card "Stratégie de Test" doit être visible et contenir une liste', () => {
      cy.getBySel('card-strategie-test').should('exist')  
      cy.getBySel('card-strategie-test').within(() => {
        cy.get('[data-cy="card-strategie-test-ul"]').should('have.length', 1)
      })
    })
    
    it('La card "Développement et Outils" doit être visible et contenir une image ou un titre', () => {
      cy.getBySel('card-dev-outils').should('exist')  
      cy.getBySel('card-dev-outils').within(() => {
        cy.getBySel('skills-img').should('have.length.at.least', 1)
        cy.getBySel('skills-title-img').should('have.length.at.least', 1)
      })
    })
  
})
  