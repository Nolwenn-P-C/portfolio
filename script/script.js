// ***************************************************************************************************************** //
// ***************************************************** Navbar **************************************************** //
// ***************************************************************************************************************** //

// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}


// ***************************************************************************************************************** //
// *************************************************** Portfolio *************************************************** //
// ***************************************************************************************************************** //

/**
 * Crée les boutons de filtres en fonction des catégories récupérées depuis le fichier JSON.
 * @async
 * @returns {Promise<void>} Ne retourne aucune valeur.
 */
const createFilters = async (projects) => {
    const container = document.querySelector("#portfolio .container");

    if (container.querySelectorAll(".filters").length > 0) {
        return;
    }

    const filterDiv = document.createElement("div");
    filterDiv.classList.add("filters", "text-center", "mb-4");
    filterDiv.setAttribute("data-cy", "filters-container");

    filterDiv.insertAdjacentHTML("beforeend", '<button class="btn btn-primary filter-btn active" data-category="Tous">Tous</button>');

    const categories = [...new Set(projects.map(project => project.category))];
    categories.forEach((category) => {
        const btnHTML = `<button class="btn btn-primary filter-btn" data-category="${category}">${category}</button>`;
        filterDiv.insertAdjacentHTML("beforeend", btnHTML);
    });

    container.insertAdjacentElement("beforeend", filterDiv);

    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            createPortfolio(projects, button.dataset.category);
        });
    });
};

/**
 * Filtre les projets en fonction des boutons de filtres cliqués.
 * @param {Array} projects - Liste des projets.
 * @param {string} categoryFilter - Catégorie à filtrer.
 */
const createPortfolio = (projects, categoryFilter) => {
    const container = document.querySelector("#portfolio .container");
    let row = container.querySelector('.row');

    if (!row) {
        row = document.createElement("div");
        row.classList.add("row");
    } else {
        for (let i = row.children.length - 1; i >= 0; i--) {
            row.removeChild(row.children[i]);
        }
    }

    projects.forEach(project => {
        if (categoryFilter === "Tous" || project.category === categoryFilter) {
            const card = document.createElement("div");
            card.classList.add("col-lg-4", "mt-4");
            card.setAttribute("data-cy", "portfolio-card");
            card.setAttribute("data-category", project.category);

            card.insertAdjacentHTML("beforeend", `
                <div class="card portfolioContent common-block">
                    <img class="card-img-top" src="images/${project.image}" alt="${project.alt}" style="width:100%" data-cy="portfolio-img">
                    <div class="card-body">
                        <h3 class="card-title" data-cy="portfolio-title">${project.title}</h3>
                        <div class="keywords" data-cy="portfolio-keywords">
                            ${project.keywords.map(keyword => `<span class="badge bg-secondary">${keyword}</span>`).join('')}
                        </div>
                        <p>Pour plus d'informations</p>
                    </div>
                    <div class="overlay">
                        <div class="overlay-content">
                            <p data-cy="portfolio-text">${project.text}</p>
                            <a href="${project.accès}" class="btn btn-primary" target="_blank" data-cy="portfolio-lien">Consulter</a>
                        </div>
                    </div>
                </div>
            `);

            row.appendChild(card);
        }
    });

    container.insertAdjacentElement("beforeend", row);
};

/**
 * Récupère les données JSON et lance les fonctions pour créer les filtres et le portfolio.
 */
const createPortfolioFromJSON = async () => {
    try {
        const response = await fetch("data/portfolio.json");
        const projects = await response.json();
        const container = document.querySelector("#portfolio .container");

        container.querySelectorAll('.filters, .row').forEach(element => element.remove());

        await createFilters(projects);
        createPortfolio(projects, "Tous");
    } catch (error) {
        console.error("Erreur lors de la récupération des données JSON :", error);
    }
};


// ***************************************************************************************************************** //
// ***************************************************** Skills **************************************************** //
// ***************************************************************************************************************** //

/**
 * Fonction principale : récupère les données JSON et génère les sections de compétences.
 * @async
 * @returns {Promise<void>} Ne retourne aucune valeur.
 */
async function createSkillsFromJSON() {
    const response = await fetch("data/skills.json");
    const data = await response.json();
    const container = document.querySelector("#skills .container");
    container.classList.add("mt-4");

    for (const category in data) {
        const block = data[category];
        const cardHTML = `
            <div class="card p-3 shadow mb-3" style="width: 32%; min-width: 300px;" data-cy="${block.test.dataCy}">
                <h3 class="text-center">${block.test.title}</h3>
                <div class="content"></div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", cardHTML);

        const content = container.lastElementChild.querySelector(".content");

        if (category === "strategie_de_test") {
            insertStrategyList(block.data, content);
        } else {
            insertSkillsGrid(block.data, content);
        }
    }
}

/**
 * Génère une liste pour la stratégie de test.
 * @param {Array} items - Liste des éléments de stratégie.
 * @param {HTMLElement} container - Conteneur où insérer la liste.
 */
function insertStrategyList(items, container) {
    const strategyListHTML = `
        <ul data-cy="card-strategie-test-ul">
            ${items.map(item => `<li>${item.title}</li>`).join('')}
        </ul>
    `;

    container.insertAdjacentHTML("beforeend", strategyListHTML);
}


/**
 * Génère les blocs de compétences par ligne de 3.
 * @param {Array} items - Liste des compétences.
 * @param {HTMLElement} container - Conteneur où insérer les blocs.
 */
function insertSkillsGrid(items, container) {
    let skillsRowHTML = '';

    items.forEach((item, index) => {
        if (index % 3 === 0) {
            skillsRowHTML += '<div class="row justify-content-center mt-3">';
        }

        skillsRowHTML += `
            <div class="col-4 text-center mb-3">
                <div>
                    <img src="./images/${item.image}" class="logo-img" alt="${item.title}" data-cy="skills-img">
                    <h4 class="mt-2" data-cy="skills-title-img">${item.title}</h4>
                </div>
            </div>
        `;

        if (index % 3 === 2 || index === items.length - 1) {
            skillsRowHTML += '</div>';
        }
    });

    container.insertAdjacentHTML("beforeend", skillsRowHTML);
}


// ***************************************************************************************************************** //
// **************************************************** Contact **************************************************** //
// ***************************************************************************************************************** //

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Nettoyage des entrées utilisateur
    function sanitizeInput(input) {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = input;
        return tempDiv.innerHTML;
    }

    const name = sanitizeInput(document.getElementById("name").value.trim());
    const email = sanitizeInput(document.getElementById("email").value.trim());
    const message = sanitizeInput(document.getElementById("message").value.trim());

    const responseMessage = document.getElementById("response-message");

    // Supprime tout message existant avant d’en afficher un nouveau
    while (responseMessage.firstChild) {
        responseMessage.removeChild(responseMessage.firstChild);
    }

    // Validation des champs
    if (!name || !email || !message) {
        const errorMessage = `<p class="text-center" style="color: red;" data-cy="error-message">Tous les champs sont requis.</p>`;
        responseMessage.insertAdjacentHTML('beforeend', errorMessage);
        return;
    }

    // Vérification de l'email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.(fr|com|net|org|io|edu)$/.test(email.toLowerCase());
    }

    if (!isValidEmail(email)) {
        const errorMessage = `<p class="text-center" style="color: red;" data-cy="error-message">Adresse email invalide.</p>`;
        responseMessage.insertAdjacentHTML('beforeend', errorMessage);
        return;
    }

    // Vérification de la longueur du message
    if (message.length > 500) {
        const errorMessage = `<p class="text-center" style="color: red;" data-cy="error-message">Le message ne doit pas dépasser 500 caractères.</p>`;
        responseMessage.insertAdjacentHTML('beforeend', errorMessage);
        return;
    }

    // Envoi via EmailJS
    emailjs.send("service_pqn667l", "template_pryj4ir", {
        name: name,
        email: email,
        message: message
    }, "jhxpsV59jYZ8lGLku")
    .then(function(response) {
        console.log("Email envoyé avec succès !", response);

        const successMessage = `<p class="text-center" style="color: green;" data-cy="success-message">Message envoyé avec succès.</p>`;
        responseMessage.insertAdjacentHTML('beforeend', successMessage);

        document.getElementById("contact-form").reset();
    }, function(error) {
        console.log("Erreur lors de l'envoi", error);

        const errorMessage = `<p class="text-center" style="color: red;" data-cy="error-message">Erreur lors de l'envoi du message.</p>`;
        responseMessage.insertAdjacentHTML('beforeend', errorMessage);
    });
});


// ***************************************************************************************************************** //
// ****************************************************** Call ***************************************************** //
// ***************************************************************************************************************** //

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
