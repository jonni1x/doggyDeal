<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include_once "CRUD.php";
$crud = new CRUD;

$method = $_SERVER['REQUEST_METHOD'];

if($method == "GET") {
    $id = null;
    $limit = 10;
    $breed = null;
    $year = null;
    $price = [];
    $page = 1;

    if(isset($_GET['id'])) $id = $_GET['id'];

    if(isset($_GET['limit'])) $limit = $_GET['limit'];

    if(isset($_GET['breed'])) $breed = $_GET['breed'];

    if(isset($_GET['year'])) $year = $_GET['year'];

    if(isset($_GET['price'])) {
        $price = explode('-', $_GET['price']);
    }

    if(isset($_GET['page'])) $page = $_GET['page'];

    print_r($crud->read("dogs", $id, $limit, $breed, $year, $price, $page));
} elseif($method == "POST") {
    $data = json_decode(file_get_contents('php://input'));
    
    $crud->create("users", $data);
}

?>

