<?php 
function TestGetPairOfQuestionsId() {
    global $db, $pair_of_questions_get_id;
    
    $sql = "SELECT * FROM `pairs_of_questions`";
    $result = $db->query($sql);
    $num_rows = $result->num_rows;

    if ($num_rows < 1) {
        // echo "no_data";
        return ("no_data");
    }
    
    if (!isset($pair_of_questions_get_id)) {
        // echo "no_id";
        return("no_id");
    }
    
    if ($pair_of_questions_get_id == "") {
        // echo "no establecido";
        return("no_id");
    }

    if (!is_numeric($pair_of_questions_get_id)) {
        // echo "letritas";
        return("invalid_id");
    }
    
    $stmt = $db->prepare("SELECT * FROM pairs_of_questions WHERE id = ?");
    $stmt->bind_param('i', $pair_of_questions_get_id);
    $stmt->execute();
    $stmt->store_result();
    $numrows = $stmt->num_rows;
    $stmt->close();
    
    if ($numrows<1) {
        return("invalid_id");
    } else {
        // echo "numerito";
        return("id_set");
    }
} //end of function TestGetPairOfQuestionsId
?>