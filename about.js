document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll(".reveal");
    const heroVisual = document.querySelector(".about-hero__visual");
    const core = document.querySelector(".about-core");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    }, {
        threshold: 0.16
    });

    revealItems.forEach((item) => revealObserver.observe(item));

    if (heroVisual && core) {
        heroVisual.addEventListener("mousemove", (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const moveX = ((x / rect.width) - 0.5) * 14;
            const moveY = ((y / rect.height) - 0.5) * 14;

            core.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        heroVisual.addEventListener("mouseleave", () => {
            core.style.transform = "translate(0, 0)";
        });
    }
});
