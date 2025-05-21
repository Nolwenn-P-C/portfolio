export class Navbar {
    constructor() {
        this.header = document.querySelector(".navbar");
        this.navLinks = document.querySelectorAll(".nav-item");
        this.menuToggle = document.getElementById("navbarSupportedContent");
    }

    handleScroll() {
        window.onscroll = () => {
            const top = window.scrollY;
            if (top >= 100) {
                this.header.classList.add("navbarDark");
            } else {
                this.header.classList.remove("navbarDark");
            }
        };
    }

    handleCollapse() {
        this.navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                new bootstrap.Collapse(this.menuToggle).toggle();
            });
        });
    }
}
