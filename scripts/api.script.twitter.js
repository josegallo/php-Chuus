if ($('.left-square').attr('id')) {	//works if there the pair of questions are shown	
		// set the 1st time the text
		$textRightTwitter = $('.right-square h2').text();
		$textLeftTwitter = $('.left-square h2').text();	
		$('.twitter-share-button').attr('data-text', $textLeftTwitter + ' o ' + $textRightTwitter);

		//get the new redirected url for the question
		$(document).ready(function() {
			var url_link_id_number = $('.left-square').attr('id').split("_")[1];
			// console.log("$('.wrap-questions .left-square').attr('id') = " + $('.wrap-questions .left-square').attr('id'));
			// console.log('url_link_id_number = ' + url_link_id_number);
			var http_queprefieres = "http://josegallo.byethost3.com/queprefieres/index.php?pair_of_questions_get_id=";
			var url_link = http_queprefieres + url_link_id_number;
			$('.twitter-share-button').attr('data-url', url_link);
		}); // End document ready

		// from the API of twitter https://about.twitter.com/es/resources/buttons#tweet

		!function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0],
			    p = /^http:/.test(d.location) ? 'http' : 'https';
			    if (!d.getElementById(id)) {
			        js = d.createElement(s);
			        js.id = id;
			        js.src = p + '://platform.twitter.com/widgets.js';
			        fjs.parentNode.insertBefore(js, fjs);
			    }
		}(document, 'script', 'twitter-wjs');
}; // end of if ($('.left-square').attr('id')) 
