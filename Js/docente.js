import './StudentCard.js';

const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
let queryEmail = params.email;

async function getUsers() {
	const allUsers = await fetch('http://localhost:3000/api/users')
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
	return allUsers;
}

async function getVideos() {
	const allVideos = await fetch(
		'https://team-10-back.onrender.com/api/videos'
	)
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
	return allVideos;
}
function setThisTeacher(allUsers) {
	const thisTeacher = allUsers.List.filter((teacher) => {
		return teacher.email === queryEmail;
	});
	return thisTeacher[0];
}

function setTeachersVideos(allVideos, thisTeacher) {
	const thisTeachersVideos = allVideos.list.filter((video) => {
		return video.nameTeacher === thisTeacher.name && !video.qualified;
	});
	return thisTeachersVideos;
}

function getStudentById(allUsers, id) {
	const thisStudent = allUsers.List.filter((student) => {
		return student._id === id;
	});
	return thisStudent[0];
}

async function getTeachersVideos() {
	const allUsers = await getUsers();
	const allVideos = await getVideos();

	// conseguir el nombre del docente
	const thisTeacher = setThisTeacher(allUsers);

	// conseguir los videos del docente
	const thisTeachersVideos = setTeachersVideos(allVideos, thisTeacher);

	// creo un array de objetos con los datos que necesito
	const videosToQualify = thisTeachersVideos.map((video) => {
		return {
			studentName: getStudentById(allUsers, video.authorId).name,
			studentEmail: getStudentById(allUsers, video.authorId).email,
			videoUrl: video.url,
			videoId: video._id,
		};
	});

	// creo un componente por cada video
	const studentCards = videosToQualify
		.map(
			(student) =>
				`<student-card name="${student.studentName}" email="${student.studentEmail}" video-url="${student.videoUrl}" video-id="${student.videoId}"></student-card>`
		)
		.join('');

	document.querySelector('#student-card-container').innerHTML = studentCards;
}

getTeachersVideos();