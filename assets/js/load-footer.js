document.addEventListener("DOMContentLoaded", () => {
    const placeholder = document.getElementById("footer-placeholder");
    if (!placeholder) return;

    const isEnglish = window.location.pathname.includes("/en/");
    const footerFile = isEnglish
        ? "/shared/footer-en.html"
        : "/shared/footer-de.html";

    fetch(footerFile)
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load footer");
            }
            return response.text();
        })
        .then(html => {
            placeholder.innerHTML = html;
        })
        .catch(error => console.error("Error loading footer:", error));
});
