<?php
require_once "repository/DBAccess.php";

class NotificationsService {
    //GET
    public static function getAll() {
        $db = new DBAccess("notifications");
        return $db->getAll();
    }

    public static function getByParams($notiId, $userId) {
        $db = new DBAccess("notifications");
        $connectionsDb = new DBAccess("users_notifications");

        if ($notiId) {
            return $db->findById($notiId);
        } else if ($userId) {
            $connections = array_values(array_filter($connectionsDb->getAll(), fn($x) => $x["userId"] === $userId));
            $notis = [];
            foreach($connections as $x) {
                array_push($db->findById($x["notiId"]));
            }

            return $notis;
        }
    }

    //POST
    public static function postNoti($input) {
        $notiContent = $input["notiContent"] ?? null;
        $msgId = $input["messageId"] ?? null;
        $eventId = $input["eventId"] ?? null;
        $sessionId = $input["sessionID"] ?? null;

        if ($eventId && $msgId) {
            throw new Exception("Not acceptable, both event and msg set");
        }

        if ((!$notiContent || !$type || !$sessionId) || (!$msgId && !$eventId)) {
            throw new Exception("Missing attributes");
        }

        $db = new DBAccess("notifications");
        $connectionsDb = new DBAccess("users_notifications");

        $type = null;
        if ($eventId) {
            $type = "event";
        } else if ($msgId) {
            $type = "message";
        }
        $noti = [
            "id" => uniqid(),
            "type" => $type,
            "notiContent" => $notiContent,
            "messageId" => $msgId,
            "eventId" => $eventId
        ];

        
    }

    //PATCH
    public static function patchNoti($input) {
        $db = new DBAccess("notifications");
        $connectionsDb = new DBAccess("users_notifications");

        if ((!$input["userId"] && !$input["notiId"]) || !$input["read"]) {
            throw new Exception("Missing attributes");
        }

        if ($input["userId"]) {
            $connections = array_values(array_filter($connectionsDb->getAll(), fn($x) => $x["userId"] === $userId));
            if (count($connections) === 0) {
                throw new Exception("Not found");
            }
            $notis = [];
            foreach($connections as $x) {
                array_push($db->findById($x["notiId"]));
            }

            foreach($notis as $noti) {
                $db->patchData($noti["id"], ["read" => $input["read"]]);
            }

            return ["success" => "All notifications marked as read"];
        } else if ($input["notiId"]) {
            $db->patchData($input["notiId"], ["read" => $input["read"]]);

            return ["success" => "Notification read"];
        }
    }
}
?>