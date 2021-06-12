<?php
    require "../bootstrap.php";
    //use Src\Controller\ThongTinController;
    require "../src/Controller/ThongTinController.php";
    require "../src/TableGateways/ThongTinGateway.php";

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
    $uri = explode('/', $uri);

    if ($uri[1] !== 'ThongTin'){
        header("HTTP/1.1 404 not found");
        exit();
    }

    $ThongTinId = null;
    $requestMethod = $_SERVER['REQUEST_METHOD'];

    if ($uri[1] == 'ThongTin'){
        if (isset($uri[2])){
            $ThongTinId = (int) $uri[2];
        }
        $controller = new ThongTinController($dbConnection, $requestMethod, $ThongTinId);
    }
    $controller->processRequest();

?>