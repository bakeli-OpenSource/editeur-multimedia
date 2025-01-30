const fileInputVideo = document.getElementById('lebutton'); // button video (snkr use)

const canvas = document.getElementById('canvas');  //conteneur video (snkr use)


const canvasContext = canvas.getContext('2d');
const brightness = document.getElementById('brightness');
const saturation = document.getElementById('saturation');
const inversion = document.getElementById('inversion');
const contraste = document.getElementById('contraste');
const noirEtBlanc = document.getElementById('noirblanc');
const sapia = document.getElementById('sapia');


//pour snkr (snkr use)
const startTimeRange = document.getElementById('startTimeRange');
const startTimeValue = document.getElementById('startTimeValue');
//pour snkr (snkr use)
const endTimeRange = document.getElementById('endTimeRange');
const endTimeValue = document.getElementById('endTimeValue');
//pour snkr (snkr use)
let videoDuration = 0; // Variable pour stocker la durée totale de la vidéo



let setting = {
    brightness: 100,saturation:100,contraste:100,inversion:0,noirEtBlanc:0,sapia: 0
}

const videoElement = document.createElement('video'); //video
videoElement.autoplay = true
canvas.appendChild(videoElement)
console.log(canvas)

fileInputVideo.addEventListener("change", function () {
    const file = fileInputVideo.files[0];
    if (file) {
        const videoURL = URL.createObjectURL(file);
        videoElement.src = videoURL;
        videoElement.addEventListener('loadeddata', () => {
            
            //Pour snkr (snkr use)
            videoDuration = videoElement.duration
            endTimeRange.max = Math.floor(videoDuration);
            endTimeValue.textContent = Math.floor(videoDuration);
            videoElement.controls = true


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



// Partie Snkr
//pour snkr (snkr use)
startTimeRange.addEventListener('input', () => {
    startTimeValue.textContent = startTimeRange.value;
});

// Afficher la valeur du temps de fin en temps réel
endTimeRange.addEventListener('input', () => {
    endTimeValue.textContent = endTimeRange.value;
});


document.getElementById('exportButton').addEventListener('click', function() {
    const startTime = startTimeRange.value;
    const endTime = endTimeRange.value;

    if (fileInputVideo.files.length === 0) {
        alert('Veuillez sélectionner une vidéo.');
        return;
    }

    if (parseInt(endTime) <= parseInt(startTime)) {
        alert('Le temps de fin doit être supérieur au temps de début.');
        return;
    }

    document.getElementById('exportButton').innerText = 'Procedure en cours'
    document.getElementById('exportButton').style.opacity = 0.5

    const formData = new FormData();
    formData.append('video', fileInputVideo.files[0]);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = data.clipUrl;
            document.getElementById('downloadLinkContainer').style.backgroundColor = 'white';
            downloadLink.style.color = '#061039'
            document.getElementById('exportButton').innerText = 'Cliquez su Exporter'
            document.getElementById('exportButton').style.opacity = 1

        } else {
            alert('Erreur lors du traitement de la vidéo.');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite.');
    });
});