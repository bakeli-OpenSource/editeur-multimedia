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


// **************************Dessiner sur les image




// **************************Generation de filtre etudian noir****************************************************

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



/*------------------------------------------------------------NAFISSATOU Rogner------------------------------------------------------------*/

rogner.addEventListener("click",rognerPhoto)

const ctx = canvas.getContext("2d");
const cropCanvas = document.getElementById("cropCanvas");
const cropCtx = cropCanvas.getContext("2d");
const cropButton = document.getElementById("cropButton");
const downloadButton = document.getElementById("downloadButton")

let imag = new Image();
imag.src = ""; 

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
  
    reader.onload = (event) => {
      imag = new Image()
      imag.onload = () => {
        canvas.width = imag.width
        canvas.height = imag.height
        canvas.getContext("2d").drawImage(imag, 0, 0, imag.width, imag.height)
      }
      imag.src = event.target.result
    }
  
    reader.readAsDataURL(file)
  })

imag.onload = () => {
  ctx.drawImage(imag, 0, 0, canvas.width, canvas.height);
};

function rognerPhoto() {
let startX, startY, endX, endY, isDragging = false;
canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;
  isDragging = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    endX = e.clientX - rect.left;
    endY = e.clientY - rect.top;

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imag, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, endX - startX, endY - startY);
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});

    //    téleéchargement
 downloadButton.addEventListener("click", () => {
     if (!imag) return
  
     const link = document.createElement("a")
     link.download = "cropped_image.png"
     link.href = cropCanvas.toDataURL()
     link.click()
   })


cropButton.addEventListener("click", () => {
  if (startX && startY && endX && endY) {
    const width = endX - startX;
    const height = endY - startY;

    cropCanvas.width = width;
    cropCanvas.height = height;

    cropCtx.drawImage(
      canvas,
      startX,
      startY,
      width,
      height,
      0,
      0,
      width,
      height
    );
  } else {
    alert("Veuillez sélectionner une zone à rogner !");
  }
});
}


// ********************************************parties dessiner **************************************************

   
class Dessin {
    constructor(canvas) {
        this.draw = false;
        this.isDrawingMode = false
        this.prevX = 0;
        this.prevY = 0;
        this.canvas = canvas; 
        this.ctx = canvasContext;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
  
        this.canvas.addEventListener('mousedown', (e) => {
            if(this.isDrawingMode){
                this.draw = true;
                this.prevX = this.getMouseX(e);
                this.prevY = this.getMouseY(e);
            }
        });
  
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.draw) {
                const currX = this.getMouseX(e);
                const currY = this.getMouseY(e);
                this.dessine(this.prevX, this.prevY, currX, currY);
                this.prevX = currX;
                this.prevY = currY;
            }
        });
  
        this.canvas.addEventListener('mouseup', () => this.draw = false);
        this.canvas.addEventListener('mouseout', () => this.draw = false);
    }
  
    getMouseX(e) {
        return (e.clientX - this.canvas.offsetLeft) * this.canvas.width / this.canvas.clientWidth;
    }
  
    getMouseY(e) {
        return (e.clientY - this.canvas.offsetTop) * this.canvas.height / this.canvas.clientHeight;
    }
  
    dessine(depX, depY, destX, destY) {
        this.ctx.beginPath();
        this.ctx.moveTo(depX, depY);
        this.ctx.lineTo(destX, destY);
        this.ctx.closePath();
        this.ctx.stroke();
    }
  
    setColor(color) {
        this.ctx.strokeStyle = color.value;
    }
  
    biggerStroke() {
        this.ctx.lineWidth++;
    }
  
    smallerStroke() {
        this.ctx.lineWidth = Math.max(1, this.ctx.lineWidth - 1); 
    }
  
    erase() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // methode pour activer le dessin
    activerDessin(){
        this.isDrawingMode =!this.isDrawingMode
        return this.isDrawingMode
    }
  }

//   instanciation
const instanceDessin = new Dessin(canvas)

// boutton pour activer le dessin
dessin.addEventListener("click", ()=>{
    instanceDessin.activerDessin()
})

// changer la couleur du trait
const colorPiker = document.getElementById("color")
console.log(colorPiker);

colorPiker.addEventListener("click",()=>{
    instanceDessin.setColor(colorPiker)
})

// augmenter l'epaisseur du trait
const bigger = document.getElementById("plus")
bigger.addEventListener("click",()=>{
    instanceDessin.biggerStroke()
})

// diminuer l'epaisseur du trait
const smaller = document.getElementById("moins")
smaller.addEventListener("click",()=>{
    instanceDessin.smallerStroke()
})

const effacer = document.getElementById("effacer")
effacer.addEventListener("click",()=>{
    instanceDessin.erase()
})