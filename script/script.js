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

    filterDiv.insertAdjacentHTML("beforeend", 
        filters.map(category => 
            `<button class="filter-btn" data-category="${category}">${category}</button>`
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

    projects.forEach(project => {
        if (categoryFilter === "Tous" || project.category === categoryFilter) {
            const card = document.createElement("div");
            card.classList.add("col-lg-4", "mt-4");

            card.insertAdjacentHTML("beforeend", `
                <div class="card portfolioContent common-block">
                    <img class="card-img-top" src="images/${project.image}" style="width:100%">
                    <div class="card-body">
                        <h4 class="card-title">${project.title}</h4>
                        <div class="keywords">
                            ${project.keywords.map(keyword => `<span class="badge bg-secondary">${keyword}</span>`).join('')}
                        </div>
                        <p>Pour plus d'informations</p>
                    </div>
                    <div class="overlay">
                        <div class="overlay-content">
                            <p>${project.text}</p>
                            <a href="${project.link}" class="btn btn-primary">Lien</a>
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
function createCard(title) {
    return `
        <div class="card p-3 shadow mb-3" style="width: 32%; min-width: 300px;">
            <h3 class="text-center">${title}</h3>
            <div class="content"></div>
        </div>
    `;
}

// Génère une liste pour stratégie de test
function createList(items) {
    return `<ul>${items.map(item => `<p>${item.title}</p>`).join('')}</ul>`;
}

// Génère les blocs de 3 colonnes avec image et titre
function createSkillsGrid(items) {
    let html = '';
    items.forEach((item, index) => {
        if (index % 3 === 0) html += '<div class="row justify-content-center mt-3">';

        html += `
            <div class="col-4 text-center mb-3">
                <div>
                    <img src="./images/${item.image}" class="logo-img" alt="${item.title}">
                    <h5 class="mt-2">${item.title}</h5>
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
    container.classList.add("d-flex", "justify-content-between", "flex-wrap", "mt-4");

    fetch("data/skills.json")
        .then(response => response.json())
        .then(data => {
            const blocks = [
                { key: "tests_et_outils", title: "Tests et Outils" },
                { key: "strategie_de_test", title: "Stratégie de Test" },
                { key: "developpement_et_outils", title: "Développement et Outils" }
            ];

            blocks.forEach(({ key, title }) => {
                container.insertAdjacentHTML("beforeend", createCard(title));
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

// Function to contact
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    emailjs.send("service_pqn667l", "template_pryj4ir", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    }, "jhxpsV59jYZ8lGLku")  
    .then(function(response) {
        console.log("Email envoyé avec succès !", response);
        document.getElementById("response-message").innerText = "Message envoyé avec succès !";
        document.getElementById("contact-form").reset();
    }, function(error) {
        console.log("Erreur lors de l'envoi", error);
        document.getElementById("response-message").innerText = "Erreur lors de l'envoi du message.";
        document.getElementById("response-message").style.color = "red";
    });
});

const menuToggle = document.getElementById("tonIDdeMenu"); // Remplace "tonIDdeMenu" par l'ID réel
if (menuToggle) {
    new bootstrap.Collapse(menuToggle).toggle();
}


// ***************************************************************************************************************** //
// ****************************************************** Call ***************************************************** //
// ***************************************************************************************************************** //

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
