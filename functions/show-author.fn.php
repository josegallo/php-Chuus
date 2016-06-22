<?php 
function showAuthor() {
    global $db, $pairOfQuestions;
    
    require_once 'connect.inc.php';

    $sql = "SELECT * FROM users 
    			WHERE id IN 
    				(SELECT user_id FROM `user_questions` 
    					WHERE  `user_questions`.`pair_of_questions_id` = ?)";
	
	$stmt = $db->prepare($sql);
	$stmt->bind_param('i', $pairOfQuestions);
	$stmt->bind_result($id, $name, $email,$password, $admin, $hash, $active);
    $stmt->execute();

    while ($stmt->fetch()) {
        $name = htmlentities($name, ENT_QUOTES, "UTF-8");
        $email = htmlentities($email, ENT_QUOTES, "UTF-8");
    } //end of while


    if ($name  != "") {
        $output = "<p class = 'author' >Añadido por $name</p>";
    }
    else {
        $output = "<p class = 'author' >Autor desconocido</p>";
    }
    $stmt->close();;
    return($output);

} //end of function
?>