<?php
namespace Src\TableGateways;

class ChuyenXeGateway {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function find(Array $input)
    {
        $statement = "
            select	*
            from	DatXe
            where	NoiDi	    = :NoiDi
            and		NoiDen	    = :NoiDen
            and		Date(ThoiGian)	= :ThoiGian
            order by Gia, ThoiGian
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'NoiDi' => $input['NoiDi'],
                'NoiDen'  => $input['NoiDen'],
                'ThoiGian' => $input['ThoiGian']
            ));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

    public function findone($id)
    {
        $statement = "SELECT
                        *
                    FROM
                        DatXe
                    WHERE 
                        id = ?
                    ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array($id));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

}