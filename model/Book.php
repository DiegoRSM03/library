<?php

require_once('database/Connection.php');
class Book {

	public static function getSuggestions () {

		$dbh = Connection::connect();
		$suggestions = array();

		$sql = 'SELECT name, gender, year FROM books ORDER BY name ASC LIMIT 5';
		$result = $dbh->prepare($sql);
		$result->execute();

		while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
			array_push($suggestions, $row);
		}
		return $suggestions;

	}

}

?>