export class Portfolio {
    constructor() {
        this.container = document.querySelector("#portfolio .container");
    }

    async createFilters(projects) {
        if (this.container.querySelectorAll(".filters").length > 0) {
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

        this.container.insertAdjacentElement("beforeend", filterDiv);

        document.querySelectorAll(".filter-btn").forEach(button => {
            button.addEventListener("click", () => {
                document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.createPortfolio(projects, button.dataset.category);
            });
        });
    }

    createPortfolio(projects, categoryFilter) {
        let row = this.container.querySelector('.row');

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

        this.container.insertAdjacentElement("beforeend", row);
    }

    async createPortfolioFromJSON() {
        try {
            const response = await fetch("data/portfolio.json");
            const projects = await response.json();

            this.container.querySelectorAll('.filters, .row').forEach(element => element.remove());

            await this.createFilters(projects);
            this.createPortfolio(projects, "Tous");
        } catch (error) {
            console.error("Erreur lors de la récupération des données JSON :", error);
        }
    }
}
