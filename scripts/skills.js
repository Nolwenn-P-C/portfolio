export class Skills {
    constructor() {
        this.container = document.querySelector("#skills .container");
        this.container.classList.add("mt-4");
    }

    async createSkillsFromJSON() {
        const response = await fetch("data/skills.json");
        const data = await response.json();

        for (const category in data) {
            const block = data[category];
            const cardHTML = `
                <div class="card p-3 shadow mb-3" style="width: 32%; min-width: 300px;" data-cy="${block.test.dataCy}">
                    <h3 class="text-center">${block.test.title}</h3>
                    <div class="content"></div>
                </div>
            `;
            this.container.insertAdjacentHTML("beforeend", cardHTML);

            const content = this.container.lastElementChild.querySelector(".content");

            if (category === "strategie_de_test") {
                this.insertStrategyList(block.data, content);
            } else {
                this.insertSkillsGrid(block.data, content);
            }
        }
    }

    insertStrategyList(items, container) {
        const strategyListHTML = `
            <ul data-cy="card-strategie-test-ul">
                ${items.map(item => `<li>${item.title}</li>`).join('')}
            </ul>
        `;

        container.insertAdjacentHTML("beforeend", strategyListHTML);
    }

    insertSkillsGrid(items, container) {
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
}
