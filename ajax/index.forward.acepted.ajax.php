<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {
    
    require_once '../php-includes/connect.inc.php';
    
    $lastId = $_POST['lastId'];
    // $status = "Pendent";

    // if there were many pendent questions we could add this code to reduce the effort of the server:
    // from here: 
    $maxIdQsql = "SELECT MAX(id) AS max_proposed_id FROM pairs_of_questions";
    $maxIdResult = $db->query($maxIdQsql);

    while ($row = $maxIdResult->fetch_object()) {
        $maxId = $row->max_proposed_id;
    }
    $maxIdq = $maxId;
    
        $sql = "SELECT * FROM `pairs_of_questions` WHERE id between $lastId AND $maxIdq ORDER BY `id` ASC";
        // with this sql query all the proposed questions are parsed from the begining
        // $sql = "SELECT * FROM `proposed_questions` WHERE `status`=? ORDER BY `id` ASC";
        $stmt = $db->prepare($sql);
        // $stmt->bind_param('s', $status);
        $stmt->bind_result($id, $question_1, $votes_1, $question_2, $votes_2);
        $stmt->execute();
        //flag to start with the 1st question
        $n = 0;
        while ($stmt->fetch()) {       
                $idQ = $id;
                $question_1 = htmlentities($question_1, ENT_QUOTES, "UTF-8");
                $question_2 = htmlentities($question_2, ENT_QUOTES, "UTF-8");
            //if the number of 1d is bigger than minimum and the next 9 elements
            if (($idQ > $lastId) && ($n<=9)) {
                //&& ($idQ <$maxIdq)
?>
                <tr id = "<?php echo 'pair_of_questions_proposed_'.$idQ ?>" class = 'row-acepted'> 
                    <td><?php echo $idQ ?></td>
                    <td><?php echo $question_1 ?></td>
                    <td><?php echo $question_2 ?></td>
                </tr>
<?php 
            $n += 1;
            } //end of if  (($idQ > $minIdQ) && ($idQ<$maxId)) 
        } //end of while
} //end of if https requested
?>