<?php
namespace Src\Controller;

use Src\TableGateways\ChuyenBayGateway;

class ChuyenBayController {

    private $db;
    private $requestMethod;
    private $ChuyenBayId;

    private $ChuyenBayGateway;

    public function __construct($db, $requestMethod, $ChuyenBayId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->ChuyenBayId  = $ChuyenBayId;

        $this->ChuyenBayGateway = new ChuyenBayGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                $response = $this->getOneChuyenBay($this->ChuyenBayId);
                break;
            case 'POST':
                $response = $this->getChuyenBay();
                break;
            case 'PUT':
                $response = $this->updateChuyenBayFromRequest($this->ChuyenBayId);
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

    private function getOneChuyenBay($id)
    {
        $result = $this->ChuyenBayGateway->findone($id);
        if (!$result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getChuyenBay()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $result = $this->ChuyenBayGateway->find($input);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function updateChuyenBayFromRequest($id)
    {
        $result = $this->ChuyenBayGateway->findone($id);
        if (! $result) {
            return $this->notFoundResponse();
        }
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (! $this->validateChuyenBay($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->ChuyenBayGateway->update($id, $input);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
    }

    private function validateChuyenBay($input)
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