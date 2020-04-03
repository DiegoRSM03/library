document.addEventListener('DOMContentLoaded', () => {

	document.cookie = 'current_section=users; path=/';

	//DESHABILITANDO INPUT PARA EDITAR USUARIO Y OCULTANDO BOTONES GUARDAR Y CANCELAR
	for (let i=0 ; i<9 ; i++) {
		document.getElementsByClassName('settings-input')[i].disabled = true;
	}
	document.getElementById('save-cancel').style.display = 'none';

	//SI EL USUARIO INTENTA ACCEDER SIN PASAR POR EL LOGIN
	if (localStorage.getItem('remember') == null) {
		window.location = 'http://localhost/5-library/index.php';
	} else if (localStorage.getItem('remember') == 'no') {
		localStorage.removeItem('remember');
	}

	//ANIMACION TOGGLE DE BOTON DE AJUSTES
	sessionStorage.setItem('settingsOn', 'no');
	document.getElementById('settings').addEventListener('click', () => {
		fetchUserInfo();
	});

	//BOTON DE EDITAR USUARIO ACTUAL
	document.getElementById('button-edit').addEventListener('click', () => {
		document.getElementById('button-edit').style.display = 'none';
		document.getElementById('save-cancel').style.display = 'flex';
		for (let i=0 ; i<9 ; i++) {
			document.getElementsByClassName('settings-input')[i].disabled = false;
			document.getElementsByClassName('settings-input')[i].style.backgroundColor = 'rgba(0, 0, 0, .4)';
		}
	});

	//BOTON DE CANCELAR LA EDICION DEL USUARIO
	document.getElementById('button-cancel').addEventListener('click', () => {
		document.getElementById('save-cancel').style.display = 'none';
		document.getElementById('button-edit').style.display = 'inline-block';
		for (let i=0 ; i<9 ; i++) {
			document.getElementsByClassName('settings-input')[i].disabled = true;
			document.getElementsByClassName('settings-input')[i].style.backgroundColor = 'rgba(200, 200, 200, .1)';
		}
		sessionStorage.setItem('settingsOn', 'no');
		fetchUserInfo();
	});

	//BOTON DE GUARDAR LA EDICION DEL USUARIO
	document.getElementById('button-save').addEventListener('click', () => {
		fetchEditUser();
	});

	//BOTON DE CERRAR SESIÓN EN AJUSTES
	document.getElementById('button-log-out').addEventListener('click', () => {
		localStorage.removeItem('remember');
		window.location = 'http://localhost/5-library/index.php';
	});



	//PREPARANDO LAS SECCIONES PARA SER CONSULTADAS
	var sections = [
		{'section': 'users', 'object': document.getElementById('nav-users'), 'headers': ['ID', 'Nombre', 'Apellido', 'Domicilio', 'Provincia', 'Nacimiento', 'Contraseña']},
		{'section': 'loans', 'object': document.getElementById('nav-loans'), 'headers': ['ID', 'ID del Libro', 'ID del Usuario', 'Inicio del Préstamo', 'Fin del Préstamo']},
		{'section': 'books', 'object': document.getElementById('nav-books'), 'headers': ['ID', 'Titulo', 'Editorial', 'Género', 'Paginas', 'Año', 'Precio', 'ID del Autor']},
		{'section': 'coupons', 'object': document.getElementById('nav-coupons'), 'headers': ['ID', 'Precio de Descuento']},
		{'section': 'authors', 'object': document.getElementById('nav-authors'), 'headers': ['ID', 'Nombre', 'Apellido', 'Premios', 'País']}
	]
	sections.forEach(e => {
		e.object.addEventListener('click', () => {
			document.getElementById('welcome').style.visibility = 'hidden';
			document.cookie = 'page_start=0; path=/';
			document.cookie = 'current_section=' + e.section + '; path=/';
			setTableHeaders(e.headers);
			document.getElementById('pagination').style.visibility = 'visible';
			fetchSection(e.section, false, false)
		});
	});

	//BOTONES ANTERIOR Y SIGUIENTE
	document.getElementById('page-prev').addEventListener('click', () => {
		if (getCookie('page_start') == 0) {
			document.getElementById('pending').innerHTML = '<p>Esta es la primer página</p><p>No hay registros anteriores a estos por ver</p>'
			sendSignStatus('pending', 2500);
		} else {
			fetchSection(getCookie('current_section'), true, false);
		}
	});
	document.getElementById('page-next').addEventListener('click', () => {
		fetchSection(getCookie('current_section'), false, true);
	});

});

async function fetchUserInfo () {

	if (sessionStorage.getItem('settingsOn') == 'yes') {

		sessionStorage.setItem('settingsOn', 'no');
		document.getElementsByClassName('settings')[0].style.transform = 'translateX(100%)';
		
	} else if (sessionStorage.getItem('settingsOn') == 'no'){
		
		sessionStorage.setItem('settingsOn', 'yes');
		document.getElementsByClassName('settings')[0].style.transform = 'translateX(0)';
	
		var response = await fetch('http://localhost/5-library/controller/user_info.php');
		var data = await response.json();

		document.getElementById('settings-id').innerHTML = data[0].id;
		document.getElementById('settings-name').value = data[0].name;
		document.getElementById('settings-surname').value = data[0].surname;

		let domicilieString = '';
		let domicilieNumber = '';
		for (let i=0 ; i<data[0].domicilie.length ; i++) {
		if (isNaN(data[0].domicilie.charAt(i)) || data[0].domicilie.charAt(i) == ' ') {
			domicilieString += data[0].domicilie.charAt(i);
		} else {
			domicilieNumber += data[0].domicilie.charAt(i);
		}
	}

		document.getElementById('settings-domicilie-string').value = domicilieString;
		document.getElementById('settings-domicilie-number').value = domicilieNumber;

		
		document.getElementById('settings-date-day').value = data[0].date_of_birth.substring(8,10);
		document.getElementById('settings-date-month').value = data[0].date_of_birth.substring(5,7);
		document.getElementById('settings-date-year').value = data[0].date_of_birth.substring(0,4);
		
		
		document.getElementById('settings-province').value = data[0].province;
		document.getElementById('settings-password').value = data[0].password;

	}

}

async function fetchEditUser () {

	var follow = false;
	var numbersInString = '';
	var lettersInDate = false;
	var lettersInDomicilieNumber = false;
	


	var name = document.getElementById('settings-name').value;
	var surname = document.getElementById('settings-surname').value;
	var province = document.getElementById('settings-province').value;
	var domicilie = document.getElementById('settings-domicilie-string').value;
	var formStrings = [name, surname, province, domicilie];

	if (name.length < 3 || surname.length < 4 || domicilie.length < 4 || province.length < 4) {
		document.getElementById('pending').innerHTML = '<p>Recuerda que: Los caracteres minimos son 3(Nombre), 5(Apellido), 5(Provincia).</p>';
		sendSignStatus('pending', 3000);
	} else {
		// VERIFICANDO SI HAY LETRAS EN LOS CAMPOS: NOMBRE, APELLIDO, CALLE DOM Y PROVINCIA
		formStrings.forEach(e => {
			for (let i=0 ; i<e.length ; i++) {
				if (!isNaN(e.charAt(i)) && e.charAt(i) != ' ') {
					console.log(numbersInString.charAt(i));
					numbersInString = e;
				}
			}
		});
		if (numbersInString != '') {
			document.getElementById('pending').innerHTML = '<p>Recuerda que: En los campos Nombre, Apellido, Calle de domicilio y Ciudad, no deben ir numeros.</p>';
			sendSignStatus('pending', 3000);
		}
	}



	var dateDay = document.getElementById('settings-date-day').value;
	var dateMonth = document.getElementById('settings-date-month').value;
	var dateYear = document.getElementById('settings-date-year').value;
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



	var directionNumber = document.getElementById('settings-domicilie-number').value;
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

		var form = new FormData(document.getElementById('form-settings'));
		var response = await fetch('http://localhost/5-library/controller/api/update.php', {
			method: 'POST',
			body: form
		});
		var data = await response.json();
		console.log(data);

		if (data[0].status == 'successful') {
			document.getElementById('successful').innerHTML = '<p>Usuario editado con éxito</p>';
			sendSignStatus('successful', 2000);
		} else {
			document.getElementById('failure').innerHTML = '<p>Ocurrio un error al crear el usuario</p><p>Intentalo de nuevo</p>'
			sendSignStatus('failure', 2000);
		}

		//CONVIRTIENDO LOS INPUT A DESACTIVADOS YA QUE FINALIZÓ LA OPERACION
		document.getElementById('save-cancel').style.display = 'none';
		document.getElementById('button-edit').style.display = 'inline-block';
		for (let i=0 ; i<9 ; i++) {
			document.getElementsByClassName('settings-input')[i].disabled = true;
			document.getElementsByClassName('settings-input')[i].style.backgroundColor = 'rgba(200, 200, 200, .1)';
		}
		sessionStorage.setItem('settingsOn', 'no');
		fetchUserInfo();

	}
	
}

function sendSignStatus (element, time) {

	document.getElementById(element).style.transform = 'translateY(0)';
	setTimeout(() => {
		document.getElementById(element).style.transform = 'translateY(-100%)';
	}, time);

}

function setTableHeaders (headers) {
	document.getElementById('headers').innerHTML = '';
	headers.forEach(e => {
		var th = document.createElement('th');
		th.innerHTML = e;
		document.getElementById('headers').appendChild(th);
	});
	document.getElementById('headers').appendChild(document.createElement('th'));
}

async function fetchSection (section, prev, next) {

	if (prev == false && next == false) {
		document.cookie = 'page_start=0; path=/';
	} else if (next) {
		document.cookie = 'page_start=' + (parseInt(getCookie('page_start')) + 5) + '; path=/';
	} else {
		document.cookie = 'page_start=' + (parseInt(getCookie('page_start')) - 5) + '; path=/';
	}

	var response = await fetch('http://localhost/5-library/controller/api/get.php');
	var data = await response.json();

	var tableBody = document.getElementById('tbody');
	tableBody.innerHTML = '';

	data.forEach(e => {
		var tr = document.createElement('tr');
		tableBody.appendChild(tr);

		var tdId = document.createElement('td');
		tdId.innerHTML = e.id;
		tr.appendChild(tdId);

		if (section == 'users' || section == 'books' || section == 'authors') {
			var tdName = document.createElement('td');
			tdName.innerHTML = `<input id="table-name-${e.id}" type="text" value="${e.name}">`;
			tr.appendChild(tdName);
		}

		if (section == 'users' || section == 'authors') {

			var tdSurname = document.createElement('td');
			tdSurname.innerHTML = `<input id="table-surname-${e.id}" class="table-surname" type="text" value="${e.surname}">`;
			tr.appendChild(tdSurname);

		}

		if (section == 'users') {

			document.getElementById('section-name').innerHTML = 'USUARIOS';
			document.getElementById(`table-name-${e.id}`).classList.add('table-name-users');
	
			var tdDomicilie = document.createElement('td');
			tdDomicilie.innerHTML = `<input id="table-domicilie-${e.id}" class="table-domicilie" type="text" value="${e.domicilie}">`;
			tr.appendChild(tdDomicilie);
	
			var tdProvince = document.createElement('td');
			tdProvince.innerHTML = `<input id="table-province-${e.id}" class="table-province" type="text" value="${e.province}">`;
			tr.appendChild(tdProvince);
	
			var tdDateOfBirth = document.createElement('td');
			tdDateOfBirth.innerHTML = `<input id="table-date-of-birth-${e.id}" class="table-date-of-birth" type="text" value="${e.date_of_birth}">`;
			tr.appendChild(tdDateOfBirth);
	
			var tdPassword = document.createElement('td');
			tdPassword.innerHTML = `<input id="table-password-${e.id}" class="table-password" type="text" value="${e.password}">`;
			tr.appendChild(tdPassword);

		} else if (section == 'loans') {

			document.getElementById('section-name').innerHTML = 'PRÉSTAMOS';

			var tdIdBook = document.createElement('td');
			tdIdBook.innerHTML = `<input id="table-book-${e.id}" class="table-book" type="text" value="${e.book_id}">`;
			tr.appendChild(tdIdBook);

			var tdIdUser = document.createElement('td');
			tdIdUser.innerHTML = `<input id="table-user-${e.id}" class="table-user" type="text" value="${e.user_id}">`;
			tr.appendChild(tdIdUser);

			var tdDateIn = document.createElement('td');
			tdDateIn.innerHTML = `<input id="table-loan-in-${e.id}" class="table-loan-in" type="text" value="${e.loan_date_in}">`;
			tr.appendChild(tdDateIn);

			var tdDateOut = document.createElement('td');
			tdDateOut.innerHTML = `<input id="table-loan-out-${e.id}" class="table-loan-out" type="text" value="${e.loan_date_out}">`;
			tr.appendChild(tdDateOut);

		} else if (section == 'books') {

			document.getElementById('section-name').innerHTML = 'LIBROS';
			document.getElementById(`table-name-${e.id}`).classList.add('table-name-books');

			var tdEditorial = document.createElement('td');
			tdEditorial.innerHTML = `<input id="table-editorial-${e.id}" class="table-editorial" type="text" value="${e.editorial}">`;
			tr.appendChild(tdEditorial);

			var tdGender = document.createElement('td');
			tdGender.innerHTML = `<input id="table-gender-${e.id}" class="table-gender" type="text" value="${e.gender}">`;
			tr.appendChild(tdGender);

			var tdPages = document.createElement('td');
			tdPages.innerHTML = `<input id="table-pages-${e.id}" class="table-pages" type="text" value="${e.pages}">`;
			tr.appendChild(tdPages);

			var tdYear = document.createElement('td');
			tdYear.innerHTML = `<input id="table-year-${e.id}" class="table-year" type="text" value="${e.year}">`;
			tr.appendChild(tdYear);

			var tdPrice = document.createElement('td');
			tdPrice.innerHTML = `<input id="table-price-${e.id}" class="table-price" type="text" value="${e.price}">`;
			tr.appendChild(tdPrice);

			var tdAuthorCountry = document.createElement('td');
			tdAuthorCountry.innerHTML = `<input id="table-author-${e.id}" class="table-author" type="text" value="${e.author_id}">`;
			tr.appendChild(tdAuthorCountry);

		} else if (section == 'coupons') {

			document.getElementById('section-name').innerHTML = 'CUPONES';

			var tdMount = document.createElement('td');
			tdMount.innerHTML = `<input id="table-mount-${e.id}" class="table-mount" type="text" value="${e.mount}">`;
			tr.appendChild(tdMount);

		} else {

			document.getElementById('section-name').innerHTML = 'AUTORES';
			document.getElementById(`table-name-${e.id}`).classList.add('table-name-authors');


			var tdAwards = document.createElement('td');
			tdAwards.innerHTML = `<input id="table-awards-${e.id}" class="table-awards" type="text" value="${e.awards}">`;
			tr.appendChild(tdAwards);

			var tdCountry = document.createElement('td');
			tdCountry.innerHTML = `<input id="table-country-${e.id}" class="table-country" type="text" value="${e.country}">`;
			tr.appendChild(tdCountry);

		}

		//BOTONES DE EDITAR Y BORRAR
		var tdActions = document.createElement('td');

		tdActions.innerHTML = '<a id="edit-' + e.id + '" row-id="' + e.id +'" class="flaticon-pen edit" tooltip="Editar Registro"></a>';
		tdActions.innerHTML = tdActions.innerHTML + '<a id="delete-' + e.id + '" row-id="' + e.id +'" class="flaticon-eraser delete" tooltip="Borrar Registro"></a>';
		tdActions.innerHTML = tdActions.innerHTML + '<a id="save-' + e.id + '" row-id="' + e.id +'" class="flaticon-plus save" tooltip="Guardar Cambios"></a>';
		tdActions.innerHTML = tdActions.innerHTML + '<a id="cancel-' + e.id + '" row-id="' + e.id +'" class="flaticon-log-out cancel" tooltip="Descartar Cambios"></a>';
		
		tr.appendChild(tdActions);

		document.getElementById(`save-${e.id}`).style.display = 'none';
		document.getElementById(`cancel-${e.id}`).style.display = 'none';
	});

}

function getCookie(key) {
	var cookieList = document.cookie.split(";");
	for (i in cookieList) {
		var search = cookieList[i].search(key);
		if (search > -1) {cookie=cookieList[i]}
		}
	var equal = cookie.indexOf("=");
	var value = cookie.substring(equal+1);
	return value;
}