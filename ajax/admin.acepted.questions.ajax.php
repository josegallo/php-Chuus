<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {
    
    require_once '../php-includes/connect.inc.php';
    
    $minIdQsql = "SELECT MIN(id) AS min_proposed_id FROM pairs_of_questions";
    $minIdResult = $db->query($minIdQsql);

    while ($row = $minIdResult->fetch_object()) {
        $minId = $row->min_proposed_id;
    }
    $minIdQ = $minId;

    $sql = "SELECT * FROM `pairs_of_questions` ORDER BY `pairs_of_questions`.`id` ASC";
    $stmt = $db->prepare($sql);

    $stmt->bind_result($id, $question1, $votes1, $question2, $votes2);
    $stmt->execute();

    $n = 0;
    while ($stmt->fetch()) {
        $idQ = $id;
        $question1 = htmlentities($question1, ENT_QUOTES, "UTF-8");
        $question2 = htmlentities($question2, ENT_QUOTES, "UTF-8");
        if (($idQ >= $minIdQ) && ($n<=9)) {
?>
        <tr class = 'row-acepted'> 
            <td><?php echo $idQ ?></td>
            <td><?php echo $question1 ?></td>
            <td><?php echo $question2 ?></td>
        </tr>
<?php 
        $n += 1;
        } //end of if  (($idQ > $minIdQ) && ($idQ<$maxId)) 
    } //end of while
    //select all the acepted questions
    $stmt->close(); 
} //end of if https requested
?>