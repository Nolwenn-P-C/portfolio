import { Navbar } from './navbar.js';
import { Portfolio } from './portfolio.js';
import { Skills } from './skills.js';
import { Contact } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
    const navbar = new Navbar();
    navbar.handleScroll();
    navbar.handleCollapse();

    const portfolio = new Portfolio();
    portfolio.createPortfolioFromJSON();

    const skills = new Skills();
    skills.createSkillsFromJSON();

    const contact = new Contact();
    contact.setupContactForm();
});
