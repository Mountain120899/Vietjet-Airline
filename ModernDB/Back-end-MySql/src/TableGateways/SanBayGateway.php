<?php
namespace Src\TableGateways;

class SanBayGateway {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function find($id)
    {
        if ($id == 1) {
            $statement = "
                SELECT	distinct SanBayDi
                from	ChuyenBay
            ";
        }
        else {
            $statement = "
            select	distinct SanBayDen
            from	ChuyenBay
            ";
        }
        try {
            $statement = $this->db->query($statement);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

    
}