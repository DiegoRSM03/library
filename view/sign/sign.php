<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="shortcut icon" href="../assets/img/favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="../assets/iconfonts/flaticon.css">
	<link rel="stylesheet" href="../assets/css/style.css">

	<?php
	if (isset($_GET['sign'])) {
		($_GET['sign'] == 'in') ? print('<title>Inicia Sesión</title>') : print('<title>Regístrate</title>');
	} else {
		header('Location: http://localhost/5-library/index.php');
	}
	?>
</head>
<body>
	<?php 
		require('../components/header.php'); 
		require('sendSign.php');
	?>

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
			if ($_GET['sign'] == 'in') {
				require('sign_in.php');
			} else if ($_GET['sign'] == 'up') {
				require('sign_up.php');
			}
			?>
		</div>
	</div>
	<script src="../assets/js/sign.js"></script>
</body>
</html>