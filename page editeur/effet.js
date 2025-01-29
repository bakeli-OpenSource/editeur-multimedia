const fileInput = document.getElementById('lebutton');
const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');
const brightness = document.getElementById('brightness');
const saturation = document.getElementById('saturation');
console.log(saturation);

// const blure = document.getElementById('blur');
// console.log(blure);

const inversion = document.getElementById('inversion');
const contraste = document.getElementById('contraste');
const noirEtBlanc = document.getElementById('noirblanc');
const sapia = document.getElementById('sapia');

let image = null
// variable pour stocker les effets
let setting = {
    brightness: 100,saturation: 100,blur: 0,inversion: 0,contraste: 100,noirEtBlanc: 0,sapia: 0
}


// telecharger l'image depuis l'ordinateur
fileInput.addEventListener("change",() => {
    const file = fileInput.files[0]
        image= new Image()
        image.onload=() => {
            initialiser()
            rechargerImage()
        }
        // affichage de l'image en creant un canvas avec l'image
        image.src = URL.createObjectURL(file)
  
    
})

// fonction initialisation
function initialiser(){
    brightness.value = setting.brightness
    saturation.value = setting.saturation
    // blure.value = setting.blur
    inversion.value = setting.inversion
    contraste.value = setting.contraste
    noirEtBlanc.value = setting.noirEtBlanc
    sapia.value = setting.sapia
}
initialiser()
// fonction pour charger l'image
function rechargerImage(){
    canvas.width = image.width 
    canvas.height = image.height
    canvasContext.filter = generateFilter()
    canvasContext.drawImage(image,0,0)
}

// fonction pour dessiner chaque frame de la video

// appliquer les effets
generateFilter = () => {
    const {
        brightness,saturation,blur,inversion,contraste,noirEtBlanc,sapia} = setting
    return `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) contrast(${contraste}%) sepia(${sapia}%) grayscale(${noirEtBlanc}%)`
}

// fonction pour mettre a jour les effets
function updateSetting(key,value){
    if(!image) return
        setting[key] = parseFloat(value)
        rechargerImage()
    }

// appliquer les effets
brightness.addEventListener('input',() => updateSetting('brightness',brightness.value))
saturation.addEventListener('input',() => updateSetting('saturation',saturation.value))
// blure.addEventListener('input',() => updateSetting('blur',blur.value))
inversion.addEventListener('input',() => updateSetting('inversion',inversion.value))
contraste.addEventListener('input',() => updateSetting('contraste',contraste.value))
noirEtBlanc.addEventListener('input',() => updateSetting('noirEtBlanc',noirEtBlanc.value))
sapia.addEventListener('input',() => updateSetting('sapia',sapia.value))


// telecharger l'image
const downloadBtn = document.querySelector('.button-export')

function downloadMedia(){
        const a = document.createElement('a')
        a.href = canvas.toDataURL()
        a.download = 'image.png'
        a.click()
   
}
downloadBtn.addEventListener('click',downloadMedia)


