<?php

header('Content-Type:application/json;charset=utf-8');

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
}

?>