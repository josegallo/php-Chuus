	<div id = 'search-results'></div>
	<h2 class = "que-prefieres">¿Qué prefieres?</h2>
	<div class = "wrap-questions">			
		<?php
			$testQuestions = TestGetPairOfQuestionsId();
			$output = showQuestions($testQuestions);
			echo $output;
		?>
	</div> <!-- end of wrap-questions div -->
	<div id = 'user-dashboard' class = 'hide'>
	</div>
