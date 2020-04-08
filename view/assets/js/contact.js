document.addEventListener('DOMContentLoaded', () => {

	document.getElementById('contact').style.color = '#FAFAFA';

	document.getElementById('mail').addEventListener('click', e => {
		e.preventDefault();
		validateAndSubmit();
	});

});

function messagesMailStatus (element) {

	document.getElementById(element).style.transform = 'translateY(0)';
	setTimeout(() => {
		document.getElementById(element).style.transform = 'translateY(-100%)';
	}, 2000);

}

async function validateAndSubmit () {

		document.getElementById('pending').innerHTML = '<p>Solicitud tomada, aguarde un momento</p>';
		messagesMailStatus('pending');

	const mail = new FormData(document.getElementById('form-sign-contact'));
	let response = await fetch('http://localhost/library/controller/mail.php', {
		method: 'POST',
		body: mail
	});
	var data = await response.json();
	
	if (data.status == 'ok') {
		document.getElementById('successful').innerHTML = '<p>Mensaje enviado con éxito, se le responderá a la brevedad</p>';
		messagesMailStatus('successful');
	} else {
		document.getElementById('failure').innerHTML = '<p>Hubo un error con el envío del mensaje</p>';
		messagesMailStatus('failure');
	}

}