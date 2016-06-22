<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {
    
    require_once '../php-includes/connect.inc.php';
    
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $db->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
    $stmt->bind_param('ss', $email, $password);
    $stmt->bind_result($id, $name, $email, $password, $admin, $hash, $active);
    $stmt->execute();

    while ($stmt->fetch()) {
        $name = htmlentities($name, ENT_QUOTES, "UTF-8");
        $idUSER = $id;
        $adminStatus = $admin;
    }
    // $stmt->store_result();
    $numrows = $stmt->num_rows;
    // $numrows have to be printed to work and be taken by the if clause
    // $output = echo "$numrows";
    $output = "$numrows";
    // $stmt->close();
    
    if ($numrows<1) {
        $output .= "_false_";
    } else {
        $output .= "_true_";
    }
    $output .= $name;
    $output .= "_$idUSER";
    $output .= "_$adminStatus";
    $output .= "_$active";
    $stmt->close();
    //the response will be numofrows_false/true_name_id_adminstatus_active

    echo $output;

} //end of if https requested

?>