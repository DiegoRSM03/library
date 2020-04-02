document.addEventListener('DOMContentLoaded', () => {

	if (localStorage.getItem('remember') == null) {
		window.location = 'http://localhost/5-library/index.php';
	} else if (localStorage.getItem('remember') == 'no') {
		localStorage.removeItem('remember');
	}

	document.getElementById('settings').addEventListener('click', () => {
		fetchUserInfo();
	});

});

async function fetchUserInfo () {
	document.getElementsByClassName('settings')[0].style.transform = 'translateX(0)';

	var response = await fetch('http://localhost/5-library/controller/user_info.php');
	var data = await response.json();
	console.log(data);
}