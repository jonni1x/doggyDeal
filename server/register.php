<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH');

include_once "CRUD.php";
$crud = new CRUD;

$method = $_SERVER['REQUEST_METHOD'];

if($method == 'POST') {
    $data = (array) json_decode(file_get_contents('php://input'));

    print_r($crud->register($data));
}

?>