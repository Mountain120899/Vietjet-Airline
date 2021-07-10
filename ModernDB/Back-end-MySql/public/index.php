<?php
require "../bootstrap.php";
use Src\Controller\ChuyenBayController;
use Src\Controller\SanBayController;
use Src\Controller\DiaDiemController;
use Src\Controller\ChuyenXeController;
use Src\Controller\DatXeController;
use Src\Controller\BaoHiemController;

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

$requestMethod      = $_SERVER["REQUEST_METHOD"];
$ChuyenBayId        = null;
$ChuyenXeId         = null;
$OptionSanBayId     = null;
$OptionDiaDiemId    = null;
$MaDatXe            = null;
$MaDatCho           = null;

switch($uri[1]){
    case 'ChuyenBay': {
        if (isset($uri[2])){
            
            $ChuyenBayId = $uri[2];
        }
        $controller = new ChuyenBayController($dbConnection, $requestMethod, $ChuyenBayId);
        break;
    }
    case 'SanBay': {
        if (isset($uri[2])){
            
            $OptionSanBayId = $uri[2];
        }
        $controller = new SanBayController($dbConnection, $requestMethod, $OptionSanBayId);
        break;
    }
    case 'DiaDiem': {
        if (isset($uri[2])){
            
            $OptionDiaDiemId = $uri[2];
        }
        $controller = new DiaDiemController($dbConnection, $requestMethod, $OptionDiaDiemId);
        break;
    }
    case 'ChuyenXe': {
        if (isset($uri[2])){
            
            $ChuyenXeId = $uri[2];
        }
        $controller = new ChuyenXeController($dbConnection, $requestMethod, $ChuyenXeId);
        break;
    }
    case 'DatXe': {
        if (isset($uri[2])){
            
            $MaDatXe = $uri[2];
        }
        $controller = new DatXeController($dbConnection, $requestMethod, $MaDatXe);
        break;
    }
    case 'BaoHiem': {
        if (isset($uri[2])){
            
            $MaDatCho = $uri[2];
        }
        $controller = new BaoHiemController($dbConnection, $requestMethod, $MaDatCho);
        break;
    }
    default: {
        header("HTTP/1.1 404 Not Found");
        exit();
    }
}

$controller->processRequest();