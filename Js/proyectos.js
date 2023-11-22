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
  
  document.querySelector(".close-modal").addEventListener("click", toggleModal);
  
  document
    .querySelector(".assign_button")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const modal = document.querySelector(".modal");
      modal.classList.toggle("hide");
    });
  
  function adjuntarPDF() {
    // Simular un clic en el input de tipo archivo cuando se hace clic en el botón
    document.getElementById("pdfInput").click();
  }
  
  function cancelarAccion() {
    window.location.href = "misClases.html";
  }