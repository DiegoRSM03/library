document.addEventListener('DOMContentLoaded', () => {

	//******* PINTANDO LA SECCION ACTUAL DEL USUARIO DEPENDIENDO SI ES SIGNIN O SIGNUP
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
	
	//******* CAMBIA FONDO DE PANTALLA Y DESPUES CADA 8S
	// fetchBackground();
	// setInterval(() => fetchBackground(), 8000);

	//******* OBTIENE LOS PRIMEROS 5 LIBROS DE LA BASE DE DATOS
	fetchSuggestions();

	//******* PONER A LA ESCUCHA LOS BOTONES DE ENVÍO DE FORMULARIO
	document.getElementById('to-form-sign-in').addEventListener('click', e => {
		e.preventDefault();
		fetchSignIn();
	});
	
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
	var banner = document.getElementById('banner-sign');
	banner.style.backgroundImage = `url("${backgroundInfo[0].img.url}")`;

}

async function fetchSuggestions () {

	let response = await fetch('http://localhost/5-library/controller/suggestions.php', {
		method: 'POST',
		mode: 'same-origin'
	});
	var suggestionsInfo = await response.json();
	
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

async function fetchSignIn () {
	
	var id = document.getElementById('id').value;
	var letters = false;
	var follow = true;

	for (let i = 0; i < id.length; i++) {
		(isNaN(id.charAt(i))) ? letters = true : letters = letters;
	}

	(letters) ? follow = false : follow = true;

	if (follow) {
		var data = new FormData(document.getElementById('form-sign-in'));
		const response = await fetch('http://localhost/5-library/controller/sign_in.php', {
			method: 'POST',
			body: data
		});
		var data = await response.json();
		
		if (data[0].authorized == 'yes') {
			window.location = 'http://localhost/5-library/view/authorized/authorized.php';
			if (document.getElementById('remember-me').checked) {
				document.cookie = 'remember-me=yes; expires=600; path=/';
			}
		} else {
			document.getElementById('failure').innerHTML = '<p>El id y contraseña ingresados no coincide</p><p>Intenta registrarte primero</p>'
			sendSignStatus('failure');
		}

	} else {
		document.getElementById('pending').innerHTML = '<p>No se pueden incluir letras en el campo ID</p><p>Intentalo de nuevo</p>';
		sendSignStatus('pending');
	}

}

function sendSignStatus (element) {

	document.getElementById(element).style.transform = 'translateY(0)';
	setTimeout(() => {
		document.getElementById(element).style.transform = 'translateY(-100%)';
	}, 2000);

}