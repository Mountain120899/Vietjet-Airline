<?php
namespace Src\Controller;

use Src\TableGateways\DiaDiemGateway;

class DiaDiemController {

    private $db;
    private $requestMethod;
    private $OptionId;    // 1 là nơi đi, 2 là nơi đến

    private $DiaDiemGateway;

    public function __construct($db, $requestMethod, $OptionId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->OptionId   = $OptionId;

        $this->DiaDiemGateway = new DiaDiemGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                $response = $this->getDiaDiem($this->OptionId);
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

    private function getDiaDiem($id)
    {
        $result = $this->DiaDiemGateway->find($id);
        if(!$result){
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
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