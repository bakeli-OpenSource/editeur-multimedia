import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore , getDoc , doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

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

const auth=getAuth();
const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('userFirstName').innerText=userData.firstName;
                // document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('userName').innerText=userData.lastName;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logoutBtn');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='../index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })



// Sélectionner la case à cocher
var checkbox = document.querySelector("input[name=mode]");

// Restaurer le thème à la charge de la page
document.addEventListener("DOMContentLoaded", function () {
  console.log("hello")
  const theme = localStorage.getItem("theme"); // Récupérer le thème depuis le localStorage
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme); // Appliquer le thème
    checkbox.checked = theme === "dark"; // Mettre à jour l'état de la case à cocher
  }
});

// Gérer le changement de thème
checkbox?.addEventListener("change", function () {
  console.log("hello")

  if (this.checked) {
    trans(); // Transition d'effet
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); // Sauvegarder le thème dans le localStorage
  } else {
    trans();
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); // Sauvegarder le thème dans le localStorage
  }
});

// Ajouter une transition visuelle
let trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};

console.log("hello")
