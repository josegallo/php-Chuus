$(document).ready(function() {

	// $listOfPairs = [];
	if ($('.left-square').attr('id')) { //works if there the pair of questions are shown
		$id = $('.left-square').attr('id').split("_");
		$id = $id[1];
		$id = parseInt($id);

		// $listOfPairs.push($id);
		// console.log($listOfPairs);
		$animated = 0;

		$.ajax({
		        url: "ajax/max-question-id.ajax.php",
		         	//no hace falta utilizar las partes type y data, puesto que no 
		         	// enviamos ningun dato

	 			'success' : function(response) {
	 				$maxQuestionId = response;
					// console.log('max question id = ' + $maxQuestionId);
	       		} // End success      
	        }); // End AJAX


		$(document).on('click', '.right-arrow', function() {

			$('.left-square h2').removeClass('stop-arrow');
			// console.log($id + '<' + $maxQuestionId);

			if ($id < $maxQuestionId) {

				$('.check-left, .check-right').addClass('hidden');

				$id += 1
				// console.log('new id = ' + $id)

				// console.log($listOfPairs);

				$newid = $id;
				$newid = $newid.toString();
				// console.log('newid = '+ $newid);

				$idPairLeft = $newid + "-left";
				// console.log('next pair = ' + $idPairLeft);

				$idPairRight = $newid + "-right";
				// console.log('next pair = ' + $idPairRight);

				$.ajax({
		            url: "ajax/fordward.ajax.php",
		            type: "POST",
		            data: {
		                'pair_id' : $id,
		            }, // End data

	 			'success' : function(response) {
	 		
	 				$('.left-square h2, .right-square h2 ').removeClass('text-clicked').addClass('text-square');

					$('.percent_votes_right, .percent_votes_left, .votes_right, .votes_left').addClass('hide');

					$('.votes_right').text();
					$('.votes_left').text();
					$('.percent_votes_left').text();
					$('.percent_votes_right').text();

					//questions will have in this order: question1, question2,
					// author, votes1, votes2, %1, %2
					//update the questions, votes in squares and author in the footer

	 				$questions = response;
	 				// console.log('questions =', $questions);

	 				$question1 = $questions.split("_")[0];
	 				// console.log('question1 =', $question1);
	 				$question2 = $questions.split("_")[1];
	 				// console.log('question2 =', $question2);
	 				$author = $questions.split("_")[2];
	 				// console.log('author =',$author);
	 				$votes1 = $questions.split("_")[3];
	 				$votes2 = $questions.split("_")[4];
	 				$percent_votes_left = $questions.split("_")[5];
	 				$percent_votes_right = $questions.split("_")[6];

	 				$('.left-square h2').text($question1);
	 				$('.left-square').removeAttr('id').attr('id', 'pair-of-question_'+ $id);	
	 				$('.right-square h2').text($question2);

	 				$('.author').text('Añadido por ' + $author);

	 				// update twitter and facebook button	
					$('.social iframe').remove();
					//for twitter and facebook
	 				$textRightTwitter = $question1;
	 				// console.log($textRightTwitter);
					$textLeftTwitter = $question2;

					//get the new redirected url for the question
					var url_link_id_number = $('.left-square').attr('id').split("_")[1];
					console.log('url_link_id_number = ' + url_link_id_number);
					var http_queprefieres = "http://josegallo.net/chuus/index.php?pair_of_questions_get_id=";
					var url_link = http_queprefieres + url_link_id_number;

					var newTweetBtn = $('<a></a>')
					    .addClass('twitter-share-button')
	        			.attr('href', 'http://twitter.com/share')
	        			.attr('data-size', 'large')
	        			// .attr('data-url', 'http://josegallo.byethost3.com/queprefieres/')
	        			.attr('data-url', url_link)
	        			.attr('data-text', $textRightTwitter + ' o ' + $textLeftTwitter);

					$('.social').append(newTweetBtn);
					twttr.widgets.load();


			 		//if $idPairLeft or $idPairRight not in list entoces add class (show check symbols and values):
					$indexLeft = $listOfChecks.indexOf($idPairLeft);
					// console.log($indexLeft);
					$indexRight = $listOfChecks.indexOf($idPairRight);
					// console.log($indexRight);

					if ($indexLeft != -1) {
						$('.check-left').removeClass('hidden');
					};

					if ($indexRight != -1) {
						$('.check-right').removeClass('hidden');
					};

					if ($indexRight != -1 || $indexLeft != -1 ) {
						$('.left-square h2, .right-square h2').removeClass('text-square').addClass('text-clicked');
						$('.percent_votes_right, .percent_votes_left, .votes_right, .votes_left').removeClass('hide');
						$('.votes_left').text($votes1 +' votos');
						$('.votes_right' ).text($votes2 +' votos');

						// $('#counter_percent_left' ).animateNumber({ number: $percent_votes_left});
						// $('#counter_percent_right').animateNumber({ number: $percent_votes_right});
					
						// without animation
						$('.percent_votes_left').text($percent_votes_left +'%');
						$('.percent_votes_right').text($percent_votes_right+'%');
					};

	       		} // End success     

	        	}); // End AJAX
			} 
			else {

			function move () {
		 		$(".left-square, .right-square").animate({left: '+=5px'});
		 		$(".left-square, .right-square").animate({left: '-=5px'});
			};

			if ($animated%3 == 0) {
				move (); move (); move ();
		    };// End of if animated

			// $('.right-square h2').text("Por favor avanza con el otro cursor para ver mas preguntas");
			$('.right-square h2').addClass('stop-arrow');

			};	//end of else
			$animated +=1;
		}); // End click function
	}; // end of if ($('.left-square').attr('id')) 
}); // End document ready