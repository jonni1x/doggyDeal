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
        //Default query string
        $sql = "SELECT * FROM $table as t";
        //Array of data that we're gonna fetch and return
        $data = [];
        //String of conditions which we are going to concat if we have.
        $conditions = '';

        //Checking if id isn't empty to concat id to $conditions string
        if(!is_null($id)) $conditions .= " id = $id";

        //Checking if breed isn't empty to concat breed to $conditions string
        if(!empty($breed)) $sql .= " INNER JOIN breed as b ON t.breed_id = b.id AND b.name = '".$breed."' ";

        //Checking if year isn't empty to concat year to $conditions string
        if(!empty($year)) $conditions .= " year = ".$year." AND";

        //Checking if price isn't empty to concat price to $conditions string
        if(count($price) > 0) $conditions .= "  price > ".$price[0]." AND price < ".$price[1]." AND";

        //Removing the last "AND" from $conditions string.
        $conditions = rtrim($conditions, " AND ");

        //Checking if $conditions isn't empty to concat id to $sql string
        if((!empty($conditions))) {
            $sql .= " WHERE $conditions";
        } 

        // Count All data
        $result = $this->mysqli->query($sql);
        $totalItems = $result->num_rows;

        // Total Pages
        $totalPages = ceil($totalItems / $limit);

        //Offset 
        $offset = ($page - 1) * $limit;

        //Adding limit and Offset for pagination
        $sql .= " LIMIT $limit OFFSET $offset";
        // Calling query function to execute $sql query string
        $res = $this->mysqli->query($sql); 
        
        if($res) {
            foreach($res as $d) { 
                array_push($data, $d);
            }
            return json_encode(array(
                $data,
                "total_items" => $totalItems,
                "total_pages" => $totalPages,
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

//     public function filter($query, $limit, $page ) {
//         $data = [];
//         $sql = "SELECT * FROM dogs WHERE ";

//         if(!empty($query)) {
//             foreach($query as $q) {
//                 $sql .= " description LIKE '%".$q."%' OR ";
//             }

//             $sql = rtrim($sql, " OR ");

//             // Count All data
//             $result = $this->mysqli->query($sql);
//             $totalItems = $result->num_rows;

//             // Total Pages
//             $totalPages = ceil($totalItems / $limit);

//             //Offset 
//             $offset = ($page - 1) * $limit;

//             //Adding limit and Offset for pagination
//             $sql .= " LIMIT $limit OFFSET $offset";

//             $res = $this->mysqli->query($sql); 

//             if($res) {
//                 foreach($res as $d) { 
//                     array_push($data, $d);
//                 }
//                 return json_encode(array(
//                     $data,
//                     "total_items" => $totalItems,
//                     "total_pages" => $totalPages,
//                     "page" => $page
//                 ));
//             }
//     }
//   }
}