document.addEventListener("DOMContentLoaded", () => {

        const list = document.querySelector(".shows-list");
        const today = new Date();
        today.setHours(0,0,0,0);

        // ---- Load shared shows list ----
        fetch("/shared/shows-list.html")
            .then(response => response.text())
            .then(data => {
                list.innerHTML = data;

                const shows = Array.from(list.querySelectorAll("li"));

                // ---- Sort by date ----
                shows.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
                shows.forEach(show => list.appendChild(show));

                let nextUpcoming = null;
                let smallestDiff = Infinity;

                // ---- Process each show ----
                shows.forEach(show => {
                    const showDate = new Date(show.dataset.date);
                    showDate.setHours(0,0,0,0);

                    // Format DD-MM-YYYY
                    const day = String(showDate.getDate()).padStart(2, '0');
                    const month = String(showDate.getMonth() + 1).padStart(2, '0');
                    const year = showDate.getFullYear();
                    const formattedDate = `${day}-${month}-${year}`;

                    const strong = show.querySelector("strong");
                    if (strong && !strong.dataset.dateAdded) {
                        strong.innerHTML = `<strong style="font-size: 1.2rem;">${formattedDate}: ${strong.innerHTML}</strong>`;
                        strong.dataset.dateAdded = "true";
                    }

                    const diff = showDate - today;

                    // Mark past shows
                    if (diff < 0) {
                        show.classList.add("past");
                    }
                    // Find closest upcoming show
                    else if (diff < smallestDiff) {
                        smallestDiff = diff;
                        nextUpcoming = show;
                    }
                });

                // ---- Scroll to closest upcoming ----
                if (nextUpcoming) {
                    nextUpcoming.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }

            })
            .catch(err => console.error("Error loading shows:", err));
    });