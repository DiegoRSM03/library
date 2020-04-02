<?php

header('Content-Type:application/json;charset=utf-8');
require('../../../model/User.php');

$start = $_COOKIE['page_start'];
$stop = $start + 5;

echo json_encode(User::getUsers($start, $stop));

?>