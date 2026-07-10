(function () {
    function initCursorDot() {
        let dot = document.getElementById("cursor-dot");

        if (!dot) {
            dot = document.createElement("div");
            dot.id = "cursor-dot";
            document.body.appendChild(dot);
        }

        function moveDot(event) {
            const x = event.clientX;
            const y = event.clientY;

            dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

            const target = event.target;
            if (
                target &&
                target.closest &&
                target.closest("a, button, .project-card, .skill-card, .card, .btn")
            ) {
                document.body.classList.add("cursor-dot-hover");
            } else {
                document.body.classList.remove("cursor-dot-hover");
            }
        }

        window.addEventListener("pointermove", moveDot, { passive: true });

        window.addEventListener("pointerleave", function () {
            dot.style.transform = "translate3d(-100px, -100px, 0) translate(-50%, -50%)";
            document.body.classList.remove("cursor-dot-hover");
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCursorDot);
    } else {
        initCursorDot();
    }
})();
