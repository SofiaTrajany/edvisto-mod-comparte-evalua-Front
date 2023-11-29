

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";

// Add Firebase products that you want to use
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJNkX9GYXk4hJbd4kYzaCw5ppJR0f_vP8",
  authDomain: "team-9-back-asp.firebaseapp.com",
  projectId: "team-9-back-asp",
  storageBucket: "team-9-back-asp.appspot.com",
  messagingSenderId: "760161682996",
  appId: "760161682996:web:f64b84cb4f3b36b0222c61",
};

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const googleLoginButton = document.getElementById("google_login_button");
const regularLoginButton = document.getElementById("login_button");

//provider.addScope("127.0.0.1");
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const loginWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
googleLoginButton.addEventListener("click", function (e) {
  e.preventDefault();
  loginWithGoogle(e);
});

//regularLoginButton.addEventListener("click", function (e) {
 // e.preventDefault();
 // regularLogin(e);
//});

function regularLogin() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const data = {
    email: email,
    password: password,
  };


  const users = loginUser(data).then((data) => {
    if (data === 'Welcome teacher') {
      console.log('login');
      location.href = './pages/misClases.html';
    } else if (data === 'Welcome student') {
      // location.href = “./pages/mis.html”;
      //  ir a inicio para alumnos
    } else {
      alert('Usuario y/o contraseña equivocados');
    }
  }); 
}

async function loginUser(data) {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc. 
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match “Content-Type” header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// Asignar la función login al evento 'submit' del formulario
document
  .getElementById("login_form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    regularLogin();
  });
