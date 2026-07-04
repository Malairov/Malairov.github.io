/* cosmos.js v62 — ambient sky, reveals, journey, interactive panels. No dependencies. */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- starfield + fireflies ---------- */
  var sky = document.getElementById("sky");
  if (sky && !reduced && sky.getContext) {
    var ctx = sky.getContext("2d"), W, H, stars = [], flies = [], t = 0;
    function size() {
      W = sky.width = innerWidth * devicePixelRatio;
      H = sky.height = innerHeight * devicePixelRatio;
      sky.style.width = innerWidth + "px";
      sky.style.height = innerHeight + "px";
    }
    function seed() {
      stars = []; flies = [];
      var n = Math.min(140, Math.floor(innerWidth / 9));
      for (var i = 0; i < n; i++) stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: (Math.random() * 1.1 + 0.4) * devicePixelRatio,
        s: Math.random() * 0.08 + 0.02, p: Math.random() * Math.PI * 2
      });
      for (var j = 0; j < 14; j++) flies.push({
        x: Math.random() * W, y: Math.random() * H,
        a: Math.random() * Math.PI * 2, v: 0.15 + Math.random() * 0.2,
        hue: Math.random() < 0.5 ? "63,191,143" : "228,177,92",
        p: Math.random() * Math.PI * 2
      });
    }
    function frame() {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.y += s.s * devicePixelRatio; if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
        var tw = 0.45 + 0.35 * Math.sin(t * 1.4 + s.p);
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7);
        ctx.fillStyle = "rgba(214,240,230," + tw.toFixed(2) + ")"; ctx.fill();
      }
      for (var k = 0; k < flies.length; k++) {
        var f = flies[k];
        f.a += (Math.random() - 0.5) * 0.06;
        f.x += Math.cos(f.a) * f.v * devicePixelRatio;
        f.y += Math.sin(f.a) * f.v * devicePixelRatio;
        if (f.x < 0) f.x = W; if (f.x > W) f.x = 0;
        if (f.y < 0) f.y = H; if (f.y > H) f.y = 0;
        var glow = 0.25 + 0.2 * Math.sin(t * 2 + f.p);
        var g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 9 * devicePixelRatio);
        g.addColorStop(0, "rgba(" + f.hue + "," + glow.toFixed(2) + ")");
        g.addColorStop(1, "rgba(" + f.hue + ",0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(f.x, f.y, 9 * devicePixelRatio, 0, 7); ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    size(); seed(); frame();
    addEventListener("resize", function () { size(); seed(); });
  } else if (sky) { sky.remove(); }

  /* ---------- hero parallax ---------- */
  if (!reduced) {
    var lax = [].slice.call(document.querySelectorAll("[data-parallax]"));
    if (lax.length) {
      var ticking = false;
      addEventListener("scroll", function () {
        if (ticking) return; ticking = true;
        requestAnimationFrame(function () {
          var y = scrollY;
          lax.forEach(function (el) {
            el.style.transform = "translateY(" + (y * parseFloat(el.dataset.parallax) * -1) + "px)";
          });
          ticking = false;
        });
      }, { passive: true });
    }
  }

  /* ---------- section reveals ---------- */
  var revs = [].slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !reduced) {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revs.forEach(function (el) { ro.observe(el); });
  } else { revs.forEach(function (el) { el.classList.add("in"); }); }

  /* ---------- journey dots ---------- */
  var dots = [].slice.call(document.querySelectorAll(".journey a"));
  var sects = dots.map(function (d) { return document.getElementById(d.getAttribute("href").slice(1)); }).filter(Boolean);
  if ("IntersectionObserver" in window && sects.length) {
    var jo = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          dots.forEach(function (d) { d.classList.toggle("is-here", d.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    sects.forEach(function (s) { jo.observe(s); });
  }

  /* ---------- mobile nav ---------- */
  var btn = document.getElementById("menuBtn"), nav = document.getElementById("barNav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ---------- generic tab/panel wiring ---------- */
  function wire(nodes, fields, panelLabelHost) {
    nodes.forEach(function (n) {
      n.addEventListener("click", function () {
        nodes.forEach(function (m) { m.classList.remove("is-on"); m.setAttribute("aria-selected", "false"); });
        n.classList.add("is-on"); n.setAttribute("aria-selected", "true");
        Object.keys(fields).forEach(function (attr) {
          var el = document.getElementById(fields[attr]);
          if (el) el.textContent = n.dataset[attr] || "";
        });
        if (panelLabelHost && n.id) panelLabelHost.setAttribute("aria-labelledby", n.id);
      });
    });
  }

  /* proof constellation */
  var pPanel = document.getElementById("proofPanel");
  wire([].slice.call(document.querySelectorAll(".pnode")), { t: "ppT", c: "ppC", b: "ppB", r: "ppR" }, pPanel);

  /* control model map */
  var mPanel = document.getElementById("modelPanel");
  var mNodes = [].slice.call(document.querySelectorAll(".mnode"));
  wire(mNodes, { t: "mpT", p: "mpP", b: "mpB", w: "mpW", r: "mpR" }, mPanel);

  /* mobile strip mirrors the map nodes */
  var strip = document.getElementById("modelStrip");
  if (strip && mNodes.length) {
    var sBtns = mNodes.map(function (n, i) {
      var b = document.createElement("button");
      b.type = "button"; b.setAttribute("role", "tab");
      b.textContent = n.dataset.t;
      if (i === 0) { b.classList.add("is-on"); b.setAttribute("aria-selected", "true"); }
      else b.setAttribute("aria-selected", "false");
      strip.appendChild(b);
      return b;
    });
    sBtns.forEach(function (b, i) {
      b.addEventListener("click", function () {
        sBtns.forEach(function (x) { x.classList.remove("is-on"); x.setAttribute("aria-selected", "false"); });
        b.classList.add("is-on"); b.setAttribute("aria-selected", "true");
        mNodes[i].click();
      });
    });
    /* keep strip in sync when map nodes are used */
    mNodes.forEach(function (n, i) {
      n.addEventListener("click", function () {
        sBtns.forEach(function (x, j) {
          x.classList.toggle("is-on", j === i);
          x.setAttribute("aria-selected", j === i ? "true" : "false");
        });
      });
    });
  }
})();
