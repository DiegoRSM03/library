document.addEventListener('DOMContentLoaded', () => {

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

	//BOTON DE CERRAR SESIÓN EN AJUSTES
	document.getElementById('button-log-out').addEventListener('click', () => {
		localStorage.removeItem('remember');
		window.location = 'http://localhost/5-library/index.php';
	});



	//PREPARANDO LAS SECCIONES PARA SER CONSULTADAS
	var sections = [
		{'section': 'users', 'object': document.getElementById('nav-users'), 'headers': ['ID', 'Nombre', 'Apellido', 'Domicilio', 'Provincia', 'Nacimiento', 'Contraseña']},
		{'section': 'loans', 'object': document.getElementById('nav-loans'), 'headers': ['ID', 'ID del Libro', 'ID del Usuario', 'Inicio del Préstamo', 'Fin del Préstamo']},
		{'section': 'books', 'object': document.getElementById('nav-books'), 'headers': ['ID', 'Titulo', 'Editorial', 'Género', 'Paginas', 'Año', 'Precio', 'Nombre del Autor', 'Pais del Autor']},
		{'section': 'coupons', 'object': document.getElementById('nav-coupons'), 'headers': ['ID', 'Precio de Descuento']}
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
		fetchSection(getCookie('current_section'), true, false);
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
		console.log(data);

		document.getElementById('settings-id').innerHTML = '<span class="flaticon-search"></span> ' + data[0].id;
		document.getElementById('settings-name-surname').innerHTML = data[0].name + ' ' + data[0].surname;
		document.getElementById('settings-domicilie').innerHTML = '<span class="flaticon-home"></span> ' + data[0].domicilie;
		document.getElementById('settings-province').innerHTML = '<span class="flaticon-placeholder"></span> ' + data[0].province;
		document.getElementById('settings-date-of-birth').innerHTML = '<span class="flaticon-user"></span> ' + data[0].date_of_birth;
		document.getElementById('settings-password').innerHTML = '<span class="flaticon-door-key"></span> ' + data[0].password;

	}

}

function setTableHeaders (headers) {
	document.getElementById('headers').innerHTML = '';
	headers.forEach(e => {
		var th = document.createElement('th');
		th.innerHTML = e;
		document.getElementById('headers').appendChild(th);
	});
	document.getElementById('headers').appendChild(document.createElement('th'));
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

	switch (section) {
		case 'users':
			document.getElementById('section-name').innerHTML = 'Usuarios';
			data.forEach(e => {
				var tr = document.createElement('tr');
				tableBody.appendChild(tr);
		
				var tdId = document.createElement('td');
				tdId.innerHTML = e.id;
				tr.appendChild(tdId);
		
				var tdName = document.createElement('td');
				tdName.innerHTML = e.name;
				tr.appendChild(tdName);
				
				var tdSurname = document.createElement('td');
				tdSurname.innerHTML = e.surname;
				tr.appendChild(tdSurname);
		
				var tdDomicilie = document.createElement('td');
				tdDomicilie.innerHTML = e.domicilie;
				tr.appendChild(tdDomicilie);
		
				var tdProvince = document.createElement('td');
				tdProvince.innerHTML = e.province;
				tr.appendChild(tdProvince);
		
				var tdDateOfBirth = document.createElement('td');
				tdDateOfBirth.innerHTML = e.date_of_birth;
				tr.appendChild(tdDateOfBirth);
		
				var tdPassword = document.createElement('td');
				tdPassword.innerHTML = e.password;
				tr.appendChild(tdPassword);
		
				//BOTONES DE EDITAR Y BORRAR
				var tdActions = document.createElement('td');
				tdActions.innerHTML = '<a id="edit-' + e.id +'" class="flaticon-pen"></a>';
				tdActions.innerHTML = tdActions.innerHTML + '<a id="delete-' + e.id +'" class="flaticon-eraser"></a>';
				tr.appendChild(tdActions);
			});
		break;
		case 'loans':
			document.getElementById('section-name').innerHTML = 'Préstamos';
			data.forEach(e => {
				var tr = document.createElement('tr');
				tableBody.appendChild(tr);

				var tdId = document.createElement('td');
				tdId.innerHTML = e.id;
				tr.appendChild(tdId);

				var tdIdBook = document.createElement('td');
				tdIdBook.innerHTML = e.book_id;
				tr.appendChild(tdIdBook);

				var tdIdUser = document.createElement('td');
				tdIdUser.innerHTML = e.user_id;
				tr.appendChild(tdIdUser);

				var tdDateIn = document.createElement('td');
				tdDateIn.innerHTML = e.loan_date_in;
				tr.appendChild(tdDateIn);

				var tdDateOut = document.createElement('td');
				tdDateOut.innerHTML = e.loan_date_out;
				tr.appendChild(tdDateOut);

				//BOTONES DE EDITAR Y BORRAR
				var tdActions = document.createElement('td');
				tdActions.innerHTML = '<a id="edit-' + e.id +'" class="flaticon-pen"></a>';
				tdActions.innerHTML = tdActions.innerHTML + '<a id="delete-' + e.id +'" class="flaticon-eraser"></a>';
				tr.appendChild(tdActions);
			});
		break;
		case 'books':
			document.getElementById('section-name').innerHTML = 'Libros';
			data.forEach(e => {
				var tr = document.createElement('tr');
				tableBody.appendChild(tr);

				var tdId = document.createElement('td');
				tdId.innerHTML = e.id;
				tr.appendChild(tdId);

				var tdName = document.createElement('td');
				tdName.innerHTML = e.name;
				tr.appendChild(tdName);

				var tdEditorial = document.createElement('td');
				tdEditorial.innerHTML = e.editorial;
				tr.appendChild(tdEditorial);

				var tdGender = document.createElement('td');
				tdGender.innerHTML = e.gender;
				tr.appendChild(tdGender);

				var tdPages = document.createElement('td');
				tdPages.innerHTML = e.pages;
				tr.appendChild(tdPages);

				var tdYear = document.createElement('td');
				tdYear.innerHTML = e.year;
				tr.appendChild(tdYear);

				var tdPrice = document.createElement('td');
				tdPrice.innerHTML = e.price;
				tr.appendChild(tdPrice);

				var tdAuthorName = document.createElement('td');
				tdAuthorName.innerHTML = e.author_name;
				tr.appendChild(tdAuthorName);

				var tdAuthorCountry = document.createElement('td');
				tdAuthorCountry.innerHTML = e.author_country;
				tr.appendChild(tdAuthorCountry);

				//BOTONES DE EDITAR Y BORRAR
				var tdActions = document.createElement('td');
				tdActions.innerHTML = '<a id="edit-' + e.id +'" class="flaticon-pen"></a>';
				tdActions.innerHTML = tdActions.innerHTML + '<a id="delete-' + e.id +'" class="flaticon-eraser"></a>';
				tr.appendChild(tdActions);
			});
		break;
		case 'coupons':
			document.getElementById('section-name').innerHTML = 'Cupones';
			data.forEach(e => {
				var tr = document.createElement('tr');
				tableBody.appendChild(tr);

				var tdId = document.createElement('td');
				tdId.innerHTML = e.id;
				tr.appendChild(tdId);

				var tdMount = document.createElement('td');
				tdMount.innerHTML = '$' + e.mount;
				tr.appendChild(tdMount);

				//BOTONES DE EDITAR Y BORRAR
				var tdActions = document.createElement('td');
				tdActions.innerHTML = '<a id="edit-' + e.id +'" class="flaticon-pen"></a>';
				tdActions.innerHTML = tdActions.innerHTML + '<a id="delete-' + e.id +'" class="flaticon-eraser"></a>';
				tr.appendChild(tdActions);
			});
		break;
	}

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