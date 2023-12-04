export class StudentCard extends HTMLElement {
	constructor() {
	  super();
	  this.innerHTML = `
	  <div class="top-container">
			<h2 class="name open">
				${this.getAttribute("name")}
			</h2>
			<p class="video-url">
				<em>${
				  this.getAttribute("video-url") || "https://www.youtube.com/"
				}</em>
			</p>
			<button type="button" class="dropdown active">∨</button>
		</div>
		<div class="bottom-container" style="display: none">
			<div class="qualifications-container">
				<div class="left-container">
					<div class="video-container" id="player">
						<iframe id="ytplayer" type="text/html" frameborder="0" style="width: 100%; height: 100%" src='${
						  "https://www.youtube.com/embed/" +
						  getYouTubeVideoId(this.getAttribute("video-url")) +
						  "?enablejsapi=1&autoplay=0"
						}'>
						</iframe>
					</div>
					<div class="notes">
						<textarea placeholder="Observación/comentario" ></textarea>
					</div>
				</div>
				<div class="right-container">
					<div class="habilidades">
						<h3>HABILIDADES</h3>
						<div class="habilidades-container">
							<div>
								<label
									for="comunicacion"
									class="qualification comunicacion"
									>Comunicación</label
								>
								<input
								style="width: 50%;"
									type="range"
									name="comunicacion"
									id="comunicacion"
									min="1"
									max="5"
									value="1"
								/>
								<p style="width: 20px;" id="comunicacion-promedio"></p>
							</div>
							<div>
								<label
									for="colaboracion"
									class="qualification colaboracion"
									>Colaboración</label
								>
								<input
								style="width: 50%;"
									type="range"
									name="colaboracion"
									id="colaboracion"
									min="1"
									max="5"
									value="1"
								/>
								<p style="width: 20px;" id="colaboracion-promedio"></p>
							</div>
							<div>
								<label
									for="creatividad"
									class="qualification creatividad"
									>Creatividad</label
								>
								<input
								style="width: 50%;"
									type="range"
									name="creatividad"
									id="creatividad"
									min="1"
									max="5"
									value="1"
								/>
								<p style="width: 20px;" id="creatividad-promedio"></p>
							</div>
							<div>
								<label
									for="pensamiento-cientifico"
									class="qualification pensamiento-cientifico"
									>Pensamiento Científico</label
								>
								<input
								style="width: 50%;"
									type="range"
									name="pensamiento-cientifico"
									id="pensamiento-cientifico"
									min="1"
									max="5"
									value="1"
								/>
								<p style="width: 20px;" id="pensamiento-cientifico-promedio"></p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="save-container">
				<button type="button" class="save">GUARDAR</button>
			</div>
		</div>
	`;
	  const communication = this.querySelector("#comunicacion");
	  const collaboration = this.querySelector("#colaboracion");
	  const creativity = this.querySelector("#creatividad");
	  const criticalThinking = this.querySelector("#pensamiento-cientifico");
  
	  const handleSave = () => {
		const comments = this.querySelector(".notes textarea").value;
		const name = this.getAttribute("name");
		const videoUrl = this.getAttribute("video-url");
		const videoId = this.getAttribute("video-id");
		const email = this.getAttribute("email");
		const isStudent = "Soy Estudiante";
  
		Swal.fire({
		  title: "¿Estás seguro de enviar esta información?",
		  icon: "question",
		  showCancelButton: true,
		  confirmButtonColor: "#3085d6",
		  cancelButtonColor: "#d33",
		  confirmButtonText: "Aceptar",
		}).then((result) => {
		  if (result.isConfirmed) {
			fetch(`http://localhost:3000/api/delivery/${videoId}/feedback`, {
			  method: "PATCH",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({
				feedback: {
				  skills: {
					communication: communication.value,
					collaboration: collaboration.value,
					creativity: creativity.value,
					criticalThinking: criticalThinking.value,
				  },
				  comment: comments,
				},
			  }),
			})
			  .then((response) => {
				console.log(response);
				if (response.status === 201) {
				  Swal.fire("¡Se ha enviado la información!", "", "success");
				}
			  })
			  .then(() => {
				setTimeout(() => {
				  window.location.reload();
				}, 1500);
			  });
		  }
		});
	  };
  
	  function getYouTubeVideoId(url) {
		var parser = document.createElement("a");
		parser.href = url;
  
		var params = new URLSearchParams(parser.search);
		if (params.has("∧")) {
		  return params.get("∧");
		} else if (parser.pathname && parser.pathname.length > 1) {
		  return parser.pathname.substr(1);
		} else {
		  return null;
		}
	  }
  
	  const comunicacionPromedio = this.querySelector("#comunicacion-promedio");
	  const colaboracionPromedio = this.querySelector("#colaboracion-promedio");
	  const creatividadPromedio = this.querySelector("#creatividad-promedio");
	  const pensamientoCientificoPromedio = this.querySelector(
		"#pensamiento-cientifico-promedio"
	  );
	  const dropdownBtn = this.querySelector(".dropdown");
	  const bottomContainer = this.querySelector(".bottom-container");
	  const saveBtn = this.querySelector(".save");
  
	  dropdownBtn.addEventListener("click", () => {
		dropdownBtn.classList.toggle("active");
		if (dropdownBtn.classList.contains("active")) {
		  dropdownBtn.textContent = "∨";
		  bottomContainer.style.display = "none";
		} else {
		  dropdownBtn.textContent = "∧";
		  bottomContainer.style.display = "block";
		}
	  });
  
	  communication.addEventListener("change", () => {
		comunicacionPromedio.innerHTML = communication.value;
	  });
	  collaboration.addEventListener("change", () => {
		colaboracionPromedio.innerHTML = collaboration.value;
	  });
	  creativity.addEventListener("change", () => {
		creatividadPromedio.innerHTML = creativity.value;
	  });
	  criticalThinking.addEventListener("change", () => {
		pensamientoCientificoPromedio.innerHTML = criticalThinking.value;
	  });
  
	  saveBtn.addEventListener("click", handleSave);
	}
  }
  
  window.customElements.define("student-card", StudentCard);
  