document.addEventListener('DOMContentLoaded', () => {

	//------------------------------------------PINTANDO LA SECCION ACTUAL DEL USUARIO
	var sign = new URLSearchParams(window.location.search);
	if (sign.get('sign') == 'in') {
		document.getElementById('sign-in').style.color = '#FAFAFA';
		document.getElementById('form-sign-in').style.paddingTop = '10rem';
		document.getElementsByClassName('suggestions')[0].style.paddingTop = '10rem';
	} else {
		document.getElementById('sign-up').style.color = '#FAFAFA';
		document.getElementById('form-sign-up').style.paddingTop = '3rem';
		document.getElementsByClassName('suggestions')[0].style.paddingTop = '3rem';
	}
	
	//------------------------------------------CAMBIA FONDO DE PANTALLA
	// fetchBackground();
	// setInterval(() => fetchBackground(), 8000);

	//------------------------------------------OBTIENE LOS PRIMEROS 5 LIBROS DE LA BASE DE DATOS
	fetchSuggestions();
	
});

async function fetchBackground () {

	let URI = 'https://api.unsplash.com/photos/random/?';
	let apiKey = 'client_id=dnjjEBseQMoOKvDUFapG1gD60j2fFPOSMdgfX8TcNNc';
	let count = '&count=1';
	let query = '&query=desktop landscapes night';
	let URL = URI + apiKey + count + query;
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

async function fetchSuggestions () {

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
