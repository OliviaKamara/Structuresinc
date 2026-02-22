// js/gates.js
(() => {

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    function animateGate(pathEl, fromDeg, toDeg, duration = 1000, delay = 0) {
        const pivot = pathEl.getAttribute("data-pivot");
        if (!pivot) return;

        const [cx, cy] = pivot.split(" ").map(Number);

        pathEl.setAttribute("transform", `rotate(${fromDeg} ${cx} ${cy})`);

        const startTime = performance.now() + delay;

        function frame(now) {
            if (now < startTime) return requestAnimationFrame(frame);

            const t = Math.min(1, (now - startTime) / duration);
            const eased = easeOut(t);

            // small clunk settle
            const overshoot =
                t > 0.85
                    ? Math.sin((t - 0.85) / 0.15 * Math.PI) * 3
                    : 0;

            const current = fromDeg + (toDeg - fromDeg) * eased + overshoot;

            pathEl.setAttribute("transform", `rotate(${current} ${cx} ${cy})`);

            if (t < 1) requestAnimationFrame(frame);
            else pathEl.setAttribute("transform", `rotate(${toDeg} ${cx} ${cy})`);
        }

        requestAnimationFrame(frame);
    }

    function init() {
        const left = document.getElementById("bgLeft");
        const right = document.getElementById("bgRight");
        if (!left || !right) return;

        // Left: start leaned outward/up, swing top down
        animateGate(left, 85, 0, 1000, 120);

        // Right: mirror
        animateGate(right, -85, 0, 1000, 350);
    }

    window.addEventListener("load", init);

})();

document.addEventListener("DOMContentLoaded", () => {
    const fadeLayer = document.querySelector(".scroll-fade");
    const hero = document.querySelector(".hero");

    function handleScroll() {
        const heroHeight = hero.offsetHeight;
        const scrollY = window.scrollY;

        // Start fading once hero begins leaving viewport
        const progress = Math.min(scrollY / heroHeight, 1);

        fadeLayer.style.opacity = progress;
    }

    window.addEventListener("scroll", handleScroll);
});