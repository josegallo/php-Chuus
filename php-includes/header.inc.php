<body>
	<div id="fb-root"></div>
	<!-- asyn conectcion with FB -->
	<script src="scripts/fb.connect.js"></script>
	<header >
		<a href="http://josegallo.net/chuus/"><div class = 'Queprefieres2 header'></div></a>
		<form class = 'header' id="header-search" action="#" method="post">
				<input type="text" class="search" name="s"
						id = "words-search" 
						placeholder=" Buscar preguntas...">
				<input type="submit" class="search-submit">
		</form>
		<div class = 'header submit' id = 'header-submit'= > <a href="#">Envía preguntas</a></div>
		<nav  class = 'header login-header' id = "menu-changable"> 
				<a  class = 'remove-login-header' id = 'onclick' href="#">Login</a> 				
				<ul class = 'header sing-up'>
					<li><a href="#">Registrate</a></li>
				</ul>
		</nav>
		<!--Login Form -->
	<div id="draggable-login" class="ui-widget-content">
		<form id="login" method="post">
			<div id = 'close-login-wrap'>
				<h3>
					<span id = 'title-popup'>Login</span>
					<span id = 'login-error-popup'></span>
				</h3>
				<a href="#" id ="popup-close"></a>
			</div>
			<br/>
			<br/>
			<label>Email:</label>
			<br/>
			<input type="text" id="email" placeholder="Email"/><br/>
			<br/>
			<label>password </label>
			<br/>
			<input type="password" id="password" placeholder="************"/><br/>
			<p>
				<a id = "forgot-password" href="recover.pass.php">¿Olvidaste tus datos?</a>
				<a id = "sign-up-from-login" href="#">Crea una cuenta</a>
			</p>
			<hr>
			<button type="button" id="loginbtn">Login</button>
			<br/>
		</form>
	</div>
	<div id="draggable-signup" class="ui-widget-content">
		<form id="sign-up" method="post">
		<!-- <form id="login" method="post"> -->
			<div id = 'close-sign-up-wrap'>
			<!-- <div id = 'close-login-wrap'> -->
				<h3>
					<span id = 'title-popup-sign-up'>Registrate</span>
					<!-- <span id = 'title-popup'>Login</span> -->
					<span id = 'sign-up-error-popup'></span>
					<!-- <span id = 'login-error-popup'></span> -->
				</h3>
				<a href="#" id ="sign-up-close"></a>
				<!-- <a href="#" id ="popup-close"></a> -->
			</div>
			<br/>
			<br/>
			<label>Nombre</label>
			<br/>
			<input type="text" id="namesu" placeholder="Nombre"/><br/>
			<br/>
			<label>Email:</label>
			<br/>
			<input type="text" id="emailsu" placeholder="Email"/><br/>
			<br/>
			<label>Contraseña </label>
			<br/>
			<input type="password" id="passwordsu" placeholder="************"/><br/>
			<br/>
			<label>Confirma Contraseña </label>
			<br/>
			<input type="password" id="cpasswordsu" placeholder="************"/><br/>
<!-- 			<p>
				<a href="#">¿Olvidaste tus datos?</a>
				<a href="#">Crea una cuenta</a>
			</p> -->
			<hr>
			<button type="button" id="signupbtn">Envia</button>
			<!-- <button type="button" id="loginbtn">Login</button> -->
			<br/>
		</form>
	</div>
		<!--End of Login Form -->
	</header>