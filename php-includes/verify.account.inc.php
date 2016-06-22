<div id = 'user-dashboard'>
	<div id = 'verify-results'>
		<?php
		require_once 'connect2.inc.php';
		$TestResult = TestHash();
		$output = VerifyAccount($TestResult);
		echo $output;
		?>
	</div>
</div>
