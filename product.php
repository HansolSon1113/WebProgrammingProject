<?php

$id = $_POST["id"] ?? null;
$pw = $_POST["password"] ?? null;
$productId = $_POST["product_id"] ?? null;

if (!id || !pw) {
    http_response_code(400);
    exit;
}

$con = mysqli_connect("localhost", "phpadmin", "6729Aa++1", "webprogramming");

if (mysqli_connect_errno()) {
    http_response_code(500);
    exit;
}

if ($productId) {
    $sqlg = "SELECT password, purchases FROM users WHERE id = ?";
    $stmtg = $con->prepare($sql);
    $stmtg->bind_param('s', $userId);
    $stmtg->execute();
    $resultg = $stmtg->get_result();

    if ($row = $resultg->fetch_assoc()) {
        if ($password !== $row['password']) {
            http_response_code(401);
            exit;
        }

        $existing = json_decode($row['items'], true);
        if (!is_array($existing)) {
            $existing = [];
            $existing[] = $productId;
            $newJson = json_encode($existing, JSON_UNESCAPED_UNICODE);

            $sqlu = "UPDATE users SET items = ? WHERE id = ?";
            $stmtu = $con->prepare($sqlu);
            $stmtu->bind_param('ss', $newJson, $userId);
            $stmtu->execute();

            http_response_code(200);
            exit;
        }
    }

    $initial = [$productId];
    $initialJson = json_encode($initial, JSON_UNESCAPED_UNICODE);

    $sqli = "INSERT INTO users (id, password, items) VALUES (?, ?, ?)";
    $stmti = $con->prepare($sqli);
    $stmti->bind_param('sss', $id, $password, $initialJson);
    $stmti->execute();

    http_response_code(200);
    echo json_encode([
        'items' => $initial
    ]);
    exit;
}

$sqlf = "SELECT id, password, items FROM user WHERE id = ?";
$stmtf = $con->prepare($sqlf);
$stmtf->bind_param("s", $id);
$stmtf->execute();
$resultf = $stmtf->get_result();

if($row = $resultf->fetch_assoc())
{
    if($password != $row["password"])
    {
        http_response_code(401);
        exit;
    }

    http_response_code(200);
    echo json_encode([
        "items"=> $row["items"]
        ]);
    exit;
}

$stmtg->close();
$stmtu->close();
$stmti->close();
$stmtf->close();
$con->close();

?>