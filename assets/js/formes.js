/* Animation des formes — reprise fidèle de shanti.tn (GSAP)
   1. Entrée   : les formes arrivent en très grand (x50) en bleu foncé,
                 rétrécissent à leur taille et deviennent blanches.
   2. Dérive   : chaque forme dérive et tourne lentement, au hasard, en continu.
   3. Souris   : sur ordinateur, les formes se déplacent vers le curseur,
                 puis reprennent leur dérive 0,3 s après l'arrêt de la souris.
   4. Flottement : dans les autres sections, va-et-vient doux en boucle.
   + le texte d'ouverture apparaît en glissant vers le haut. */
(function () {
  "use strict";
  if (!window.gsap) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var gsap = window.gsap;

  // Nombre aléatoire entre min et max, multiplié par un signe (1 ou -1)
  function hasard(min, max, signe) {
    return (min + (max - min) * Math.random()) * (signe === undefined ? 1 : signe);
  }
  function formesDe(svg) {
    return Array.prototype.slice.call(svg.querySelectorAll("g > *"));
  }

  /* ----- 2. Dérive continue ----- */
  var derive = gsap.timeline();
  function deriver(items) {
    derive.pause();
    derive = gsap.timeline();
    items.forEach(function (el) {
      var s = hasard(0, 50) >= 50 ? 1 : -1;
      derive.to(el, {
        rotation: hasard(8, 20, s),
        x: hasard(10, 60, s),
        y: hasard(10, 60, s),
        duration: hasard(2, 4),
        ease: "none",
        transformOrigin: "center",
        onComplete: deriver,
        onCompleteParams: [items]
      }, 0);
    });
  }

  /* ----- 3. Réaction à la souris ----- */
  var suivi = gsap.timeline();
  var dernierMouvement = 0;
  function suivreSouris(items, e) {
    suivi.pause();
    derive.pause();
    suivi = gsap.timeline();
    items.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var x = e.clientX - r.x >= 0 ? hasard(5, 40, 1) : hasard(5, 40, -1);
      var y = e.clientY - r.y >= 0 ? hasard(5, 40, 1) : hasard(5, 40, -1);
      suivi.to(el, { duration: 1, x: x, y: y }, 0);
    });
    dernierMouvement = Date.now();
    setTimeout(function () {
      if (Date.now() - dernierMouvement >= 300) {
        suivi.pause();
        suivi = gsap.timeline();
        suivi.to(items, {
          duration: 0.5, x: 0, y: 0,
          onComplete: function () { deriver(items); }
        }, 0);
      }
    }, 300);
  }

  /* ----- 1. Entrée de la section d'ouverture ----- */
  var ouverture = document.querySelector(".formes--vivantes");
  if (ouverture) {
    var items = formesDe(ouverture);
    var section = ouverture.closest("section, header") || ouverture;
    var intro = gsap.timeline();
    intro.fromTo(ouverture, { color: "#001F92" }, { color: "#FFFFFF", duration: 0.5 }, 0);
    intro.fromTo(items, { scale: 50, transformOrigin: "center" },
      { scale: 1, transformOrigin: "center", duration: 0.5, onComplete: function () { deriver(items); } }, 0);

    // Souris : ordinateur uniquement, comme sur shanti.tn
    if (window.innerWidth > 768) {
      section.addEventListener("mousemove", function (e) { suivreSouris(items, e); });
    }

    // Met la dérive en pause quand la section n'est plus visible
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entrees) {
        entrees.forEach(function (en) { en.isIntersecting ? derive.resume() : derive.pause(); });
      }, { threshold: 0.01 }).observe(section);
    }
  }

  /* ----- 4. Flottement en boucle (autres sections) ----- */
  document.querySelectorAll(".formes--flottantes").forEach(function (svg) {
    var tl = gsap.timeline({ repeat: -1, yoyo: true });
    var s = hasard(0, 50) >= 50 ? 1 : -1;
    formesDe(svg).forEach(function (el) {
      tl.to(el, {
        rotation: hasard(8, 12, s),
        x: hasard(20, 40, s),
        y: hasard(20, 40, s),
        duration: 2,
        delay: hasard(0, 1),
        ease: "none",
        transformOrigin: "center"
      }, 0);
    });
  });

  /* ----- Apparition du texte (fade-up) ----- */
  var aFaire = document.querySelectorAll("[data-anim='fade-up']");
  if (aFaire.length && "IntersectionObserver" in window) {
    gsap.set(aFaire, { autoAlpha: 0, y: 200 });
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (en) {
        if (!en.isIntersecting) return;
        gsap.to(en.target, { delay: 0.3, autoAlpha: 1, y: 0 });
        obs.unobserve(en.target);
      });
    }, { threshold: 0.01 });
    aFaire.forEach(function (el) { obs.observe(el); });
  }
})();
