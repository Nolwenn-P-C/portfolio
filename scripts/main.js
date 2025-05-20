import { handleNavbarScroll, handleNavbarCollapse } from './navbar.js';
import { createSkillsFromJSON } from './skills.js';
import { createPortfolioFromJSON } from './portfolio.js';
import { setupContactForm } from './contact.js';

// Call the functions to execute the code
document.addEventListener('DOMContentLoaded', () => {
    handleNavbarScroll();
    handleNavbarCollapse();
    createSkillsFromJSON();
    createPortfolioFromJSON();
    setupContactForm();
});
