<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {

    require_once '../php-includes/connect.inc.php';
    

    $idDelete = $_POST['idDelete'];

    //get the user of the new question

    $idUserSql = "SELECT * FROM proposed_questions WHERE id = ?";
    $stmt = $db->prepare($idUserSql);
    $stmt->bind_param('i', $idDelete);
    $stmt->bind_result($id, $question_p_1, $question_p_2, $status, $user_id);
    $stmt->execute();

    while ($stmt->fetch()) {
        $idUser = $user_id;
        } //end of while
    
    //delete from proposed questions   
    
    $stmt = $db->prepare("DELETE FROM proposed_questions WHERE id = ?");
    $stmt->bind_param('i', $idDelete);
    $stmt->execute();


    //add to pair_of_questions
    
    $id = NULL;
    $question1 =$_POST['question1'];
    $votes_1 = 1;
    $question2 =$_POST['question2'];
    $votes_2 = 1;
    
    $sql2 = "INSERT INTO pairs_of_questions (`id`, `question_1`, `votes_1`, `question_2`, `votes_2`) 
                VALUES ( ?, ?, ?, ?, ?)";
    $stmt = $db->prepare($sql2);
    $stmt->bind_param('ssisi', $id, $question1, $votes_1, $question2, $votes_2 );
    $stmt->execute();

	//add to user_questions

		//get the id of the new question

	    $maxIdQsql = "SELECT MAX(id) AS max_acepted_id FROM pairs_of_questions";
	    $maxIdResult = $db->query($maxIdQsql);

	    while ($row = $maxIdResult->fetch_object()) {
	        $maxId = $row->max_acepted_id;
	    }
	    
	    $maxIdq = $maxId;

	    //add to user_questions

		$sql = "INSERT INTO user_questions (`user_id`, `pair_of_questions_id`) 
	                VALUES ( ?, ?)";
	    $stmt = $db->prepare($sql);
	    $stmt->bind_param('ii', $idUser, $maxIdq);
	    $stmt->execute();

	$stmt->close();

} //end of http if

?>