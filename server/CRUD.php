<?php
include './db/Database.php';
require __DIR__ . '/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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

        $res = $this->mysqli->query($sql);
        //Check if query is executed
        if($res) {
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

    public function read($table, $id, $limit, $breed, $age, $price, $page, $user_id) {
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
        if(!empty($age)) $conditions .= " age = ".$age." AND";
        
        if(!empty($user_id)) $conditions .= " user_id = ".$user_id." AND";

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
                "page" => $page,
                "status" => http_response_code(200) 
            ));
        } else {
            return json_encode([
              "message" => "Server isn't working...",
              "status" => http_response_code(404)   
            ]);
        }
    }

    public function update($table, $id, $data) {
        $sql =  "UPDATE $table SET";

        if(!empty($data)) {
            foreach($data as $column=>$val) {
                if($column == 'password') continue;
                $sql .= "`".$column."`='".$this->mysqli->real_escape_string($val)."', ";
            }
            $sql = rtrim($sql, ' , ');
        } else {
            return "No data received";
        }

        if(isset($data['password'])) {
            $password = password_hash( $this->mysqli->real_escape_string($data['password']), PASSWORD_BCRYPT);
            $sql .= ", `password`='".$this->mysqli->real_escape_string($password)."' ";
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

    public function register($data) {
        $data = (array) json_decode(file_get_contents('php://input'));
        $name = $this->mysqli->real_escape_string($data['name']);
        $surname = $this->mysqli->real_escape_string($data['surname']);
        $email = $this->mysqli->real_escape_string($data['email']);
        $phone = $this->mysqli->real_escape_string($data['phone']);
        $address = $this->mysqli->real_escape_string($data['address']);
        $password = password_hash( $this->mysqli->real_escape_string($data['password']), PASSWORD_BCRYPT);
        $role = 'user';

        $validateEmail = $this->mysqli->query("SELECT * FROM users where email = '$email'");

        if($validateEmail->num_rows > 0){ 
            return json_encode(["created" => "failed", "message" => "Email is already used"]);
        }

        if(isset($data['role'])) $role = $data['role'];

        $sql = "INSERT INTO users (name, surname, email, phone, address, password, role) VALUES ('$name', '$surname', '$email', '$phone', '$address', '$password', '$role')";

        if($this->mysqli->query($sql)) {
            return json_encode([
                "created" => "success",
                "message" => "User Created Succesfully"
            ]);
        } else {
            return json_encode([
                "created" => "failed",
                "message" => "Something Went Wrong"
            ]);
        }
    }

    public function login($data) {
        $email = $data['email'];
        $password = $data['password'];

        $data = $this->mysqli->query("SELECT * FROM users WHERE email = '$email'");

        if($data->num_rows < 1) {
            return json_encode([
                "login" => "failed",
                "message" => "Email or Password is incorrect"
            ]);
        }

        foreach($data as $user) {
            if($user['role'] == 'admin' && ($password == $user['password'])) {
                $secret = 'sec!ReT423*&';
                $payload = [
                    'user_id' => $user['id'],
                    'role' => $user['role'],
                    'iat' => 1356999524,
                    'exp_date' => time() + (3600 * 24)
                ];

                $token = JWT::encode($payload, $secret, 'HS256');

                return json_encode([
                    "token" => $token,
                    "message" => "Login success"
                ]);
            }
                if($user['role'] == 'user' && password_verify($password, $user['password'])) {
                $secret = 'sec!ReT423*&';
                $payload = [
                    'user_id' => $user['id'],
                    'role' => $user['role'],
                    'iat' => 1356999524,
                    'exp_date' => time() + (3600 * 24)
                ];

                $token = JWT::encode($payload, $secret, 'HS256');

                return json_encode([
                    "token" => $token,
                    "message" => "Login success"
                ]);
            } else {
                return json_encode([
                    "login" => "failed",
                    "message" => "Email or Password is incorrect"
                ]);
            }
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