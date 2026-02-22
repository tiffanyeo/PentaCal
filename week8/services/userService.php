<?php
    require_once __DIR__ . "/../repository/DBAccess.php";

    class UserService {
        public static function getAllUsers()
        {
            $db = new DBAccess("users");
            $result = $db->getAll();
            return $result;
        }
        public static function createNewUser($input) {
            $db = new DBAccess("users");
            $result = $db->findByEmail($input["email"]);
            if($result !== null) {
                return ["error" => "User already exists"];
            } else {
                $data = [
                    "id" => uniqid(),
                    "email" => $input["email"],
                    "pwd" => $input["name"],
                    "name" => $input
                ];
                $result = $db->postData($data);
                return $result;
            }

            
        }
    }


?>

