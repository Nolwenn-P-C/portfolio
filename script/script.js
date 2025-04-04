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

// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");

                // Insert HTML content inside the card
                card.insertAdjacentHTML("beforeend", `
                        <div class="card portfolioContent common-block">
                            <img class="card-img-top" src="images/${item.image}" style="width:100%">
                            <div class="card-body">
                                <h4 class="card-title">${item.title}</h4>
                                <p class="card-text">${item.text}</p>
                                <div class="text-center">
                                    <a href="${item.link}" class="btn btn-primary">Lien</a>
                                </div>
                            </div>
                        </div>
                `);

                // Append the card to the current row
                row.insertAdjacentElement("beforeend", card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.insertAdjacentElement("beforeend", row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}


// ***************************************************************************************************************** //
// ***************************************************** Skills **************************************************** //
// ***************************************************************************************************************** //

// Function to dynamically create skill sections from JSON
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    container.classList.add("d-flex", "justify-content-between", "flex-wrap", "mt-4");

    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            const blocks = [
                { key: "tests_et_outils", title: "Tests et Outils" },
                { key: "strategie_de_test", title: "Stratégie de Test" },
                { key: "developpement_et_outils", title: "Développement et Outils" }
            ];

            blocks.forEach((block) => {
                const section = document.createElement("div");
                section.classList.add("card", "p-3", "shadow", "mb-3");
                section.style.width = "32%";
                section.style.minWidth = "300px";

                section.insertAdjacentHTML("beforeend", `<h3 class="text-center">${block.title}</h3>`);

                const content = document.createElement("div");

                if (block.key === "strategie_de_test") {
                    const list = document.createElement("ul");
                    data[block.key].forEach((item) => {
                        list.insertAdjacentHTML("beforeend", `<li>${item.title}</li>`);
                    });
                    content.insertAdjacentElement("beforeend", list);
                } else {
                    let skillRow; // Renamed from 'row' to 'skillRow'
                    data[block.key].forEach((item, index) => {
                        if (index % 3 === 0) {
                            skillRow = document.createElement("div");
                            skillRow.classList.add("row", "justify-content-center", "mt-3");
                            content.insertAdjacentElement("beforeend", skillRow);
                        }

                        const card = document.createElement("div");
                        card.classList.add("col-4", "text-center", "mb-3");
                        card.insertAdjacentHTML("beforeend", `
                            <div>
                                <img src="./images/${item.image}" class="logo-img" alt="${item.title}">
                                <h5 class="mt-2">${item.title}</h5>
                            </div>
                        `);
                        skillRow.insertAdjacentElement("beforeend", card);
                    });
                }

                section.insertAdjacentElement("beforeend", content);
                container.insertAdjacentElement("beforeend", section);
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
