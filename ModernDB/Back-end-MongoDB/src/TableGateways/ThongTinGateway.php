<?php
     class ThongTinGateway {
        private $db = null;
        private $dbname = 'vietjetair';
        private $collection = 'ThongTin';

        public function __construct( $db) {
            $this->db = $db;
        }
        public function findAll(){
            try{
                $filter = [];
                $option = [];
                $read = new MongoDB\Driver\Query($filter, $option);
                $result = $this->db->executeQuery("$this->dbname.$this->collection", $read);
                return $result;
            }catch(\PDOException $e){
                exit($e->getMessage());
            }
        }

        public function find($ChuDe){
            try{
                $filter = ['ChuDe' => $ChuDe];
                $option = [];
                $read = new MongoDB\Driver\Query($filter, $option);
                $result = $this->db->executeQuery("$this->dbname.$this->collection", $read);
                return $result;
            }catch(\PDOException $e){
                exit($e->getMessage());
            }
        }

        public function insert(Array $input)
        {
            try {
                $insert = new MongoDB\Driver\BulkWrite();
                $insert->insert($input);
                $result = $this->db->executeBulkWrite("$this->dbname.$this->collection", $insert);
                return $result->getInsertedCount();
            } catch (\PDOException $e) {
                exit($e->getMessage());
            }    
        }

        public function update($id, Array $input)
        {
            try {
                $update = new MongoDB\Driver\BulkWrite();
                $update->update(
                    ['id' => $id], ['$set' => $input], ['multi' => false, 'upsert' => false]
                );
                $result = $this->db->executeBulkWrite("$this->dbname.$this->collection", $update);

                return $result->getModifiedCount();
            } catch (\PDOException $e) {
                exit($e->getMessage());
            }    
        }

        public function delete($id)
        {
            try {
                $delete = new MongoDB\Driver\BulkWrite();
                $delete->delete(
                    ['id' => $id],
                    ['limit' => 0]
                );
                $result = $this->db->executeBulkWrite("$this->dbname.$this->collection", $delete);
                return $result->getDeletedCount();
            } catch (\PDOException $e) {
                exit($e->getMessage());
            }    
        }
    }
?>