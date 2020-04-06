document.addEventListener('DOMContentLoaded', () => {

	document.cookie = 'current_section=users; path=/';

	//DESHABILITANDO BOTONES DE AÑADIR Y CANCELAR NUEVO USUARIO
	document.getElementById('page-add-new').style.display = 'none';
	document.getElementById('page-cancel-new').style.display = 'none';

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

		document.cookie = 'edit_settings_user=yes; path=/';

		var name = document.getElementById('settings-name').value;
		var surname = document.getElementById('settings-surname').value;
		var province = document.getElementById('settings-province').value;
		var domicilie = document.getElementById('settings-domicilie-string').value;
		var formStrings = [name, surname, province, domicilie];

		var dateYear = document.getElementById('settings-date-year').value;
		var dateMonth = document.getElementById('settings-date-month').value;
		var dateDay = document.getElementById('settings-date-day').value;
		var formDates = [dateYear, dateMonth, dateDay];

		var directionNumber = document.getElementById('settings-domicilie-number').value;

		var infoUser = [formStrings, formDates, directionNumber];

		fetchEditUser(infoUser, 'form-settings', true);
		sessionStorage.setItem('settingsOn', 'no');
		fetchUserInfo();

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
	//BOTONES PARA HABILITAR ADICIÓN DEL USUARIO, CANCELARLA, Y ENVIARLA AL CONTROLADOR
	document.getElementById('page-new').addEventListener('click', () => {
		fetchAddUser();
	});
	document.getElementById('page-add-new').addEventListener('click', () => {
		document.getElementById('page-add-new').style.display = 'none';
		document.getElementById('page-cancel-new').style.display = 'none';
		document.getElementById('page-new').style.display = 'inline-block';
		fetchReadyAdd();
	});
	document.getElementById('page-cancel-new').addEventListener('click', () => {
		document.getElementById('page-add-new').style.display = 'none';
		document.getElementById('page-cancel-new').style.display = 'none';
		document.getElementById('page-new').style.display = 'inline-block';
	});
	document.getElementById('page-cancel-new').addEventListener('click', () => {

		var tbody = document.getElementById('tbody');
		tbody.removeChild(tbody.lastElementChild);

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

async function fetchEditUser (infoUser, formId, validate) {
	
	var follow = false;
	if (validate == true) {

		var numbersInString = '';
		var lettersInDate = false;
		var lettersInDomicilieNumber = false;

		//VERIFICAR NOMBRE, APELLIDO, DIRECCION Y PROVINCIA
		if (infoUser[0][0].length < 3 || infoUser[0][1].length < 4 || infoUser[0][2].length < 4 || infoUser[0][3].length < 4) {
			document.getElementById('pending').innerHTML = '<p>Recuerda que: Los caracteres minimos son 3(Nombre), 5(Apellido), 5(Provincia).</p>';
			sendSignStatus('pending', 3000);
		} else {
			// VERIFICANDO SI HAY LETRAS EN LOS CAMPOS: NOMBRE, APELLIDO, CALLE DOM Y PROVINCIA
			infoUser[0].forEach(e => {
				for (let i=0 ; i<e.length ; i++) {
					if (!isNaN(e.charAt(i)) && e.charAt(i) != ' ') {
						numbersInString = e;
					}
				}
			});
			if (numbersInString != '') {
				document.getElementById('pending').innerHTML = '<p>Recuerda que: En los campos Nombre, Apellido, Calle de domicilio y Ciudad, no deben ir numeros.</p>';
				sendSignStatus('pending', 3000);
			}
		}

		const currentDate = new Date();
		const age = currentDate.getFullYear();
		if (infoUser[1][0] > age || infoUser[1][0] < 1900 || (infoUser[1][1] > 12 && infoUser[1][1] > 0) || (infoUser[1][2] > 31 && infoUser[1][2] > 0)) {
			document.getElementById('pending').innerHTML = '<p>Recuerda que: Los campos correspondientes a la fecha, tienen que ser realistas.</p>';
			sendSignStatus('pending', 3000);
		} else {
			// VERIFICANDO SI HAY LETRAS EN LOS CAMPOS CORRESPONDIENTES A FECHA
			infoUser[1].forEach(e => {
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
		
		if (infoUser[2] < 1) {
			document.getElementById('pending').innerHTML = '<p>Recuerda que: La altura de la calle no puede ser 0</p>';
			sendSignStatus('pending', 3000);
		} else {
			// VERIFICANDO SI HAY LETRAS EN EL CAMPO CORRESPONDIENTE A LA ALTURA DE LA CALLE DE DOMICILIO
			for (let i=0 ; i<infoUser[2].length ; i++) {
				if (isNaN(infoUser[2].charAt(i))) {
					lettersInDomicilieNumber = true;
				}
			}
			if (lettersInDomicilieNumber) {
				document.getElementById('pending').innerHTML = '<p>Recuerda que: No pueden haber letras en el campo de numero de domicilio</p>';
				sendSignStatus('pending', 3000);
			}
		}
		
		// VERIFICANDO SI SE CUMPLEN LOS REQUISITOS PARA QUE PUEDA REGISTRARSE EL USUARIO
		(numbersInString != '' || lettersInDate || lettersInDomicilieNumber || infoUser[1][0].length != 4) ? follow = false : follow = true;
		
	} else {
		follow = true;
	}
	
	if (follow) {
		if (!isNaN(formId.charAt(0))) {
			
			var form = new FormData();
			
			if (getCookie('current_section') == 'users' || getCookie('current_section') == 'books' || getCookie('current_section') == 'authors') {
				form.append('table-name', document.getElementById(`table-name-${formId}`).value);
			}
			if (getCookie('current_section') == 'users' || getCookie('current_section') == 'authors') {
				form.append('table-surname', document.getElementById(`table-surname-${formId}`).value);
			}
			if (getCookie('current_section') == 'users') {
				
				form.append('table-domicilie', document.getElementById(`table-domicilie-${formId}`).value);
				form.append('table-province', document.getElementById(`table-province-${formId}`).value);
				form.append('table-date-of-birth', document.getElementById(`table-date-of-birth-${formId}`).value);
				form.append('table-password', document.getElementById(`table-password-${formId}`).value);

			} else if (getCookie('current_section') == 'loans') {
				
				form.append('table-book', document.getElementById(`table-book-${formId}`).value);
				form.append('table-user', document.getElementById(`table-user-${formId}`).value);
				form.append('table-loan-in', document.getElementById(`table-loan-in-${formId}`).value);
				form.append('table-loan-out', document.getElementById(`table-loan-out-${formId}`).value);

			} else if (getCookie('current_section') == 'books') {
				
				form.append('table-editorial', document.getElementById(`table-editorial-${formId}`).value);
				form.append('table-gender', document.getElementById(`table-gender-${formId}`).value);
				form.append('table-pages', document.getElementById(`table-pages-${formId}`).value);
				form.append('table-year', document.getElementById(`table-year-${formId}`).value);
				form.append('table-price', document.getElementById(`table-price-${formId}`).value);
				form.append('table-author', document.getElementById(`table-author-${formId}`).value);
				
			} else if (getCookie('current_section') == 'coupons') {
				
				form.append('table-mount', document.getElementById(`table-mount-${formId}`).value);

			} else {
				
				form.append('table-awards', document.getElementById(`table-awards-${formId}`).value);
				form.append('table-country', document.getElementById(`table-country-${formId}`).value);
				
			}

		} else if (formId == 'form-settings') {
			var form = new FormData(document.getElementById(formId));
		}
		
		var response = await fetch('http://localhost/5-library/controller/api/update.php', {
			method: 'POST',
			body: form
		});
		var data = await response.json();

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
		document.cookie = 'edit_settings_user=no; path=/';
		
	}
	
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
			tdName.innerHTML = `<input id="table-name-${e.id}" class="row-${e.id}" type="text" value="${e.name}">`;
			tr.appendChild(tdName);
		}

		if (section == 'users' || section == 'authors') {

			var tdSurname = document.createElement('td');
			tdSurname.innerHTML = `<input id="table-surname-${e.id}" class="table-surname row-${e.id}" type="text" value="${e.surname}">`;
			tr.appendChild(tdSurname);

		}

		if (section == 'users') {

			document.getElementById('section-name').innerHTML = 'USUARIOS';
			document.getElementById(`table-name-${e.id}`).classList.add('table-name-users');
	
			var tdDomicilie = document.createElement('td');
			tdDomicilie.innerHTML = `<input id="table-domicilie-${e.id}" class="table-domicilie row-${e.id}" type="text" value="${e.domicilie}">`;
			tr.appendChild(tdDomicilie);
	
			var tdProvince = document.createElement('td');
			tdProvince.innerHTML = `<input id="table-province-${e.id}" class="table-province row-${e.id}" type="text" value="${e.province}">`;
			tr.appendChild(tdProvince);
	
			var tdDateOfBirth = document.createElement('td');
			tdDateOfBirth.innerHTML = `<input id="table-date-of-birth-${e.id}" class="table-date-of-birth row-${e.id}" type="text" value="${e.date_of_birth}">`;
			tr.appendChild(tdDateOfBirth);
	
			var tdPassword = document.createElement('td');
			tdPassword.innerHTML = `<input id="table-password-${e.id}" class="table-password row-${e.id}" type="text" value="${e.password}">`;
			tr.appendChild(tdPassword);

		} else if (section == 'loans') {

			document.getElementById('section-name').innerHTML = 'PRÉSTAMOS';

			var tdIdBook = document.createElement('td');
			tdIdBook.innerHTML = `<input id="table-book-${e.id}" class="table-book row-${e.id}" type="text" value="${e.book_id}">`;
			tr.appendChild(tdIdBook);

			var tdIdUser = document.createElement('td');
			tdIdUser.innerHTML = `<input id="table-user-${e.id}" class="table-user row-${e.id}" type="text" value="${e.user_id}">`;
			tr.appendChild(tdIdUser);

			var tdDateIn = document.createElement('td');
			tdDateIn.innerHTML = `<input id="table-loan-in-${e.id}" class="table-loan-in row-${e.id}" type="text" value="${e.loan_date_in}">`;
			tr.appendChild(tdDateIn);

			var tdDateOut = document.createElement('td');
			tdDateOut.innerHTML = `<input id="table-loan-out-${e.id}" class="table-loan-out row-${e.id}" type="text" value="${e.loan_date_out}">`;
			tr.appendChild(tdDateOut);

		} else if (section == 'books') {

			document.getElementById('section-name').innerHTML = 'LIBROS';
			document.getElementById(`table-name-${e.id}`).classList.add('table-name-books');

			var tdEditorial = document.createElement('td');
			tdEditorial.innerHTML = `<input id="table-editorial-${e.id}" class="table-editorial row-${e.id}" type="text" value="${e.editorial}">`;
			tr.appendChild(tdEditorial);

			var tdGender = document.createElement('td');
			tdGender.innerHTML = `<input id="table-gender-${e.id}" class="table-gender row-${e.id}" type="text" value="${e.gender}">`;
			tr.appendChild(tdGender);

			var tdPages = document.createElement('td');
			tdPages.innerHTML = `<input id="table-pages-${e.id}" class="table-pages row-${e.id}" type="text" value="${e.pages}">`;
			tr.appendChild(tdPages);

			var tdYear = document.createElement('td');
			tdYear.innerHTML = `<input id="table-year-${e.id}" class="table-year row-${e.id}" type="text" value="${e.year}">`;
			tr.appendChild(tdYear);

			var tdPrice = document.createElement('td');
			tdPrice.innerHTML = `<input id="table-price-${e.id}" class="table-price row-${e.id}" type="text" value="${e.price}">`;
			tr.appendChild(tdPrice);

			var tdAuthorCountry = document.createElement('td');
			tdAuthorCountry.innerHTML = `<input id="table-author-${e.id}" class="table-author row-${e.id}" type="text" value="${e.author_id}">`;
			tr.appendChild(tdAuthorCountry);

		} else if (section == 'coupons') {

			document.getElementById('section-name').innerHTML = 'CUPONES';

			var tdMount = document.createElement('td');
			tdMount.innerHTML = `<input id="table-mount-${e.id}" class="table-mount row-${e.id}" type="text" value="${e.mount}">`;
			tr.appendChild(tdMount);

		} else {

			document.getElementById('section-name').innerHTML = 'AUTORES';
			document.getElementById(`table-name-${e.id}`).classList.add('table-name-authors');


			var tdAwards = document.createElement('td');
			tdAwards.innerHTML = `<input id="table-awards-${e.id}" class="table-awards row-${e.id}" type="text" value="${e.awards}">`;
			tr.appendChild(tdAwards);

			var tdCountry = document.createElement('td');
			tdCountry.innerHTML = `<input id="table-country-${e.id}" class="table-country row-${e.id}" type="text" value="${e.country}">`;
			tr.appendChild(tdCountry);

		}

		//BOTONES DE EDITAR Y BORRAR
		var tdActions = document.createElement('td');

		tdActions.innerHTML = `<a id="edit-${e.id}" class="flaticon-pen edit" tooltip="Editar Registro"></a>`;
		tdActions.innerHTML = tdActions.innerHTML + `<a id="delete-${e.id}" class="flaticon-eraser delete" tooltip="Borrar Registro"></a>`;
		tdActions.innerHTML = tdActions.innerHTML + `<a id="save-${e.id}" class="flaticon-plus save" tooltip="Guardar Cambios"></a>`;
		tdActions.innerHTML = tdActions.innerHTML + `<a id="cancel-${e.id}" class="flaticon-log-out cancel" tooltip="Finalizar Cambios"></a>`;
		
		tr.appendChild(tdActions);
		document.getElementById(`save-${e.id}`).style.display = 'none';
		document.getElementById(`cancel-${e.id}`).style.display = 'none';

		//BOTON DE EDITAR REGISTRO EN TABLA
		document.getElementById(`edit-${e.id}`).addEventListener('click', () => {
			tableEdit(e.id);
		});
		//BOTON DE GUARDAR EDICION EN TABLA
		document.getElementById(`save-${e.id}`).addEventListener('click', () => {
			tableSaveEdit(e.id);
		});
		//BOTON DE CANCELAR EDICION EN TABLA
		document.getElementById(`cancel-${e.id}`).addEventListener('click', () => {
			tableCancelEdit(e.id);
		});
		//BOTON DE ELIMINAR REGISTRO EN TABLA
		document.getElementById(`delete-${e.id}`).addEventListener('click', () => {
			tableDelete(e.id);
		});

	});

	var tableInputs = document.getElementsByTagName('input');
	for (let i=0 ; i<tableInputs.length ; i++) {
		tableInputs[i].disabled = true;
	}

}

async function fetchDeleteUser (id) {

	var response = await fetch('http://localhost/5-library/controller/api/delete.php');
	var data = await response.json();
	
	if (data[0].status == 'successful') {

		document.getElementById('successful').innerHTML = '<p>Usuario eliminado con éxito</p>'
		sendSignStatus('successful', 2000);

		var currentPage = getCookie('page_start') - 5;
		document.cookie = 'page_start=' + currentPage + '; path=/';
		switch (getCookie('current_section')) {
			
			case 'users':
				setTableHeaders(['ID', 'Nombre', 'Apellido', 'Domicilio', 'Provincia', 'Nacimiento', 'Contraseña']);
			break;
			case 'loans':
				setTableHeaders(['ID', 'ID del Libro', 'ID del Usuario', 'Inicio del Préstamo', 'Fin del Préstamo']);
			break;
			case 'books':
				setTableHeaders(['ID', 'Titulo', 'Editorial', 'Género', 'Paginas', 'Año', 'Precio', 'ID del Autor']);
			break;
			case 'coupons':
				setTableHeaders(['ID', 'Precio de Descuento']);
			break;
			case 'authors':
				setTableHeaders(['ID', 'Nombre', 'Apellido', 'Premios', 'País']);
			break;

		}
		fetchSection(getCookie('current_section'), false, true)

	} else {

		document.getElementById('failure').innerHTML = '<p>Hubo un error al eliminar el usuario</p>'
		sendSignStatus('failure', 2000);

	}

}

async function fetchReadyAdd () {

	var form = new FormData();

	if (getCookie('current_section') == 'users' || getCookie('current_section') == 'books' || getCookie('current_section') == 'authors') {
		form.append('table-name', document.getElementById(`table-name-new`).value);
	}
	if (getCookie('current_section') == 'users' || getCookie('current_section') == 'authors') {
		form.append('table-surname', document.getElementById(`table-surname-new`).value);
	}
	if (getCookie('current_section') == 'users') {
		
		form.append('table-domicilie', document.getElementById(`table-domicilie-new`).value);
		form.append('table-province', document.getElementById(`table-province-new`).value);
		form.append('table-date-of-birth', document.getElementById(`table-date-of-birth-new`).value);
		form.append('table-password', document.getElementById(`table-password-new`).value);

	} else if (getCookie('current_section') == 'loans') {
		
		form.append('table-book', document.getElementById(`table-book-new`).value);
		form.append('table-user', document.getElementById(`table-user-new`).value);
		form.append('table-loan-in', document.getElementById(`table-loan-in-new`).value);
		form.append('table-loan-out', document.getElementById(`table-loan-out-new`).value);

	} else if (getCookie('current_section') == 'books') {
		
		form.append('table-editorial', document.getElementById(`table-editorial-new`).value);
		form.append('table-gender', document.getElementById(`table-gender-new`).value);
		form.append('table-pages', document.getElementById(`table-pages-new`).value);
		form.append('table-year', document.getElementById(`table-year-new`).value);
		form.append('table-price', document.getElementById(`table-price-new`).value);
		form.append('table-author', document.getElementById(`table-author-new`).value);
		
	} else if (getCookie('current_section') == 'coupons') {

		form.append('table-id', document.getElementById(`table-id-new`).value);
		form.append('table-mount', document.getElementById(`table-mount-new`).value);

	} else {
		
		form.append('table-awards', document.getElementById(`table-awards-new`).value);
		form.append('table-country', document.getElementById(`table-country-new`).value);
		
	}

	var response = await fetch('http://localhost/5-library/controller/api/post.php', {
		method: 'POST',
		body: form
	});
	var data = await response.json();
	
	if (data[0].status == 'successful') {

		document.getElementById('successful').innerHTML = '<p>Registro añadido con éxito</p>'
		sendSignStatus('successful', 2000);

	} else {

		document.getElementById('failure').innerHTML = '<p>Hubo un error al añadir el nuevo usuario</p>'
		sendSignStatus('failure', 2000);

	}

	fetchSection(getCookie('current_section'), false, false);

}

function fetchAddUser () {

	document.getElementById('page-new').style.display = 'none';
	document.getElementById('page-add-new').style.display = 'inline-block';
	document.getElementById('page-cancel-new').style.display = 'inline-block';

	var tbody = document.getElementById('tbody');
	var trNew = document.createElement('tr');
	trNew.setAttribute('id', 'tr-new');

	var tdId = document.createElement('td');
	if (getCookie('current_section') == 'coupons') {
		tdId.innerHTML = `<input id="table-id-new" type="text" placeholder="Id Cupón">`
	} else {
		tdId.innerHTML = 'X';
	}
	trNew.appendChild(tdId);

	if (getCookie('current_section') == 'users' || getCookie('current_section') == 'books' || getCookie('current_section') == 'authors') {
		var tdName = document.createElement('td');
		tdName.innerHTML = `<input id="table-name-new" class="table-name-users" type="text" placeholder="Nombre">`;
		trNew.appendChild(tdName);
	}
	if (getCookie('current_section') == 'users' || getCookie('current_section') == 'authors') {
		var tdSurname = document.createElement('td');
		tdSurname.innerHTML = `<input id="table-surname-new" class="table-surname" type="text" placeholder="Apellido">`;
		trNew.appendChild(tdSurname);
	}
	if (getCookie('current_section') == 'users') {
		
		var tdDomicilie = document.createElement('td');
		tdDomicilie.innerHTML = `<input id="table-domicilie-new" class="table-domicilie" type="text" placeholder="Domicilio">`;
		trNew.appendChild(tdDomicilie);
		var tdProvince = document.createElement('td');
		tdProvince.innerHTML = `<input id="table-province-new" class="table-province" type="text" placeholder="Provincia">`;
		trNew.appendChild(tdProvince);
		var tdDateOfBirth = document.createElement('td');
		tdDateOfBirth.innerHTML = `<input id="table-date-of-birth-new" class="table-date-of-birth"type="text" placeholder="Nacimiento">`;
		trNew.appendChild(tdDateOfBirth);
		var tdPassword = document.createElement('td');
		tdPassword.innerHTML = `<input id="table-password-new" class="table-password" type="text" placeholder="Contraseña">`;
		trNew.appendChild(tdPassword);

	} else if (getCookie('current_section') == 'loans') {
		
		var tdIdBook = document.createElement('td');
		tdIdBook.innerHTML = `<input id="table-book-new" class="table-book" type="text" placeholder="Id Libro">`;
		trNew.appendChild(tdIdBook);
		var tdIdUser = document.createElement('td');
		tdIdUser.innerHTML = `<input id="table-user-new" class="table-user" type="text" placeholder="Id Usuario">`;
		trNew.appendChild(tdIdUser);
		var tdLoanIn = document.createElement('td');
		tdLoanIn.innerHTML = `<input id="table-loan-in-new" class="table-loan-in" type="text" placeholder="Fecha de entrada">`;
		trNew.appendChild(tdLoanIn);
		var tdLoanOut = document.createElement('td');
		tdLoanOut.innerHTML = `<input id="table-loan-out-new" class="table-loan-out" type="text" placeholder="Fecha de vencimiento">`;
		trNew.appendChild(tdLoanOut);

	} else if (getCookie('current_section') == 'books') {
		
		var tdEditorial = document.createElement('td');
		tdEditorial.innerHTML = `<input id="table-editorial-new" class="table-editorial" type="text" placeholder="Editorial">`;
		trNew.appendChild(tdEditorial);
		var tdGender = document.createElement('td');
		tdGender.innerHTML = `<input id="table-gender-new" class="table-gender" type="text" placeholder="Género">`;
		trNew.appendChild(tdGender);
		var tdPages = document.createElement('td');
		tdPages.innerHTML = `<input id="table-pages-new" class="table-pages" type="text" placeholder="Páginas">`;
		trNew.appendChild(tdPages);
		var tdYear = document.createElement('td');
		tdYear.innerHTML = `<input id="table-year-new" class="table-year" type="text" placeholder="Año">`;
		trNew.appendChild(tdYear);
		var tdPrice = document.createElement('td');
		tdPrice.innerHTML = `<input id="table-price-new" class="table-price" type="text" placeholder="Precio">`;
		trNew.appendChild(tdPrice);
		var tdAuthor = document.createElement('td');
		tdAuthor.innerHTML = `<input id="table-author-new" class="table-author" type="text" placeholder="Id Autor">`;
		trNew.appendChild(tdAuthor);
		
	} else if (getCookie('current_section') == 'coupons') {
		
		var tdMount = document.createElement('td');
		tdMount.innerHTML = `<input id="table-mount-new" class="table-mount" type="text" placeholder="Monto">`;
		trNew.appendChild(tdMount);

	} else {

		var tdAwards = document.createElement('td');
		tdAwards.innerHTML = `<input id="table-awards-new" class="table-awards" type="text" placeholder="Premios">`;
		trNew.appendChild(tdAwards);
		var tdCountry = document.createElement('td');
		tdCountry.innerHTML = `<input id="table-country-new" class="table-country" type="text" placeholder="País">`;
		trNew.appendChild(tdCountry);
		
	}

	tbody.appendChild(trNew);

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

function tableEdit (id) {

	document.cookie = 'current_id=' + id + '; path=/';

	document.getElementById(`save-${id}`).style.display = 'inline-block';
	document.getElementById(`cancel-${id}`).style.display = 'inline-block';

	document.getElementById(`delete-${id}`).style.display = 'none';
	document.getElementById(`edit-${id}`).style.display = 'none';

	var tableInputs = document.getElementsByTagName('input');
	for (let i=0 ; i<tableInputs.length ; i++) {
		tableInputs[i].disabled = false;
	}

}

function tableDelete (id) {
	
	document.cookie = 'current_id=' + id + '; path=/';
	var warning = document.getElementById('warning');

	warning.innerHTML = `<p>ADVERTENCIA: El registro cuyo numero de ID es ${id} será borrado permanentemente</p>`;
	warning.innerHTML = warning.innerHTML + '<button id="delete-accept">Aceptar</button>';
	warning.innerHTML = warning.innerHTML + '<button id="delete-cancel">Cancelar</button>';

	document.getElementById('delete-accept').addEventListener('click', () => {
		warning.style.transform = 'translateY(-100%)';
		fetchDeleteUser(id);
	});
	document.getElementById('delete-cancel').addEventListener('click', () => {
		warning.style.transform = 'translateY(-100%)';
	});

	warning.style.transform = 'translateY(0)';

}

function tableSaveEdit (id) {

	switch (getCookie('current_section')) {
		case 'users':
			var name = document.getElementById(`table-name-${id}`).value;
			var surname = document.getElementById(`table-surname-${id}`).value;
			var province = document.getElementById(`table-province-${id}`).value;
			var domicilieFull = document.getElementById(`table-domicilie-${id}`).value;
		
			var domicilieString = '';
			var domicilieNumber = '';
			for (let i=0 ; i<domicilieFull.length ; i++) {
				if (isNaN(domicilieFull.charAt(i)) || domicilieFull.charAt(i) == ' ') {
					domicilieString += domicilieFull.charAt(i);
				} else {
					domicilieNumber += domicilieFull.charAt(i);
				}
			}
		
			var formStrings = [name, surname, province, domicilieString];
		
			var date = document.getElementById(`table-date-of-birth-${id}`).value;
			var formDates = date.split('-');

			var infoUser = [formStrings, formDates, domicilieNumber];
		
			fetchEditUser(infoUser, id, true);
		break;
		case 'loans':
			fetchEditUser([], id, false);
		break;
		case 'books':
			fetchEditUser([], id, false);
		break;
		case 'coupons':
			fetchEditUser([], id, false);
		break;
		case 'authors':
			fetchEditUser([], id, false);
		break;
	}
	
}

function tableCancelEdit (id) {

	document.getElementById(`save-${id}`).style.display = 'none';
	document.getElementById(`cancel-${id}`).style.display = 'none';

	document.getElementById(`delete-${id}`).style.display = 'inline-block';
	document.getElementById(`edit-${id}`).style.display = 'inline-block';

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