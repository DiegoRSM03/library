<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="stylesheet" href="assets/iconfonts/flaticon.css">
	<link rel="stylesheet" href="assets/css/style.css">

	<?php
	if (isset($_GET['in-up'])) {
		($_GET['in-up'] == 'in') ? print('<title>Inicia Sesión</title>') : print('<title>Regístrate</title>');
	} else {
		header('Location: ./../index.php');
	}
	?>
</head>
<body>
	<?php require('components/header.php'); ?>

	<div id="banner-sign" class="banner">
		<div class="background-opaque">
			<figure class="suggestions">
				<legend class="title">Recomendaciones</legend>
				<table>
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Género</th>
							<th>Año</th>
						</tr>
					</thead>
					<tbody id="suggestions-table"></tbody>
				</table>
			</figure>	
			<!-- FORMULARIO SIGN IN O SIGN UP -->
			<?php
			if ($_GET['in-up'] == 'in') {
				require('components/sign_in.php');
			} else {
				require('components/sign_up.php');
			}
			?>
		</div>
	</div>
	<script src="assets/js/sign.js"></script>
</body>
</html>