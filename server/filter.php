<?php

include_once "./db/CRUD.php";
$crud = new CRUD;

if((isset($_GET['query']))) {
    $query = $_GET['query'];

    $query_arr = explode("-", $query);

    print_r($crud->filter($query_arr));
}

?>