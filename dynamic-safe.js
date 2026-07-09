(function () {
  if (window.__SAFE_PORTFOLIO_EFFECTS__) return;
  window.__SAFE_PORTFOLIO_EFFECTS__ = true;

  const body = document.body;

  function addElement(className, tag = "div") {
    const el = document.createElement(tag);
    el.className = className;
    body.appendChild(el);
    return el;
  }

  const progress = addElement("safe-scroll-progress");
  const grid = addElement("safe-grid-bg");
  const scan = addElement("safe-scan-light");

  const canvas = document.createElement("canvas");
  canvas.className = "safe-particle-canvas";
  body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    const count = Math.min(85, Math.floor(width / 20));

    particles = Array.from({ length: count }, function () {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.7 + 0.6,
        alpha: Math.random() * 0.45 + 0.18
      };
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(function (p, i) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255," + p.alpha + ")";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = "rgba(45,212,191," + 0.12 * (1 - d / 120) + ")";
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  drawParticles();
  window.addEventListener("resize", resizeCanvas);

  const cursor = addElement("safe-cursor-glow");

  window.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document.querySelectorAll("a, button, .btn, .project-card, .card, .skill-card").forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      cursor.classList.add("active");
    });

    el.addEventListener("mouseleave", function () {
      cursor.classList.remove("active");
      el.style.transform = "";
    });
  });

  document.querySelectorAll(".project-card, .card, .skill-card, .work-card, .photo-card, .hero-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;

      card.style.transform =
        "perspective(900px) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg) translateY(-8px) scale(1.015)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  window.addEventListener("scroll", function () {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = percent + "%";
  });

  const dock = document.createElement("div");
  dock.className = "safe-floating-dock";
  dock.innerHTML = `
    <a href="index.html" title="首页">⌂</a>
    <a href="#projects" title="作品">◆</a>
    <a href="resume.pdf" title="简历">↓</a>
    <a href="https://github.com/zakm33824-rgb/smart-office-assistant" target="_blank" rel="noopener" title="GitHub">G</a>
  `;
  body.appendChild(dock);
})();
