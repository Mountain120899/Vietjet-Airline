<?php
namespace Src\Controller;

use Src\TableGateways\BaoHiemGateway;

class BaoHiemController {

    private $db;
    private $requestMethod;
    private $MaDatCho;

    private $BaoHiemGateway;

    public function __construct($db, $requestMethod, $MaDatCho)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->MaDatCho       = $MaDatCho;

        $this->BaoHiemGateway = new BaoHiemGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                if($this->MaDatCho) {
                    $response = $this->getOneThongTinBaoHiem($this->MaDatCho);
                }
                else {
                    $response = $this->getAllThongTinBaoHiem();
                }
                break;
            case 'POST':
                $response = $this->createBaoHiemFromRequest();
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

    private function getAllThongTinBaoHiem()
    {
        $result = $this->BaoHiemGateway->findAll();
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getOneThongTinBaoHiem($MaDatCho)
    {
        $result = $this->BaoHiemGateway->findOne($MaDatCho);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function createBaoHiemFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (! $this->validateBaoHiem($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->BaoHiemGateway->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }

    private function validateBaoHiem($input)
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