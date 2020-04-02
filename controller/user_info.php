<?php

header('Content-Type:application/json;charset=utf-8');
require('../model/User.php');
echo json_encode(User::getUserInfo($_COOKIE['id']));

?>