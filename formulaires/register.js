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

function showMessage(message , divId){
  var messageDiv = document.getElementById(divId);
  if (!messageDiv) {
    console.log("Erreur : élément introuvable ", divId);
    return;
  }

  console.log("Affichage du message :", message);
  messageDiv.style.display= "block";
  messageDiv.innerHTML= message;
  messageDiv.style.opacity = 1;
  setTimeout(function() {
    messageDiv.style.opacity = 0;
    setTimeout(function() {
        messageDiv.style.display = "none"; 
      }, 1000);
  }, 5000);
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
   showMessage("Tous les champs sont obligatoires", "signUpMessage");
    return;
}

// Vérifier si l'email est valide
if (!isValidEmail(email)) {
    showMessage("Veuillez entrer un email valide", "signUpMessage");
    return;
}

// Vérifier si les mots de passe correspondent
if (password !== confirmPassword) {
    showMessage("Les mots de passe ne correspondent pas", "signUpMessage");
    return;
}

// Vérifier si le mot de passe est suffisamment sécurisé
if (password.length < 6) {
    showMessage("Le mot de passe doit contenir au moins 6 caractères", "signUpMessage");
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
   showMessage("Account Created Successfull", "signUpMessage");
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
    showMessage('Email  Address Already Exists !!!', 'signUpMessage')
  }
  else{
      showMessage('unable to create User', 'signUpMessage')
  }
})
});
