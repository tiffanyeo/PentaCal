<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class FriendshipsService {

    public static function getByParams($input) {
        $usersDb = new DBAccess("users");
        $friendsDb = new DBAccess("friendships");
        $relations = $friendsDb->getAll();

        if (!isset($input["userId1"]) && !isset($input["userId2"])) throw new Exception("Missing attributes", 400);

        if (!$usersDb->findById($input["userId1"])) throw new Exception("User not found", 404);
        if (isset($input["userId2"])) {
            if (!$usersDb->findById($input["userId2"])) throw new Exception("User not found", 404);

            $relation = array_find($relations, fn($x) => $x["userId1"] === $input["userId1"] && $x["userId2"] === $input["userId2"]);
            if (!$relation) $relation = array($relations, fn($x) => $x["userId2"] === $input["userId1"] && $x["userId1"] === $input["userId2"]);

            if (!$relation) throw new Exception("Friendship not found");
            else return $relation;
        }

        $relationsArr = array_values(array_filter($relations, fn($x) => $x["userId1"] === $input["userId1"]));
        $relationsArr2 = array_values(array_filter($relations, fn($x) => $x["userId2"] === $input["userId1"]));
        return [...$relationsArr, ...$relationsArr2];
    }

    public static function post($input) {
        $friendsDb = new DBAccess("friendships");
        $usersDb = new DBAccess("users");
        $relations = $friendsDb->getAll();

        if (!$usersDb->findById($input["userId1"]) || !$usersDb->findById($input["userId2"])) {
            throw new Exception("User not found");
        }
        if (!isset($input["userId1"], $input["userId2"])) throw new Exception("Missing attributes");

        $exists = array_find($relations, fn($x) => $x["userId1"] === $input["userId1"] && $x["userId2"] === $input["userId2"]);
        if (!$exists) $exists = array_find($relations, fn($x) => $x["userId2"] === $input["userId1"] && $x["userId1"] === $input["userId2"]);
        if ($exists) throw new Exception("Users are already friends");

        $new = [
            "id" => uniqid(),
            "userId1" => $input["userId1"],
            "userId2" => $input["userId2"]
        ];
        return $friendsDb->postData($new);
    }

    public static function delete($input) {
        if (!isset($input["userId1"], $input["userId2"])) {
            throw new Exception("Missing attributes");
        }

        $friendsDb = new DBAccess("friendships");
        $relations = $friendsDb->getAll();

        $relation = array_find($relations, fn($x) => $x["userId1"] === $input["userId1"] && $x["userId2"] === $x["userId2"]);
        if (!$relation) array_find($relations, fn($x) => $x["userId2"] === $input["userId1"] && $x["userId1"] === $x["userId2"]);
        if (!$relation) throw new Exception("Friendship not found");

        $friendsDb->deleteData($relation["id"]);
        return ["success" => "Deleted successfully!"];
    }
}



?>