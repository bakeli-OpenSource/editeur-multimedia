// recuperation des elements
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const fileInput = document.getElementById('lebutton');
console.log(fileInput);

const brightnessInput = document.getElementById('brightness');

let image;
let setting = {}
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    image.src = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

})

// function pour afficher l'image dans le canvas
function displayImage(image) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);
}

// fonction pour les effets de l'image
function appliquerEffet(){
 setting.brightness = brightnessInput= 100;
}