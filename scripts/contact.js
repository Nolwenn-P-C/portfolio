export const setupContactForm = () => {
    document.getElementById("contact-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const sanitizeInput = (input) => {
            const tempDiv = document.createElement('div');
            tempDiv.textContent = input;
            return tempDiv.innerHTML;
        };

        const name = sanitizeInput(document.getElementById("name").value.trim());
        const email = sanitizeInput(document.getElementById("email").value.trim());
        const message = sanitizeInput(document.getElementById("message").value.trim());

        const responseMessage = document.getElementById("response-message");

        while (responseMessage.firstChild) {
            responseMessage.removeChild(responseMessage.firstChild);
        }

        if (!name || !email || !message) {
            const errorMessage = `<p class="text-center" style="color: red;" data-cy="error-message">Tous les champs sont requis.</p>`;
            responseMessage.insertAdjacentHTML('beforeend', errorMessage);
            return;
        }

        const isValidEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.(fr|com|net|org|io|edu)$/.test(email.toLowerCase());
        };

        if (!isValidEmail(email)) {
            const errorMessage = `<p class="text-center" style="color: red;" data-cy="error-message">Adresse email invalide.</p>`;
            responseMessage.insertAdjacentHTML('beforeend', errorMessage);
            return;
        }

        if (message.length > 500) {
            const errorMessage = `<p class="text-center" style="color: red;" data-cy="error-message">Le message ne doit pas dépasser 500 caractères.</p>`;
            responseMessage.insertAdjacentHTML('beforeend', errorMessage);
            return;
        }

        try {
            const response = await emailjs.send("service_pqn667l", "template_pryj4ir", {
                name: name,
                email: email,
                message: message
            }, "jhxpsV59jYZ8lGLku");

            console.log("Email envoyé avec succès !", response);

            const successMessage = `<p class="text-center" style="color: green;" data-cy="success-message">Message envoyé avec succès.</p>`;
            responseMessage.insertAdjacentHTML('beforeend', successMessage);

            document.getElementById("contact-form").reset();
        } catch (error) {
            console.log("Erreur lors de l'envoi", error);

            const errorMessage = `<p class="text-center" style="color: red;" data-cy="error-message">Erreur lors de l'envoi du message.</p>`;
            responseMessage.insertAdjacentHTML('beforeend', errorMessage);
        }
    });
};
