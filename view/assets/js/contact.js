document.addEventListener('DOMContentLoaded', () => {

	document.getElementById('contact').style.color = '#FAFAFA';
	document.getElementById('mail').addEventListener('click', e => {
		e.preventDefault();
		validateAndSubmit();
	});

});

async function validateAndSubmit () {

	alert('Estamos enviando la petición');

	const mail = new FormData(document.getElementById('form-sign-contact'));
	let response = await fetch('http://localhost/5-library/controller/mail.php', {
		method: 'POST',
		body: mail
	});
	var data = await response.json();
	console.log(data);
	if (data.status == 'ok') {
		alert('Se realizó con exito el envío del formulario');
	} else {
		alert('Hubo un error en el envío del formulario');
	}


}