<?php

$con = mysqli_connect("localhost", "phpadmin", "6729Aa++1", "webprogramming");

if(mysqli_connect_errno())
{
    http_response_code(500);
    exit;
}

$sql = "SELECT * FROM product";

if($result = mysqli_query($con, $sql))
{
    $resultArray = array();
    $tempArray = array();

    while($row = $result->fetch_object())
    {
        $tempArray = $row;
        array_push($resultArray, $tempArray);
    }

    http_response_code(200);
    echo json_encode($resultArray);
    exit;
}

mysqli_close($con);

?>