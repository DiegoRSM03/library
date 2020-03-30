<?php

header('Content-type:application/json;charset=utf-8');
require_once('../model/Book.php');
echo json_encode(Book::getSuggestions());

?>