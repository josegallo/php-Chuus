<?php

function showQuestions ($input) {
    global $db, $pairOfQuestions, $pair_of_questions_get_id;
    
    require_once 'connect.inc.php';

    //depending of the pair of questions test output

    if ($input == "no_data") {
        $output = "<div class ='error-get-id'>Oye chico!, dile al administrador que carge preguntas que no hay ni una</div>";
        return($output);
    }

    if ($input == "invalid_id") {
        $output = "<div class ='error-get-id'>Aiiss, me parece que esa pregunta no existe<p></p></div>";
        return($output);
    }

    if ($input == "id_set") {
        $stmt = $db->prepare("SELECT * FROM pairs_of_questions WHERE id = ?");
        $stmt->bind_param('i', $pair_of_questions_get_id);
        $stmt->bind_result($id, $question1, $votes_1, $question2, $votes_2);
        $stmt->execute();

        while ($stmt->fetch()) {
            $question1 = htmlentities($question1, ENT_QUOTES, "UTF-8");
            $question2 = htmlentities($question2, ENT_QUOTES, "UTF-8");
            
            $votes_left = $votes_1;
            $votes_right = $votes_2;

            $percent_votes_left = round(100*$votes_left/($votes_right + $votes_left));
            $percent_votes_right = round(100*$votes_right/($votes_right + $votes_left));

            $pairOfQuestions = $id;

            $output = "\t<div class = 'questions left-arrow'></div>\n";
            $output .= "\t<div id = pair-of-question_$pairOfQuestions class = 'questions left-square'>\n";
            $output .= "\t\t<div class = 'check-left hidden'></div>\n";
            $output .= "\t\t<section class = 'percent_votes_left hide'> $percent_votes_left %</section>\n";
            $output .= "\t\t<section class = 'votes_left hide'>$votes_left votos</section >\n";
            $output .= "\t\t<h2 class = 'text-square'>$question1</h2>\n";
            $output .= "\t\t</div>\n";
            $output .= "\t\t<div class = 'questions or-signal'></div>\n";
            $output .= "\t\t<div class = 'questions right-square'>\n";
            $output .= "\t\t<div class = 'check-right hidden'></div>\n";
            $output .= "\t\t<section class = 'percent_votes_right hide'> $percent_votes_right %</section>\n";
            $output .= "\t\t<section  class = 'votes_right hide'>$votes_right votos</section>\n";
            $output .= "\t\t<h2 class = 'text-square'>$question2</h2>\n";
            $output .= "\t\t</div>\n";
            $output .= "\t<div class = 'questions right-arrow'></div>\n";
        }
        $stmt->close();
        return($output);
    }

    if ($input == "no_id") {
        $sql = "SELECT * FROM `pairs_of_questions`";
        $result = $db->query($sql);

        $num_rows = $result->num_rows;
        $random = rand(1, $num_rows);

        $stmt = $db->prepare("SELECT * FROM pairs_of_questions WHERE id = ?");
        $stmt->bind_param('i', $random);
        $stmt->bind_result($id, $question1, $votes_1, $question2, $votes_2);
        $stmt->execute();

        while ($stmt->fetch()) {
            $question1 = htmlentities($question1, ENT_QUOTES, "UTF-8");
            $question2 = htmlentities($question2, ENT_QUOTES, "UTF-8");
            
            $votes_left = $votes_1;
            $votes_right = $votes_2;

            $percent_votes_left = round(100*$votes_left/($votes_right + $votes_left));
            $percent_votes_right = round(100*$votes_right/($votes_right + $votes_left));

            $pairOfQuestions = $id;

            $output = "\t<div class = 'questions left-arrow'></div>\n";
            $output .= "\t<div id = pair-of-question_$pairOfQuestions class = 'questions left-square'>\n";
            $output .= "\t\t<div class = 'check-left hidden'></div>\n";
            $output .= "\t\t<section class = 'percent_votes_left hide'> $percent_votes_left %</section>\n";
            $output .= "\t\t<section class = 'votes_left hide'>$votes_left votos</section >\n";
            $output .= "\t\t<h2 class = 'text-square'>$question1</h2>\n";
            $output .= "\t\t</div>\n";
            $output .= "\t\t<div class = 'questions or-signal'></div>\n";
            $output .= "\t\t<div class = 'questions right-square'>\n";
            $output .= "\t\t<div class = 'check-right hidden'></div>\n";
            $output .= "\t\t<section class = 'percent_votes_right hide'> $percent_votes_right %</section>\n";
            $output .= "\t\t<section  class = 'votes_right hide'>$votes_right votos</section>\n";
            $output .= "\t\t<h2 class = 'text-square'>$question2</h2>\n";
            $output .= "\t\t</div>\n";
            $output .= "\t<div class = 'questions right-arrow'></div>\n";
        }
        $stmt->close();
        return($output);
    } //end of if $input == "no_id"

} // end of function showQuestions
?>