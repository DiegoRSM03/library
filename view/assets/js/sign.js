document.addEventListener('DOMContentLoaded', () => {

	if (localStorage.getItem('remember') == 'yes') {
		window.location = 'http://localhost/5-library/view/authorized/authorized.php';
	}

	//PINTANDO LA SECCION ACTUAL DEL USUARIO DEPENDIENDO SI ES SIGNIN O SIGNUP
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
	
	//CAMBIA FONDO DE PANTALLA Y DESPUES CADA 8S
	fetchBackground();
	setInterval(() => fetchBackground(), 8000);

	//OBTIENE LOS PRIMEROS 5 LIBROS DE LA BASE DE DATOS
	fetchSuggestions();

	//PONER A LA ESCUCHA LOS BOTONES DE ENVÍO DE FORMULARIO
	if (sign.get('sign') == 'in') {
		document.getElementById('to-form-sign-in').addEventListener('click', e => {
			e.preventDefault();
			fetchSignIn();
		});
	} else {
		document.getElementById('to-form-sign-up').addEventListener('click', e => {
			e.preventDefault();
			fetchSignUp();
		});
	}
	
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
		var form = new FormData(document.getElementById('form-sign-in'));
		const response = await fetch('http://localhost/5-library/controller/sign_in.php', {
			method: 'POST',
			body: form
		});
		var data = await response.json();
		
		if (data[0].authorized == 'yes') {
			if (document.getElementById('remember-me').checked) {
				localStorage.setItem('remember', 'yes');
			} else {
				localStorage.setItem('remember', 'no');
			}
			document.cookie = 'id=' + id + '; path=/';
			window.location = 'http://localhost/5-library/view/authorized.php';
		} else {
			document.getElementById('failure').innerHTML = '<p>El id y contraseña ingresados no coincide</p><p>Intenta registrarte primero</p>'
			sendSignStatus('failure', 2000);
		}

	} else {
		document.getElementById('pending').innerHTML = '<p>No se pueden incluir letras en el campo ID</p><p>Intentalo de nuevo</p>';
		sendSignStatus('pending', 2000);
	}

}

async function fetchSignUp () {

	var follow = false;
	var numbersInString = '';
	var lettersInDate = false;
	var lettersInDomicilieNumber = false;
	
	var name = document.getElementById('name').value;
	var surname = document.getElementById('surname').value;
	var province = document.getElementById('province').value;
	var formStrings = [name, surname, province];

	if (name.length < 3 || surname.length < 4 || province.length < 4) {
		document.getElementById('pending').innerHTML = '<p>Recuerda que: Los caracteres minimos son 3(Nombre), 5(Apellido), 5(Provincia).</p>';
		sendSignStatus('pending', 3000);
	} else {
		// VERIFICANDO SI HAY LETRAS EN LOS CAMPOS: NOMBRE, APELLIDO, CALLE DOM Y PROVINCIA
		formStrings.forEach(e => {
			for (let i=0 ; i<e.length ; i++) {
				if (!isNaN(e.charAt(i)) && e.charAt(i) != " ") {
					numbersInString = e;
				} 
			}
		});
		if (numbersInString != '') {
			document.getElementById('pending').innerHTML = '<p>Recuerda que: En los campos Nombre, Apellido, Calle de domicilio y Ciudad, no deben ir numeros.</p>';
			sendSignStatus('pending', 3000);
		}
	}

	var dateDay = document.getElementById('date-day').value;
	var dateMonth = document.getElementById('date-month').value;
	var dateYear = document.getElementById('date-year').value;
	var formDates = [dateDay, dateMonth, dateYear];

	const currentDate = new Date();
	const age = currentDate.getFullYear();
	if (dateYear > age || dateYear < 1900 || (dateMonth > 12 && dateMonth > 0) || (dateDay > 31 && dateDay > 0)) {
		document.getElementById('pending').innerHTML = '<p>Recuerda que: Los campos correspondientes a la fecha, tienen que ser realistas.</p>';
		sendSignStatus('pending', 3000);
	} else {
		// VERIFICANDO SI HAY LETRAS EN LOS CAMPOS CORRESPONDIENTES A FECHA
		formDates.forEach(e => {
			for (let i=0 ; i<e.length ; i++) {
				if (isNaN(e.charAt(i))) {
					lettersInDate = true;
				} 
			}
		});
		if (lettersInDate) {
			document.getElementById('pending').innerHTML = '<p>Recuerda que: En los campos de fecha no se deben colocar letras, y el campo año debe tener 4 caracteres</p>';
			sendSignStatus('pending', 3000);
		}
	}

	var directionNumber = document.getElementById('direction-number').value;
	if (directionNumber < 1) {
		document.getElementById('pending').innerHTML = '<p>Recuerda que: La altura de la calle no puede ser 0</p>';
		sendSignStatus('pending', 3000);
	} else {
		// VERIFICANDO SI HAY LETRAS EN EL CAMPO CORRESPONDIENTE A LA ALTURA DE LA CALLE DE DOMICILIO
		for (let i=0 ; i<directionNumber.length ; i++) {
			if (isNaN(directionNumber.charAt(i))) { 
				lettersInDomicilieNumber = true;
			}
		}
		if (lettersInDomicilieNumber) {
			document.getElementById('pending').innerHTML = '<p>Recuerda que: No pueden haber letras en el campo de numero de domicilio</p>';
			sendSignStatus('pending', 3000);
		}
	}

	// VERIFICANDO SI SE CUMPLEN LOS REQUISITOS PARA QUE PUEDA REGISTRARSE EL USUARIO
	(numbersInString != '' || lettersInDate || lettersInDomicilieNumber || dateYear.length != 4) ? follow = false : follow = true;
	if (follow) {
		document.getElementById('successful').innerHTML = '<p>Enviando la informacion al servidor</p><p>Por favor aguarda un momento</p>';
		sendSignStatus('successful', 2000);

		var form = new FormData(document.getElementById('form-sign-up'));
		var response = await fetch('http://localhost/5-library/controller/sign_up.php', {
			method: 'POST',
			body: form
		});
		var data = await response.json();

		if (data[0].status == 'successful') {
			window.location = 'http://localhost/5-library/view/sign/sign.php?sign=in';
		} else {
			document.getElementById('failure').innerHTML = '<p>Ocurrio un error al crear el usuario</p><p>Intentalo de nuevo</p>'
			sendSignStatus('failure', 2000);
		}

	}
	
}

function sendSignStatus (element, time) {

	document.getElementById(element).style.transform = 'translateY(0)';
	setTimeout(() => {
		document.getElementById(element).style.transform = 'translateY(-100%)';
	}, time);

}