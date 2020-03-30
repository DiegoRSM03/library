<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class Connection {

	private const DB_SOURCE = 'mysql:host=localhost;dbname=library';
	private const DB_USER = 'root';
	private const DB_PSSWD = '';

	public static function connect () {
		try {

			$dbh = new PDO(self::DB_SOURCE, self::DB_USER, self::DB_PSSWD);
			$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
			$dbh->exec('SET CHARACTER SET utf8');

			return $dbh;

		} catch (Exception $e) {

			echo '<h1>Ocurrio un error con la conexion a la DB</h1>';
			echo '<h3>Error: ' . $e.getMessage() . ' <br></h3>';
			echo '<h3>Linea de Error: ' . $e.getLine() . '<br></h3>';

		}
	}
	public static function disconnect (&$dbh) {
		$dbh = null;
	}

}

?>