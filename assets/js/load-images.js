fetch('/shared/images-list.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('gallery-placeholder').innerHTML = data;
    initLightbox();
    })
    .catch(error => console.error('Error loading gallery:', error));


function initLightbox() {
    const images = document.querySelectorAll('#gallery-placeholder img');

    images.forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openLightbox(img.src));
    });
}

function openLightbox(src) {
    const overlay = document.createElement("div");
    overlay.id = "lightbox-overlay";
    overlay.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="${src}" class="lightbox-image">
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => {
    overlay.remove();
    });
}
