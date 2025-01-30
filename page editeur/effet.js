const fileInput = document.getElementById('lebutton');
const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');
const brightness = document.getElementById('brightness');
const saturation = document.getElementById('saturation');
const inversion = document.getElementById('inversion');
const contraste = document.getElementById('contraste');
const noirEtBlanc = document.getElementById('noirblanc');
const sapia = document.getElementById('sapia');

let image = null
// variable pour stocker les effets
let setting = {
    brightness: 100,saturation: 100,blur: 0,inversion: 0,contraste: 100,noirEtBlanc: 0,sapia: 0
}


// variable pour le dessin

const colorPiker = document.getElementById("color")
const taillePiker = document.getElementById("taille")
function activerDessin(){
    let isDrawing= false
    let leftX
    let leftY

    // function pour commencer le dessin

    function commencerDessin(e){
        isDrawing= true
        [leftX,leftY] = [e.offsetX , e.offsetY]
        canvasContext.beginPath()
        canvasContext.moveTo(leftX,leftY)
    }

    // dessiner
    function dessiner(e){
      if(!isDrawing) return

      canvasContext.lineTo(e.offsetX,e.offsetY)
      canvasContext.stroke()
      leftX  = e.offsetX
      leftY = e.offsetY
    }

    // arreter le dessin
    function arreterDessin(){
        isDrawing= false
        canvasContext.closePath()
    }

    // les ecouteurs d'evennement
    canvas.addEventListener('mousedown', commencerDessin)
    canvas.addEventListener("mousemove",dessiner)
    canvas.addEventListener("mouseup",arreterDessin)
    canvas.addEventListener("mouseleave",arreterDessin)
}


// picker le couleur pour dessiner
colorPiker.addEventListener("input",()=>{
    canvasContext.strokeStyle = colorPiker.value
})

// ajuster la taille de la ligne de dessin
taillePiker.addEventListener("input",()=>{
    canvasContext.lineWidth = taillePiker.value
})

// button pour activer le dessin
const btnDessin = document.querySelector("#dessiner")
btnDessin.addEventListener("click", activerDessin)

// gommer 
let effacer = false
const btnGommer = document.getElementById("gomme")
btnGommer.addEventListener("click",()=>{
    effacer = !effacer
    if(effacer){
        canvasContext.strokeStyle= "transparent"
        canvasContext.lineWidth= 20

    }
})



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

    canvasContext.clearRect(0,0,canvas.width, canvas.height)
    canvasContext.filter = generateFilter()
    canvasContext.drawImage(image,0,0)
    canvasContext.filter = "none"
}

// fonction pour dessiner chaque frame de la video

// appliquer les effets
generateFilter = () => {
    const {
        brightness,saturation,inversion,contraste,noirEtBlanc,sapia} = setting
    return `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) 
    contrast(${contraste}%) sepia(${sapia}%) grayscale(${noirEtBlanc}%)`
}

// fonction pour mettre a jour les effets
function updateSetting(key,value){
    if(!image) return
        setting[key] = parseFloat(value)
        rechargerImage()
    }

// appliquer les effets
// filter
brightness.addEventListener('input',() => updateSetting('brightness',brightness.value))
// saturation
saturation.addEventListener('input',() => updateSetting('saturation',saturation.value))
// inversion
inversion.addEventListener('input',() => updateSetting('inversion',inversion.value))
// contrast
contraste.addEventListener('input',() => updateSetting('contraste',contraste.value))
// noir et black
noirEtBlanc.addEventListener('input',() => updateSetting('noirEtBlanc',noirEtBlanc.value))
// sapia
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


