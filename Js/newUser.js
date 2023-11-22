function register(event) {
    // Obtener referencias a los campos del formulario
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const birthday = document.getElementById("birthday").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat_password").value;
    const securityQuestion = document.getElementById("security-question").value;
    const securityAnswer = document.getElementById("security-answer").value;
    const rolAlumno = document.querySelector("input[name='Rol'].alumno").checked;
    const rolDocente = (isAlumnoChecked = document.querySelector(
      'input[name="Rol"].docente'
    ).checked);
    const termsAndConditions = document.getElementById(
      "terms-and-conditions"
    ).checked;

    if (rolAlumno == true) {
        window.location.href = "estudiante.html";
      } else {
        window.location.href = "misClases.html";
      }

      document
      .getElementById("registroForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        register(e);
      });
    