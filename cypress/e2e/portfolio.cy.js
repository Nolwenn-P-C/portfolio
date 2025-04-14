describe('Vérification des cards du Portfolio', () => {
    it('Les cards doivent être visibles dans la section Portfolio', () => {
      cy.visit('')  
  
      cy.getBySel('portfolio-section').should('exist')
  
      cy.getBySel('portfolio-card')
        .should('have.length.at.least', 1)
        .each(($card) => {
          cy.wrap($card).should('be.visible').within(() => {
            cy.getBySel('portfolio-img').should('exist')
            cy.getBySel('portfolio-title').should('exist')
            cy.getBySel('portfolio-keywords').should('exist')
            cy.getBySel('portfolio-text').should('exist')
            cy.getBySel('portfolio-lien').should('exist')
  
          })
        })
    })
  })
  