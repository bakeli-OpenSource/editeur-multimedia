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
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                // document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;

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