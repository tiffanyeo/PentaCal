<?php

require_once __DIR__ . "/../../services/UsersCalendarsService.php";

class UsersCalendarsController {

    public static function handle($method, $input) {
        try {
            if ($method === "GET") {
                if (empty($input)) {
                    $data = UsersCalendarsService::getAll();
                    sendJson($data, 200);
                } else if (isset($input["userId"])) {
                    $data = UsersCalendarsService::getByParam($input);
                    sendJson($data, 200);
                } else if (isset($input["calId"])) {
                    $data = UsersCalendarsService::getByParam($input);
                    sendJson($data, 200);
                } else {
                    throw new Exception("Missing attributes");
                }
            }
    
            if ($method === "POST") {
                if (!isset($input["userId"]) || !isset($input["calId"]) || !isset($input["isAdmin"])) {
                    throw new Exception("Missing attributes");
                }
                $data = UsersCalendarsService::post($input);
                sendJson($data, 201);
            }
    
            if ($method === "PATCH") {
                if (!isset($input["id"]) || !isset($input["userId"]) || !isset($input["calId"]) || !isset($input["isAdmin"])) {
                    throw new Exception("User ID / CAL ID missing");
                }
                $data = UsersCalendarsService::patch($input);
                sendJson($data, 200);
            }
    
            if ($method === "DELETE") {
                if (!isset($input["userId"]) || !isset($input["calId"])) {
                    throw new Exception("User ID / Cal ID missing");
                }
                $data = UsersCalendarsService::delete($input);
                sendJson($data, 200);
            }

            // Hantera okända metoder
            throw new Exception("Method not allowed");

        } catch (Exception $error) {
            self::errorHandler($error);
        }
    }

    public static function errorHandler($error) {
        $message = $error->getMessage(); 

        // Generella fel
        if ($message === "Missing attributes") {
            sendJson(["error" => "Missing attributes"], 400);
        }

        // GET
        if ($message === "No calendars found") {
            sendJson(["error" => "No calendars found"], 404);
        }
        if ($message === "Calendar not found") {
            sendJson(["error" => "Calendar not found"], 404);
        }
        if ($message === "User not found") {
            sendJson(["error" => "User not found"], 404);
        }

        // POST
        if ($message === "User or cal not found") {
            sendJson(["error" => "User or cal not found"], 404);
        }
        if ($message === "User is already in cal") {
            sendJson(["error" => "User is already in cal"], 409);
        }

        // PATCH
        if ($message === "User ID / CAL ID missing") {
            sendJson(["error" => "User ID / CAL ID missing"], 400);
        }
        if ($message === "User not in calendar") {
            sendJson(["error" => "User not in calendar"], 400);
        }

        // DELETE
        if ($message === "User not found / Cal not found") {
            sendJson(["error" => "User not found / Cal not found"], 404);
        }
        if ($message === "Relation not found") {
            sendJson(["error" => "Relation not found"], 404);
        }

        sendJson(["error" => "Internal server error"], 500);
    }
}