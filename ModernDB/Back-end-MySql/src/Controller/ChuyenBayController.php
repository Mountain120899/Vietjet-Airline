<?php
namespace Src\Controller;

use Src\TableGateways\ChuyenBayGateway;

class ChuyenBayController {

    private $db;
    private $requestMethod;

    private $ChuyenBayGateway;

    public function __construct($db, $requestMethod)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;

        $this->ChuyenBayGateway = new ChuyenBayGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                $response = $this->getUser();
                break;
            case 'POST':
                $response = $this->getUser();
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

    private function getUser()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $result = $this->ChuyenBayGateway->find($input);
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