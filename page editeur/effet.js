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

const colorPiker = document.getElementById("color")
const taillePiker = document.getElementById("taille")

// function activerDessin(){
//     let isDrawing= false
   

//     // function pour commencer le dessin
//     function start(e){
//         isDrawing =true
//         canvasContext.beginPath()
//         canvasContext.moveTo(e.clientX - canvas.offsetX, 
//             e.clientY - canvas.offsetY)
//             console.log(e);
            
//             e.preventDefault()
//     }

//     // function commencerDessin(e){
//     //     isDrawing= true
//     //     canvasContext.beginPath()
//     //     canvasContext.moveTo(e.clientX - canvas.offsetLeft, 
//     //         e.clientY - canvas.offsetTop)

//     //         e.preventDefault()
//     // }

//     // dessiner
//     function draw(e){
//         if(isDrawing){
//             canvasContext.lineTo(e.clientX - canvas.offsetLeft, 
//                                  e.clientY - canvas.offsetTop)
//                 canvasContext.strokeStyle = colorPiker
//                 canvasContext.lineCap = 'round'
//                 canvasContext.lineJoin = 'round'
//                 canvasContext.stroke()
//         }
//     }
    
//     // function dessiner(e){
//     //   if(isDrawing) {
//     //       canvasContext.lineTo(e.clientX - canvas.offsetLeft, 
//     //                           e.clientY - canvas.offsetTop)
//     //         canvasContext.strokeStyle = colorPiker
//     //         canvasContext.lineCap ='round'
//     //         canvasContext.lineJoin ='round'
//     //       canvasContext.stroke()
//     //   }

//     // }

//     // arreter le dessin
//     function stop(e){
//         if(isDrawing){
//             canvasContext.stroke()
//             canvasContext.closePath()
//             isDrawing = false
//         }
//         e.preventDefault()
    
//         // if(e.type != mouseout){
//         //     storeArray.push(canvasContext.getImageData(0,0,canvas.width,canvas.height))
//         //     index +=1
//         //     console.log(storeArray);
//         // }
        
//     }
  

//     // les ecouteurs d'evennement
//     canvas.addEventListener('mousedown', start)
//     canvas.addEventListener('touchstart', start,{passive: false})
//     canvas.addEventListener('touchmove', draw,{passive: false})
//     canvas.addEventListener('touchend', stop,{passive: false})
//     canvas.addEventListener("mousemove",draw)
//     canvas.addEventListener("mouseup",stop)
//     canvas.addEventListener("mouseout",stop)
//     canvas.addEventListener("mouseleave",stop)
// }


// picker le couleur pour dessiner
function activerDessin() {
    let isDrawing = false;

    // Fonction pour commencer le dessin
    function start(e) {
        isDrawing = true;
        canvasContext.beginPath();
        
        // Utiliser offsetX et offsetY pour les coordonnées de la souris
        const x = e.offsetX || e.touches[0].clientX - canvas.offsetLeft;
        const y = e.offsetY || e.touches[0].clientY - canvas.offsetTop;
        
        canvasContext.moveTo(x, y);
        e.preventDefault();
    }

    // Fonction pour dessiner
    function draw(e) {
        if (isDrawing) {
            // Utiliser offsetX et offsetY pour les coordonnées de la souris
            const x = e.offsetX || e.touches[0].clientX - canvas.offsetLeft;
            const y = e.offsetY || e.touches[0].clientY - canvas.offsetTop;
            
            canvasContext.lineTo(x, y);
            canvasContext.strokeStyle = colorPiker;
            canvasContext.lineWidth = 5; // Épaisseur du trait
            canvasContext.lineCap = 'round';
            canvasContext.lineJoin = 'round';
            canvasContext.stroke();
        }
        e.preventDefault();
    }

    // Fonction pour arrêter le dessin
    function stop(e) {
        if (isDrawing) {
            canvasContext.stroke();
            canvasContext.closePath();
            isDrawing = false;
        }
        e.preventDefault();
    }

    // Écouteurs d'événements
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('touchend', stop, { passive: false });
    canvas.addEventListener('mouseout', stop);
    canvas.addEventListener('mouseleave', stop);
}
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

let atokeArray=[]
let index = -1
// gommer 
const btnGommer = document.getElementById("gomme")
btnGommer.addEventListener("click",()=>{
    canvasContext.clearRect(0,0,canvas.width,canvas.height)
    canvasContext.fillRect(0,0,canvas.width,canvas.height)
    storeArray = []
    index = -1
})



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
