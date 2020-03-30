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

	messagesMailStatus('pending');

	const mail = new FormData(document.getElementById('form-sign-contact'));
	let response = await fetch('http://localhost/5-library/controller/mail.php', {
		method: 'POST',
		body: mail
	});
	var data = await response.json();
	
	if (data.status == 'ok') {
		messagesMailStatus('successful');
	} else {
		messagesMailStatus('failure');
	}

}