(function () {
    function initCursorRing() {
        let ring = document.getElementById("cursor-ring");

        if (!ring) {
            ring = document.createElement("div");
            ring.id = "cursor-ring";
            document.body.appendChild(ring);
        }

        function moveRing(event) {
            const x = event.clientX;
            const y = event.clientY;
            ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        }

        function checkHover(event) {
            const target = event.target;
            if (
                target.closest &&
                target.closest("a, button, .project-card, .skill-card, .card")
            ) {
                document.body.classList.add("cursor-hover");
            } else {
                document.body.classList.remove("cursor-hover");
            }
        }

        window.addEventListener("pointermove", function (event) {
            moveRing(event);
            checkHover(event);
        }, { passive: true });

        window.addEventListener("pointerleave", function () {
            ring.style.transform = "translate3d(-100px, -100px, 0) translate(-50%, -50%)";
            document.body.classList.remove("cursor-hover");
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCursorRing);
    } else {
        initCursorRing();
    }
})();
