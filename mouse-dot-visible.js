(function () {
    function initMouseDotVisible() {
        var marker = document.getElementById("mouse-dot-visible");

        if (!marker) {
            marker = document.createElement("div");
            marker.id = "mouse-dot-visible";

            /*
              插到 body 最前面，避免被 footer 后面的 display:none 规则隐藏
            */
            if (document.body.firstChild) {
                document.body.insertBefore(marker, document.body.firstChild);
            } else {
                document.body.appendChild(marker);
            }
        }

        function update(event) {
            var x = event.clientX + "px";
            var y = event.clientY + "px";

            marker.style.setProperty("--mouse-x", x);
            marker.style.setProperty("--mouse-y", y);
            marker.style.display = "block";

            var target = event.target;

            if (
                target &&
                target.closest &&
                target.closest("a, button, .btn, .project-card, .skill-card, .card")
            ) {
                document.documentElement.classList.add("mouse-dot-hover");
            } else {
                document.documentElement.classList.remove("mouse-dot-hover");
            }
        }

        window.addEventListener("mousemove", update, { passive: true });
        window.addEventListener("pointermove", update, { passive: true });

        window.addEventListener("mouseleave", function () {
            marker.style.setProperty("--mouse-x", "-999px");
            marker.style.setProperty("--mouse-y", "-999px");
            document.documentElement.classList.remove("mouse-dot-hover");
        });

        console.log("mouse-dot-visible loaded");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMouseDotVisible);
    } else {
        initMouseDotVisible();
    }
})();
