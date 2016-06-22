<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {
    
    require_once '../php-includes/connect.inc.php';
    
    $idUser = $_POST['idUser'];
    $adminpassword = $_POST['adminPassword'];
    $status = "Pendent";

    $minIdQsql = "SELECT MIN(id) AS min_proposed_id FROM proposed_questions";
    $minIdResult = $db->query($minIdQsql);

    while ($row = $minIdResult->fetch_object()) {
        $minId = $row->min_proposed_id;
    }
    $minIdQ = $minId;

    if ($adminpassword == "Your password to admin") {
        $output = "0--";
        $sql = "SELECT * FROM `proposed_questions` WHERE `status`=?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('s', $status);
        $stmt->bind_result($id, $question_p_1, $question_p_2, $status, $user_id);
        $stmt->execute();
        //flag to start with the 1st question
        $n = 0;
        while ($stmt->fetch()) {       
                $idQ = $id;
                $question_p_1 = htmlentities($question_p_1, ENT_QUOTES, "UTF-8");
                $question_p_2 = htmlentities($question_p_2, ENT_QUOTES, "UTF-8");
            //if the number of 1d is bigger than minimum and the next 9 elements
            if (($idQ >= $minIdQ) && ($n<=9)) {
            $output .= "<tr id = 'pair_of_questions_proposed_$idQ' class = 'row-pendent'>";
            $output .= "<td> $idQ </td> ";
            $output .= "<td> $question_p_1 </td>";
            $output .= "<td> $question_p_2 </td>";
            $output .= "<td><div class ='question-acept'></div></td>";
            $output .= "<td><div class = 'question-delete'></div></td>";
            $output .= "</tr>";
            $n += 1;
            } //end of if  (($idQ > $minIdQ) && ($idQ<$maxId)) 
        } //end of while
        $stmt->close(); 
    } //end of if adminpassword
    echo $output;
} //end of if https requested
?>

