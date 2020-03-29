async function fetchContent(archivo) {

	let response = await fetch('http://localhost/5-library/controller/' + archivo);
	let data = await response.json();
	console.log(data);

}