$(document).ready(function() {

//change login menu to user menu
	// //get the id of pair of questions
	// var idProfileMenu = $("#verify-results").attr('id');
	// console.log('idProfileMenu = ' +idProfileMenu );
	// //knowing if user allready logged
	// var allreadyloogged = $("div#user-dashboard div#verify-results h1.error-get-id").attr('id');
	// console.log('allreadyloogged = ' + allreadyloogged);
	// if (idProfileMenu != undefined && allreadyloogged != undefined) {
	if ($("#verify-results div:first").attr('id') != undefined) {
		$('.sing-up a').text("Cambiar contraseña").attr('id','change-password');
		$('#menu-changable').prepend("<a id='remove-login-header' href='#''>Perfil</a>");
		// $('#menu-changable').prepend("<a id='Profile-menu' href='#'>Perfil</a>");
		$('ul.header.sing-up').append("<li><a id = 'logout' href ='index.php'>Salir</a></li>");
		$('#onclick').remove();

		//get the id of user
		idUser = $("#verify-results div:first").attr('id').split("_")[1];
	};

	//get the id of user
	// idUser = $("#verify-results div:first").attr('id').split("_")[1];
	// console.log('idUser + ', idUser);

}); // end of document