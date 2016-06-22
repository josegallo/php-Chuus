<?php
$action = "";
$msg2 = "";
//divs and form
echo "<div id = 'user-dashboard'>";
echo "<div id = 'recover-pass'>";
$msg = 'Por favor introduce tu correo electronico para enviarte las instrucciones:';
echo "<h2 class = 'Recover-pass-tittle'>$msg</h2>";
$form = "<form id = 'recover-pass' action='$action' method='post'>\n";
$form .= "\t<table id = 'table-recover-pass'>\n";
$form .= "\t\t<tr>\n";
$form .= "\t\t\t<td style='width: 200px;'>Correo Electronico:</td>\n";
$form .= "\t\t\t<td style='width: 200px;'><input type='text' name = 'email-recover' id='email-recover' placeholder = 'email' ></td>\n";
$form .= "\t\t\t<td><button type='submit' id='email-recover-btn'>Enviar</button>\n";
$form .= "\t\t</tr>\n";
$form .= "\t</table>\n";
$form .= "</form>\n";
echo $form;

if (isset($_POST['email-recover'])){ //if email-recover is set
	$emailRecover = $_POST['email-recover'];
	$emailRecover = trim($emailRecover); //eliminate spaces at beginning and the end
	$emailRecover = filter_var($emailRecover, FILTER_SANITIZE_EMAIL); // Sanitizing email(Remove unexpected symbol like <,>,?,#,!, etc.)  
	require_once 'connect2.inc.php';
	$emailRecover = mysqli_real_escape_string($connection, $emailRecover); // Turn our post into a local variable

	if ($emailRecover == "") {
		$msg2 = "Por favor introduce un email";
	} //end of if ($emailRecover == ""
	else { 
	//check if the email is on the bbdd not deppending of Uper/Lower cases
		$result= mysqli_query($connection,"SELECT * FROM users WHERE email='$emailRecover'");
		$rowcount=mysqli_num_rows($result);		
		// $msg2 = "Tu email es $emailRecover";
		if ($rowcount <1) { //the email is not on the bbdd
			$msg2 = "Tu email no figura en nuestra base de datos";
		} //end of $rowcount <1)
		if ($rowcount >=1) { //the email is on the bbdd
			$obj=mysqli_fetch_object($result);
			$active = $obj->active;
			$id	= $obj->id;
			$name	= $obj->Name;
			$hash	= $obj->hash;
			$emailSend	= $obj->email;
			// echo $emailSend;

			if ($active == 0) { //account not activated
				$msg2 = "Todavia tienes que activar tu cuenta, por favor, busca nuestro email de activacion en tu correo electronico.";
			} //end of if ($active == 0) 
			if ($active == 1) { //account activated, ergo we send the email
				$msg2 = "Te hemos enviado un email para que crees tu nueva contraseña.";
				//send the email
				require "php-includes/sendgrid/sendgrid-php/sendgrid-php.php";
			    $id = password_hash($id, PASSWORD_DEFAULT); //encripty id, safer method of encryptation
			    $body = "<h3>Hola $name</h3>";
			    $body .= "<p>Por favor haz click en este link para cambiar tu contraseña:</p>";
			    // $body .= "<a href = 'http://josegallo.byethost3.com/queprefieres/recover.pass2.php?idcr=$id&hash=$hash'>cambia tu contraseña</a>";
			    $body .= "<a href = 'http://localhost/queprefieres/recover.pass2.php?idcr=$id&hash=$hash'>cambia tu contraseña</a>";
			    $sendgrid = new SendGrid('Your API SendGrid key');
			    $email = new SendGrid\Email();
			    $email
			    	->addTo($emailSend)
			        ->setFrom('no-reply@josegallo.com')
			        ->setSubject('Que prefieres, cambio contraseña')
			        ->setText('Cambio de contraseña')
			        // if we want add file:
			        // ->setAttachment("../images/or-button.png")
			        ->setHtml($body)
			    ;
				$sendgrid->send($email);
			} //end of if ($active == 1) 				
		} //end of $rowcount >=1)
	} //end of else of ($emailRecover == "")
} //end of isset($_POST['email-recover'])
echo "<div id = 'error-cpasword-message'>$msg2</div>";
echo "</div>";
echo "</div>";
?>