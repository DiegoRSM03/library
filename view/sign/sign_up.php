<form id="form-sign-up" method="POST">
	<h1 class="title">Regístrate</h1>
	<div class="user-name">
		<span class="flaticon-user"></span>
		<input type="text" id="name" name="name" placeholder="Nombre" required>
	</div>
	<div class="user-surname">
		<span class="flaticon-user"></span>
		<input type="text" id="surname" name="surname" placeholder="Apellido" required>
	</div>
	<div class="user-domicilie">
		<span class="flaticon-user"></span>
		<input type="text" id="domicilie" name="domicilie" placeholder="Calle del domicilio" required>
		<input type="text" id="direction-number" name="direction-number" placeholder="Numero" required>
	</div>
	<div class="user-province">
		<span class="flaticon-user"></span>
		<input type="text" id="province" name="province" placeholder="Provincia / Ciudad" required>
	</div>
	<div class="user-date-of-birth">
		<span class="flaticon-user"></span>
		<input type="text" id="date-day" name="date-day" placeholder="Día" required>
		<input type="text" id="date-month" name="date-month" placeholder="Mes" required>
		<input type="text" id="date-year" name="date-year" placeholder="Año" required>
	</div>
	<div class="user-password">
		<span class="flaticon-door-key"></span>
		<input type="password" id="password" name="password" placeholder="Contraseña" required>
	</div>
	<button type="submit" id="to-form-sign-up">VALIDAR</button>
</form>