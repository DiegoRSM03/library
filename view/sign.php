<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="stylesheet" href="assets/iconfonts/flaticon.css">
	<link rel="stylesheet" href="assets/css/style.css">

	<?php

	if (isset($_COOKIE['sign'])) {
		($_COOKIE['sign'] == 'in') ? print('<title>Inicia Sesión</title>') : print('<title>Regístrate</title>');
	} else {
		header('Location: ./../index.php');
	}

	?>
</head>
<body>
	<?php require('components/header.php'); ?>

	<div id="banner-sign" class="banner">
		<div class="background-opaque">
			<figure class="recomendations">
				<legend>Recomendaciones</legend>
				<ul id="recomendations-list">
					
				</ul>
			</figure>	
			<!-- APERTURA DE FORMULARIO SIGN IN O SIGN UP -->
			<?php
			if (isset($_COOKIE['sign']) == 'in') {
				echo '<form id="form-sign-"' . $_COOKIE['sign'] . '" action="../controller/sign_in.php" method ="POST">';
			} else if (isset($_COOKIE['sign']) == 'up') {
				echo '<form id="form-sign-"' . $_COOKIE['sign'] . '" action="../controller/sign_up.php" method ="POST">';
			}
			?>
			<!-- flaticon-book -->

				<h1 class="title">Inicio de Sesión</h1>
				<div class="user-id">
					<span class="flaticon-user"></span>
					<input type="text" id="id">
				</div>
				<div class="user-password">
					<span class="flaticon-door-key"></span>
					<input type="password" id="password">
				</div>
				<button type="submit" class="to-form-php">VALIDAR</button>
			</form>
			<!-- CIERRE DE FORMULARIO HTML -->
		</div>
	</div>
	<script src="assets/js/sign.js"></script>
</body>
</html>