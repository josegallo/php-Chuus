$(document).ready(function() {

	if ($('.left-square').attr('id')) {//works if there the pair of questions are shown
		$id = $('.left-square').attr('id').split("_");
		$id = $id[1];
		// console.log($id);

		$listOfChecks = [];

		$id = parseInt($id);

		$(document).on('click', '.right-square, .left-square', function() {

			//this identify what the user click: right or left square
			$whatClicked = $(this).attr('class').split(" ")[1].split("-")[0];
			// console.log($whatClicked);

			//this tell us if the squares have been clicked depending on if
			//they have the class hidden
			$clickedLeft = $('.left-square div').attr('class').split(" ")[1];
			$clickedRight = $('.right-square div').attr('class').split(" ")[1];

			//if both have hidden class that means they haven't been clicked
			// and then do things (show the information votos, % and move text)
			if ($clickedLeft == $clickedRight) {

				//appears the check symbol
				$('.check-' +$whatClicked).removeClass('hidden');

				//checking if clicked is on the list of clicked squares
				$checked = $whatClicked;
				$checkedPair = $id + "-" + $checked
				// console.log($checkedPair);
				// if $checkedPair in $listOfChecks then 
				$index = $listOfChecks.indexOf($checkedPair);

				//if not in the list then add it
				if ($index == -1) {
					$listOfChecks.push($checkedPair);
					// console.log($listOfChecks);
				}; //end of if index


				//upgrade the bbdd
				$.ajax({
					url: "ajax/statistics.ajax.php",
				    type: "POST",
				    data: {
				    	'pair_id' : $id,
				    	'side' : $checked,
				    }, // End data
					'success' : function(response) {
						//the response is votes1-%1-votes2-%2

						//move the questions down
						$('.right-square h2, .left-square h2').removeClass('text-square').addClass('text-clicked');
						
						// put the % of votes to 0, ready for the counter animation
						$('.percent_votes_left').text(0 + '%');	
						$('.percent_votes_right').text(0 + '%');	

						//show % and votes
						$('.percent_votes_right, .percent_votes_left, .votes_right, .votes_left').removeClass('hide');

						$response = response;
						$votes_left = $response.split("-")[0];
						var percent_votes_left = $response.split("-")[1];
						$votes_right = $response.split("-")[2];
						var percent_votes_right = $response.split("-")[3];

						//change the current values on page
						$('.votes_right').text($votes_right + ' votos');
						$('.votes_left').text($votes_left + ' votos');

						// counter animation
						percent_votes_left = parseInt(percent_votes_left);
						percent_votes_right = parseInt(percent_votes_right);
						// calculatation of delta to run both counters at the same time, 
						//the maxvalue is the reference, 
						//ie, if 90% is maxvalue, the lapse += 1 will be for this value, 
						//and the 10% will be corrected with the delta
						var minValue = Math.min(percent_votes_left, percent_votes_right);
						var maxValue = Math.max(percent_votes_left, percent_votes_right);
						var correctDelta = Math.abs(minValue/maxValue);
						// console.log('percent_votes_left = ' + percent_votes_left);
						if (maxValue == percent_votes_left) {
							IncrementallapseLeft = 1;
							IncrementallapseRight = correctDelta;} 
						if (maxValue == percent_votes_right) {
							IncrementallapseLeft = correctDelta;
							IncrementallapseRight = 1;} 			
						// console.log('IncrementallapseLeft' + IncrementallapseLeft);
						// console.log('IncrementallapseRight' + IncrementallapseRight);
						var lapseLeft = 0;
						var lapseRight = 0;
						// timer event function
						var Counter = setInterval(CounterFunction, 5);
							function CounterFunction () {
								if (Math.round(lapseLeft) <=percent_votes_left) {							
									$('.percent_votes_left').text(Math.round(lapseLeft) + '%');					
									// console.log('lapse = ' + lapseLeft);
									// console.log('percent_votes_left = ' + (percent_votes_left += 1));
									lapseLeft +=IncrementallapseLeft;} 
								if (Math.round(lapseRight) <=percent_votes_right) {							
									$('.percent_votes_right').text(Math.round(lapseRight) + '%');					
									// console.log('lapse = ' + lapseRight);
									// console.log('percent_votes_left = ' + (percent_votes_left += 1));
									lapseRight +=IncrementallapseRight;}
							} //end of function			
			       	} // End success     
		    	}); // End AJAX    
			} //end of if clicked
		}); // End click function
	}; // end of if ($('.left-square').attr('id')) 
}); //end of document

