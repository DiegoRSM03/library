<?php

header('Content-Type:application/json;charset=utf-8');
require_once('../model/User.php');

$userInfo = array(
	'name' => $_POST['name'],
	'surname' => $_POST['surname'],
	'domicilie' => $_POST['domicilie'],
	'directionNumber' => $_POST['direction-number'],
	'province' => $_POST['province'],
	'date' => array(
		'year' => $_POST['date-year'],
		'month' => $_POST['date-month'],
		'day' => $_POST['date-day']
	),
	'password' => $_POST['password']
);

echo json_encode(User::setUser($userInfo));

?>