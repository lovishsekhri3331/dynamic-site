<?php

// GET LIST OF PRODUCTS BY CATEGORY

$json = $_POST["json"];
//$cart = addslashes($cart);

require_once("easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->getProductsByCart($json);

header("Content-Type: application/json");

echo $data;

?>
