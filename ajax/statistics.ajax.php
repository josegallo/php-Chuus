<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {
    
    require_once '../php-includes/connect.inc.php';
    
    //1st we retrieve the number of votes plus + 1
    
    $id = $_POST['pair_id'];
    $side = $_POST['side'];

    $sql= "SELECT * FROM `pairs_of_questions` WHERE id = ?"; 
    $stmt = $db->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->bind_result($id, $question1, $votes_1, $question2, $votes_2);
    $stmt->execute();

    while ($stmt->fetch()) {
        $votes1 = $votes_1;
        $votes2 = $votes_2;
    }

    //the result will be votes1-%1-votes2-%2
    if ($side =='right') {
         $votes2 +=1; 
         $percent1 = round(100*$votes1/($votes1 + $votes2));
         $percent2 = round(100*$votes2/($votes1 + $votes2));
         $output = $votes1."-".$percent1."-".$votes2."-".$percent2;

    }
    if ($side =='left') {
        $votes1 +=1; 
        $percent1 = round(100*$votes1/($votes1 + $votes2));
        $percent2 = round(100*$votes2/($votes1 + $votes2));
        $output = $votes1."-".$percent1."-".$votes2."-".$percent2;

    };  

    // //2nd we update the number of votes

    $sql = "UPDATE pairs_of_questions 
            SET votes_1 = ?, votes_2 = ? 
            WHERE id = ?";
    
    $stmt = $db->prepare($sql);
    $stmt->bind_param('iii', $votes1, $votes2, $id);
    $stmt->execute();

    echo $output;
    $stmt->close();

} //end of if https requested

?>