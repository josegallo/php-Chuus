
		$textLeftTwitter = $('.left-square h2').text();	
		$textRightTwitter = $('.right-square h2').text();	
		// console.log($textLeftTwitter);

		//test if this conection is necessary
		// FB.init({appId: "Your FB Api Key", status: true, cookie: true});
		//get the question url

		var url_link_id_number = $('.left-square').attr('id').split("_")[1];
		// console.log('url_link_id_number = ' + url_link_id_number);
		var http_queprefieres = "http://josegallo.net/chuus/index.php?pair_of_questions_get_id=";
		var url_link = http_queprefieres + url_link_id_number;
		
		function share_me() {
		    FB.ui({
		      method: 'feed',
		      app_id: '"Your FB Api Key"',
		      link: url_link,
		      picture: 'http://josegallo.net/chuus/images/ChuusCuadrado.jpg',
		      name: 'you chuus, tu eliges...',
		      caption: '¿tu que opinas?',
		      description: $textLeftTwitter + ' o '+ $textRightTwitter
		    },
		    function(response){
		      if(response && response.post_id) {
		        // self.location.href = 'http://josegallo.byethost3.com/queprefieres'
		      }
		      else {
		        // self.location.href = 'http://www.google.com/'
		      }
		    });
		  }