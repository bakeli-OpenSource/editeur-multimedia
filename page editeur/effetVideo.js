const fileInputVideo = document.getElementById('lebutton');
const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');
const brightness = document.getElementById('brightness');
const saturation = document.getElementById('saturation');
const inversion = document.getElementById('inversion');
const contraste = document.getElementById('contraste');
const noirEtBlanc = document.getElementById('noirblanc');
const sapia = document.getElementById('sapia');


let setting = {
    brightness: 100,saturation:100,contraste:100,inversion:0,noirEtBlanc:0,sapia: 0
}

const videoElement = document.createElement('video');
videoElement.autoplay = true; 
videoElement.loop = true; 

fileInputVideo.addEventListener("change", function () {
    const file = fileInputVideo.files[0];
    if (file) {
        const videoURL = URL.createObjectURL(file);
        videoElement.src = videoURL;
        videoElement.addEventListener('loadeddata', () => {
            // Ajuster la taille du canvas à la vidéo
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            afficherVideo();
        });
    }
});

// Fonction pour afficher la vidéo dans le canvas
function afficherVideo() {
    canvasContext.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Appliquer les filtres CSS avec les valeurs des sliders
    canvasContext.filter = `
        brightness(${setting.brightness}%)
        saturate(${setting.saturation}%)
        contrast(${setting.contraste}%)
        invert(${setting.inversion}%)
        grayscale(${setting.noirEtBlanc}%)
        sepia(${setting.sapia}%)
    `;

    // Redessiner la vidéo en boucle
    requestAnimationFrame(afficherVideo);
}

// Exemple d'ajout d'événements sur les sliders pour ajuster les effets en temps réel
brightness.addEventListener('input', (e) => {
    setting.brightness = e.target.value;
});

saturation.addEventListener('input', (e) => {
    setting.saturation = e.target.value;
});

inversion.addEventListener('input', (e) => {
    setting.inversion = e.target.value;
});

contraste.addEventListener('input', (e) => {
    setting.contraste = e.target.value;
});

noirEtBlanc.addEventListener('input', (e) => {
    setting.noirEtBlanc = e.target.value;
});

sapia.addEventListener('input', (e) => {
    setting.sapia = e.target.value;
});

// le telechargement du video
const btnTelecharger = document.querySelector('.button-export')

function telechargerVideo() {
    const a = document.createElement('a');
    a.href = canvas.toDataURL();
    a.download = 'video.mp4';
    a.click();
}

btnTelecharger.addEventListener('click', telechargerVideo)