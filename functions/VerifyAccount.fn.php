<?php
function VerifyAccount($TestResult){
	global $TestResult, $result, $idcr, $connection;
	if ($TestResult =="no_match") {
		$output = "<h1 class = 'error-get-id'>Uhmm, parece que no hay ningún usuario de acuerdo a los parametros que enviaste</h1>";
	}
	if ($TestResult == "no_user") {
		$output = "<h1 class = 'error-get-id'>Por favor, usa el enlace que se envio a tu correo </h1>";
	}
	if ($TestResult =="match") {
		$obj=mysqli_fetch_object($result);
		$idReturn = $obj->id;
		$name = $obj->Name;
		$active = $obj->active;

		if ($active == 0) {	
			// $output = "idReturn = $idReturn";
			if (password_verify($idReturn, $idcr)) { //check if idReturn and idcr match
				// $output = "<h1 class = 'error-get-id'>ids coinciden</h1>\n";

			//change status to active 		
				$sql2 = "UPDATE users SET active = 1 WHERE id = '$idReturn'";
				$result2= mysqli_query($connection,$sql2);	
			//show the dashboard panel
	            //add greeting
	            $output = "<div id = idUserVerify_$idReturn></div>";
	            $output .= "\t<h3>Hola $name!</h3>\n";
	            $output .= "\t<h4>Aqui puedes añadir preguntas:</h4>\n";
	            //add head of table 
	            $output .=  "\t<table id ='all-user-questions'>\n";
	            $output .=  "\t\t<tr>\n";
	            $output .=  "\t\t\t<th>Primera Pregunta</th>\n";
	            $output .=  "\t\t\t<th>Segunda Pregunta</th>\n";
	            $output .=  "\t\t\t<th>Añadir</th>\n";
	            $output .=  "\t\t</tr>\n";
	            //adding  the questions in the table it is not necessary because there are not,
	            //and the new ones are adding by user.dashboard.js          
	            //add last row of new questions
	            $output .= "<tr>";
	            $output .=  "<td><input type = 'text' id = 'question_proposed_1' name = 'Question1' placeholder ='Escribe 1ª pregunta'></td>";
	            $output .=  "<td><input type = 'text' id = 'question_proposed_2' name = 'Question2' placeholder ='Escribe 2ª pregunta'></td>";
	            $output .=  "<td id = 'addQuestion'>añade</td>";
	            $output .=  "</tr>";           
	            $output .=  "\t</table>\n";

	            // //add error message area
	            $output .="<div id = 'error-cpasword-message'></div>";

				}// end of password_verify 
			else {
				$output = "<h1 class = 'error-get-id'>Que raro... Parece que no hay un usuario coincidente</h1>";
			} //end of else password_verify
		} //end of if ($active == 0)
		if ($active == 1) {
				$output = "<h1 class = 'error-get-id' id = 'allready-logged'>Esta cuenta ya fue activada, por favor, accede en el login</h1>";
		}// end of if ($active == 1)
	}
	return $output;
}//end of function VerifyAccount

?>