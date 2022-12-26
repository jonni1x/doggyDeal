<?php
include 'Database.php';


class CRUD {
    private $mysqli;

    public function __construct() {
        $db = DB::getInstance();
        $this->mysqli = $db->getConnection();
    }

    public function create($table, $data) {
        $sql = "INSERT INTO $table SET ";

        if(!empty($data)) {
            foreach($data as $column=>$val) {
                $sql .= "`".$column."`='".$this->mysqli->real_escape_string($val)."', ";
            }
            $sql = rtrim($sql, ' , ');
        } else {
            return "No data received";
        }

        //Check if query is executed
        if($this->mysqli->query($sql)) {
            return json_encode([
                "created" => "true",
                "message" => "Created Successfully"
            ]);
        } else {
            return json_encode([
                "created" => "false",
                "message" => "Something Went Wrong!"
            ]);
        }
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
                $data,
                "total-items" => $totalItems,
                "total-pages" => $totalPages,
                "page" => $page
            ));
        }
    }


    public function update($table, $id, $data) {
        $sql =  "UPDATE $table SET";

        if(!empty($data)) {
            foreach($data as $column=>$val) {
                $sql .= "`".$column."`='".$this->mysqli->real_escape_string($val)."', ";
            }
            $sql = rtrim($sql, ' , ');
        } else {
            return "No data received";
        }

        if(!is_null($id)) {
            $sql .= " WHERE id = $id";
        }

        if($this->mysqli->query($sql)) {
            return json_encode([
                "updated" => "Updated",
                "message" => "Updated Successfully"
            ]);
        } else {
            return json_encode([
                "updated" => "false",
                "message" => "Something Went Wrong!"
            ]);
        }
    }

    public function delete($table, $id) {
        if(!is_null($id)) $sql = "DELETE FROM $table WHERE id = $id";

        if($this->mysqli->query($sql)) {
            return json_encode([
                "Deleted" => "true",
                "message" => "Deleted Successfully"
            ]);
        } else {
            return json_encode([
                "Deleted" => "false",
                "message" => "Something Went Wrong!"
            ]);
        }
    }

    public function filter($query) {
        $data = [];
        $sql = "SELECT * FROM dogs WHERE ";

        if(!empty($query)) {
        
            foreach($query as $q) {
                $sql .= " description LIKE '%".$q."%' OR ";
            }

            $sql = rtrim($sql, " OR ");

            $res = $this->mysqli->query($sql); 
        
            if($res) {
                foreach($res as $d) { 
                    array_push($data, $d);
                }
                return json_encode($data);
            }
        } else {
            return "No Query Entered";
        }
    }
}