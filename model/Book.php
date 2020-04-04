<?php

require_once('database/Connection.php');
class Book {

	public static function getSuggestions () {

		$suggestions = array();
		$dbh = Connection::connect();

		$sql = 'SELECT name, gender, year FROM books ORDER BY name ASC LIMIT 5';
		$result = $dbh->prepare($sql);
		$result->execute();

		while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
			array_push($suggestions, $row);
		}
		Connection::disconnect($dbh);
		return $suggestions;

	}

	public static function getBooks ($start, $stop) {

		$data = array();

		try {

			$dbh = Connection::connect();

			$sql = "SELECT * FROM books LIMIT $start, $stop";
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

	public static function updateBook ($id, $newValues) {

		$data = array();

		try {

			$dbh = Connection::connect();
	
			$sql = 'UPDATE books SET name=:name, editorial=:editorial, gender=:gender, pages=:pages, year=:year, price=:price, author_id=:author WHERE id=:id';
			$result = $dbh->prepare($sql);

			$result->bindValue(':name', $newValues['name']);
			$result->bindValue(':editorial', $newValues['editorial']);
			$result->bindValue(':gender', $newValues['gender']);
			$result->bindValue(':pages', $newValues['pages']);
			$result->bindValue(':year', $newValues['year']);
			$result->bindValue(':price', $newValues['price']);
			$result->bindValue(':author', $newValues['author']);
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

}

?>