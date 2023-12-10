function cambiarColor() {
  const select = document.getElementById("division");
  const options = select.getElementsByTagName("option");

  for (let i = 0; i < options.length; i++) {
    if (options[i].selected) {
      options[i].setAttribute("selected", "true");
    } else {
      options[i].removeAttribute("selected");
    }
  }
}

function toggleModal(e) {
  e.preventDefault();
  const modal = document.querySelector(".modal");
  modal.classList.toggle("hide");
}

async function getStudents() {
  const response = await fetch(
    "http://localhost:3000/api/users?rol=Soy%20Estudiante"
  );
  const data = await response.json();
  return data;
}

const selectedCourse = document.querySelector("#division");

async function makeList() {
  const students = await getStudents();
  const modal = document.querySelector(".student_list");

  modal.innerHTML = "";

  students.Users.forEach((element) => {
    console.log(element.name);
    const studentSlot = document.createElement("div");
    studentSlot.classList.add("student_slot");

    const label = document.createElement("label");
    label.setAttribute("for", element.name);
    label.classList.add("estudianteLabel");
    label.innerHTML = `${element.name} ${element.lastName}`;

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", element.uid);
    input.setAttribute("name", element.name);
    input.classList.add("estudianteBox");

    studentSlot.appendChild(label);
    studentSlot.appendChild(input);
    modal.appendChild(studentSlot);
  });
}

let studentsToAssign = [];

document.querySelectorAll(".close-alert").forEach((element) => {
  element.addEventListener("click", function (e) {
    e.preventDefault();
    this.parentElement.classList.add("hide");
  });
});

document
  .querySelector(".close-modal")
  .addEventListener("click", async function (e) {
    const selectedStudents = document.querySelectorAll(".estudianteBox");
    const selectedStudentsArray = Array.from(selectedStudents);
    const selectedStudentsID = selectedStudentsArray.filter((element) => {
      return element.checked;
    });
    const selectedStudentsIDArray = selectedStudentsID.map((element) => {
      return element.id;
    });
    const students = await getStudents();
    const emails = students.Users.filter((element) => {
      return selectedStudentsIDArray.includes(element.uid);
    });
    const emailsArray = emails.map((element) => {
      return element.email;
    });
    studentsToAssign = emailsArray;
    toggleModal(e);
  });

document
  .querySelector(".assign_button")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const modal = document.querySelector(".modal");
    modal.classList.toggle("hide");
    makeList();
  });

function adjuntarPDF() {
  // Simular un clic en el input de tipo archivo cuando se hace clic en el botón
  document.getElementById("pdfInput").click();
}

function cancelarAccion() {
  window.location.href = "misClases.html";
}

document
  .querySelector("#crear-button")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const email = "nicoleguerrero@example.com";
    const course = document.querySelector("#division").value;
    const name = document.querySelector("#titulo-proyecto").value;
    const title = document.querySelector("#titulo_fenomeno").value;
    const description = document.querySelector("#descripcion_proyecto").value;
    const emailStudents = studentsToAssign;
    const resourcesUrl = Array.from(document.querySelector("#urllink").value);
    const startDate = document.querySelector("#fecha_inicio").value;
    const endDate = document.querySelector("#fecha_fin").value;

    const startDateArray = startDate.split("-");
    const endDateArray = endDate.split("-");
    const startDateInverted = `${startDateArray[2]}-${startDateArray[1]}-${startDateArray[0]}`;
    const endDateInverted = `${endDateArray[2]}-${endDateArray[1]}-${endDateArray[0]}`;

    const data = {
      emailTeacher: email,
      course,
      name,
      title,
      descriptión: description,
      emailStudents,
      resourcesURL: resourcesUrl,
      startDate: startDateInverted,
      finishDate: endDateInverted,
    };
    if (
      data.name === "" ||
      data.title === "" ||
      data.description === "" ||
      data.startDate === "" ||
      data.finishDate === ""
    ) {
      document.querySelector(".error").classList.remove("hide");
      return;
    }

    const response = await fetch("http://localhost:3000/api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.message !== "Assigned Project") {
      document.querySelector(".error").classList.remove("hide");
    } else {
      document.querySelector(".success").classList.remove("hide");
      document
        .querySelector(".close-alert")
        .addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "misClases.html";
        });
    }
  });

  