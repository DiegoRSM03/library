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



	//TABLA MYSQL USERS
	document.cookie = 'page_start=0; path=/';
	document.getElementById('nav-users').addEventListener('click', () => {
		document.cookie = 'page_start=0; path=/';
		setTableHeaders(['ID', 'Nombre', 'Apellido', 'Domicilio', 'Provincia', 'Nacimiento', 'Contraseña']);
		document.getElementById('pagination').style.visibility = 'visible';
		fetchUsers();
	});

	//TABLA MYSQL LOANS
	document.getElementById('nav-loans').addEventListener('click', () => {
		document.cookie = 'page_start=0; path=/';
		setTableHeaders(['ID', 'ID del Libro', 'ID del Usuario', 'Inicio del Préstamo', 'Fin del Préstamo']);
		document.getElementById('pagination').style.visibility = 'visible';
		fetchLoans();
	});

	//TABLA MYSQL BOOKS
	document.getElementById('nav-books').addEventListener('click', () => {
		document.cookie = 'page_start=0; path=/';
		setTableHeaders(['ID', 'Titulo', 'Editorial', 'Género', 'Paginas', 'Año', 'Precio', 'Nombre del Autor', 'Pais del Autor']);
		document.getElementById('pagination').style.visibility = 'visible';
		fetchBooks();
	});

	//TABLA MYSQL COUPONS
	document.getElementById('nav-coupons').addEventListener('click', () => {
		document.cookie = 'page_start=0; path=/';
		setTableHeaders(['ID', 'Precio de Descuento']);
		document.getElementById('pagination').style.visibility = 'visible';
		fetchCoupons();
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

async function fetchUsers () {

	var response = await fetch('http://localhost/5-library/controller/api/get/users.php');
	var data = await response.json();

	var tableBody = document.getElementById('tbody');
	tableBody.innerHTML = '';

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
	

}