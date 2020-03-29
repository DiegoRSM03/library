<?php

(isset($_GET['sign-in'])) ? setcookie('sign', 'in', time()+300, '/') : setcookie('sign','up', time()+300, '/');
header('Location: ./../view/sign.php');


?>