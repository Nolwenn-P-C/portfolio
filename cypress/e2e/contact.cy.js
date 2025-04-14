import { faker } from '@faker-js/faker';

describe('Contact Form - Soumission valide', () => {
    it('remplit et envoie le formulaire avec succès', () => {
        cy.visit('');

        const fauxNom = faker.person.fullName();
        const fauxEmail = faker.internet.email();
        const fauxMessage = faker.lorem.paragraph();

        cy.getBySel('contact-name').type(fauxNom);
        cy.getBySel('contact-email').type(fauxEmail);
        cy.getBySel('contact-message').type(fauxMessage);
        cy.getBySel('contact-send').click();

        cy.getBySel('success-message').should('be.visible').and('contain', 'Message envoyé avec succès');
    });
});

describe('Contact Form - Validation des champs', () => {
    beforeEach(() => {
        cy.visit('');
    });

    it('affiche un message d’erreur si tous les champs sont vides', () => {
        cy.getBySel('contact-send').click();
        cy.getBySel('response-message').should('contain', 'Tous les champs sont requis');
    });

    it('affiche une erreur si le nom est vide', () => {
        const fauxEmail = faker.internet.email();
        const fauxMessage = faker.lorem.paragraph();

        cy.getBySel('contact-email').type(fauxEmail);
        cy.getBySel('contact-message').type(fauxMessage);
        cy.getBySel('contact-send').click();

        cy.getBySel('response-message').should('contain', 'Tous les champs sont requis');
    });

    it('affiche une erreur si l’email est vide', () => {
        const fauxNom = faker.person.fullName();
        const fauxMessage = faker.lorem.paragraph();

        cy.getBySel('contact-name').type(fauxNom);
        cy.getBySel('contact-message').type(fauxMessage);
        cy.getBySel('contact-send').click();

        cy.getBySel('response-message').should('contain', 'Tous les champs sont requis');
    });

    it('affiche une erreur si le message est vide', () => {
        const fauxNom = faker.person.fullName();
        const fauxEmail = faker.internet.email();

        cy.getBySel('contact-name').type(fauxNom);
        cy.getBySel('contact-email').type(fauxEmail);
        cy.getBySel('contact-send').click();

        cy.getBySel('response-message').should('contain', 'Tous les champs sont requis');
    });
});
