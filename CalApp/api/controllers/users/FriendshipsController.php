<?php

require_once __DIR__ . "/../../services/FriendshipsService.php";
require_once __DIR__ . "/../sendJSON.php";

class FriendshipsController {

    public static function handle($method, $input): void {
        try {
            if ($method === "GET") {
                if (empty($input)) throw new Exception("Missing attributes");

                sendJSON(FriendshipsService::getByParams($input), 200);
                return;
            } 
        //friendships?userId=id
            if ($method === "POST"){
                sendJSON(FriendshipsService::post($input), 201);
                return;
            }
            // /friendships?userId=id&userId2=id
            if ($method === "DELETE") {
                sendJSON(FriendshipsService::delete($input), 200);
            }
        } catch (Exception $error) {
            self::errorHandler($error);
            return;
        }


    }

    private static function errorHandler($error){
        $msg = $error->getMessage();

        if ($msg === "Missing attributes") {
            sendJSON(["error" => $msg], 400);
        } else if ($msg === "User not found") {
            sendJSON(["error" => $msg], 404);
        } else if ($msg === "Friendship not found") {
            sendJSON(["error" => $msg], 404);
        } else if ($msg === "Users are already friends") {
            sendJSON(["error" => $msg], 409);
        }
    }

}
?>