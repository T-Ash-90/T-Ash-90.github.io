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

            const toggle = navContainer.querySelector("a.lang-toggle");
            if (toggle) {
                toggle.href = `${isEnglish ? "/de/" : "/en/"}${currentPage}`;
            }

            setupNavObserver();
        })
        .catch(error => console.error("Error loading navigation:", error));
});

function setupNavObserver() {
    const nav = document.querySelector("nav");
    if (!nav) return;

    function adjustBodyPadding() {
        document.body.style.paddingTop = nav.offsetHeight + "px";
    }

    adjustBodyPadding();

    const observer = new ResizeObserver(() => {
        adjustBodyPadding();
    });

    observer.observe(nav);

    window.addEventListener("resize", adjustBodyPadding);
}
