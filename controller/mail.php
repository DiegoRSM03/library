<?php

header('Content-type:application/json;charset=utf-8');

$transmitter = $_POST['transmitter'];
$subject = $_POST['subject'];
$description = $_POST['description'];
$receiver = 'rodrigo.dsanchez@yahoo.com.ar';

$headers = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
$headers .= "From: $transmitter";



echo json_encode($data);

?>