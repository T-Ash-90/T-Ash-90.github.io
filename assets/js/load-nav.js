document.addEventListener("DOMContentLoaded", function () {
    const navContainer = document.getElementById("nav-placeholder");
    if (!navContainer) return;

    const path = window.location.pathname;
    const isEnglish = path.startsWith("/en/");
    const isLegacyGerman = path.startsWith("/de/");

    const navFile = isEnglish
        ? "/shared/nav-en.html"
        : "/shared/nav-de.html";

    fetch(navFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not load navigation: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            navContainer.innerHTML = data;

            const toggle = navContainer.querySelector("a.lang-toggle");

            if (toggle) {
              const isHome =
                  path === "/" ||
                  path === "/de/" ||
                  path === "/en/" ||
                  path.endsWith("/index.html");

              const page = path.split("/").pop();

              if (isEnglish) {
                  toggle.href = isHome ? "/" : `/${page}`;
                  toggle.onclick = () =>
                      localStorage.setItem("siteLanguage", "de");
              } else {
                  toggle.href = isHome
                      ? "/en/"
                      : `/en/${page}`;
                  toggle.onclick = () =>
                      localStorage.setItem("siteLanguage", "en");
              }
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

    const observer = new ResizeObserver(adjustBodyPadding);
    observer.observe(nav);

    window.addEventListener("resize", adjustBodyPadding);
}
