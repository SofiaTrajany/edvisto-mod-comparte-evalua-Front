function convertDateFormat(inputDate) {
  const dateParts = inputDate.split("-");
  const outputDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

  return outputDate;
}

async function register() {
  // Obtener referencias a los campos del formulario
  const name = document.getElementById("name").value;
  const lastName = document.getElementById("surname").value;
  const birthday = convertDateFormat(document.getElementById("birthday").value);
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

  const formData = {
    name: name,
    lastName: lastName,
    birthdayDate: birthday,
    email: email,
    password: password,
    password2: repeatPassword,
    securityQuestion: securityQuestion,
    securityResponse: securityAnswer,
    rol: rolAlumno ? "Soy Estudiante" : "Soy Docente",
    acceptedTerms: termsAndConditions,
    course: "QUINTOA",
  };

  const jsonData = JSON.stringify(formData);

  console.log(jsonData);

  fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        alert(data.message);
        window.location.href = "http://localhost:5500/index.html";
      }
    });
}

// Asignar la función register al evento 'submit' del formulario
document
  .getElementById("registroForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    register();
  });
