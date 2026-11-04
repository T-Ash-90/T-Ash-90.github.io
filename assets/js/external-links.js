
document.addEventListener("DOMContentLoaded", () => {

    // Detect website language
    const isEnglish = window.location.pathname.startsWith("/en/");
    const lang = isEnglish ? "en" : "de";

    // Translations
    const translations = {
        de: {
            title: "Du verlässt jetzt diese Website",
            message: "Du wirst zu {site} weitergeleitet.",
            continue: "Weiter zu {site}",
            close: "Schließen"
        },
        en: {
            title: "You're leaving this website",
            message: "You are being redirected to {site}.",
            continue: "Continue to {site}",
            close: "Close"
        }
    };

    const text = translations[lang];

    // Handle Bandcamp and YouTube links, including dynamically loaded links
    document.addEventListener("click", event => {

        const link = event.target.closest(
            'a[href*="bandcamp.com"], a[href*="youtube.com"]'
        );

        if (!link) return;

        // Preserve modified clicks and middle clicks
        if (
            event.button !== 0 ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        // Identify destination
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

        // Prevent multiple dialogs
        if (document.querySelector(".external-link-dialog")) return;

        // Create dialog
        const dialog = document.createElement("dialog");
        dialog.className = "external-link-dialog";

        // Close button
        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "dialog-close";
        closeButton.textContent = "×";
        closeButton.setAttribute("aria-label", text.close);
        closeButton.title = text.close;

        // Heading
        const heading = document.createElement("h2");
        heading.textContent = text.title;

        // Message
        const message = document.createElement("p");
        message.textContent = text.message.replace(
            "{site}",
            destination
        );

        // Continue button
        const buttons = document.createElement("div");
        buttons.className = "dialog-buttons";

        const continueButton = document.createElement("button");
        continueButton.type = "button";
        continueButton.className = "dialog-continue";
        continueButton.textContent = text.continue.replace(
            "{site}",
            destination
        );

        buttons.appendChild(continueButton);

        dialog.append(closeButton, heading, message, buttons);

        document.body.appendChild(dialog);

        // Close dialog
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

        // Close button
        closeButton.addEventListener("click", closeDialog);

        // Continue in new tab
        continueButton.addEventListener("click", () => {
            window.open(
                link.href,
                "_blank",
                "noopener,noreferrer"
            );

            closeDialog();
        });

        // Close when clicking outside
        dialog.addEventListener("click", event => {
            if (event.target === dialog) {
                closeDialog();
            }
        });

        // Show dialog
        dialog.showModal();

        // Initial keyboard focus
        continueButton.focus();

    });

});
