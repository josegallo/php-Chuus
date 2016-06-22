<?php
function VerifyRecoveringPass($TestResult){
	global $TestRecoverPass, $result, $idcr, $connection, $output;
	$msg3 = "";
	if ($TestResult =="no_match") {
		$output = "<h1 class = 'error-get-id'>Uhmm, parece que no hay ningún usuario de acuerdo a los parametros que enviaste</h1>";
	}
	if ($TestResult == "no_user") {
		$output = "<h1 class = 'error-get-id'>Por favor, usa el enlace de cambio de contraseña que se envio a tu correo </h1>";
	}
	if ($TestResult =="match") {
		$obj=mysqli_fetch_object($result);
		$idReturn = $obj->id;
		$name = $obj->Name;
		$active = $obj->active;
		$previusPassword = $obj->password;

		if ($active == 1) {	
			// $output = "idReturn = $idReturn";
			if (password_verify($idReturn, $idcr)) { //check if idReturn and idcr match
				// $output = "<h1 class = 'error-get-id'>ids coinciden</h1>\n";
				$msg3 = "";
				$action = "";
				$form =  "<div id = 'user-dashboard'>\n";
				$form .= "\t<div id = 'recover-pass2'>\n";
				$form .= "\t\t<h2 class = 'Recover-pass-tittle'>Introduce tu nueva contraseña, al menos 8 caracteres, 1 mayúscula y 1 minúscula</h2>\n";
				$form .= "\t\t<form id = 'recover-pass2' action='$action' method='post'>\n";
				$form .= "\t\t<table id = 'table-recover-pass2'>\n";
				$form .= "\t\t\t<table>\n";
				$form .= "\t\t\t\t<tr>\n";
				$form .= "\t\t\t\t\t<td style='width: 250px;';>Nueva contraseña:</td>\n";
				$form .= "\t\t\t\t\t<td style='width: 150px;'><input type='password' id='rpassword' name = 'rpassword' placeholder = '*********' pattern='^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$' title='Al menos 8 caracteres, 1 Mayuscula y 1 Minuscula, sin caracteres especiales'></td>\n";
				// $form .= "\t\t\t\t\t<td style='width: 150px;'><input type='password' id='rpassword' name = 'rpassword' placeholder = '********' pattern='.{8,}' title='Al menos 8 caracteres'></td>\n";
				$form .= "\t\t\t\t</tr>\n";
				$form .= "\t\t\t\t<tr>\n";
				$form .= "\t\t\t\t\t<td style='width: 250px;'>Por favor, confirma la contraseña:</td>\n";
				$form .= "\t\t\t\t\t<td style='width: 150px;'><input type='password' id='rcpassword' name = 'rcpassword' placeholder = '*********' pattern='^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$' title='Al menos 8 caracteres, 1 Mayuscula y 1 Minuscula, sin caracteres especiales'></td>\n";
				// $form .= "\t\t\t\t\t<td style='width: 150px;'><input type='password' id='rcpassword' name = 'rcpassword' placeholder = '********' pattern='.{8,}' title='Al menos 8 caracteres'></td>\n";
				$form .= "\t\t\t\t</tr>\n";
				$form .= "\t\t\t\t<tr>\n";
				$form .= "\t\t\t\t\t<td></td>\n";
				$form .= "\t\t\t\t\t<td><button type='submit' id='rec-passchange-btn'>Cambiar</button>\n";
				$form .= "\t\t\t\t</tr>\n";
				$form .= "\t\t\t</table>\n";
				$form .= "\t\t</form>\n";		
				$output = $form;
				//get and validates passwords 
				if (isset($_POST['rpassword']) && isset($_POST['rcpassword'])){ //if email-recover is set
					$rpassword = $_POST['rpassword'];
					$rcpassword = $_POST['rcpassword'];
					//decrypt $previusPassword
					// if (password_verify($rpassword, $previusPassword)) {
					// 	54-67
					// }
					if ($rpassword == $previusPassword ) {//previous and new password mathc
						$msg3 = "Por favor utiliza una nueva contraseña, distinta a la existente";
					} //end of if ($rpassword == $previusPassword ) 
					else{ //if previous and new password and different
						if ($rpassword != $rcpassword) {
							$msg3 = "Las contraseñas no coinciden";
						} // end of ($rpassword != $rcpassword)
						else{ 
						//change password
						$sql3 = "UPDATE users SET password = '$rpassword' WHERE id = '$idReturn'";
						$result3= mysqli_query($connection,$sql3);
						$msg3 = "Las contraseñas se han cambiado correctamente, por favor accede a Login";	
						}//end of else of ($rpassword != $rcpassword)
					} //end of else of if ($rpassword == $previusPassword ) 
				} // end of (isset($_POST['rpassword']) && isset($_POST['rcpassword'])
				}// end of password_verify 
			else {
				$output = "<h1 class = 'error-get-id'>Que raro... Parece que no hay un usuario coincidente</h1>";
			} //end of else password_verify
		} //end of if ($active == 0)
		if ($active == 0) {
				$output = "<h1 class = 'error-get-id' id = 'allready-logged'>Esta cuenta no fue activada, por favor, utiliza primero el enlace de activación que se envio a tu correo electronico</h1>";
		}// end of if ($active == 1)
	}
	$output .= "<div id = 'error-cpasword-message'>$msg3</div>\n";
	$output .= "\t</div>\n";
	$output .= "</div>\n";
	return $output;
}//end of function VerifyAccount

?>