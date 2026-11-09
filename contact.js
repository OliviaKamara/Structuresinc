
/* ==========================================================
   STRUCTURES, INC. — CONTACT PAGE JAVASCRIPT
   Accessible Scroll Reveals
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    if (!reveals.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    function revealAll() {
        reveals.forEach((item) => {
            item.classList.add("is-visible");
        });
    }

    if (
        reducedMotion.matches ||
        !("IntersectionObserver" in window)
    ) {
        revealAll();
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    reveals.forEach((item) => observer.observe(item));
});
