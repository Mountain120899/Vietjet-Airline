<?php
namespace Src\Controller;

use Src\TableGateways\DatXeGateway;

class DatXeController {

    private $db;
    private $requestMethod;
    private $MaDatXe;

    private $DatXeGateway;

    public function __construct($db, $requestMethod, $MaDatXe)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->MaDatXe       = $MaDatXe;

        $this->DatXeGateway = new DatXeGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                if($this->MaDatXe) {
                    $response = $this->getOneThongTinDatXe($this->MaDatXe);
                }
                else {
                    $response = $this->getAllThongTinDatXe();
                }
                break;
            case 'POST':
                $response = $this->createDatXeFromRequest();
                break;
            default:
                $response = $this->notFoundResponse();
                break;
        }
        header($response['status_code_header']);
        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function getAllThongTinDatXe()
    {
        $result = $this->DatXeGateway->findAll();
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getOneThongTinDatXe($MaDatXe)
    {
        $result = $this->DatXeGateway->findOne($MaDatXe);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function createDatXeFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (! $this->validateDatXe($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->DatXeGateway->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }

    private function validateDatXe($input)
    {
        return true;
    }

    private function unprocessableEntityResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
        return $response;
    }

    private function notFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}