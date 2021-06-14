<?php
   require "../src/System/DataConnector.php";
   require 'vendor/autoload.php';

   $dbConnection = (new DatabaseConnector())->getConnection();
?>