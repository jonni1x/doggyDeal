<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH');

include_once "./db/CRUD.php";
$crud = new CRUD;

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "GET") {
    $table = null;
    $id = null;
    $limit = 10;
    $breed = null;
    $year = null;
    $price = [];
    $page = 1;

    if(isset($_GET['table'])) $table = $_GET['table'];

    if(isset($_GET['id'])) $id = $_GET['id'];

    if(isset($_GET['limit'])) $limit = $_GET['limit'];

    if(isset($_GET['breed']) && $_GET['breed'] !== 'null') $breed = $_GET['breed'];

    if(isset($_GET['year']) && ($_GET['year']) !== 'null') $year = $_GET['year'];

    if(isset($_GET['price'])) {
        $price = explode('-', $_GET['price']);
    }

    if(isset($_GET['page'])) $page = $_GET['page'];

    print_r($crud->read($table, $id, $limit, $breed, $year, $price, $page));
} 

if ($method == "POST") {
    $table = null;

   if(isset($_GET['table'])) $table = $_GET['table'];

    $data = json_decode(file_get_contents('php://input'));
    
    return print_r($data->image[0]);
    print_r($crud->create($table, $data));
}

if($method == "PATCH") {
    $id = null;
    $table = null;

    if(isset($_GET['table'])) $table = $_GET['table'];

    $data = json_decode(file_get_contents('php://input'));

    if(isset($_GET['id'])) $id = $_GET['id']; 

    json_encode($crud->update($table, $id, $data));
}

if($method == "DELETE") {
    $id = null;
    $table = null;

   if(isset($_GET['table'])) $table = $_GET['table'];

   if(isset($_GET['id'])) $id = $_GET['id']; 

   print_r($crud->delete($table, $id));
}

?>

