<?php
//get pair of questions
if (isset($_GET['pair_of_questions_get_id'])) {
    $pair_of_questions_get_id = $_GET['pair_of_questions_get_id'];
}
//get hash of id and hash of sign-up to confirm account

if (isset($_GET['idcr'])) {
	$idcr =  $_GET['idcr'];
}

if (isset($_GET['hash'])){ 
	$hashConfirm =  $_GET['hash'];
}
?>