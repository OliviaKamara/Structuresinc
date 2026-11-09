
/* ==========================================================
   STRUCTURES, INC. — HOMEPAGE JAVASCRIPT
   Cube Loader / Tagline / Navigation / FAQ
   ========================================================== */

(() => {
    "use strict";

    const loader = document.getElementById("loader");
    const cube = document.getElementById("cube");
    const cubeScene = document.getElementById("cubeScene");
    const fly = document.getElementById("quoteFly");
    const target = document.getElementById("quoteTarget");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    /* ORIGINAL ANIMATION TIMINGS */

    const spinMs = 1900;
    const openMs = 900;
    const popHoldMs = 900;
    const flyMs = 750;
    const revealAfterFlyMs = 180;
    const fadeAfterMs = 500;

    /* ------------------------------------------------------
       01. LOADER FINISH / FAILSAFE
       ------------------------------------------------------ */

    function finishLoader() {
        if (loader) {
            loader.classList.add("is-hidden");

            loader.setAttribute(
                "aria-hidden",
                "true"
            );
        }

        const header = document.querySelector(".header");
        const main = document.querySelector(".main");

        if (header) {
            header.style.opacity = "1";
        }

        if (main) {
            main.style.opacity = "1";
        }
    }

    /* ------------------------------------------------------
       02. TAGLINE FLIGHT ANIMATION
       ------------------------------------------------------ */

    function flyTaglineToTarget() {
        if (
            !fly ||
            !target ||
            reducedMotion.matches ||
            typeof fly.animate !== "function"
        ) {
            return;
        }

        const from = fly.getBoundingClientRect();
        const to = target.getBoundingClientRect();

        target.classList.add("is-waiting");

        const clone = fly.cloneNode(true);

        clone.removeAttribute("id");
        clone.classList.add("is-flying-clone");

        Object.assign(clone.style, {
            position: "fixed",
            left: "0",
            top: "0",
            margin: "0",
            width: `${from.width}px`,
            transform: `translate(${from.left}px, ${from.top}px)`,
            opacity: "1",
            pointerEvents: "none",
            zIndex: "10001"
        });

        document.body.appendChild(clone);

        fly.style.opacity = "0";

        const animation = clone.animate(
            [
                {
                    transform: `translate(${from.left}px, ${from.top}px)`,
                    opacity: 1
                },
                {
                    transform: `translate(${to.left}px, ${to.top}px)`,
                    opacity: 1
                }
            ],
            {
                duration: flyMs,
                easing: "cubic-bezier(.2,.9,.2,1)",
                fill: "forwards"
            }
        );

        function cleanup() {
            target.classList.remove("is-waiting");
            clone.remove();
        }

        animation.onfinish = cleanup;
        animation.oncancel = cleanup;
    }

    /* ------------------------------------------------------
       03. ORIGINAL CUBE INTRO
       ------------------------------------------------------ */

    function startIntro() {
        if (
            !loader ||
            !cube ||
            !cubeScene ||
            reducedMotion.matches
        ) {
            finishLoader();
            return;
        }

        // Prevent the loader from trapping visitors.
        setTimeout(finishLoader, 6500);

        cube.classList.add("is-spinning");

        setTimeout(() => {
            cube.classList.remove("is-spinning");
            cube.classList.add("is-front");

            requestAnimationFrame(() => {
                cube.classList.add("is-opening");
                cubeScene.classList.add(
                    "is-tagline-visible"
                );
            });

            setTimeout(
                flyTaglineToTarget,
                openMs + popHoldMs
            );

            setTimeout(() => {
                cube.classList.add("is-reveal");
            }, openMs + popHoldMs + revealAfterFlyMs);

            setTimeout(
                finishLoader,
                openMs + popHoldMs + flyMs + fadeAfterMs
            );

        }, spinMs);
    }

    /* ------------------------------------------------------
       04. START INTRO
       ------------------------------------------------------ */

    if (document.readyState === "complete") {
        startIntro();
    } else {
        window.addEventListener(
            "load",
            startIntro,
            { once: true }
        );
    }

    // Fallback if a resource prevents the load event.
    setTimeout(finishLoader, 8000);

    /* ------------------------------------------------------
       05. MOBILE NAVIGATION
       ------------------------------------------------------ */

    const nav = document.querySelector(".nav");
    const toggle = document.querySelector(".nav__toggle");
    const menu = document.getElementById("navMenu");

    if (nav && toggle && menu) {

        function closeMenu() {
            nav.classList.remove("is-open");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        toggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle(
                "is-open"
            );

            toggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        menu.addEventListener("click", (event) => {
            if (event.target.closest("a")) {
                closeMenu();
            }
        });

        document.addEventListener("click", (event) => {
            if (!nav.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    /* ------------------------------------------------------
       06. FAQ ACCORDION
       ------------------------------------------------------ */

    const faqItems = document.querySelectorAll(
        ".home-faq details"
    );

    faqItems.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;

            faqItems.forEach((other) => {
                if (other !== item) {
                    other.open = false;
                }
            });
        });
    });

})();
