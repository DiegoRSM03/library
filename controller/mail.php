<?php

header('Content-type:application/json;charset=utf-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require('PHPMailer/Exception.php');
require('PHPMailer/PHPMailer.php');
require('PHPMailer/SMTP.php');

$transmitter = $_POST['transmitter'];
$subject = $_POST['subject'];
$description = $_POST['description'];

$isSend = false;
$mail = new PHPMailer(true);
try {

	// SERVER SETTINGS
	$mail->SMTPDebug = 0;
	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';

	// TRANSMITTER
	$mail->SMTPAuth = true;
	$mail->Username = 'diegorsm03@gmail.com';
	$mail->Password = 'DiegoSanchez3516801227';	
	$mail->SMTPSecure = 'tls';
	$mail->Port = 587;

	// RECEIVER
	$mail->setFrom('diegorsm03@gmail.com', $transmitter);
	$mail->addAddress('diegorsm03@gmail.com');

	// CONTENT
	$mail->isHTML(true);
	$mail->Subject = "DRSM Biblioteca: $subject";
	$mail->Body = $description;

	$mail->send();
	$isSend = true;

} catch (Exception $e) {
	$isSend = false;
}

if ($isSend) {
	$data = array('status' => 'ok');
} else {
	$data = array('status' => 'err');
} 
echo json_encode($data);

?>