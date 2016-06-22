<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {

    require_once '../php-includes/connect.inc.php';
    
    $idDelete = $_POST['idDelete'];
    
    $stmt = $db->prepare("DELETE FROM proposed_questions WHERE id = ?");
    $stmt->bind_param('i', $idDelete);
    $stmt->execute();
    $stmt->close();
}

?>