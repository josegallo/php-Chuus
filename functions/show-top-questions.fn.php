<?php

function showTopQuestions () {
			    global $db, $pairOfQuestions;
			    
			    require_once 'connect.inc.php';

			    $sql ="SELECT id, question_1, question_2, votes_1 + votes_2 FROM pairs_of_questions ORDER BY `votes_1 + votes_2` DESC LIMIT 3";
				$stmt = $db->prepare($sql);
			    // $stmt->bind_param('i', $random);
			    $stmt->bind_result($id, $question1, $question2, $totalvotes);
			    $stmt->execute();

	            $Table ="\n";

			    while ($stmt->fetch()) {

			        $question1 = htmlentities($question1, ENT_QUOTES, "UTF-8");
			        $question2 = htmlentities($question2, ENT_QUOTES, "UTF-8");
			        
			        $pairOfQuestions = $id;


		        $Table .= "\t\t\t<div class = 'top-ten-question' id = 'pair_id_top_ten_$pairOfQuestions' >\n";
	            $Table .= "\t\t\t\t<p> - <a href = 'index.php?pair_of_questions_get_id=$pairOfQuestions' target='_blank'> $question1 o $question2 </a> con $totalvotes votos </p>\n";
	            $Table .= "\t\t\t</div>\n";
	            $Table .= "\t\t\t<br>\n";

			    } //end of while
			    
			    $Table .= "\t\t\t<br>\n";
			    $Table .= "\t\t\t<br>\n";

			    $stmt->close();
			    return($Table);
			} //end of function
?>
			