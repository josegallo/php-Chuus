<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {
    
    require_once '../php-includes/connect.inc.php';
    
    $minimumIdTable = $_POST['minimumIdTable'];

    // if there were many pendent questions we could add this code to reduce the effort of the server:
    // from here: 
    $maxIdQsql = "SELECT MAX(id) AS max_proposed_id FROM proposed_questions";
    $maxIdResult = $db->query($maxIdQsql);

    while ($row = $maxIdResult->fetch_object()) {
        $maxId = $row->max_proposed_id;
    }
    
    $maxIdq = $maxId;

    $sql = "SELECT * FROM `proposed_questions` WHERE id between $minimumIdTable AND $maxIdq ORDER BY `id` ASC";
    // with this sql query all the proposed questions are parsed from the begining
    // $sql = "SELECT * FROM `proposed_questions` WHERE `status`=? ORDER BY `id` ASC";
    $stmt = $db->prepare($sql);
    $stmt->bind_result($id, $question_p_1, $question_p_2, $status, $user_id);
    $stmt->execute();
    //flag to start with the 1st question
    $n = 0;
    while ($stmt->fetch()) {       
            $idQ = $id;
            $question_p_1 = htmlentities($question_p_1, ENT_QUOTES, "UTF-8");
            $question_p_2 = htmlentities($question_p_2, ENT_QUOTES, "UTF-8");
        //if the number of 1d is bigger than minimum and the next 9 elements
        if (($idQ <= $maxIdq) && ($n<=9)) {
            //&& ($idQ <$maxIdq)
?>
                <tr id = "<?php echo 'pair_of_questions_proposed_'.$idQ ?>" class = 'row-pendent'> 
                    <td><?php echo $idQ ?></td>
                    <td><?php echo $question_p_1 ?></td>
                    <td><?php echo $question_p_2 ?></td>
                    <td><div class ='question-acept'></div></td>
                    <td><div class ='question-delete'></div></td>
                </tr>
<?php 
            $n += 1;
            } //end of if  (($idQ > $minIdQ) && ($idQ<$maxId)) 
        } //end of while
        $stmt->close();
        
} //end of if https requested
?>