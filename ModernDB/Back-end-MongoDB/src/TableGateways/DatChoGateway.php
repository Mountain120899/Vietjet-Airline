<?php
    class DatChoGateway {
        private $db = null;
        private $dbname = 'vietjetair';
        private $collection = 'DatCho';

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

        public function find($MaDatCho){
            try{
                $filter = ['MaDatCho' => $MaDatCho];
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

        public function update($MaDatCho, Array $input)
        {
            try {
                $update = new MongoDB\Driver\BulkWrite();
                $update->update(
                    ['MaDatCho' => $id], ['$set' => $input], ['multi' => false, 'upsert' => false]
                );
                $result = $this->db->executeBulkWrite("$this->dbname.$this->collection", $update);

                return $result->getModifiedCount();
            } catch (\PDOException $e) {
                exit($e->getMessage());
            }    
        }

        public function delete($MaDatCho)
        {
            try {
                $delete = new MongoDB\Driver\BulkWrite();
                $delete->delete(
                    ['MaDatCho' => $MaDatCho],
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