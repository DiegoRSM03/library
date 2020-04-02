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

	public static function setUser ($infoUser) {

		$added = array();

		try {

			$dbh = Connection::connect();
	
			$sql = 'INSERT INTO users (name, surname, domicilie, province, date_of_birth, password) VALUES (:name, :surname, :domicilie, :province, :dateOfBirth, :password)';
			$result = $dbh->prepare($sql);

			$date = $infoUser['date']['year'] . '-' . $infoUser['date']['month'] . '-' . $infoUser['date']['day'];
			$domicilie = $infoUser['domicilie'] . " " . $infoUser['directionNumber'];

			$result->bindValue(':name', $infoUser['name']);
			$result->bindValue(':surname', $infoUser['surname']);
			$result->bindValue(':domicilie', $domicilie);
			$result->bindValue(':province', $infoUser['province']);
			$result->bindValue(':dateOfBirth', $date);
			$result->bindValue(':password', $infoUser['password']);
	
			$result->execute();
	
			Connection::disconnect($dbh);

			array_push($added, array('logged' => 'yes'));
			
		} catch (Exception $e) {
			
			echo "Error:" . $e->getMessage() . "<br>En linea: " . $e->getLine();
			array_push($added, array('logged' => 'no'));
			
		}
		return $added;

	}

	public static function getUserInfo ($id) {
		
		$data = array();

		try {

			$dbh = Connection::connect();

			$sql = 'SELECT * FROM users WHERE id = :id';
			$result = $dbh->prepare($sql);

			$result->bindValue(':id', $id);
			$result->execute();

			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				array_push($data, $row);
			}
			Connection::disconnect($dbh);
			return $data;

		} catch (Exception $e) {

			echo "Error:" . $e->getMessage() . "<br>En linea: " . $e->getLine();
			array_push($data, array('status' => 'failure'));
			
		}

	}

}

?>