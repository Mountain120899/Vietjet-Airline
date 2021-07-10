<?php
namespace Src\TableGateways;

class BaoHiemGateway {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll()
    {
        $statement = "
            SELECT 
                *
            FROM
                ThongTinMuaBaoHiem;
        ";

        try {
            $statement = $this->db->query($statement);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function findOne($id)
    {
        $statement = "SELECT
                        *
                    FROM
                        ThongTinMuaBaoHiem
                    WHERE 
                        MaDatCho = ?
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

    public function insert(Array $input)
    {
        $statement = "
        INSERT INTO ThongTinMuaBaoHiem 
        (MaDatCho, TenHanhKhach, GiaBaoHiem)
        VALUES
        (:MaDatCho, :TenHanhKhach, :GiaBaoHiem);
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'MaDatCho'  => $input['MaDatCho'],
                'TenHanhKhach' => $input['TenHanhKhach'] ,
                'GiaBaoHiem' => $input['GiaBaoHiem'] ,
            ));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }
}