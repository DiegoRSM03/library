document.addEventListener('DOMContentLoaded', () => {

	if (localStorage.getItem('remember') == null) {
		window.location = 'http://localhost/5-library/index.php';
	} else if (localStorage.getItem('remember') == 'no') {
		localStorage.removeItem('remember');
	}

	sessionStorage.setItem('settingsOn', 'no');
	document.getElementById('settings').addEventListener('click', () => {
		fetchUserInfo();
	});

	document.getElementById('button-log-out').addEventListener('click', () => {
		localStorage.removeItem('remember');
		window.location = 'http://localhost/5-library/index.php';
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