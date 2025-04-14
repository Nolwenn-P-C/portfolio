describe('Vérification des filtres du portfolio', () => {

  beforeEach(() => {
      cy.visit('');
  })

  it('Les filtres doivent être visibles', () => {
      cy.getBySel("portfolio-section").should('exist');
      cy.get('.filters').should('exist');
      cy.get('.filter-btn').should('have.length.at.least', 1);
  })

  it('Le filtre "Tous" doit afficher toutes les cartes de portfolio', () => {
      cy.getBySel('portfolio-section')
          .find('.filter-btn')
          .contains('Tous')
          .click();

      cy.getBySel('portfolio-card').should('have.length.at.least', 1);
  })

  it('Le filtre "Tests" doit afficher uniquement les cartes avec la catégorie "Tests"', () => {
      cy.getBySel('portfolio-section')
          .find('.filter-btn')
          .contains('Tests')
          .click();

      cy.getBySel("portfolio-card").should('be.visible').each(($card) => {
          cy.wrap($card).should('have.attr', 'data-category', 'Tests');
      });
  });

  it('Le filtre "Développement" doit afficher uniquement les cartes avec la catégorie "Développement"', () => {
      cy.getBySel('portfolio-section')
          .find('.filter-btn')
          .contains('Développement')
          .click();

      cy.getBySel("portfolio-card").each(($card) => {
          cy.wrap($card).should('be.visible').and('have.attr', 'data-category', 'Développement');
      });
  });
});
