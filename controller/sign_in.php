<?php

header('Content-type:application/json;charset=utf-8');
require_once('../model/User.php');

$id = $_POST['id'];
$password = $_POST['password'];

echo json_encode(User::isAuthorized($id, $password));

?>