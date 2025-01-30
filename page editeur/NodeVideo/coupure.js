const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Configurer multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'editVideo.html'));
});

// Servir le fichier index.html
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname)));

// Créer un répertoire pour les uploads si ce n'est pas déjà fait
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Route pour uploader la vidéo et découper
app.post('/upload', upload.single('video'), (req, res) => {
    const inputVideoPath = req.file.path;
    const startTime = parseInt(req.body.startTime) || 0;
    const endTime = parseInt(req.body.endTime) || 5;
    const duration = endTime - startTime; // Durée du clip découpé
    const outputPath = `uploads/output-${Date.now()}.mp4`;

    if (duration <= 0) {
        return res.json({ success: false, message: 'Le temps de fin doit être supérieur au temps de début.' });
    }

    ffmpeg(inputVideoPath)
        .setStartTime(startTime) // Début du découpage
        .setDuration(duration)   // Durée du clip
        .output(outputPath)
        .on('end', () => {
            console.log('Fichier généré :', outputPath);
            res.json({ success: true, clipUrl: `/${outputPath}` });
        })
        .on('error', (err) => {
            console.error('Erreur FFmpeg:', err);
            res.json({ success: false });
        })
        .run();
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});