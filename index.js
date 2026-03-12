(function () {
    const loader = document.getElementById("loader");
    const cube = document.getElementById("cube");
    const cubeScene = document.getElementById("cubeScene");
    const fly = document.getElementById("quoteFly");
    const target = document.getElementById("quoteTarget");

    const spinMs = 1900;
    const openMs = 900;
    const popHoldMs = 900;
    const flyMs = 750;
    const revealAfterFlyMs = 180;
    const fadeAfterMs = 500;

    function rect(el) {
        return el.getBoundingClientRect();
    }

    function flyTaglineToTarget() {
        if (!fly || !target) return;

        target.classList.add("is-waiting");

        const from = rect(fly);
        const to = rect(target);

        const clone = fly.cloneNode(true);
        clone.removeAttribute("id");
        clone.classList.add("is-flying-clone");

        clone.style.position = "fixed";
        clone.style.left = "0";
        clone.style.top = "0";
        clone.style.margin = "0";
        clone.style.width = from.width + "px";
        clone.style.transform = `translate(${from.left}px, ${from.top}px)`;
        clone.style.opacity = "1";
        clone.style.pointerEvents = "none";
        clone.style.zIndex = "10001";

        document.body.appendChild(clone);
        fly.style.opacity = "0";

        const anim = clone.animate(
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

        anim.onfinish = () => {
            target.classList.remove("is-waiting");
            clone.remove();
        };
    }

    window.addEventListener("load", () => {
        cube.classList.add("is-spinning");

        setTimeout(() => {
            cube.classList.remove("is-spinning");
            cube.classList.add("is-front");

            requestAnimationFrame(() => {
                cube.classList.add("is-opening");
                cubeScene.classList.add("is-tagline-visible");
            });

            setTimeout(() => {
                flyTaglineToTarget();
            }, openMs + popHoldMs);

            setTimeout(() => {
                cube.classList.add("is-reveal");
            }, openMs + popHoldMs + revealAfterFlyMs);

            setTimeout(() => {
                loader.classList.add("is-hidden");
            }, openMs + popHoldMs + flyMs + fadeAfterMs);

        }, spinMs);
    }, { once: true });

    const nav = document.querySelector(".nav");
    const toggle = document.querySelector(".nav__toggle");
    const menu = document.getElementById("navMenu");

    if (nav && toggle && menu) {
        toggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(isOpen));
        });

        menu.addEventListener("click", (e) => {
            const a = e.target.closest("a");
            if (!a) return;
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });

        document.addEventListener("click", (e) => {
            if (nav.contains(e.target)) return;
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });
    }
})();