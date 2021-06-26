<?php
namespace Src\TableGateways;

class DatXeGateway {

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
            ThongTinDatXe;
        ";

        try {
            $statement = $this->db->query($statement);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function insert(Array $input)
    {
        $statement = "
        INSERT INTO ThongTinDatXe 
        (id, TenHanhKhach, MaDatXe, SoDienThoai, SoLuong, Gia)
        VALUES
        (:id, :TenHanhKhach, :MaDatXe, :SoDienThoai, :SoLuong, :Gia);
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'id' => $input['id'],
                'TenHanhKhach'  => $input['TenHanhKhach'],
                'MaDatXe' => $input['MaDatXe'] ,
                'SoDienThoai' => $input['SoDienThoai'] ,
                'SoLuong' => $input['SoLuong'] ,
                'Gia' => $input['Gia'] ,
            ));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }
}