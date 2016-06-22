<?php 

function TestHash() {
	
	global $hashConfirm, $rowcount, $result, $connection;
	$result= mysqli_query($connection,"SELECT * FROM users WHERE hash='$hashConfirm'");
	$rowcount=mysqli_num_rows($result);
	
	// echo "number of rows = $rowcount <br>";
	if (!isset($_GET['hash'])){ 
		// echo "no_user-test<br>";
		return "no_user";
	}
	if ($rowcount <1) {
		// echo "no_match-test<br>";
		return "no_match";
	}
	if ($rowcount == 1){
		// echo "match-test<br>";

		return "match";
	}
} // end of function TestHash() 
?>