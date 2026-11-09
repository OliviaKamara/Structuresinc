
/* ==========================================================
   STRUCTURES, INC. — SERVICES PAGE
   Scroll Reveals, Staggered Animations & FAQ Interactions
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const main = document.querySelector(".services-main");

    if (!main) return;

    /* ------------------------------------------------------
       01. ACCESSIBILITY — REDUCED MOTION
       ------------------------------------------------------ */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const revealElements = [
        ...main.querySelectorAll(".reveal")
    ];

    /* ------------------------------------------------------
       02. STAGGERED ANIMATION DELAYS
       ------------------------------------------------------ */

    const staggerGroups = [
        ".services-gridCards",
        ".services-solutions__list",
        ".services-approach__steps"
    ];

    staggerGroups.forEach((selector) => {
        const group = main.querySelector(selector);

        if (!group) return;

        const children = [
            ...group.querySelectorAll(":scope > .reveal")
        ];

        children.forEach((element, index) => {
            const delay = Math.min(index * 90, 450);

            element.style.transitionDelay = `${delay}ms`;
        });
    });

    /* ------------------------------------------------------
       03. SCROLL REVEAL OBSERVER
       ------------------------------------------------------ */

    let observer = null;

    function showAllElements() {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
            element.style.transitionDelay = "0ms";
        });
    }

    function enableAnimations() {
        if (
            reducedMotion.matches ||
            !("IntersectionObserver" in window)
        ) {
            main.classList.remove(
                "services-animations-ready"
            );

            showAllElements();
            return;
        }

        main.classList.add(
            "services-animations-ready"
        );

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(entry.target);
                });
            },
            {
                root: null,
                rootMargin: "0px 0px -35px 0px",
                threshold: 0.08
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    }

    enableAnimations();

    /* ------------------------------------------------------
       04. RESPOND TO MOTION PREFERENCE CHANGES
       ------------------------------------------------------ */

    function handleMotionChange() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }

        if (reducedMotion.matches) {
            main.classList.remove(
                "services-animations-ready"
            );

            showAllElements();
        } else {
            enableAnimations();
        }
    }

    if (typeof reducedMotion.addEventListener === "function") {
        reducedMotion.addEventListener(
            "change",
            handleMotionChange
        );
    } else if (
        typeof reducedMotion.addListener === "function"
    ) {
        reducedMotion.addListener(
            handleMotionChange
        );
    }

    /* ------------------------------------------------------
       05. FAQ ACCORDION
       Only one FAQ opens at a time
       ------------------------------------------------------ */

    const faqItems = [
        ...main.querySelectorAll(
            ".services-faq__item"
        )
    ];

    faqItems.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;

            faqItems.forEach((otherItem) => {
                if (otherItem !== item && otherItem.open) {
                    otherItem.open = false;
                }
            });
        });
    });

    /* ------------------------------------------------------
       06. SMOOTH IN-PAGE NAVIGATION
       ------------------------------------------------------ */

    const anchorLinks = main.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: reducedMotion.matches
                    ? "auto"
                    : "smooth",
                block: "start"
            });

            if (window.history.replaceState) {
                window.history.replaceState(
                    null,
                    "",
                    targetId
                );
            }
        });
    });

    /* ------------------------------------------------------
       07. PAGE READY
       ------------------------------------------------------ */

    console.info(
        "Structures, Inc. services page initialized."
    );
});
