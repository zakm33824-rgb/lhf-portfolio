const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.16
});

revealEls.forEach((el) => observer.observe(el));

console.log("个人作品展示网站已加载：含动画、项目详情、移动端适配。");

// ===== Dynamic Interactive Portfolio Upgrade =====

(function () {
  const body = document.body;

  const canvas = document.createElement("canvas");
  canvas.className = "dynamic-particles";
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];
  let width = 0;
  let height = 0;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const count = Math.min(90, Math.floor(width / 18));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.45 + 0.15
    }));
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
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
          ctx.strokeStyle = `rgba(45,212,191,${0.12 * (1 - d / 120)})`;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  drawParticles();
  window.addEventListener("resize", resizeCanvas);

  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  window.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    document.documentElement.style.setProperty("--mouse-x", `${x}px`);
    document.documentElement.style.setProperty("--mouse-y", `${y}px`);

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
  });

  const dynamicLine = document.createElement("div");
  dynamicLine.className = "dynamic-line";
  document.body.appendChild(dynamicLine);

  const revealTargets = document.querySelectorAll(
    "section, .project-card, .card, .skill-card, .work-card, .about, .hero, .contact"
  );

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));

  const tiltTargets = document.querySelectorAll(".project-card, .card, .photo-card, .hero-card, img");

  tiltTargets.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });

  const magneticTargets = document.querySelectorAll("a, button, .btn");

  magneticTargets.forEach((el) => {
    el.classList.add("magnetic");

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px) scale(1.04)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });

  const heroImage = document.querySelector("img");
  if (heroImage) {
    heroImage.classList.add("float-soft");
  }
})();

// ===== Cyber Neon V2 Upgrade =====

(function () {
  if (window.__CYBER_NEON_V2__) return;
  window.__CYBER_NEON_V2__ = true;

  const body = document.body;

  body.classList.add("v2-page-ready");

  const loader = document.createElement("div");
  loader.className = "v2-loader";
  loader.innerHTML = `<div class="v2-loader-core"></div>`;
  body.appendChild(loader);

  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hide"), 500);
    setTimeout(() => loader.remove(), 1400);
  });

  const progress = document.createElement("div");
  progress.className = "v2-scroll-progress";
  body.appendChild(progress);

  const grid = document.createElement("div");
  grid.className = "v2-cyber-grid";
  body.prepend(grid);

  const scan = document.createElement("div");
  scan.className = "v2-scan-beam";
  body.prepend(scan);

  const orbOne = document.createElement("div");
  orbOne.className = "v2-orb one";
  body.prepend(orbOne);

  const orbTwo = document.createElement("div");
  orbTwo.className = "v2-orb two";
  body.prepend(orbTwo);

  const codeRain = document.createElement("div");
  codeRain.className = "v2-code-rain";

  const words = [
    "AI", "DATA", "CODEX", "SQL", "PYTHON", "PPT", "WEB", "EXCEL",
    "0101", "1100", "2026", "LHF", "SMART", "OFFICE"
  ];

  for (let i = 0; i < 32; i++) {
    const span = document.createElement("span");
    span.textContent = Array.from({ length: 9 }, () => words[Math.floor(Math.random() * words.length)]).join(" ");
    span.style.left = `${Math.random() * 100}%`;
    span.style.animationDuration = `${8 + Math.random() * 9}s`;
    span.style.animationDelay = `${Math.random() * -12}s`;
    span.style.opacity = `${0.28 + Math.random() * 0.5}`;
    codeRain.appendChild(span);
  }

  body.prepend(codeRain);

  const ring = document.createElement("div");
  ring.className = "v2-cursor-ring";
  body.appendChild(ring);

  const dot = document.createElement("div");
  dot.className = "v2-cursor-dot";
  body.appendChild(dot);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const interactive = document.querySelectorAll("a, button, .btn, .project-card, .card");
  interactive.forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("active"));
    el.addEventListener("mouseleave", () => ring.classList.remove("active"));
  });

  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${percent}%`;
  });

  const glowCards = document.querySelectorAll(".project-card, .card, .photo-card, .hero-card");
  glowCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--card-x", `${x}%`);
      card.style.setProperty("--card-y", `${y}%`);
    });
  });

  const rippleTargets = document.querySelectorAll("a, button, .btn");
  rippleTargets.forEach((target) => {
    target.addEventListener("click", (e) => {
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "v2-ripple";
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      ripple.style.width = "12px";
      ripple.style.height = "12px";
      target.appendChild(ripple);
      setTimeout(() => ripple.remove(), 750);
    });
  });

  const dock = document.createElement("div");
  dock.className = "v2-floating-dock";
  dock.innerHTML = `
    <a href="index.html" title="首页">⌂</a>
    <a href="#projects" title="作品">◆</a>
    <a href="resume.pdf" title="简历">↧</a>
    <a href="https://github.com/zakm33824-rgb/smart-office-assistant" title="GitHub" target="_blank" rel="noopener">G</a>
  `;
  body.appendChild(dock);

  const title = document.querySelector("h1");
  if (title && !title.dataset.v2Enhanced) {
    title.dataset.v2Enhanced = "true";
    title.style.letterSpacing = "-0.04em";
  }

})();

// ===== 滚动到底部版权处就停止 =====
(function () {
  if (window.__STOP_AT_FOOTER__) return;
  window.__STOP_AT_FOOTER__ = true;

  function findFooterTextElement() {
    const all = Array.from(document.querySelectorAll("footer, .footer, body *"));
    return all.find((el) => {
      const text = (el.innerText || "").replace(/\s/g, "");
      return text.includes("2026") && text.includes("刘昊锋") && text.includes("个人作品展示网站");
    });
  }

  let footerEl = null;

  function getMaxScrollY() {
    footerEl = footerEl || findFooterTextElement();

    if (!footerEl) {
      return document.documentElement.scrollHeight - window.innerHeight;
    }

    const rect = footerEl.getBoundingClientRect();
    const footerBottomY = window.scrollY + rect.bottom;

    return Math.max(0, footerBottomY - window.innerHeight + 24);
  }

  let ticking = false;

  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(function () {
        const maxScrollY = getMaxScrollY();

        if (window.scrollY > maxScrollY) {
          window.scrollTo({
            top: maxScrollY,
            left: 0,
            behavior: "auto"
          });
        }

        ticking = false;
      });
    },
    { passive: true }
  );
})();

Add-Content style.css @'

/* ===== 页面底部停止滚动修复 ===== */
html,
body {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
  overflow-x: hidden !important;
  overscroll-behavior-y: none;
}

main,
.container,
.page,
.content {
  margin-bottom: 0 !important;
}

section:last-of-type {
  margin-bottom: 0 !important;
  padding-bottom: 40px !important;
}

footer,
.footer {
  margin-bottom: 0 !important;
  padding-bottom: 28px !important;
}

body::after {
  bottom: 0 !important;
}


// ===== 滚动到底部版权处就停止 =====
(function () {
  if (window.__STOP_AT_FOOTER__) return;
  window.__STOP_AT_FOOTER__ = true;

  function findFooterTextElement() {
    const all = Array.from(document.querySelectorAll("footer, .footer, body *"));
    return all.find((el) => {
      const text = (el.innerText || "").replace(/\s/g, "");
      return text.includes("2026") && text.includes("刘昊锋") && text.includes("个人作品展示网站");
    });
  }

  let footerEl = null;

  function getMaxScrollY() {
    footerEl = footerEl || findFooterTextElement();

    if (!footerEl) {
      return document.documentElement.scrollHeight - window.innerHeight;
    }

    const rect = footerEl.getBoundingClientRect();
    const footerBottomY = window.scrollY + rect.bottom;

    return Math.max(0, footerBottomY - window.innerHeight + 24);
  }

  let ticking = false;

  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(function () {
        const maxScrollY = getMaxScrollY();

        if (window.scrollY > maxScrollY) {
          window.scrollTo({
            top: maxScrollY,
            left: 0,
            behavior: "auto"
          });
        }

        ticking = false;
      });
    },
    { passive: true }
  );
})();
