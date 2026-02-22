<?php

    require_once __DIR__ . "/../services/userService.php";

    class UserController {
        public static function handle($method, $input) {
            if($method === "GET") {
                $result = UserService::getAllUsers();
                http_response_code(200);
                echo json_encode($result);
                return;
            }
            if($method === "POST") {
                if(isset($input["name"]) && isset($input["email"]) && isset($input["pwd"])) {
                    $result = UserService::createNewUser($input); //new user
                    if(isset($result["error"])) {
                        http_response_code(409);
                        echo json_encode($result);
                        return;
                    } else {
                        http_response_code(201);
                        echo json_encode($result);
                        return;
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Missing fields"]);
                    return;
                }
                
            }

        }



    }


?>


