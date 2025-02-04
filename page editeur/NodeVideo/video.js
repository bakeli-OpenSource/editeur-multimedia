const affichageAll = document.querySelectorAll(".affichage");
const allSide = document.querySelectorAll(".barre-effet .side");

//Boutton Filter
const filter = document.getElementById("filtrer");
const afficherFilter = document.querySelector(".filtrer");

filter.addEventListener("click", () => {
  allSide.forEach((n) => {
    if (n.classList.contains("active")) {
      n.classList.remove("active");
    }
  });
  affichageAll.forEach((n) => {
    if (n.classList.contains("active")) {
      n.classList.remove("active");
    }
  });
  filter.classList.add("active");
  afficherFilter.classList.add("active");
});

// Boutton Text
// const duTexte = document.getElementById('texte')
// const afficherText = document.querySelector('.zoneText')

// duTexte.addEventListener('click', ()=>{
//     allSide.forEach((n) => {
//         if(n.classList.contains('active')){
//             n.classList.remove('active')
//         }
//     })
//     affichageAll.forEach((n)=>{
//         if(n.classList.contains('active')){
//             n.classList.remove('active')
//         }
//     })
//     duTexte.classList.add('active')
//     afficherText.classList.add('active')
// })

// Boutton Couper
const couper = document.getElementById("couper");
const afficherCoupure = document.querySelector(".coupure");

couper.addEventListener("click", () => {
  allSide.forEach((n) => {
    if (n.classList.contains("active")) {
      n.classList.remove("active");
    }
  });
  affichageAll.forEach((n) => {
    if (n.classList.contains("active")) {
      n.classList.remove("active");
    }
  });
  couper.classList.add("active");
  afficherCoupure.classList.add("active");
});

// Boutton Rogner
const rogner = document.getElementById("rogner");
const afficherRogne = document.querySelector(".cadrer");

rogner.addEventListener("click", () => {
  allSide.forEach((n) => {
    if (n.classList.contains("active")) {
      n.classList.remove("active");
    }
  });
  affichageAll.forEach((n) => {
    if (n.classList.contains("active")) {
      n.classList.remove("active");
    }
  });
  rogner.classList.add("active");
  afficherRogne.classList.add("active");
});

// Boutton dessin
// const dessin = document.getElementById('dessin')
// const afficherDessin = document.querySelector('.dessiner')

// dessin.addEventListener('click', ()=>{
//     allSide.forEach((n) => {
//         if(n.classList.contains('active')){
//             n.classList.remove('active')
//         }
//     })
//     affichageAll.forEach((n)=>{
//         if(n.classList.contains('active')){
//             n.classList.remove('active')
//         }
//     })
//     dessin.classList.add('active')
//     afficherDessin.classList.add('active')
// })

// retour page accueil
const logoutButton = document.getElementById("logoutBtn");

logoutButton.addEventListener("click", () => {
  window.location.href = "../../page d'acceuil/acceuil.html";
});
