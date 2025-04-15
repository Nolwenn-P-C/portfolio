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

// Récupérer les données JSON et lancer les fonctions
function createPortfolioFromJSON(categoryFilter = "Tous") {
    fetch("data/portfolio.json")
        .then(response => response.json())
        .then(projects => {
            const container = document.querySelector("#portfolio .container");
            
            container.querySelectorAll('.filters, .row').forEach(element => element.remove());

            createFilters(projects);
            createPortfolio(projects, categoryFilter);
        });
}

// Création des filtres
function createFilters(projects) {
    const container = document.querySelector("#portfolio .container");

    // Création des catégories sans doublon
    const filters = ["Tous", ...new Set(projects.map(project => project.category))];

    const filterDiv = document.createElement("div");
    filterDiv.classList.add("filters", "text-center", "mb-4");
    filterDiv.setAttribute("data-cy", "filters-container");

    filterDiv.insertAdjacentHTML("beforeend", 
        filters.map(category => 
            `<button class="btn btn-primary filter-btn" data-category="${category}">${category}</button>`
        ).join('')
    );

    container.insertAdjacentElement("beforeend", filterDiv);

    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", () => createPortfolioFromJSON(button.dataset.category));
    });
}

// Création des cartes projets
function createPortfolio(projects, categoryFilter) {
    const container = document.querySelector("#portfolio .container");

    const row = document.createElement("div");
    row.classList.add("row");
    row.setAttribute("data-cy", "portfolio-row");

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
}


// ***************************************************************************************************************** //
// ***************************************************** Skills **************************************************** //
// ***************************************************************************************************************** //

// Crée une card vide avec un titre
function createCard(title, dataCy) {
    return `
        <div class="card p-3 shadow mb-3" style="width: 32%; min-width: 300px;" data-cy="${dataCy}">
            <h3 class="text-center">${title}</h3>
            <div class="content"></div>
        </div>
    `;
}

// Génère une liste pour stratégie de test
function createList(items) {
    return `<ul data-cy="card-strategie-test-ul">${items.map(item => `<p>${item.title}</p>`).join('')}</ul>`;
}

// Génère les blocs de 3 colonnes avec image et titre
function createSkillsGrid(items) {
    let html = '';
    items.forEach((item, index) => {
        if (index % 3 === 0) html += '<div class="row justify-content-center mt-3">';

        html += `
            <div class="col-4 text-center mb-3">
                <div>
                    <img src="./images/${item.image}" class="logo-img" alt="${item.title}" data-cy="skills-img">
                    <h4 class="mt-2" data-cy="skills-title-img">${item.title}</h4>
                </div>
            </div>
        `;

        if ((index + 1) % 3 === 0 || index === items.length - 1) html += '</div>';
    });

    return html;
}

// Fonction principale qui assemble tout
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    container.classList.add( "mt-4");

    fetch("data/skills.json")
        .then(response => response.json())
        .then(data => {
            const blocks = [
                { key: "tests_et_outils", title: "Tests et Outils", "data-cy": "card-tests-outils" },
                { key: "strategie_de_test", title: "Stratégie de Test", "data-cy": "card-strategie-test" },
                { key: "developpement_et_outils", title: "Développement et Outils", "data-cy": "card-dev-outils" }
            ];
            
            blocks.forEach(({ key, title, "data-cy": dataCy }) => {
                container.insertAdjacentHTML("beforeend", createCard(title, dataCy));
                const content = container.lastElementChild.querySelector(".content");
            
                if (key === "strategie_de_test") {
                    content.insertAdjacentHTML("beforeend", createList(data[key]));
                } else {
                    content.insertAdjacentHTML("beforeend", createSkillsGrid(data[key]));
                }
            });            
        });
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
