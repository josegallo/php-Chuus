<?php 

    require_once '../php-includes/connect.inc.php';
    
    $id = $_POST['pair_id'];
    
    $stmt = $db->prepare("SELECT * FROM pairs_of_questions WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->bind_result($id, $question1, $votes_left, $question2, $votes_right);
    $stmt->execute();
    
    while ($stmt->fetch()) {
        $question1 = htmlentities($question1, ENT_QUOTES, "UTF-8");
        $question2 = htmlentities($question2, ENT_QUOTES, "UTF-8");
        $votes1=$votes_left;
        $votes2=$votes_right;
        $result = $question1;
        $result .= "_$question2";
    }

    $sql = "SELECT * FROM users 
                WHERE id IN 
                    (SELECT user_id FROM `user_questions` 
                        WHERE  `user_questions`.`pair_of_questions_id` = ?)";
    
    $stmt = $db->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->bind_result($id, $name, $email, $password, $admin, $hash, $active);
    $stmt->execute();

    while ($stmt->fetch()) {
        $name = htmlentities($name, ENT_QUOTES, "UTF-8");
        $email = htmlentities($email, ENT_QUOTES, "UTF-8");

        $result .= "_$name";
    } //end of while

    $result .= "_$votes1";
    $result .= "_$votes2";

    $percent1 = round(100*$votes1/($votes1 + $votes2));
    $percent2 = round(100*$votes2/($votes1 + $votes2));

    $result .= "_$percent1";
    $result .= "_$percent2";

    $stmt->close();
    //result will have question1_question2_author_votes1_votes2_%1_%2
    echo $result;

?>