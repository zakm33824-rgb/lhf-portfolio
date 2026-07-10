(function () {
    function initMouseMarker() {
        let marker = document.getElementById("mouse-position-marker");

        if (!marker) {
            marker = document.createElement("div");
            marker.id = "mouse-position-marker";

            // 关键：插到 footer 前面，避免被 footer ~ * 隐藏
            const footer = document.querySelector("footer, .footer, .site-footer");
            if (footer && footer.parentNode) {
                footer.parentNode.insertBefore(marker, footer);
            } else {
                document.body.insertBefore(marker, document.body.firstChild);
            }
        }

        function updateMarker(event) {
            const x = event.clientX;
            const y = event.clientY;

            marker.style.display = "block";
            marker.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

            const target = event.target;

            if (
                target &&
                target.closest &&
                target.closest("a, button, .btn, .project-card, .skill-card, .card")
            ) {
                document.body.classList.add("mouse-marker-hover");
            } else {
                document.body.classList.remove("mouse-marker-hover");
            }
        }

        window.addEventListener("pointermove", updateMarker, { passive: true });

        window.addEventListener("pointerleave", function () {
            marker.style.transform = "translate3d(-999px, -999px, 0) translate(-50%, -50%)";
            document.body.classList.remove("mouse-marker-hover");
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMouseMarker);
    } else {
        initMouseMarker();
    }
})();
