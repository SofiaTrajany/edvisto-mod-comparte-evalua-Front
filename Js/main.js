// Incluir la biblioteca de Google Sign-In
<script src="https://apis.google.com/js/platform.js" async defer></script>

const users = loginUser(data).then((data) =>{
    console.log(data);
    if (data === "Welcome"{
        console.log("login");
    }else {
        alert("Usuario o contraseña incorrectos");
    }
});


function ingresarTradicional() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

       
    // Si la validación es exitosa, redirige al usuario a la página de inicio
    if (email === 'usuario@example.com' && password === 'contraseña') {
        alert('Inicio de sesión exitoso'); 
        
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

document.getElementById('google_login_button').addEventListener('click', function () {
    
    alert('Iniciando sesión con Google...');
    
});

