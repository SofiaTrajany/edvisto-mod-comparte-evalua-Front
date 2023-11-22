const videoInput = document.querySelector('#youtubeLink');
const calificacion = document.querySelector('#calificacion');
const puntajePromedioDisplay = document.querySelector('#puntaje');
const observaciones = document.querySelector('#observaciones');
const validateButton = document.getElementById('submit');
const checkCircle = document.querySelector('.checkCircle');
const professorSelection = document.querySelector('#nombreDocente');

const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
let queryEmail = params.email;

// buscar todos los profesores
fetch('http://localhost:3000/api/users').then((response) => {
	if (response.status === 200) {
		response.json().then((data) => {
			const professors = data.List.filter((professor) => {
				return professor.rol === 'Soy Docente';
			});
			professors.forEach((professor) => {
				const option = document.createElement('option');
				option.value = professor.name;
				option.innerHTML = professor.name;
				professorSelection.appendChild(option);
			});
		});
	}
});

// como el POST a /api/login no devuelve el ID, no puedo usar api/users/:id,
// por ende tengo que hacer un fetch de todos los usuarios, y filtrar por email/nombre
fetch('https://team-10-back.onrender.com/api/users')
	.then((response) => response.json())
	.then((data) => {
		const thisStudent = data.List.filter((student) => {
			return student.email === queryEmail;
		});
		searchQualifications(thisStudent[0]._id);
	})
	.catch((error) => {
		console.error('Error fetching data:', error);
	});

function searchQualifications(studentId) {
	// conseguir el id del video
	fetch(`https://team-10-back.onrender.com/api/videos/${studentId}`).then(
		(response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					// no se si mi usuario tiene un video subido, por ende si vuelve
					// un array vacio, asumo que no.
					if (data.data.length === 0) {
						handleVideoInput();
						return;
					} else {
						// agarramos el id del primer video, ya que no hay forma de
						// ver si hay mas de un video calificado
						videoInput.value = data.data[0].url;
						videoInput.disabled = true;
						validateButton.disabled = true;
						validateButton.classList.add('success');
						checkCircle.innerHTML = '&#10003;';
						professorSelection.value = data.data[0].nameTeacher;
						professorSelection.disabled = true;
						if (data.data[0].qualified === false) {
							puntajePromedioDisplay.innerHTML =
								'Video subido, pero no calificado';
							return;
						} else {
							calificacion.value = Math.round(
								(data.data[0].qualification.skills
									.communication +
									data.data[0].qualification.skills
										.collaboration +
									data.data[0].qualification.skills
										.creativity +
									data.data[0].qualification.skills
										.critical_thinking) /
									4
							);
							puntajePromedioDisplay.innerHTML =
								calificacion.value;
						}
						if (data.data[0].qualification.comments !== '') {
							observaciones.innerHTML =
								data.data[0].qualification.comment;
						}
					}
				});
			}
		}
	);
}

function handleVideoInput(student) {
	puntajePromedioDisplay.innerHTML = 'Todavia no has subido un video';
	videoInput.value = '';
	validateButton.addEventListener('click', function () {
		const urlRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
		const url = videoInput.value.trim();

		if (url === '' || professorSelection.value === 'none') {
			checkCircle.innerHTML = '&#10007;';
			checkCircle.classList.add('error');
		} else if (urlRegex.test(url)) {
			fetch('https://team-10-back.onrender.com/api/upload', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					url: url,
					nameTeacher: professorSelection.value,
					email: queryEmail,
				}),
			}).then((res) => {
				if (res.status === 201) {
					alert('Video subido con exito');
					checkCircle.innerHTML = '&#10003;';
					checkCircle.classList.add('success');
					checkCircle.classList.remove('error');
					validateButton.disabled = true;
					professorSelection.disabled = true;
				} else {
					alert('Hubo un error al subir el video');
				}
			});
		} else {
			alert('El link no es valido');
		}
	});
}