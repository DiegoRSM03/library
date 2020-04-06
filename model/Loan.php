<?php

require_once('database/Connection.php');
class Loan {

	public static function getLoans ($start, $stop) {

		$data = array();

		try {

			$dbh = Connection::connect();

			$sql = "SELECT * FROM loans LIMIT $start, $stop";
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

	public static function updateLoan ($id, $newValues) {

		$data = array();

		try {

			$dbh = Connection::connect();
	
			$sql = 'UPDATE loans SET book_id=:book, user_id=:user, loan_date_in=:loanIn, loan_date_out=:loanOut WHERE id=:id';
			$result = $dbh->prepare($sql);

			$result->bindValue(':book', $newValues['book']);
			$result->bindValue(':user', $newValues['user']);
			$result->bindValue(':loanIn', $newValues['loan-in']);
			$result->bindValue(':loanOut', $newValues['loan-out']);
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

	public static function deleteLoan ($id) {

		$data = array();

		try {

			$dbh = Connection::connect();
	
			$sql = 'DELETE FROM loans WHERE id=:id';
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

	public static function setLoan ($infoUser) {

		$data = array();

		try {

			$dbh = Connection::connect();
	
			$sql = 'INSERT INTO loans (book_id, user_id, loan_date_in, loan_date_out) VALUES (:book, :user, :loanIn, :loanOut)';
			$result = $dbh->prepare($sql);

			$result->bindValue(':book', $infoUser['book']);																			
			$result->bindValue(':user', $infoUser['user']);
			$result->bindValue(':loanIn', $infoUser['loan-in']);
			$result->bindValue(':loanOut', $infoUser['loan-out']);
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