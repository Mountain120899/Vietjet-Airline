<?php
class DatabaseConnector {
	//Database configuration
	private $conn	= null;
	
	public function __construct(){
        try {
			$this->conn = new MongoDB\Driver\Manager("mongodb://localhost:27017");
        }catch (MongoDBDriverExceptionException $e) {
            exit ($e->getMessage());
        }
    }

	public function getConnection() {
		return $this->conn;
	}
}

