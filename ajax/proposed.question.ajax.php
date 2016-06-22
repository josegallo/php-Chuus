<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {
    
    require_once '../php-includes/connect.inc.php';
    
    //add the proposed questions to the table in bbdd
    $question1Input = $_POST['question1Input'];
    $question2Input = $_POST['question2Input'];
    $status = "Pendent";
    $idUser = $_POST['idUser'];
    
    $sql = "INSERT INTO proposed_questions (`question_p_1`, `question_p_2`, `status`, `user_id` ) 
                VALUES ( ?, ?, ?, ?)";
    $stmt = $db->prepare($sql);
    $stmt->bind_param('sssi', $question1Input, $question2Input, $status, $idUser);
    $stmt->execute();

    $stmt->close();
    echo "ok";
    
} //end of if https requested

?>