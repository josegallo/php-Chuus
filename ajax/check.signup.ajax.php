<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {
    
    require_once '../php-includes/connect2.inc.php';  

    if(isset($_POST['name']) && !empty($_POST['name']) AND isset($_POST['email']) && !empty($_POST['email'])){ //if email and email are set and not empty
        $email = $_POST['email'];
        $email = trim($email); //eliminate spaces at beginning and the end
        $email = filter_var($email, FILTER_SANITIZE_EMAIL); // Sanitizing email(Remove unexpected symbol like <,>,?,#,!, etc.)  
        //check this
        $email = mysqli_real_escape_string($connection, $email); // Turn our post into a local variable
        $name = mysqli_real_escape_string($connection, $_POST['name']); // Turn our post into a local variable
    }
    
    $password = $_POST['passwordsu'];
    $cpassword = $_POST['cpasswordsu'];
    $admin = 'False';
    $id = NULL;
    // $hash = md5(rand(0,1000)); // Generate random 32 character hash and assign it to a local variable.
    // Example output: f4552671f8909587cf485ea990207f3b. //not very safe method
    $hash = password_hash(rand(0,1000), PASSWORD_DEFAULT); //generate random hash, safer method
    $active = 0;
    $emailSend = $email;

    //function to validate emails (sintax, existency and active-status)
    function checkEmail($email) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {// checks proper syntax
            list($username,$domain)= explode('@',$email); // gets domain, split is deprecated name explode(" ", $pizza);
            if( !checkdnsrr($domain, 'MX') AND !getmxrr ($domain,$mxhosts)){ // checks for if MX records in the DNS
                return false;}
                // attempts a socket connection to mail server, this way we know if the email is active
            if(!fsockopen($domain,80,$errno,$errstr,10)) {
                return false;}
            return true;}
        return false;
    } //end of checkEmail($email)

    function SendEmail() {
        global $name, $hash, $email, $last_id, $emailSend;
        require "../php-includes/sendgrid/sendgrid-php/sendgrid-php.php";
        // $idcr = md5($last_id); //"not safe method of encriptation"
        $idcr = password_hash($last_id, PASSWORD_DEFAULT); //encripty id, safer method of encryptation
        $body = "<h3>Hola $name</h3>";
        $body .= "<p>Bienvenido a Chuus!</p>";
        $body .= "<p>Tu cuenta ha sido creada.</p> ";
        $body .= "<p>Por favor haz click en este link para activarla:</p>";
        $body .= "<a href = 'http://josegallo.net/chuus/verify.php?idcr=$idcr&hash=$hash'>activa tu cuenta</a>";
        // $body .= "<a href = 'http://localhost/queprefieres/verify.php?idcr=$idcr&hash=$hash'>activa tu cuenta</a>";
        $sendgrid = new SendGrid('your SendGrid key');
        $email = new SendGrid\Email();
        $email
            ->addTo($emailSend)
            ->setFrom('no-reply@josegallo.com')
            ->setSubject('Que prefieres')
            ->setText('Gracias por registrarte')
            // if we want add file:
            // ->setAttachment("../images/or-button.png")
            ->setHtml($body)
        ;
    $sendgrid->send($email);
    } // end of function SendEmail() 

    //there is a doouble check of the email on check.signup.popup.js and here for safety reasons
    if (!checkEmail($email)) {
        $output = "El formato de email no es válido"; 
    } //end of if (!filter_var($email, FILTER_VALIDATE_EMAIL))
    else {
        $result= mysqli_query($connection,"SELECT * FROM users WHERE email='$email'");
        $rowcount=mysqli_num_rows($result);
        if(($rowcount)==0){
            // encrypt the password
            // $password = password_hash($password,PASSWORD_DEFAULT);
            mysqli_query($connection, "INSERT INTO `users` (`id`, `Name`, `email`, `password`, `admin`, `hash`, `active`) 
                values ('$id', '$name', '$email', '$password', '$admin', '$hash', '$active')");
            //get the last id
            $last_id = $connection->insert_id;
            $output = 0;
            $output .= "_$last_id";
            SendEmail();
        } else {
            $output = "El email ya existe";
        }
    }//end of else of if (!filter_var($email, FILTER_VALIDATE_EMAIL))

    mysqli_close($connection);
    echo $output;
} //end of if https requested

?>