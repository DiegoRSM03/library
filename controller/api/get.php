<?php

header('Content-Type:application/json;charset=utf-8');

$start = $_COOKIE['page_start'];
$stop = 5;

switch ($_COOKIE['current_section']) {
	case 'users':
		require('../../model/User.php');
		echo json_encode(User::getUsers($start, $stop));
	break;
	case 'loans':
		require('../../model/Loan.php');
		echo json_encode(Loan::getLoans($start, $stop));
	break;
	case 'books':
		require('../../model/Book.php');
		echo json_encode(Book::getBooks($start, $stop));
	break;
	case 'coupons':
		require('../../model/Coupon.php');
		echo json_encode(Coupon::getCoupons($start, $stop));
	break;
}

?>