<?php

header('Content-Type:application/json;charset=utf-8');

if (!isset($_COOKIE['edit_settings_user']) || $_COOKIE['edit_settings_user'] == 'no') {

	$id = $_COOKIE['current_id'];

	switch ($_COOKIE['current_section']) {

		case 'users':
			$newValues = array(
				'name' => $_POST['table-name'],
				'surname' => $_POST['table-surname'],
				'domicilie' => $_POST['table-domicilie'],
				'province' => $_POST['table-province'],
				'date' => $_POST['table-date-of-birth'],
				'password' => $_POST['table-password']
			);
			require('../../model/User.php');
			echo json_encode(User::updateUser($id, $newValues));
		break;
		case 'loans':
			$newValues = array(
				'book' => $_POST['table-book'],
				'user' => $_POST['table-user'],
				'loan-in' => $_POST['table-loan-in'],
				'loan-out' => $_POST['table-loan-out']
			);
			require('../../model/Loan.php');
			echo json_encode(Loan::updateLoan($id, $newValues));
		break;
		case 'books':
			$newValues = array(
				'name' => $_POST['table-name'],
				'editorial' => $_POST['table-editorial'],
				'gender' => $_POST['table-gender'],
				'pages' => $_POST['table-pages'],
				'year' => $_POST['table-year'],
				'price' => $_POST['table-price'],
				'author' => $_POST['table-author']
			);
			require('../../model/Book.php');
			echo json_encode(Book::updateBook($id, $newValues));
		break;
		case 'coupons':
			$newValues = array(
				'mount' => $_POST['table-mount']
			);
			require('../../model/Coupon.php');
			echo json_encode(Coupon::updateCoupon($id, $newValues));
		break;
		case 'authors':
			$newValues = array(
				'name' => $_POST['table-name'],
				'surname' => $_POST['table-surname'],
				'awards' => $_POST['table-awards'],
				'country' => $_POST['table-country']
			);
			require('../../model/Author.php');
			echo json_encode(Author::updateAuthor($id, $newValues));
		break;
	}

} else if ($_COOKIE['edit_settings_user'] == 'yes') {

	$id = $_COOKIE['id'];

	$year = $_POST['settings-date-year'];
	$month = $_POST['settings-date-month'];
	$day = $_POST['settings-date-day'];

	$domicilieString = $_POST['settings-domicilie-string'];
	$domicilieNumber = $_POST['settings-domicilie-number'];

	$newValues = array(
		'name' => $_POST['settings-name'],
		'surname' => $_POST['settings-surname'],
		'domicilie' => "$domicilieString $domicilieNumber",
		'province' => $_POST['settings-province'],
		'date' => "$year-$month-$day",
		'password' => $_POST['settings-password']
	);
	require('../../model/User.php');
	echo json_encode(User::updateUser($id, $newValues));
	
}

?>