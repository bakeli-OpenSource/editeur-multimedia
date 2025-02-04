// Sélection des éléments HTML
const inputFile = document.querySelector("input[type='file']");
const Form = document.getElementById("Form");
const showDiv = document.getElementById("show");
const preview = document.getElementById("preview");

// Taille standard pour toutes les images (ex: 400x400px)
const standardWidth = 400;
const standardHeight = 400;

// Tableau pour stocker les images redimensionnées
let imageElements = [];

// Événement lors de la sélection des fichiers
if (inputFile && showDiv) {
  inputFile.addEventListener("change", (event) => {
    const files = Array.from(event.target.files);

    // Réinitialisation du tableau d'images
    imageElements = [];
    showDiv.innerHTML = ""; // Effacer les prévisualisations précédentes

    // Charger chaque image
    files.forEach((file, index) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;

          img.onload = () => {
            // Redimensionner l'image à la taille standard avec un canvas
            const canvas = document.createElement("canvas");
            canvas.width = standardWidth;
            canvas.height = standardHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, standardWidth, standardHeight);

            // Convertir l'image redimensionnée en un objet Image
            const resizedImg = new Image();
            resizedImg.src = canvas.toDataURL("image/png");

            resizedImg.onload = () => {
              imageElements.push(resizedImg);
              console.log(`Image ${index + 1} redimensionnée et ajoutée.`);

              // Afficher une prévisualisation
              const imgPreview = document.createElement("div");
              imgPreview.style.backgroundImage = `url('${resizedImg.src}')`;
              imgPreview.style.width = "100px";
              imgPreview.style.height = "100px";
              imgPreview.style.backgroundSize = "cover";
              imgPreview.style.backgroundPosition = "center";
              imgPreview.style.margin = "5px";
              imgPreview.style.display = "inline-block";
              showDiv.appendChild(imgPreview);
            };
          };
        };

        reader.readAsDataURL(file);
      } else {
        alert("Veuillez sélectionner des fichiers d'image valides !");
      }
    });
  });
}

// Gestion de la création du GIF
if (Form && preview) {
  Form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (imageElements.length === 0) {
      alert("Veuillez d'abord sélectionner au moins une image !");
      return;
    }

    preview.innerHTML = "Création du GIF en cours... Veuillez patienter.";

    // Création du GIF avec les dimensions standardisées
    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: standardWidth,
      height: standardHeight,
      workerScript: "gif.worker.js",
    });

    // Ajouter les images redimensionnées au GIF
    imageElements.forEach((img, index) => {
      gif.addFrame(img, { delay: 500 });
      console.log(`Ajout de l'image ${index + 1} au GIF`);
    });

    gif.on("finished", function (blob) {
      preview.innerHTML = ""; // Nettoie la zone

      // Afficher le GIF généré
      const url = URL.createObjectURL(blob);
      const ourGif = document.createElement("img");
      ourGif.src = url;
      preview.appendChild(ourGif);

      // Ajouter un bouton de téléchargement
      const showLink = document.getElementById("showLink");
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "monGIF.gif";
      downloadLink.textContent = "Télécharger le GIF";
      downloadLink.style.display = "block";
      downloadLink.style.color = "blue";
      downloadLink.style.textDecoration = "underline";

      showLink.innerHTML = "";
      showLink.appendChild(downloadLink);
    });

    gif.on("error", function (error) {
      console.error("Une erreur est survenue :", error);
      alert("Erreur : Impossible de générer le GIF.");
    });

    gif.render();
  });
} else {
  console.error("Les éléments requis n'ont pas été trouvés !");
}

// retour page accueil
const logoutButton = document.getElementById("logoutBtn");

logoutButton.addEventListener("click", () => {
  window.location.href = "../../page d'acceuil/acceuil.html";
});
