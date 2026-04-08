<?php
function sendJSON($resp, $code) {
    http_response_code($code);
    echo json_encode($resp);
    return;
}
?>