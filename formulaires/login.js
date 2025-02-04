// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByNjLGSopCvEgKUmNEOoSac0epgdM8qAk",
  authDomain: "editeur-da8d0.firebaseapp.com",
  projectId: "editeur-da8d0",
  storageBucket: "editeur-da8d0.firebasestorage.app",
  messagingSenderId: "738566604177",
  appId: "1:738566604177:web:59d00db794b1dda8618630",
  measurementId: "G-569LF1V09K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  if (!messageDiv) {
    console.log("Erreur : élément introuvable ", divId);
    return;
  }

  console.log("Affichage du message :", message);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
    setTimeout(function () {
      messageDiv.style.display = "none";
    }, 1000);
  }, 5000);
}

const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage("login is successful", "signInMessage");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "../page d'acceuil/acceuil.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential") {
        showMessage("Incorrect Email or Password", "signInMessage");
      } else {
        showMessage("Account does not Exist", "signInMessage");
      }
    });
});
