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

// **************************image par defaut *************************************
const defautlImage = new Image()
defautlImage.src= "./images/Vector.png"

function defaultImages(){
const size = 30
const x = (canvas.width- size)/2
const y = (canvas.height- size)/2

canvasContext.clearRect(0,0,canvas.width,canvas.height)
canvasContext.drawImage(defautlImage,x,y,size,size)
defautlImage.style.opacity= "0.3"
}

defaultImages()
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

    instanceDessin.redessinerImageFiltre()
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
brightness.addEventListener('input',() => {
    updateSetting('brightness',brightness.value)
    rechargerImage()
})
// saturation
saturation.addEventListener('input',() =>{
    updateSetting('saturation',saturation.value)
    rechargerImage()
})
// inversion
inversion.addEventListener('input',() => {
    updateSetting('inversion',inversion.value)
    rechargerImage()
})
// contrast
contraste.addEventListener('input',() => {
    updateSetting('contraste',contraste.value)
    rechargerImage()
})
// noir et black
noirEtBlanc.addEventListener('input',() => {
    updateSetting('noirEtBlanc',noirEtBlanc.value)
    rechargerImage()
})
// sapia
sapia.addEventListener('input',() => {
    updateSetting('sapia',sapia.value)
    rechargerImage()
})
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

rogner.addEventListener("click",() => {
    rognerPhoto()
    canvas.style.cursor = isRognerMode ? "crosshair" : "pointer";
})

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

let isRognerMode = false; // Indicateur pour le mode rognage
let startX, startY, endX, endY, isDragging = false; // Variables pour le rognage

// Fonctions pour gérer les événements de rognage
function handleMouseDown(e) {
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    isDragging = true;
}

function handleMouseMove(e) {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        endX = e.clientX - rect.left;
        endY = e.clientY - rect.top;

        // Limiter la taille du rectangle de sélection pour ne pas dépasser les dimensions du canvas
        if (endX > canvas.width) endX = canvas.width;
        if (endY > canvas.height) endY = canvas.height;
        if (startX < 0) startX = 0;
        if (startY < 0) startY = 0;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imag, 0, 0, canvas.width, canvas.height);
         instanceDessin.redessinerImageFiltre();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(startX, startY, endX - startX, endY - startY);
    }
}

function handleMouseUp() {
    isDragging = false;
}

function rognerPhoto() {
    if (isRognerMode) {
        // Désactiver le mode rognage
        isRognerMode = false;
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);

        instanceDessin.redessinerImageFiltre();
    } else {
        isRognerMode = true;

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);
    }
}

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

   // Vérifier que la zone de rognage est valide
   if (startX < 0 || startY < 0 || endX > canvas.width || endY > canvas.height) {
    alert("La zone sélectionnée dépasse les dimensions de l'image.");
    return;
}

   cropCanvas.width = width;
   cropCanvas.height = height;

   cropCtx.clearRect(0, 0, cropCanvas.width, cropCanvas.height);

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

// ********************************************parties dessiner **************************************************

   
class Dessin {
    constructor(canvas) {
        this.currentLine = []
        this.draw = false;
        this.isDrawingMode = false
        this.prevX = 0;
        this.prevY = 0;
        this.canvas = canvas; 
        this.ctx = canvasContext;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.lines =[] //pour stocker les dessins 
  
        this.canvas.addEventListener('mousedown', (e) => {
            if(this.isDrawingMode){
                this.draw = true;
                this.prevX = this.getMouseX(e);
                this.prevY = this.getMouseY(e);

                this.currentLine[{
                    depX: this.prevX,
                    depY: this.prevY,
                    color: this.ctx.strokeStyle,
                    width: this.ctx.lineWidth
                }]

            }
        });
  
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.draw && this.isDrawingMode) {
                const currX = this.getMouseX(e);
                const currY = this.getMouseY(e);
                this.dessine(this.prevX, this.prevY, currX, currY);
                this.prevX = currX;
                this.prevY = currY;

                this.currentLine[{
                    depX: this.prevX,
                    depY: this.prevY,
                    destX: currX,
                    destY: currY
                }]
            }
        });
  
        this.canvas.addEventListener('mouseup', () => {
            this.draw = false;
            if (this.currentLine.length > 0) {
                this.lines.push(this.currentLine);  // Sauvegarde le trait complet
            }
        });

        this.canvas.addEventListener('mouseout', () => this.draw = false);
    }
  
    getMouseX(e) {
        return (e.clientX - this.canvas.offsetLeft) * this.canvas.width / this.canvas.clientWidth;
    }
  
    getMouseY(e) {
        return (e.clientY - this.canvas.offsetTop) * this.canvas.height / this.canvas.clientHeight;
    }
  
    dessine(depX, depY, destX, destY) {
        this.lines.push({
          depX: depX,
          depY: depY,
          destX: destX,
          destY:destY,
          color: this.ctx.strokeStyle,
          width: this.ctx.lineWidth
        })

        
        this.ctx.beginPath();
        this.ctx.moveTo(depX, depY);
        this.ctx.lineTo(destX, destY);
        this.ctx.closePath();
        this.ctx.stroke();
        
    }
  
    redessinerImageFiltre(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        // Redessiner l'image avec les filtres appliqués
        this.ctx.filter = generateFilter();
        this.ctx.drawImage(image, 0, 0);
        this.ctx.filter = "none";
         // Redessiner tous les traits
         this.lines.forEach(line => {
            // line.forEach(point => {
                this.ctx.strokeStyle = line.color || 'black';
                this.ctx.lineWidth = line.width || 2;
                this.ctx.beginPath();
                this.ctx.moveTo(line.depX, line.depY);
                this.ctx.lineTo(line.destX, line.destY);
                this.ctx.closePath();
                this.ctx.stroke();
        });
    }
    setColor(color) {
        this.ctx.strokeStyle = color;
    }
  
    biggerStroke() {
        this.ctx.lineWidth++;
    }
  
    smallerStroke() {
        this.ctx.lineWidth = Math.max(1, this.ctx.lineWidth - 1); 
    }
  
    erase() {
        this.lines=[]
        this.redessinerImageFiltre()
    }

    // gerer le bouton gommer
  gommers() {
    if (this.lines.length > 0) {
        this.lines.pop(); // Supprime le dernier trait complet
        this.redessinerImageFiltre()
    
       
    } 
}

    
    // methode pour activer le dessin
    activerDessin(){
        this.isDrawingMode =!this.isDrawingMode
        this.redessinerImageFiltre()
        return this.isDrawingMode
    }
  }

//   instanciation
const instanceDessin = new Dessin(canvas)

// boutton pour activer le dessin
dessin.addEventListener("click", ()=>{
    if(isRognerMode){
        rognerPhoto()
        canvas.style.cursor = "url('./images/pencil-solid.svg')4 4 ,auto";
    }

    canvas.style.cursor = "url('./images/pencil-solid.svg')4 4 ,auto";
    instanceDessin.activerDessin()
})

filter.addEventListener("click", ()=>{
    if(isRognerMode){
        rognerPhoto()
    }
})
// changer la couleur du trait
const colorPiker = document.getElementById("color")
colorPiker.addEventListener("click",()=>{
    const color = colorPiker.value
    instanceDessin.setColor(color)
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

const palette = document.querySelectorAll("#palette div")
// console.log(palette);
palette.forEach(element=>{
    element.addEventListener("click",()=>{
        const color= element.dataset.color
        instanceDessin.setColor(color)
        console.log(color);
        
    })
        
})

const gommer = document.getElementById("gomme")

gommer.addEventListener("click",()=>{
    instanceDessin.gommers()
    console.log("i am working");
    
})