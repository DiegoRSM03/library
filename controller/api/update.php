<?php

header('Content-Type:application/json;charset=utf-8');

if (!isset($_COOKIE['edit_settings_user']) || $_COOKIE['edit_settings_user'] == 'no') {

	$id = $_COOKIE['current_id'];
	$newValues = array(
		'name' => $_POST['table-name'],
		'surname' => $_POST['table-surname'],
		'domicilie' => $_POST['table-domicilie'],
		'province' => $_POST['table-province'],
		'date' => $_POST['table-date-of-birth'],
		'password' => $_POST['table-password']
	);

} else if ($_COOKIE['edit_settings_user'] == 'yes') {

	$id = $_COOKIE['id'];
	$newValues = array(
		'name' => $_POST['settings-name'],
		'surname' => $_POST['settings-surname'],
		'domicilie' => $_POST['settings-domicilie-string'],
		'directionNumber' => $_POST['settings-domicilie-number'],
		'province' => $_POST['settings-province'],
		'date' => array(
			'year' => $_POST['settings-date-year'],
			'month' => $_POST['settings-date-month'],
			'day' => $_POST['settings-date-day']
		),
		'password' => $_POST['settings-password']
	);
	
}


switch ($_COOKIE['current_section']) {
	case 'users':
		require('../../model/User.php');
		echo json_encode(User::updateUser($id, $newValues));
	break;
	case 'loans':
		require('../../model/Loan.php');
		echo json_encode(Loan::updateLoan($id, $newValues));
	break;
	case 'books':
		require('../../model/Book.php');
		echo json_encode(Book::updateBook($id, $newValues));
	break;
	case 'coupons':
		require('../../model/Coupon.php');
		echo json_encode(Coupon::updateCoupon($id, $newValues));
	break;
	case 'authors':
		require('../../model/Author.php');
		echo json_encode(Author::updateAuthor($id, $newValues));
	break;
}

?>