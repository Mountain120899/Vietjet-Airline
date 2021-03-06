<?php
    class ThongTinController{
        private $db;
        private $requestMethod;
        private $ChuDe;

        private $ThongTinGateway;

        public function __construct($db, $requestMethod, $ChuDe){
            $this->db = $db;
            $this->requestMethod = $requestMethod;
            $this->ChuDe = $ChuDe;

            $this->ThongTinGateway = new ThongTinGateway($db);
        }

        public function processRequest(){
            switch($this->requestMethod){
                case 'GET':
                    if($this->ChuDe){
                        $response = $this->getThongTin($this->ChuDe);
                    } else{
                        $response = $this->getAllThongTins();
                    };
                    break;
                case 'POST':
                    $response = $this->createThongTinFromRequest();
                    break;
                case 'PUT':
                    $response = $this->updateThongTinFromRequest($this->id);
                    break;
                case 'DELETE':
                    $response = $this->deleteThongTin($this->id);
                    break;
                default:
                    $response = $this->notFoundResponse();
                    break;
            }
            header($response['status_code_header']);
            if ($response['body']){
                print $response['body'];
            }
        }

        private function getAllThongTins(){
            $result = $this->ThongTinGateway->findAll();
            $response['status_code_header'] = "HTTP/1.1 200 ok";
            //$response['body'] = json_encode($result);
            $response['body'] = json_encode(iterator_to_array($result));
            return $response;
        }

        private function getThongTin($ChuDe){
            $result = $this->ThongTinGateway->find($ChuDe);
            if (! $result) {
                return $this->notFoundResponse();
            }
            $response['status_code_header'] = 'HTTP/1.1 200 OK';
            //$response['body'] = json_encode($result);
            $response['body'] = json_encode(iterator_to_array($result));
            return $response;
        }

        private function createThongTinFromRequest(){
            
            $input = (array) json_decode(file_get_contents('php://input'), TRUE);
            print_r($input);
            if (!$this->validateThongTin($input)){
                return $this->unprocessableEntityResponse();
            }
            $this->ThongTinGateway->insert($input);
            $response['status_code_header'] = "HTTP/1.1 201 created";
            $response['body'] = null;
            return $response;
        }

        private function updateThongTinFromRequest($id){
            $result = $this->ThongTinGateway->find($id);
            if(!$result){
                return $this->notFoundResponse();
            }

            $input = (array) json_decode(file_get_contents('php://input'), TRUE);
            if (!$this->validateThongTin($input)){
                return $this->unprocessableEntityResponse();
            }
            $this->ThongTinGateway->update($id, $input);
            $response['status_code_header'] = "HTTP/1.1 200 ok";
            $response['body'] = null;
            return $response;
        }

        private function deleteThongTin($id){
            $result = $this->ThongTinGateway->find($id);
            if (!$result){
                return $this->notFoundResponse();
            }

            $this->ThongTinGateway->delete($id);
            $response['status_code_header'] = "HTTP/1.1 200 ok";
            $response['body'] = json_encode('1');
            return $response;
        }

        private function validateThongTin(){
            return true;
        }

        private function unprocessableEntityResponse(){
            $response['status_code_header'] = "HTTP/1.1 422 Unprocessable Entity";
            $response['body'] = Json_encode(array(
                "error" => "Invalid input"
            ));
            return $response;
        }

        private function notFoundResponse(){
            $response['status_code_header'] = "HTTP/1.1 404 not found";
            $response['body'] = null;
            return $response;
        }

    }
?>