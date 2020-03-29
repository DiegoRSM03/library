const URI = 'https://api.unsplash.com/photos/random/?';
const apiKey = 'client_id=dnjjEBseQMoOKvDUFapG1gD60j2fFPOSMdgfX8TcNNc';
const count = '&count=1';
const query = '&query=desktop landscapes night';
const URL = URI + apiKey + count + query;

async function fetchBackground () {
	let backgroundInfo = [];

	let response = await fetch(URL, {
		method: 'GET',
		mode: 'cors'
	});
	let data = await response.json();

	backgroundInfo.push({
		img: {
			url: data[0].urls.regular
		},
		user: {
			name: data[0].user.name,
			url: data[0].user.links.html
		}
	});
	console.log(data);
	var banner = document.getElementById('banner-sign');
	banner.style.backgroundImage = `url("${backgroundInfo[0].img.url}")`;
}

async function fetchRecomendations () {

}

document.addEventListener('DOMContentLoaded', () => {


	document.getElementsByTagName('a')[2].classList.add('nav-button-selected');

	// fetchBackground();
	// setInterval(() => fetchBackground(), 8000);
	
});