<?php
namespace Src\TableGateways;

class ChuyenBayGateway {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function find(Array $input)
    {
        $statement = "
            select	*
            from	ChuyenBay
            where	SanBayDi	    = :SanBayDi
            and		SanBayDen	    = :SanBayDen
            and		Date(GioBay)	= :GioBay
            order by GiaVe, GioBay
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'SanBayDi' => $input['SanBayDi'],
                'SanBayDen'  => $input['SanBayDen'],
                'GioBay' => $input['GioBay']
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
                        ChuyenBay
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

    public function update($id, Array $input)
    {
        $statement = "
            UPDATE ChuyenBay
            SET 
                SoGheConLai = :SoGheConLai
            WHERE id = :id;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'id' => (int) $id,
                'SoGheConLai' => $input['SoGheConLai']
            ));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }
}