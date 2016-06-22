<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {
    
    require_once '../php-includes/connect.inc.php';
    
    $idUser = $_POST['idUser'];
    $newpassword = $_POST['password'];
    
    $stmt = $db->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->bind_param('i', $idUser);
    $stmt->bind_result($id, $name, $email, $password, $admin, $hash, $active);
    $stmt->execute();

    while ($stmt->fetch()) {
        $oldpassword = htmlentities($password, ENT_QUOTES, "UTF-8");
    }

    if ($oldpassword == $newpassword) {
        $output = 1;
    } 
    else {
        $sql = "UPDATE users SET password = ? WHERE id = ?";

        $stmt = $db->prepare($sql);
        $stmt->bind_param('si', $newpassword, $idUser);
        $stmt->execute();
        $output = 2;
    }

    $stmt->close();
    echo $output;
    
} //end of if https requested

?>