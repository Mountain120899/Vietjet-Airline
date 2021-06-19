<?php
namespace Src\Controller;

use Src\TableGateways\SanBayGateway;

class SanBayController {

    private $db;
    private $requestMethod;
    private $OptionId;    // 1 là Sân bay đi, 2 là Sân bay đến

    private $SanBayGateway;

    public function __construct($db, $requestMethod, $OptionId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->OptionId   = $OptionId;

        $this->SanBayGateway = new SanBayGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                $response = $this->getSanBay($this->OptionId);
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

    private function getSanBay($id)
    {
        $result = $this->SanBayGateway->find($id);
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