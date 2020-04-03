<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="shortcut icon" href="assets/img/favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="assets/iconfonts/flaticon.css">
	<link rel="stylesheet" href="assets/css/style.css">

	<title>Contáctenos</title>
</head>
<body>
	<?php 
		require('components/header.php');
		require('components/status.php');
	?>
	<div id="banner-contact" class="banner">
		<div class="background-opaque">
			<div class="contact-info">
				<h1 class="title">Contacto</h1>
				<details class="social-media">
					<summary class="subtitle"><span class="flaticon-share"></span> Redes Sociales</summary>
					<div><span class="flaticon-whatsapp"></span><a href="#">3518008080</a></div>
					<div><span class="flaticon-twitter"></span><a href="#">AccountTW</a></div>
					<div><span class="flaticon-facebook"></span><a href="#">AccountFB</a></div>
					<div><span class="flaticon-instagram"></span><a href="#">AccountIG</a></div>
					<div><span class="flaticon-github"></span><a href="#">Github.com/Repo</a></div>
					<div><span class="flaticon-telegram"></span><a href="#">3518008080</a></div>
					<div><span class="flaticon-linkedin"></span><a href="#">AccountLK</a></div>
				</details>
				<details class="team">
					<summary class="subtitle"><span class="flaticon-friends"></span> Equipo</summary>
					<div class="ceo"><span class="flaticon-user"></span><a href="#">CEO / Cristian Gomez</a></div>
					<div class="founder"><span class="flaticon-user"></span><a href="#">FUNDADOR / Alejo Sanchez</a></div>
					<div class="co-founder"><span class="flaticon-user"></span><a href="#">CO-FUNDADOR / Matias Acosta</a></div>
				</details>
			</div>
			<div class="contact-mail">
				<h1 class="title">Envíenos un mail</h1>
				<form method="POST" id="form-sign-contact">
					<div class="user-transmitter">
						<span class="flaticon-user"></span>
						<input type="text" name="transmitter" placeholder="Tu Correo" required>
					</div>
					<div class="user-subject">
						<span class="flaticon-door-key"></span>
						<input type="text" name="subject" placeholder="Asunto" required>
					</div>
					<div>
						<span class="flaticon-pen"></span>
						<textarea name="description" rows="20" placeholder="Descripción" required></textarea>
						</textarea>
					</div>
					<button id="mail" type="submit" class="to-form-php">ENVIAR</button>
				</form>
			</div>
		</div>
		<a style="position:absolute;bottom:1.5rem;left:5rem;background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@fangweilin?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Fang-Wei Lin"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Fotografía: Fang-Wei Lin</span></a>
	</div>
	<script src="assets/js/contact.js"></script>
</body>
</html>
