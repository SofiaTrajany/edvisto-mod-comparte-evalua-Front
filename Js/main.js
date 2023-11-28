// // Incluir la biblioteca de Google Sign-In

// const users = loginUser(data).then((data) =>{
//     console.log(data);
//     if (data === "Welcome"{
//         console.log("login");
//     }else {
//         alert("Usuario o contraseña incorrectos");
//     }
// });

// function ingresarTradicional() {
//     let email = document.getElementById('email').value;
//     let password = document.getElementById('password').value;

//     // Si la validación es exitosa, redirige al usuario a la página de inicio
//     if (email === 'usuario@example.com' && password === 'contraseña') {
//         alert('Inicio de sesión exitoso');

//     } else {
//         alert('Usuario o contraseña incorrectos');
//     }
// }

// document.getElementById('google_login_button').addEventListener('click', function () {

//     alert('Iniciando sesión con Google...');

// });

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
  appId: "1:760161682996:web:f64b84cb4f3b36b0222c61",
};

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const googleLoginButton = document.getElementById("google_login_button");
const regularLoginButton = document.getElementById("login_button");

provider.addScope("127.0.0.1");

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

regularLoginButton.addEventListener("click", function (e) {
  e.preventDefault();
  regularLogin(e);
});

function regularLogin() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const data = JSON.stringify({
    email: email,
    password: password,
  });

  console.log(data);

  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        console.log(data);
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });
}
