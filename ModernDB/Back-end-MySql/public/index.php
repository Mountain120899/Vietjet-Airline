<?php
require "../bootstrap.php";
use Src\Controller\ChuyenBayController;
use Src\Controller\SanBayController;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

// all of our endpoints start with /ChuyenBay
// everything else results in a 404 Not Found
if ($uri[1] !== 'ChuyenBay' && $uri[1] !== 'SanBay') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

$requestMethod      = $_SERVER["REQUEST_METHOD"];
$ChuyenBayId        = null;
$OptionSanBayId     = null;

if ($uri[1] == 'ChuyenBay'){
    if (isset($uri[2])){
            
        $ChuyenBayId = $uri[2];
    }
    $controller = new ChuyenBayController($dbConnection, $requestMethod, $ChuyenBayId);
}

if ($uri[1] == 'SanBay') {
    if (isset($uri[2])){
            
        $OptionSanBayId = $uri[2];
    }
    $controller = new SanBayController($dbConnection, $requestMethod, $OptionSanBayId);
}
// pass the request method and user ID to the ChuyenBayController and process the HTTP request:

$controller->processRequest();