/**
 * Fonction principale : récupère les données JSON et génère les sections de compétences.
 * @async
 * @returns {Promise<void>} Ne retourne aucune valeur.
 */
export const createSkillsFromJSON = async () => {
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
};

/**
 * Génère une liste pour la stratégie de test.
 * @param {Array} items - Liste des éléments de stratégie.
 * @param {HTMLElement} container - Conteneur où insérer la liste.
 */
const insertStrategyList = (items, container) => {
    const strategyListHTML = `
        <ul data-cy="card-strategie-test-ul">
            ${items.map(item => `<li>${item.title}</li>`).join('')}
        </ul>
    `;

    container.insertAdjacentHTML("beforeend", strategyListHTML);
};

/**
 * Génère les blocs de compétences par ligne de 3.
 * @param {Array} items - Liste des compétences.
 * @param {HTMLElement} container - Conteneur où insérer les blocs.
 */
const insertSkillsGrid = (items, container) => {
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
};
