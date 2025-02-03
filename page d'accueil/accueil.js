// Sélectionner la case à cocher
var checkbox = document.querySelector("input[name=mode]");

// Restaurer le thème à la charge de la page
document.addEventListener("DOMContentLoaded", function () {
  console.log("hello")
  const theme = localStorage.getItem("theme"); // Récupérer le thème depuis le localStorage
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme); // Appliquer le thème
    checkbox.checked = theme === "dark"; // Mettre à jour l'état de la case à cocher
  }
});

// Gérer le changement de thème
checkbox?.addEventListener("change", function () {
  console.log("hello")

  if (this.checked) {
    trans(); // Transition d'effet
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); // Sauvegarder le thème dans le localStorage
  } else {
    trans();
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); // Sauvegarder le thème dans le localStorage
  }
});

// Ajouter une transition visuelle
let trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};

console.log("hello")
