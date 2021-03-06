<?php

require_once('database/Connection.php');
class Author {

	public static function getAuthors ($start, $stop) {

		$data = array();

		try {

			$dbh = Connection::connect();

			$sql = "SELECT * FROM authors LIMIT $start, $stop";
			$result = $dbh->prepare($sql);
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

	public static function updateAuthor ($id, $newValues) {

		$data = array();

		try {

			$dbh = Connection::connect();
	
			$sql = 'UPDATE authors SET name=:name, surname=:surname, awards=:awards, country=:country WHERE id=:id';
			$result = $dbh->prepare($sql);

			$result->bindValue(':name', $newValues['name']);
			$result->bindValue(':surname', $newValues['surname']);
			$result->bindValue(':awards', $newValues['awards']);
			$result->bindValue(':country', $newValues['country']);
			$result->bindValue(':id', $id);
			$result->execute();
	
			array_push($data, array('status' => 'successful'));
			Connection::disconnect($dbh);
			
		} catch (Exception $e) {
			
			echo "Error:" . $e->getMessage() . "<br>En linea: " . $e->getLine();
			array_push($data, array('status' => 'failure'));
			
		}
		return $data;

	}

	public static function deleteAuthor ($id) {

		$data = array();

		try {

			$dbh = Connection::connect();
	
			$sql = 'DELETE FROM authors WHERE id=:id';
			$result = $dbh->prepare($sql);
			
			$result->bindValue(':id', $id);
			$result->execute();
	
			array_push($data, array('status' => 'successful'));
			Connection::disconnect($dbh);
			
		} catch (Exception $e) {
			
			echo "Error:" . $e->getMessage() . "<br>En linea: " . $e->getLine();
			array_push($data, array('status' => 'failure'));
			
		}
		return $data;

	}

	public static function setAuthor ($infoUser) {

		$data = array();

		try {

			$dbh = Connection::connect();
	
			$sql = 'INSERT INTO authors (name, surname, awards, country) VALUES (:name, :surname, :awards, :country)';
			$result = $dbh->prepare($sql);

			$result->bindValue(':name', $infoUser['name']);																			
			$result->bindValue(':surname', $infoUser['surname']);
			$result->bindValue(':awards', $infoUser['awards']);
			$result->bindValue(':country', $infoUser['country']);
			$result->execute();
	
			array_push($data, array('status' => 'successful'));
			Connection::disconnect($dbh);
			
		} catch (Exception $e) {
			
			echo "Error:" . $e->getMessage() . "<br>En linea: " . $e->getLine();
			array_push($data, array('status' => 'failure'));
			
		}
		return $data;

	}

}

?>