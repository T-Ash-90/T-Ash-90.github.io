document.addEventListener("DOMContentLoaded", function () {
    const navContainer = document.getElementById("nav-placeholder");
    if (!navContainer) return;

    const path = window.location.pathname;
    const currentPage = path.split("/").pop() || "index.html";
    const isEnglish = path.includes("/en/");

    const navFile = isEnglish ? "/shared/nav-en.html" : "/shared/nav-de.html";

    fetch(navFile)
        .then(response => response.text())
        .then(data => {
            navContainer.innerHTML = data;

            const toggle = navContainer.querySelector(".lang-toggle");
            if (toggle) {
                toggle.href = `${isEnglish ? "/de/" : "/en/"}${currentPage}`;
            }
        })
        .catch(error => console.error("Error loading navigation:", error));
});
