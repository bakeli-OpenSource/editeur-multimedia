# Pixel Innovant

## Description du Projet

L'Pixel Innovant est une application web avancée permettant de manipuler des vidéos, éditer des images, générer des GIFs animés et annoter des médias de manière interactive. Ce projet rassemble des fonctionnalités multimédias essentielles tout en offrant un défi technique captivant pour les développeurs.

---

## Fonctionnalités Principales

### A. Manipulation de Vidéos

- **Découpe de séquences vidéo** : Sélectionnez et découpez des segments spécifiques.
- **Ajout d’effets visuels** : Noir et blanc, flou, ajustement du contraste.
- **Ajout de texte ou d’images** : Insérez des titres, logos ou annotations sur des frames spécifiques.

### B. Édition d’Images

- **Filtres de base** : Noir et blanc, sépia, inversion des couleurs.
- **Outils de dessin** : Ajoutez des formes, surlignez ou écrivez à main levée.
- **Recadrage et redimensionnement** : Ajustez les dimensions avec une prévisualisation en temps réel.

### C. Génération de GIFs

- **Depuis des vidéos** : Convertissez des séquences vidéo en GIFs animés avec contrôle de la vitesse et des dimensions.
- **Depuis des images** : Combinez plusieurs images pour créer des GIFs.

### D. Annotation Interactive

- **Pour les images** : Ajoutez des commentaires ou des cadres sur des zones d’intérêt.
- **Pour les vidéos** : Annoter des frames spécifiques avec des commentaires ou marqueurs visuels.

---

## Technologies Utilisées

### 🖼 **Canvas API**

- Dessin sur les vidéos et images.
- Application de transformations : filtres, annotations.

### 📼 **FFmpeg.wasm**

- Traitement et export des vidéos.
- Conversion de vidéos en GIFs.

### 📂 **FileReader API**

- Chargement des fichiers multimédias directement depuis l'ordinateur de l'utilisateur.

### 👨‍💻 **Web Workers**

- Gestion des tâches intensives (rendu vidéo, application des effets) sans bloquer l’interface utilisateur.

### 🎨 **UI Avancée (HTML/CSS/JS)**

- Tableau de bord ergonomique.
- Prévisualisation en temps réel des modifications.

---

## Livrables

1. **Application Web Fonctionnelle**

   - Interface intuitive pour l'édition multimédia.
   - Support pour plusieurs formats de fichiers : JPG, PNG, MP4, etc.

2. **Documentation Utilisateur**

   - Instructions détaillées pour chaque fonctionnalité.

3. **Code Source Structuré**
   - Architecture modulaire pour faciliter les futures améliorations.

---

## Objectifs

- Fournir un outil complet et performant pour l’édition multimédia accessible via un navigateur.

---

## Comment Contribuer

1. Clonez le dépôt :
   ```bash
   git clone <URL_DU_DÉPÔT>
   cd editeur-multimedia
   ```

---

### Auteur

Pixel Innovant a été conçu pour offrir un outil de création puissant et accessible à tous. N'hésitez pas à contribuer ou à poser des questions via des issues ou pull requests ! 🚀
