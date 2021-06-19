<?php
    class DatChoController{
        private $db;
        private $requestMethod;
        private $id;

        private $DatChoGateway;

        public function __construct($db, $requestMethod, $DatChoId){
            $this->db = $db;
            $this->requestMethod = $requestMethod;
            $this->id = $DatChoId;

            $this->DatChoGateway = new DatChoGateway($db);
        }

        public function processRequest(){
            switch($this->requestMethod){
                case 'GET':
                    if($this->id){
                        $response = $this->getDatCho($this->id);
                    } else{
                        $response = $this->getAllDatCho();
                    };
                    break;
                case 'POST':
                    $response = $this->createDatChoFromRequest();
                    break;
                case 'PUT':
                    $response = $this->updateDatChoFromRequest($this->id);
                    break;
                case 'DELETE':
                    $response = $this->deleteDatCho($this->id);
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

        private function getAllDatCho(){
            $result = $this->DatChoGateway->findAll();
            $response['status_code_header'] = "HTTP/1.1 200 ok";
            //$response['body'] = json_encode($result);
            $response['body'] = json_encode(iterator_to_array($result));
            return $response;
        }

        private function getDatCho($id){
            $result = $this->DatChoGateway->find($id);
            if (! $result) {
                return $this->notFoundResponse();
            }
            $response['status_code_header'] = 'HTTP/1.1 200 OK';
            //$response['body'] = json_encode($result);
            $response['body'] = json_encode(iterator_to_array($result));
            return $response;
        }

        private function createDatChoFromRequest(){
            
            $input = (array) json_decode(file_get_contents('php://input'), TRUE);
            print_r($input);
            if (!$this->validateDatCho($input)){
                return $this->unprocessableEntityResponse();
            }
            $this->DatChoGateway->insert($input);
            $response['status_code_header'] = "HTTP/1.1 201 created";
            $response['body'] = null;
            return $response;
        }

        private function updateDatChoFromRequest($id){
            $result = $this->DatChoGateway->find($id);
            if(!$result){
                return $this->notFoundResponse();
            }

            $input = (array) json_decode(file_get_contents('php://input'), TRUE);
            if (!$this->validateDatCho($input)){
                return $this->unprocessableEntityResponse();
            }
            $this->DatChoGateway->update($id, $input);
            $response['status_code_header'] = "HTTP/1.1 200 ok";
            $response['body'] = null;
            return $response;
        }

        private function deleteDatCho($id){
            $result = $this->DatChoGateway->find($id);
            if (!$result){
                return $this->notFoundResponse();
            }

            $this->DatChoGateway->delete($id);
            $response['status_code_header'] = "HTTP/1.1 200 ok";
            $response['body'] = json_encode('1');
            return $response;
        }

        private function validateDatCho(){
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