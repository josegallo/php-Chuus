	<footer>
		<?php
		$showAuthor = showAuthor ();
		echo $showAuthor;
		?>		
	<!-- these are the social sharing buttons	 -->
		 <div class = 'social'>
		 	<!-- fb button	 -->
			<script src="scripts/fb.shareme.js"> </script>
			<div id = 'facebook-icon' class = 'social-buttons' onclick="share_me()">
			<!-- twitter button	 -->
			</div >
				<div class = 'social-buttons'>
					<a  class="twitter-share-button"
						href="https://twitter.com/share"
					  	data-size="large"
					  	data-url="http://josegallo.byethost3.com/queprefieres/"
					  	data-via=""
					  	data-related=""
					  	data-hashtags=""
					  	data-text="">
					</a>
				</div>
				<!-- from the API of twitter https://dev.twitter.com/web/tweet-button/parameters -->		
				<script src="scripts/api.script.twitter.js"> </script>
			</div>
		</div> <!-- //end of social div -->
		<p class = "created">Creado por Jose Gallo</p>
	</footer>