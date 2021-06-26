<?php
namespace Src\TableGateways;

class DiaDiemGateway {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function find($id)
    {
        if ($id == 1) {
            $statement = "
                SELECT	distinct NoiDi
                from	DatXe
            ";
        }
        else {
            $statement = "
            select	distinct NoiDen
            from	DatXe
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