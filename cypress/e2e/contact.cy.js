import { faker } from '@faker-js/faker';

describe('Formulaire de contact', () => {
        const fauxNom = faker.person.fullName();
        const fauxEmail = faker.internet.email();
        const fauxMessage = faker.lorem.paragraph();

    beforeEach(() => {
        cy.visit('');
    });

    describe('Soumission valide', () => {
        it('remplit et envoie le formulaire avec succès', () => {
            cy.getBySel('contact-name').type(fauxNom);
            cy.getBySel('contact-email').type(fauxEmail);
            cy.getBySel('contact-message').type(fauxMessage);
            cy.getBySel('contact-send').click();

            cy.getBySel('success-message').should('be.visible').and('contain', 'Message envoyé avec succès');
        });
    });

    describe('Validation des champs obligatoires', () => {
        it('affiche une erreur si tous les champs sont vides', () => {
            cy.getBySel('contact-send').click();
            cy.getBySel('response-message').should('contain', 'Tous les champs sont requis');
        });

        it('affiche une erreur si le nom est vide', () => {
            cy.getBySel('contact-email').type(fauxEmail);
            cy.getBySel('contact-message').type(fauxMessage);
            cy.getBySel('contact-send').click();

            cy.getBySel('response-message').should('contain', 'Tous les champs sont requis');
        });

        it('affiche une erreur si l’email est vide', () => {
            cy.getBySel('contact-name').type(fauxNom);
            cy.getBySel('contact-message').type(fauxMessage);
            cy.getBySel('contact-send').click();

            cy.getBySel('response-message').should('contain', 'Tous les champs sont requis');
        });

        it('affiche une erreur si le message est vide', () => {
            cy.getBySel('contact-name').type(fauxNom);
            cy.getBySel('contact-email').type(fauxEmail);
            cy.getBySel('contact-send').click();

            cy.getBySel('response-message').should('contain', 'Tous les champs sont requis');
        });
    });
});
