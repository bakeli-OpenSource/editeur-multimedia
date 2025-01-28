const canvas = new fabric.Canvas('canvas');
canvas.setWidth(400);
canvas.setHeight(400);

// Fonction pour créer un nouveau texte
function addNewText() {
    const textObject = new fabric.Textbox("Texte ici", {
        left: 50,
        top: 50,
        fontSize: 30,
        fill: "#000",
        fontFamily: "Arial",
        fontWeight: "normal",
        fontStyle: "normal",
        underline: false, 
        editable: true
    });

    canvas.add(textObject);
    canvas.setActiveObject(textObject);
    updateControls(textObject);
}

// Mettre à jour les contrôles de l'éditeur
function updateControls(textObject) {
    document.getElementById("textInput").value = textObject.text;

    // Synchroniser les cases à cocher
    document.getElementById("bold").checked = textObject.fontWeight === "bold";
    document.getElementById("italic").checked = textObject.fontStyle === "italic";
    document.getElementById("underline").checked = textObject.underline;

    // Mettre à jour le texte
    document.getElementById("textInput").addEventListener("input", function () {
        textObject.text = this.value;
        canvas.renderAll();
    });

    // Mettre à jour la police
    document.getElementById("fontType").addEventListener("change", function () {
        textObject.fontFamily = this.value;
        canvas.renderAll();
    });

    // Mettre à jour la couleur
    document.getElementById("textColor").addEventListener("input", function () {
        textObject.fill = this.value;
        canvas.renderAll();
    });

    // Mettre à jour la taille
    document.getElementById("fontSize").addEventListener("input", function () {
        textObject.fontSize = this.value;
        canvas.renderAll();
    });

    // Mettre en gras
    document.getElementById("bold").addEventListener("change", function () {
        textObject.fontWeight = this.checked ? "bold" : "normal";
        canvas.renderAll();
    });

    // Mettre en italique
    document.getElementById("italic").addEventListener("change", function () {
        textObject.fontStyle = this.checked ? "italic" : "normal";
        canvas.renderAll();
    });

    // Souligner le texte
    document.getElementById("underline").addEventListener("change", function () {
        textObject.underline = this.checked; 
        canvas.renderAll();
    });
}

// Supprimer le texte sélectionné
document.getElementById("deleteTextBtn").addEventListener("click", function () {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
        canvas.remove(activeObject); 
        canvas.renderAll(); 
    } else {
        // alert("Veuillez sélectionner un texte à supprimer.");
    }
});

// Charger une image en arrière-plan
document.getElementById("uploadImage").addEventListener("change", function (event) {
    const reader = new FileReader();
    reader.onload = function (e) {
        fabric.Image.fromURL(e.target.result, function (img) {
            const scaleX = canvas.width / img.width;
            const scaleY = canvas.height / img.height;
            const scale = Math.min(scaleX, scaleY); 

            img.scale(scale);
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        });
    };
    reader.readAsDataURL(event.target.files[0]);
});


// Télécharger l'image modifiée
document.getElementById("downloadBtn").addEventListener("click", function () {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "image_modifiée.png";
    link.click();
});

// Ajouter un nouvel objet de texte
document.getElementById("addTextBtn").addEventListener("click", function () {
    addNewText();
});

// Synchronisation lors de la sélection d'un objet
canvas.on("object:selected", function (event) {
    const obj = event.target;
    if (obj.type === "textbox") {
        updateControls(obj);
    }
});

// Désélection
canvas.on("selection:cleared", function () {
    document.getElementById("textInput").value = "";
    document.getElementById("bold").checked = false;
    document.getElementById("italic").checked = false;
    document.getElementById("underline").checked = false;
});
