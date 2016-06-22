<?php 

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {

    require_once '../php-includes/connect.inc.php';
    
    $maxIdSQL = "SELECT MAX(id) AS max_question_id FROM pairs_of_questions";
    $maxIdResult = $db->query($maxIdSQL);
    $maxIdNumrows = $maxIdResult->num_rows;
    
    while ($row = $maxIdResult->fetch_object()) {
        $maxId = $row->max_question_id;
        $result = $maxId;
    }

    echo $result;
} //end of if https requested
?>