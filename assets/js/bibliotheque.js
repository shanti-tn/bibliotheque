/* Bibliothèque SHANTI — filtres côté navigateur
   Les cartes sont déjà dans la page (générées par Jekyll).
   Ce script les filtre par thème, région, année et mot-clé,
   et garde les filtres dans l'adresse pour pouvoir partager un lien. */
(function () {
  "use strict";

  var grille = document.getElementById("grille");
  if (!grille) return;

  var cartes = Array.prototype.slice.call(grille.querySelectorAll(".carte"));
  var parPage = parseInt(grille.getAttribute("data-par-page"), 10) || 12;
  var boutonsTheme = Array.prototype.slice.call(document.querySelectorAll("[data-filtre-theme]"));
  var champRecherche = document.getElementById("filtre-recherche");
  var selectRegion = document.getElementById("filtre-region");
  var selectAnnee = document.getElementById("filtre-annee");
  var compteur = document.getElementById("compteur");
  var effacer = document.getElementById("effacer");
  var vide = document.getElementById("vide");
  var plus = document.getElementById("plus");

  var etat = { theme: "", region: "", annee: "", q: "" };
  var limite = parPage;

  // Retire les accents pour une recherche plus tolérante
  function normaliser(t) {
    return (t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  }

  // Remplit une liste déroulante avec les valeurs présentes dans les articles
  function remplir(select, attribut, tri) {
    var valeurs = [];
    cartes.forEach(function (c) {
      var v = c.getAttribute(attribut);
      if (v && valeurs.indexOf(v) === -1) valeurs.push(v);
    });
    valeurs.sort(tri);
    valeurs.forEach(function (v) {
      var o = document.createElement("option");
      o.value = v;
      o.textContent = v;
      select.appendChild(o);
    });
  }
  remplir(selectRegion, "data-region", function (a, b) { return a.localeCompare(b, "fr"); });
  remplir(selectAnnee, "data-annee", function (a, b) { return b - a; });

  cartes.forEach(function (c) {
    c._recherche = normaliser(c.getAttribute("data-recherche"));
  });

  function lireAdresse() {
    var p = new URLSearchParams(window.location.search);
    etat.theme = p.get("theme") || "";
    etat.region = p.get("region") || "";
    etat.annee = p.get("annee") || "";
    etat.q = p.get("q") || "";
  }

  function ecrireAdresse() {
    var p = new URLSearchParams();
    if (etat.theme) p.set("theme", etat.theme);
    if (etat.region) p.set("region", etat.region);
    if (etat.annee) p.set("annee", etat.annee);
    if (etat.q) p.set("q", etat.q);
    var qs = p.toString();
    history.replaceState(null, "", window.location.pathname + (qs ? "?" + qs : ""));
  }

  function correspond(c) {
    if (etat.theme && c.getAttribute("data-theme") !== etat.theme) return false;
    if (etat.region && c.getAttribute("data-region") !== etat.region) return false;
    if (etat.annee && c.getAttribute("data-annee") !== etat.annee) return false;
    if (etat.q) {
      var mots = normaliser(etat.q).split(/\s+/);
      for (var i = 0; i < mots.length; i++) {
        if (c._recherche.indexOf(mots[i]) === -1) return false;
      }
    }
    return true;
  }

  function afficher() {
    var visibles = cartes.filter(correspond);
    var filtreActif = !!(etat.theme || etat.region || etat.annee || etat.q);

    cartes.forEach(function (c) {
      c.hidden = true;
      c.classList.remove("carte--une");
    });
    visibles.slice(0, limite).forEach(function (c, i) {
      c.hidden = false;
      // Le plus récent est mis en avant quand aucun filtre n'est actif
      if (i === 0 && !filtreActif) c.classList.add("carte--une");
    });

    var n = visibles.length;
    compteur.textContent = n === 0 ? "Aucun article" : n === 1 ? "1 article" : n + " articles";
    vide.hidden = n !== 0;
    plus.hidden = n <= limite;
    effacer.hidden = !filtreActif;

    boutonsTheme.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-filtre-theme") === etat.theme));
    });
    selectRegion.value = etat.region;
    selectAnnee.value = etat.annee;
    if (document.activeElement !== champRecherche) champRecherche.value = etat.q;
  }

  function changer(cle, valeur) {
    etat[cle] = valeur;
    limite = parPage;
    ecrireAdresse();
    afficher();
  }

  boutonsTheme.forEach(function (b) {
    b.addEventListener("click", function () {
      changer("theme", b.getAttribute("data-filtre-theme"));
    });
  });
  selectRegion.addEventListener("change", function () { changer("region", selectRegion.value); });
  selectAnnee.addEventListener("change", function () { changer("annee", selectAnnee.value); });

  var minuterie;
  champRecherche.addEventListener("input", function () {
    clearTimeout(minuterie);
    minuterie = setTimeout(function () { changer("q", champRecherche.value.trim()); }, 150);
  });

  function toutEffacer() {
    etat = { theme: "", region: "", annee: "", q: "" };
    champRecherche.value = "";
    limite = parPage;
    ecrireAdresse();
    afficher();
  }
  effacer.addEventListener("click", toutEffacer);
  document.querySelectorAll("[data-effacer]").forEach(function (b) {
    b.addEventListener("click", toutEffacer);
  });

  plus.addEventListener("click", function () {
    var premiereNouvelle = limite;
    limite += parPage;
    afficher();
    // Place le focus sur le premier nouvel article pour le clavier
    var visibles = cartes.filter(function (c) { return !c.hidden; });
    var cible = visibles[premiereNouvelle];
    if (cible) cible.querySelector("a").focus();
  });

  lireAdresse();
  afficher();
})();
