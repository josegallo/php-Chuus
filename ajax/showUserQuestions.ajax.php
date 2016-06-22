<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {
    
    require_once '../php-includes/connect.inc.php';
    
    $email = $_POST['email'];
    $idUser = $_POST['idUser'];

    //select all the pair of questions by user with email = $email
    $sql = "SELECT * FROM pairs_of_questions WHERE id IN 
            ( SELECT pair_of_questions_id FROM user_questions WHERE user_id IN 
                (SELECT id FROM users WHERE email = ?))";

    $stmt = $db->prepare($sql);
    $stmt->bind_param('s',$email);
    $stmt->bind_result($id, $question1, $votes_left, $question2, $votes_right);
    $stmt->execute();

    while ($stmt->fetch()) {
        $question1 = htmlentities($question1, ENT_QUOTES, "UTF-8");
        $question2 = htmlentities($question2, ENT_QUOTES, "UTF-8");

?>
    <tr> 
        <td><?php echo $question1 ?></td>
        <td><?php echo $question2 ?></td>
        <td></td>
    </tr>

<?php 
    } //end of while

    //select all the pair of questions pendent asociated to the user
    $sql = "SELECT * FROM proposed_questions WHERE user_id = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param('i',$idUser);
    $stmt->bind_result($id, $question_p_1, $question_p_2, $status, $user_id);
    $stmt->execute();

    while ($stmt->fetch()) {
        $user = $user_id;
        $question_p_1 = htmlentities($question_p_1, ENT_QUOTES, "UTF-8");
        $question_p_2 = htmlentities($question_p_2, ENT_QUOTES, "UTF-8");

    if ($user != "") {
?>
    <tr> 
        <td class = 'pendent-questions'><?php echo $question_p_1 ?></td>
        <td class = 'pendent-questions'><?php echo $question_p_2 ?></td>
        <td class = 'pendent-questions'> pendiente de aprobacion</td>
    </tr>
<?php 
    }//end of if
    } //end of while

    $stmt->close();

} //end of if https requested

?>