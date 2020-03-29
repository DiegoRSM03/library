const URI = 'https://api.unsplash.com/photos/random/?';
const apiKey = 'client_id=dnjjEBseQMoOKvDUFapG1gD60j2fFPOSMdgfX8TcNNc';
const count = '&count=1';
const query = '&query=desktop landscapes night';
const URL = URI + apiKey + count + query;

async function fetchBackground () {

	let backgroundInfo = [];

	let response = await fetch(URL, {
		method: 'GET',
		mode: 'cors'
	});
	let data = await response.json();

	backgroundInfo.push({
		img: {
			url: data[0].urls.regular
		},
		user: {
			name: data[0].user.name,
			url: data[0].user.links.html
		}
	});
	console.log(data);
	var banner = document.getElementById('banner-sign');
	banner.style.backgroundImage = `url("${backgroundInfo[0].img.url}")`;

}

async function fetchRecomendations () {

	let response = await fetch('http://localhost/5-library/controller/suggestions.php', {
		method: 'POST',
		mode: 'same-origin'
	});
	var suggestionsInfo = await response.json();
	console.log(suggestionsInfo);
	
	var table = document.getElementById('suggestions-table');
	for (let i=0 ; i<5 ; i++) {
		let tr = table.appendChild(document.createElement('tr'))

		let tdName = document.createElement('td');
		tdName.innerHTML = suggestionsInfo[i].name;
		tr.appendChild(tdName);

		let tdGender = document.createElement('td');
		tdGender.innerHTML = suggestionsInfo[i].gender;
		tr.appendChild(tdGender);

		let tdYear = document.createElement('td');
		tdYear.innerHTML = suggestionsInfo[i].year;
		tr.appendChild(tdYear);

	}

}

document.addEventListener('DOMContentLoaded', () => {

	// CAMBIA FONDO DE PANTALLA
	// fetchBackground();
	// setInterval(() => fetchBackground(), 8000);

	// OBTIENE LOS PRIMEROS 5 LIBROS DE LA BASE DE DATOS
	fetchRecomendations();

	// PINTANDO DE BLANCO EL BOTON DE "INICIAR SESIÓN" EN LA BARRA DE NAVEGACION
	var currentSection = document.getElementsByTagName('a')[2]
	currentSection.classList.add('nav-button-selected');
	
});