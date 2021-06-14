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
            order by GioBay, GiaVe
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

    
}