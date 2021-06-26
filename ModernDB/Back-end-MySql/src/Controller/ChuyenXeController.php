<?php
namespace Src\Controller;

use Src\TableGateways\ChuyenXeGateway;

class ChuyenXeController {

    private $db;
    private $requestMethod;
    private $ChuyenXeId;

    private $ChuyenXeGateway;

    public function __construct($db, $requestMethod, $ChuyenXeId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->ChuyenXeId  = $ChuyenXeId;

        $this->ChuyenXeGateway = new ChuyenXeGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                $response = $this->getOneChuyenXe($this->ChuyenXeId);
                break;
            case 'POST':
                $response = $this->getChuyenXe();
                break;
            case 'PUT':
                $response = $this->updateChuyenXeFromRequest($this->ChuyenXeId);
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

    private function getOneChuyenXe($id)
    {
        $result = $this->ChuyenXeGateway->findone($id);
        if (!$result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getChuyenXe()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $result = $this->ChuyenXeGateway->find($input);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function updateChuyenXeFromRequest($id)
    {
        $result = $this->ChuyenXeGateway->findone($id);
        if (! $result) {
            return $this->notFoundResponse();
        }
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (! $this->validateChuyenXe($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->ChuyenXeGateway->update($id, $input);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
    }

    private function validateChuyenXe($input)
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