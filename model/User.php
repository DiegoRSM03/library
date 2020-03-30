<?php

require_once('database/Connection.php');
class User {

	public static function isAuthorized ($id, $password) {

		$authorized = array();
		$dbh = Connection::connect();

		$sql = 'SELECT * FROM users WHERE id= :id AND password= :password';
		$result = $dbh->prepare($sql);

		$result->bindParam(':id', $id);
		$result->bindParam(':password', $password);
		$result->execute();
		
		Connection::disconnect($dbh);

		if ($result->rowCount() >= 1) {
			array_push($authorized, array('authorized' => 'yes'));
		} else {
			array_push($authorized, array('authorized' => 'no'));
		}
		return $authorized;

	}

}

?>