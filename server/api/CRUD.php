<?php
include '../db/Database.php';


class CRUD {
    private $mysqli;

    public function __construct() {
        $db = DB::getInstance();
        $this->mysqli = $db->getConnection();
    }

    public function create() {
        
    }


    public function read($table, $id, $limit, $breed, $year, $price, $page) {
        $sql = "SELECT * FROM $table as t";
        $data = [];
        $conditions = '';

        if(!is_null($id)) $conditions .= " id = $id";

        if(!is_null($breed)) $sql .= " INNER JOIN breed as b ON t.breed_id = b.id AND b.name = '".$breed."' ";

        if(!is_null($year)) $conditions .= " year = ".$year." AND";

        if(count($price) > 0) $conditions .= "  price > ".$price[0]." AND price < ".$price[1]." AND";

        $conditions = rtrim($conditions, " AND ");

        if((!empty($conditions))) {
            $sql .= " WHERE $conditions";
        } 

        $totalItems = $this->mysqli->query("SELECT COUNT(*) FROM $table")->fetch_row()[0];
        $offset = ($page - 1) * $limit;
        $totalPages = ceil($totalItems / $limit);
        $sql .= " LIMIT $limit OFFSET $offset";


        $res = $this->mysqli->query($sql); 
        
        if($res) {
            foreach($res as $d) { 
                array_push($data, $d);
            }
            return json_encode(array(
                "data" => $data,
                "total-items" => $totalItems,
                "total-page" => $totalPages,
                "page" => $page
            ));
        }

    }
}