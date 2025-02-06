// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore , setDoc , doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

// Your web app's Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyByNjLGSopCvEgKUmNEOoSac0epgdM8qAk",
  authDomain: "editeur-da8d0.firebaseapp.com",
  projectId: "editeur-da8d0",
  storageBucket: "editeur-da8d0.firebasestorage.app",
  messagingSenderId: "738566604177",
  appId: "1:738566604177:web:59d00db794b1dda8618630",
  measurementId: "G-569LF1V09K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);


function showMessage(message, type) {
  var messageDiv = type === "success" ? document.getElementById("signUpMessage") : document.getElementById("errorMessage");

  if (!messageDiv) {
    console.error("Erreur : élément introuvable pour le type", type);
    return;
  }

  console.log("Affichage du message :", message);
  messageDiv.style.display = "block";
  messageDiv.style.opacity = 1;
  messageDiv.innerHTML = message;

  setTimeout(() => {
    messageDiv.style.opacity = 0;
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 1000);
  }, 2000); 
}

// Vérifier si l'email est valide
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}


// submit button
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', function(event) {
    event.preventDefault()

// inputs
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const firstName = document.getElementById('first-name').value;
const lastName = document.getElementById('last-name').value;
const confirmPassword = document.getElementById('confirm-password').value


if (!email || !password || !firstName || !lastName || !confirmPassword) {
   showMessage("Tous les champs sont obligatoires", "error");
    return;
}

// Vérifier si l'email est valide
if (!isValidEmail(email)) {
    showMessage("Veuillez entrer un email valide", "error");
    return;
}

// Vérifier si les mots de passe correspondent
if (password !== confirmPassword) {
    showMessage("Les mots de passe ne correspondent pas", "error");
    return;
}

// Vérifier si le mot de passe est suffisamment sécurisé
if (password.length < 6) {
    showMessage("Le mot de passe doit contenir au moins 6 caractères", "error");
    return;
}

const auth = getAuth();
const db = getFirestore()


createUserWithEmailAndPassword(auth, email , password )
.then((userCredential) => {
    // Signed up
    const user = userCredential.user;
    const userData = {
      email : email,
      firstName : firstName,
      lastName: lastName,
      confirmPassword : confirmPassword
    }
   showMessage("Compte créé avec succès", "success");
    const docRef = doc(db, "users" , user.uid);
    setDoc(docRef,userData)
    .then(() => {
      window.location.href="login.html"
    })
     .catch((error) => {
      console.log("error writing document", error);
   })
})
.catch((error) => {
  const errorCode = error.code;
  console.log("Erreur Firebase captée :", errorCode)
  if(errorCode=='auth/email-already-in-use'){
    console.log("Message d'erreur affiché !");
    showMessage("L'adresse e-mail existe déjà !!!", 'error')
  }
  else{
      showMessage("Impossible de créer l'utilisateur", 'error')
  }
})
});
