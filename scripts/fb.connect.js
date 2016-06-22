	// 	<!-- USE 'Asynchronous Loading' version, for IE8 to work
	// http://developers.facebook.com/docs/reference/javascript/FB.init/ -->
		window.fbAsyncInit = function() {
			FB.init({
			  appId  : 'your Facebook appId',
			  status : true, // check login status
			  cookie : true, // enable cookies to allow the server to access the session
			  xfbml  : true  // parse XFBML
			});
		};
	//generates the url connection and adict to the fb-root id selector
	 	(function() {
			var e = document.createElement('script');
			e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
			e.async = true;
			document.getElementById('fb-root').appendChild(e);
	  	}());