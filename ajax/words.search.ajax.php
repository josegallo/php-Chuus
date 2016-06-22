<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {
    
    require_once '../php-includes/connect.inc.php';
    
    $wordsSearch = $_POST['wordsSearch'];
    $arrlength = count($wordsSearch);
    // echo $arrlength;

    $output = "";
    for ($i=0; $i < $arrlength; $i++) { 
        $splitword = $wordsSearch[$i];

        if ($splitword != "" && strlen($splitword)>3) {
            $splitword = "%$splitword%";
            // echo $splitword;
            $sql = "SELECT * FROM `pairs_of_questions`
                    WHERE question_1 LIKE ? OR question_2 LIKE ?";
            $stmt = $db->prepare($sql);
            $stmt->bind_param('ss', $splitword, $splitword);
            $stmt->bind_result($id, $question_1, $votes_1, $question_2, $votes_2);
            $stmt->execute();
 
            while ($stmt->fetch()) {
                $question_1 = htmlentities($question_1, ENT_QUOTES, "UTF-8");
                $question_2 = htmlentities($question_2, ENT_QUOTES, "UTF-8");

                $output .= "<a href = 'index.php?pair_of_questions_get_id=$id' target='_blank'> - $question_1 ó $question_2</a><br><br>\n";
            } //end of while
        } //end of if $splitword != ""

    } //end of for

    if ($output!="") {
        $stmt->close();
    } else {
        $output .= "Que pena! no hay respuesta para tu busqueda, animate y añade alguna.";
    }

    echo $output;
} //end of if https requested

?>