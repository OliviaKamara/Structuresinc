document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16
    });

    reveals.forEach((item) => observer.observe(item));
});
/* ==================================================
   STRUCTURAL JACKING PAGE: ANIMATED PROCESS
   ================================================== */

(() => {
    const initializeJackingProcess = () => {
        const page = document.querySelector(".jacking-page");

        if (!page || page.dataset.jackingInitialized === "true") {
            return;
        }

        page.dataset.jackingInitialized = "true";

        const process = page.querySelector(".sj-process");

        if (!process) return;

        const motionPreference = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        let observer = null;
        let timer = null;
        let hasPlayed = false;

        const finish = () => {
            window.clearTimeout(timer);

            process.classList.remove("sj-steps-play");
            process.classList.add("sj-steps-finished");

            if (observer) {
                observer.disconnect();
            }
        };

        const play = () => {
            if (hasPlayed || motionPreference.matches) return;

            hasPlayed = true;
            process.classList.add("sj-steps-play");

            timer = window.setTimeout(finish, 1750);
        };

        if (
            "IntersectionObserver" in window &&
            !motionPreference.matches
        ) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        play();
                        observer.disconnect();
                    });
                },
                {
                    threshold: 0.15
                }
            );

            observer.observe(process);
        } else {
            finish();
        }

        const onMotionChange = (event) => {
            if (event.matches) {
                finish();
            }
        };

        if (motionPreference.addEventListener) {
            motionPreference.addEventListener(
                "change",
                onMotionChange
            );
        } else if (motionPreference.addListener) {
            motionPreference.addListener(onMotionChange);
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeJackingProcess,
            { once: true }
        );
    } else {
        initializeJackingProcess();
    }
})();

