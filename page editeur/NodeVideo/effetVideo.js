const fileInputVideo = document.getElementById('lebutton'); 
// button video (snkr use)

const canvas = document.getElementById('canvas');  //conteneur video (snkr use)


const canvasContext = canvas.getContext('2d');


//pour snkr (snkr use)
const startTimeRange = document.getElementById('startTimeRange');
const startTimeValue = document.getElementById('startTimeValue');
//pour snkr (snkr use)
const endTimeRange = document.getElementById('endTimeRange');
const endTimeValue = document.getElementById('endTimeValue');
//pour snkr (snkr use)
let videoDuration = 0; // Variable pour stocker la durée totale de la vidéo


// Mise à jour des intervalles pour le GIF
const startTimegif = document.getElementById('startTimegif');
const startTimer = document.getElementById('startTimer');
const endTimegif = document.getElementById('endTimegif');
const endTimer = document.getElementById('endTimer');


let progressContainer = document.getElementById('barreProgresse')
let progressInterne = document.getElementById('progression')
let ledebut = document.getElementById('ledebut')
let lafin = document.getElementById('lafin')

const play = document.querySelector('.fa-pause')

const videoElement = document.createElement('video'); //video
videoElement.autoplay = true
canvas.appendChild(videoElement)
// console.log(canvas)

fileInputVideo.addEventListener("change", function () {
    const file = fileInputVideo.files[0];
    if (file) {
        const videoURL = URL.createObjectURL(file);
        videoElement.src = videoURL;
        videoElement.addEventListener('loadeddata', () => {
            
            //Pour snkr (snkr use)
            videoDuration = videoElement.duration
            endTimeRange.max = Math.floor(videoDuration);
            startTimeRange.max = Math.floor(videoDuration)
            startTimegif.max = Math.floor(videoDuration)
            endTimeRange.value = Math.floor(videoDuration)
            document.getElementById('endTimegif').max = Math.floor(videoDuration);
            document.getElementById('endTimegif').value = Math.floor(videoDuration);
            endTimeValue.textContent = Math.floor(videoDuration);
            videoElement.controls = true

            play.addEventListener('click', () => {
                if(videoElement.autoplay == true){
                    play.classList.replace('fa-pause','fa-play')
                    videoElement.autoplay = false
                    videoElement.pause()
                }else{
                    play.classList.replace('fa-play', 'fa-pause')
                    videoElement.autoplay = true
                    videoElement.play()
                }
            })

            // Ajuster la taille du canvas à la vidéo
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            afficherVideo();
        });

        videoElement.addEventListener('timeupdate', () => {

            let progres = (videoElement.currentTime / videoElement.duration) * 100;
            progressInterne.style.width = progres + '%';

        });
    }
});


// Fonction pour afficher la vidéo dans le canvas
function afficherVideo() {
    canvasContext.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Redessiner la vidéo en boucle
    requestAnimationFrame(afficherVideo);
}

// Partie Snkr
//pour snkr (snkr use)
startTimeRange.addEventListener('input', () => {
    // Mettre à jour la valeur affichée pour startTime
    startTimeValue.textContent = startTimeRange.value;

    // Calculer la position du début sur la barre de progression
    let startPosition = (startTimeRange.value / videoDuration) * 100;
    ledebut.style.left = startPosition + '%';  // Placer le début sur la barre

    // Vérifier que le début ne dépasse pas la fin
    if (parseInt(startTimeRange.value) >= parseInt(endTimeRange.value)) {
        // Si le début dépasse la fin, ajuster la fin
        endTimeRange.value = startTimeRange.value + 1;
        endTimeValue.textContent = endTimeRange.value;
        let endPosition = (endTimeRange.value / videoDuration) * 100;
        lafin.style.left = endPosition + '%';  // Recalculer la position de la fin
    }

});

endTimeRange.addEventListener('input', () => {
    // Mettre à jour la valeur affichée pour endTime
    endTimeValue.textContent = endTimeRange.value;

    // Calculer la position de la fin sur la barre de progression
    let endPosition = (endTimeRange.value / videoDuration) * 100;
    lafin.style.left = endPosition + '%';  // Placer la fin sur la barre

    // Vérifier que la fin ne soit pas inférieure au début
    if (parseInt(endTimeRange.value) <= parseInt(startTimeRange.value)) {
        // Si la fin est inférieure au début, ajuster le début
        startTimeRange.value = endTimeRange.value - 1;
        startTimeValue.textContent = startTimeRange.value;
        let startPosition = (startTimeRange.value / videoDuration) * 100;
        ledebut.style.left = startPosition + '%';  // Recalculer la position du début
    }

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
            document.getElementById('exportButton').innerText = 'Cliquez sur Exporter'
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



// Affichage des valeurs des intervalles du GIF

startTimegif.addEventListener('input', () => {
    // Mettre à jour la valeur affichée pour startTimegif
    startTimer.textContent = startTimegif.value;

    // Calculer la position du début sur la barre de progression GIF
    let startPositionGif = (startTimegif.value / videoDuration) * 100;
    ledebut.style.left = startPositionGif + '%';  // Placer le début sur la barre GIF

    // Vérifier que le début ne dépasse pas la fin
    if (parseInt(startTimegif.value) >= parseInt(endTimegif.value)) {
        // Si le début dépasse la fin, ajuster la fin
        endTimegif.value = startTimegif.value + 1;
        endTimer.textContent = endTimegif.value;
        let endPositionGif = (endTimegif.value / videoDuration) * 100;
        lafin.style.left = endPositionGif + '%';  // Recalculer la position de la fin sur la barre GIF
    }
});

endTimegif.addEventListener('input', () => {
    // Mettre à jour la valeur affichée pour endTimegif
    endTimer.textContent = endTimegif.value;

    // Calculer la position de la fin sur la barre de progression GIF
    let endPositionGif = (endTimegif.value / videoDuration) * 100;
    lafin.style.left = endPositionGif + '%';  // Placer la fin sur la barre GIF

    // Vérifier que la fin ne soit pas inférieure au début
    if (parseInt(endTimegif.value) <= parseInt(startTimegif.value)) {
        // Si la fin est inférieure au début, ajuster le début
        startTimegif.value = endTimegif.value - 1;
        startTimer.textContent = startTimegif.value;
        let startPositionGif = (startTimegif.value / videoDuration) * 100;
        ledebut.style.left = startPositionGif + '%';  // Recalculer la position du début sur la barre GIF
    }
});




document.getElementById('monExport').addEventListener('click', function () {
    const startTime = startTimegif.value;
    const endTime = endTimegif.value;

    if (fileInputVideo.files.length === 0) {
        alert('Veuillez sélectionner une vidéo.');
        return;
    }

    if (parseInt(endTime) <= parseInt(startTime)) {
        alert('Le temps de fin doit être supérieur au temps de début.');
        return;
    }

    document.getElementById('monExport').innerText = 'Chargement en cours'
    document.getElementById('monExport').style.opacity = 0.5

    const formData = new FormData();
    formData.append('video', fileInputVideo.files[0]);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    formData.append('isGif', 'true');  // Indiquer que c'est un GIF

    fetch('/create-gif', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = data.url;
            document.getElementById('downloadLinkContainer').style.display = 'block';
            document.getElementById('downloadLinkContainer').style.backgroundColor = 'white';
            downloadLink.style.color = '#061039'
            document.getElementById('monExport').innerText = 'Cliquer sur Exporter'
            document.getElementById('monExport').style.opacity = 1
        } else {
            alert('Erreur lors de la création du GIF.');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue.');
    });
});