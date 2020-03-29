<?php

require_once('../model/Book.php');
header('Content-type:application/json;charset=utf-8');

echo json_encode(Book::getSuggestions());

?>