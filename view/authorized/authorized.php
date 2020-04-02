<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="shortcut icon" href="../assets/img/favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="../assets/iconfonts/flaticon.css">
	<link rel="stylesheet" href="../assets/css/style.css">

	<title>Personal Autorizado</title>
</head>
<body>
	<header>
		<h1>Biblioteca DRSM</h1>
		<nav>
			<a href="http://localhost/5-library"><span class="flaticon-home"></span> Inicio</a>
			<a id="nav-users"><span class="flaticon-friends"></span> Usuarios</a>
			<a id="nav-loans"><span class="flaticon-shopping-cart"></span> Préstamos</a>
			<a id="nav-books"><span class="flaticon-book"></span> Libros</a>
			<a id="nav-coupons"><span class="flaticon-view"></span> Cupones</a>
			<a id="settings"><span class="flaticon-settings"></span> Ajustes</a>
		</nav>
	</header>
	<div class="settings">
		<div class="info">
			<p id="settings-id"></p>
			<p id="settings-name-surname"></p>
			<p id="settings-domicilie"></p>
			<p id="settings-province"></p>
			<p id="settings-date-of-birth"></p>
			<p id="settings-password"></p>
		</div>
		<div class="buttons">
			<button id="button-edit"><span class="flaticon-pen"></span> Editar Perfil</button>
			<button id="button-log-out"><span class="flaticon-log-out"></span> Cerrar Sesión</button>
		</div>
	</div>
	<div id="banner-authorized" class="banner">
		<div class="content">
			<div id="section">
				<p>Lista de <span id="section-name">Usuarios</span></p>
				<table>
					<thead>
						<tr id="headers">
						</tr>
					</thead>
					<tbody id="tbody">

					</tbody>
				</table>
				<div id="pagination">
					<button id="page-prev">Anterior</button>
					<p>Page:1 Of: 5</p>
					<button id="page-next">Siguiente</button>
				</div>
			</div>
		</div>
	</div>
	<a style="position:absolute;bottom:3rem;left:5rem;background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@alfonsmc10?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Alfons Morales"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Fotografía: Alfons Morales</span></a>
	<script src="../assets/js/authorized.js"></script>
</body>
</html>