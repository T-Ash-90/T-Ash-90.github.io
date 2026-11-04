
document.addEventListener("DOMContentLoaded", () => {

    // Detect website language
    const isEnglish = window.location.pathname.startsWith("/en/");
    const lang = isEnglish ? "en" : "de";

    // Translations
    const translations = {
        de: {
            title: "Du verlässt jetzt diese Website",
            message: "Du wirst zu {site} weitergeleitet.",
            cancel: "Abbrechen",
            continue: "Weiter zu {site}"
        },
        en: {
            title: "You're leaving this website",
            message: "You are being redirected to {site}.",
            cancel: "Cancel",
            continue: "Continue to {site}"
        }
    };

    const text = translations[lang];

    // Handle Bandcamp and YouTube links, including dynamically loaded links
    document.addEventListener("click", event => {

        const link = event.target.closest(
            'a[href*="bandcamp.com"], a[href*="youtube.com"]'
        );

        if (!link) return;

        // Ignore modified clicks, middle clicks and non-primary clicks
        if (
            event.button !== 0 ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        // Only handle links to the supported services
        const url = new URL(link.href);

        const hostname = url.hostname.toLowerCase();

        let destination;

        if (
            hostname === "bandcamp.com" ||
            hostname.endsWith(".bandcamp.com")
        ) {
            destination = "Bandcamp";
        } else if (
            hostname === "youtube.com" ||
            hostname.endsWith(".youtube.com")
        ) {
            destination = "YouTube";
        } else {
            return;
        }

        event.preventDefault();

        // Prevent multiple dialogs from being opened
        if (document.querySelector(".external-link-dialog")) return;

        // Create dialog
        const dialog = document.createElement("dialog");
        dialog.className = "external-link-dialog";

        // Create dialog content safely
        const heading = document.createElement("h2");
        heading.textContent = text.title;

        const message = document.createElement("p");
        message.textContent = text.message.replace(
            "{site}",
            destination
        );

        const buttons = document.createElement("div");
        buttons.className = "dialog-buttons";

        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.className = "dialog-cancel";
        cancelButton.textContent = text.cancel;

        const continueButton = document.createElement("button");
        continueButton.type = "button";
        continueButton.className = "dialog-continue";
        continueButton.textContent = text.continue.replace(
            "{site}",
            destination
        );

        buttons.append(cancelButton, continueButton);
        dialog.append(heading, message, buttons);

        document.body.appendChild(dialog);

        // Close and remove dialog
        const closeDialog = () => {
            if (dialog.open) {
                dialog.close();
            } else {
                dialog.remove();
            }
        };

        dialog.addEventListener("close", () => {
            dialog.remove();
        });

        // Cancel
        cancelButton.addEventListener("click", closeDialog);

        // Continue in a new tab
        continueButton.addEventListener("click", () => {
            window.open(
                link.href,
                "_blank",
                "noopener,noreferrer"
            );

            closeDialog();
        });

        // Close when clicking outside the dialog
        dialog.addEventListener("click", event => {
            if (event.target === dialog) {
                closeDialog();
            }
        });

        // Show dialog
        dialog.showModal();

        // Set initial keyboard focus
        cancelButton.focus();

    });

});
