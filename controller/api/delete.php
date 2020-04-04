<?php

header('Content-Type:application/json;charset=utf-8');

$id = $_COOKIE['current_id'];

switch ($_COOKIE['current_section']) {
	case 'users':
		require('../../model/User.php');
		echo json_encode(User::deleteUser($id));
	break;
	case 'loans':
		require('../../model/Loan.php');
		echo json_encode(Loan::deleteLoan($id));
	break;
	case 'books':
		require('../../model/Book.php');
		echo json_encode(Book::deleteBook($id));
	break;
	case 'coupons':
		require('../../model/Coupon.php');
		echo json_encode(Coupon::deleteCoupon($id));
	break;
	case 'authors':
		require('../../model/Author.php');
		echo json_encode(Author::deleteAuthor($id));
	break;
}

?>