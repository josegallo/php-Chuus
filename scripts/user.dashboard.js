$(document).ready(function() {
//flags and global variables
	//flag of #change-password clicked
	var clicked1st = false;
	//flag of tables titles on admin 
	var titlesAdOn = false;
	// console.log('initial titlesAdOn = ' + titlesAdOn);
	// flag of validation of admin password hasn't been taken yet:
	var flagAdminPassOk = false;
	//elements of sections
	var PerfilElements = "div#user-dashboard h3, div#user-dashboard h4, table#all-user-questions";
	var ErrorMessageElements = "div#error-cpasword-message";
	var ChangePassElements = "div#user-dashboard p, form#intro-pass-table";
	var AdminElementsPassOk = "div#pendent-title-table, div#acepted-title-table, table#admin-pendent-questions-table, table#admin-acepted-questions-table, div#slide-pendent, div#slide-acepted";
	var AdminElementsEnterPass = "h5#admin-introductory-text, form#intro-admin-pass";
	var Popups = "div form#sign-up, form#login";

	//flag of pendent questions table set
	var PendentQTableShow = false;
	//flag of acepted questions table set
	var AceptedQTableShown = false;
	//flag for 1 unique pendent questions at the admin
	var NumberOfInitialPendentQuestions = 0;

	//function for remove Login and SignUp Popup
	function removePopUps () {
		//remove the login popup
		$('#close-login-wrap').parent().parent().hide();
        $('#login-error-popup').text("");
        $("#email, #password" ).val("");
        //remove the signup popup
        $('#close-sign-up-wrap').parent().parent().hide();
        $('#sign-up-error-popup').text("");
        $("#namesu, #emailsu, #passwordsu, #cpasswordsu").val("");
	}
	
//section perfil
	// click on "perfil"
	$(document).on('click', '#remove-login-header', function(){
		//remove error messages
		$(ErrorMessageElements).text("");
		//show Perfil elements and hide changes password and admin
		$(PerfilElements).removeClass('hide');
		$(ChangePassElements).addClass('hide');
		$(AdminElementsPassOk).addClass('hide');
		$(AdminElementsEnterPass).addClass('hide');
		$(Popups).addClass('hide');
		// clean posible searchs
        $('#search-results').html("");
        $('#search-results').addClass('hide');
		// //remove login popup
		// $('#close-login-wrap').parent().parent().hide();
  //       $('#login-error-popup').text("");
  //       $("#email, #password" ).val("");
  //       //remove the signup popup
  //       $('#close-sign-up-wrap').parent().parent().hide();
  //       $('#sign-up-error-popup').text("");
  //       $("#namesu, #emailsu, #passwordsu, #cpasswordsu").val("");
		//if titles of tables of admin are on then remove then
		if (titlesAdOn == true){
			$(' #pendent-title-table, #acepted-title-table').remove();
			titlesAdOn = false;
		}
	}); //end of click #remove-login-header function

	function addProposedQuestions () {
     	var question1Input = $("#user-dashboard table input[name='Question1']").val();
     	var question2Input = $("#user-dashboard table input[name='Question2']").val();
	    console.log(question1Input + question2Input);
	    if (question1Input == "" || question2Input == "") {
            $("#error-cpasword-message").text("Por favor, completa las 2 preguntas");
        } //end of if (question1Input == "" || question2Input == "") clause
        else {
	        $.ajax({  
		        url: "ajax/proposed.question.ajax.php",
		        type: "POST",
		        data: {
		         'question1Input' : question1Input,
		         'question2Input' : question2Input,
		         'idUser': idUser
		        }, //end of data  
		        'success' : function(response) {
		        	// console.log('response = ' + response);
		        	var newrow = "";
		        	newrow += "<tr>";
		        	newrow += "<td class = 'pendent-questions'>"+ question1Input + "</td>"; 
	        		newrow += "<td class = 'pendent-questions'>"+ question2Input + "</td>";
	        		newrow += "<td class = 'pendent-questions'> pendiente de revision</td>";  
	        		newrow += "</tr>";
	        		// console.log(newrow);
	        		// Add the newrow and clean the values of adding row
	        		$("#all-user-questions tr:last-child input").val("");
		        	$(newrow).insertBefore("#all-user-questions tr:last-child"); 
	            } // End success  
	        }); // End AJAX        		
    	} //end of else
    }

    $(document).on('click', '#addQuestion', function(){				
    	addProposedQuestions();
	}); //end of click ##addQuestion function

	$(document).on('keypress','#question_proposed_1 , #question_proposed_2', function(e){
        if (e.keyCode == 13) {
        // Cancel the default action on keypress event
            e.preventDefault(); 
            addProposedQuestions();
        } //end of if
    })//end of keypress function of addroww

	$(document).on('click', '#logout, ul.header.sing-up li a#admin-access', function(){
		console.log('li a#admin-access clicked');	
		//remove the signup popup
        $('#close-sign-up-wrap').parent().parent().hide();
        $('#sign-up-error-popup').text("");
        $("#namesu, #emailsu, #passwordsu, #cpasswordsu").val("");
    	//remove login popup
		$('#close-login-wrap').parent().parent().hide();
        $('#login-error-popup').text("");
        $("#email, #password" ).val("");
        // clean posible searchs
        $('#search-results').html("");
        $('#search-results').addClass('hide');

    }); //end of click ##addQuestion function

//section "cambio de contraseña"
	//click on "cambio de contraseña"
    $(document).on('click', '#change-password', function(){  	
       	//recolocate the footer
            $('footer').css({ 
            	'top': 0,
                'margin-top': '0px',
                'z-index': '0'
            });
    	//remove error messages
		$(ErrorMessageElements).text("");
    	//remove Perfil and Admin and show change password elements
		$(ChangePassElements).removeClass('hide');
		$(AdminElementsPassOk).addClass('hide');
		$(AdminElementsEnterPass).addClass('hide');
		$(PerfilElements).addClass('hide');
		//remove the popups login and signup
		removePopUps ();
		// clean posible searchs
        $('#search-results').html("");
        $('#search-results').addClass('hide');

		//titles if they are on
		if (titlesAdOn == true){
			$('#pendent-title-table, #acepted-title-table').remove();
			titlesAdOn = false;
			console.log('titlesAdOn when click cambio de contraseña' + titlesAdOn);
		}
		//add the elemente for changing the password
		if (clicked1st == false){
			$('#user-dashboard').append("<p id = 'text-change-password'>Introduce la nueva contraseña(al menos 8 caracteres):</p>");
			var table = "<form id = 'intro-pass-table' method='post'>";
			table += "<table>";
			table += "<tr>";
			table += "<td style='width: 250px;';>Nueva contraseña:</td>";
			table += "<td style='width: 150px;'><input type='password' id='dpassword' placeholder = '*********' pattern='.{8,}'' title='Al menos 8 caracteres'></td>";
			table += "</tr>";
			table += "<tr>";
			table += "<td style='width: 250px;'>Por favor, confirma la contraseña:</td>";
			table += "<td style='width: 150px;'><input type='password' id='dcpassword' placeholder = '*********' pattern='.{8,}'' title='Al menos 8 caracteres'></td>";
			table += "</tr>";
			table += "<tr>";
			table += "<td></td>";	
			table += "<td><button type ='button' id='dash-passchange-btn'>Login</button>";
			table += "</tr>";
			table += "</table>";
			table += "</form>";
			$('#user-dashboard').append(table);
			clicked1st = true;
		}; //enf of if
	}); //end of click #change-password function

	function validateChangePassword () {
		var password = $("#dpassword").val();
        var cpassword = $("#dcpassword").val();
        //if password and cpassword are empty
        if (password == "" || cpassword == "") {
            $('#error-cpasword-message').text("Por favor rellena los campos").css({ 
	    		'font-size': '0.9em',
				'font-style': 'bold',
				'color': '#E43232'
			});
        } 
        //check if password and cpassword match
        else if (password != cpassword) {
            $('#error-cpasword-message').text("Las contraseñas no coinciden").css({ 
	    		'font-size': '0.9em',
				'font-style': 'bold',
				'color': '#E43232'
			});
        } 
        //check if password has more or equal than 8 characters
        else {
        	function validatePassword(password) {
                var filter = /.{8,}/;
                if (filter.test(password)) { return true;} 
                else { return false;}
                } //end of validatePassword
            if (validatePassword(password)){
            	// console.log(emailLogin);
            	//clean the error messages
            	$('#error-cpasword-message').text("");
            	// as matches then change it into the bbdd
            	// console.log('password = ' + password);
                $.ajax({  
	                url: "ajax/change.pass.ajax.php",
	                type: "POST",
	                data: {
	                 'password' :password,
	                 'idUser'	: idUser
	                 // 'emailLogin' :emailLogin
	                }, //end of data  
	                'success' : function(response) {
	                	// console.log('response = ' + response);
	                	if (response == 1) {
	                		$('#error-cpasword-message').text("La nueva contraseña coincide con la existente, por favor introduce otra");
	                	};
	                	if (response == 2) {
	                		$("#dpassword, #dcpassword ").val("");
	                		$('#error-cpasword-message').text("Tienes una nueva contraseña");

	                	};
	                } // End success;	
            	}); // End AJAX 
            } //end of if
            else {
            	$('#error-cpasword-message').text("Utiliza al menos 8 caracteres").css({ 
	    		'font-size': '0.9em',
				'font-style': 'bold',
				'color': '#E43232'
			});
            } //end of 2nd else
        } //end of 1st else
	} //end of validateChangePassword function

	$(document).on('click', '#dash-passchange-btn', function(){				
     	validateChangePassword ();
	}); //end of click #remove-login-header function

    $(document).on('keypress','#dpassword, #dcpassword', function(e){
        if (e.keyCode == 13) {
        // Cancel the default action on keypress event
            e.preventDefault(); 
            validateChangePassword (); 
        } //end of if
    })//end of keypress function

//section admin access
	function ValidateAdminPassword () {
		var adminPassword = $("#adminpassword").val();	
		// console.log ('adminpassword = '+ adminPassword);
		// console.log('idUser = ' + idUser);
        //if password is empty
        if (adminPassword == "") {
            $('#error-cpasword-message').text("Por favor introduce la constraseña")
        } 
        //check if password has more or equal than 8 characters
        else {
        	function validatePasswordAd(password) {
                var filter = /.{8,}/;
                if (filter.test(adminPassword)) { return true;} 
                else { return false;}
                } //end of validatePassword
            if (validatePasswordAd(adminPassword)){
            	// console.log(emailLogin);
            	//clean the error messages
            	$('#error-cpasword-message').text("");
            	// as matches then change it into the bbdd
            	// console.log('password = ' + password);
                
            	if (PendentQTableShow == false) {
                $.ajax({  
	                url: "ajax/validate.admin.pass.ajax.php",
	                type: "POST",
	                data: {
	                 'adminPassword':adminPassword,
	                 'idUser'		:idUser
	                 // 'emailLogin' :emailLogin
	                }, //end of data  
	                'success' : function(response) {
	                	flagAdminPassOk = true;
	                	// console.log('flagAdminPassOk = ' + flagAdminPassOk);
	                	//the response will be 0--table if the ajax is correct
	                	var validation = response.split('--')[0];
	                	// console.log(validation);
	                	var admintable = response.split('--')[1];
	                	// console.log(admintable);
	                	if (validation == 0) {
	                		// if it's allready on the dashboard show the table
	                		// $('#admin-pendent-questions-table').removeClass('hide');
		                	//remove the password admin form
		                	$('#intro-admin-pass, #admin-introductory-text').remove();
		                	//add the titles of tables
		                	
								$('#user-dashboard').append("<div id ='pendent-title-table'> Preguntas Pendientes  </div>");
								$('#div#acepted-title-table').css({ 
								    'color': 'white'
								});
		                		$('#user-dashboard').append("<div id ='acepted-title-table'> Preguntas Aceptadas  </div>");
		                		titlesAdOn = true;
		                		// console.log('titlesAdOn 1st contruction = '+ titlesAdOn);
							
		                	//add head of table 
	                        $headerTable = "<table id='admin-pendent-questions-table'>";
	                        $headerTable += "<tr>";
	                        $headerTable += "<th>Id</th>";
	                        $headerTable += "<th>Primera Pregunta</th>";
	                        $headerTable += "<th>Segunda Pregunta</th>";
	                        $headerTable += "<th>Aceptar</th>";
	                        $headerTable += "<th>Eliminar</th>";
	                        $headerTable += "</tr>";

	                        $('#user-dashboard').append($headerTable);
	                        // //add all the pendent questions
	                        $('#admin-pendent-questions-table tbody').append(admintable);
	                        // add last row for index
	                        var PendentQTable = $('table#admin-pendent-questions-table').width();
	                        // console.log(PendentQTable + 'px');
	                        //count rows
	                        var rowCount = $('table#admin-pendent-questions-table tr').length;
	                        console.log('number of rows when created = ' + rowCount);

	                        if (rowCount == 2){
	                        	NumberOfInitialPendentQuestions = 2;
	                        }

	                        var numberOfInitialQuestions = rowCount - 1;
	                        //append the range
	                        $('#user-dashboard').append("<div id = 'slide-pendent'><p class='range1'> < </p> <span></span> <p class= 'range2'> > </p></div>");
	                        if (numberOfInitialQuestions != 0){
	                        	$('div#slide-pendent span').text( '1' + "-" + numberOfInitialQuestions); 
	                        } else {
	                        	$('div#slide-pendent span').text( '0-0'); 
	                        }
	                        //colocate the range
	                        $('#slide-pendent').css({ 
							    'width': PendentQTable + 'px',
							    'margin-left': (PendentQTable/2) - (55/2)+ 'px',
							});
							// $("table#admin-pendent-questions-table tbody tr.row-pendent:last").after('</tbody> </table>' + headerAceptedTable);
	                        // $("</tbody> </table>").append("table#admin-pendent-questions-table tbody tr.q-acepted:first"); 
	                        // $(headerAceptedTable).insertBefore("table#admin-pendent-questions-table tbody tr.q-acepted:first"); 
                    		$('div#acepted-title-table').css({ 'color': 'white'});
                    		$('div#pendent-title-table').css({ 'color': '#3AEEF5'});
                    		PendentQTableShow = true;	
                    	}	//end of if response != ""
	                	else {
	                		$('#error-cpasword-message').text("La contraseña no es correcta");
	                	};

	                } // End success;

            	}); // End AJAX 
				
				}; //end of if PendentQTableShow == false
            } //end of if validatePasswordAd(adminPassword
            else {
            	$('#error-cpasword-message').text("Utiliza al menos 8 caracteres").css({ 
	    		'font-size': '0.9em',
				'font-style': 'bold',
				'color': '#E43232'
			});
            } //end of 2nd else
        } //end of 1st else
	} //end of ValidateAdminPassword function
	
	//when click admin
	$(document).on('click', 'a#admin-access', function(){		
		//remove the popups login and signup
		removePopUps ();
		//recolocate the footer
            $('footer').css({ 
                'margin-top': '0px',
                'z-index': '0'
            });
        // clean posible searchs
        $('#search-results').html("");
        $('#search-results').addClass('hide');
    	//remove error messages
		$(ErrorMessageElements).text("");
   		// if user have accessed to admin dashboard
		// console.log('flagAdminPassOk on admin-access function = '+ flagAdminPassOk );
		//if the enter of admin is ok display elements
		if (flagAdminPassOk == true) {
			//put again the tittles if necessary
			if (titlesAdOn == false){
				$("<div id ='pendent-title-table'> Preguntas Pendientes  </div>").insertBefore('#admin-pendent-questions-table');
				$("<div id ='acepted-title-table'> Preguntas Aceptadas  </div>").insertBefore('#admin-pendent-questions-table');	
				titlesAdOn = true;	
				// console.log('titlesAdOn click admin once enter in admin = '+ titlesAdOn)
			} //end of if titlesAdOn
			$('div#pendent-title-table').css({ 'color': '#3AEEF5'});
			$(PerfilElements).addClass('hide');
			$(ChangePassElements).addClass('hide');
			$(AdminElementsPassOk).removeClass('hide');
			$(AdminElementsEnterPass).addClass('hide'); 
			$('table#admin-acepted-questions-table, div#slide-acepted').addClass('hide');
		//if the entering of admin is not ok than display other elements
		} else {
			$(PerfilElements).addClass('hide');
			$(ChangePassElements).addClass('hide');
			$(AdminElementsPassOk).addClass('hide');
			$(AdminElementsEnterPass).removeClass('hide'); 
			//add the elementes for changing the password
			if ($('#user-dashboard h5').text() != 'Introduce la contraseña para acceder al panel de administracion por favor'){
				$('#user-dashboard').append("<h5 id = 'admin-introductory-text'>Introduce la contraseña para acceder al panel de administracion por favor</h5>");
				var table = "<form id = 'intro-admin-pass' method='post'>";
				table += "<table>";
				table += "<tr>";
				table += "<td style='width: 250px;';>Contraseña:</td>";
				table += "<td style='width: 150px;'><input type='password' id='adminpassword' placeholder = '*********' pattern='.{8,}'' title='contraseña admin'></td>";
				table += "</tr>";
				table += "<tr>";
				table += "<td></td>";	
				table += "<td><button type ='button' id='dash-admin-btn'>Accede</button>";
				table += "</tr>";
				table += "</table>";
				table += "</form>";
			$('#user-dashboard').append(table);
			}; //enf of if

		} //end of else
	}); //end of click #admin-access function

	//functions for clicking of dash-admin-btn button or keypress
	$(document).on('click', '#dash-admin-btn', function(){			
    	ValidateAdminPassword ();
	}); //end of click of dash-admin-btn button

	$(document).on('keypress','form#intro-admin-pass input#adminpassword', function(e){
        if (e.keyCode == 13) {
        // Cancel the default action on keypress event
            e.preventDefault(); 
            ValidateAdminPassword ();
        } //end of if
    })//end of keypress function of admin password

    $(document).on('click','#acepted-title-table', function(){
    	// clean posible searchs
        $('#search-results').html("");
        $('#search-results').addClass('hide');

    	$('div#pendent-title-table').css({ 'color': 'white'});
    	$('div#acepted-title-table').css({ 'color': '#3AEEF5'});
		if (AceptedQTableShown == false) {
			$.ajax({  
		        url: "ajax/admin.acepted.questions.ajax.php",
		        type: "POST",
		        // data: {
		        //  'idUser':idUser
		        // }, //end of data  
		        'success' : function(response) {
		        	var admintable = response;
		        	// console.log('response = ' + admintable);
		        	//response of ajax are the acepted questions;
		        	//add head of table 
		            $headerTable = "<table id='admin-acepted-questions-table'>";
		            $headerTable += "<tr>";
		            $headerTable += "<th>Id</th>";
		            $headerTable += "<th>Primera Pregunta</th>";
		            $headerTable += "<th>Segunda Pregunta</th>";
		            $headerTable += "</tr>";

		            $('#user-dashboard').append($headerTable);
		            // //add all the pendent questions
		            $('#admin-acepted-questions-table tbody').append(response);
		            // add last row for index
		            var AceptedQTable = $('table#admin-acepted-questions-table').width();
		            // console.log(PendentQTable + 'px');
		            $('#user-dashboard').append("<div id = 'slide-acepted'><p class='range1'> < </p> <span>1-10</span> <p class = 'range2'> > </p></div>");
		            $('#slide-acepted').css({ 
					    'width': AceptedQTable + 'px',
					    'margin-left': (AceptedQTable/2) - (55/2)+ 'px'
					});
				} // End success  
		    }); // End AJAX 
		AceptedQTableShown = true;
	    };  //end of ifAceptedQTableShown == false
	   	$('table#admin-pendent-questions-table, div#slide-pendent').addClass('hide');
		$('table#admin-acepted-questions-table, div#slide-acepted').removeClass('hide');
	}); //end of click #acepted-title-table
	
	$(document).on('click','div#pendent-title-table', function(){
		// clean posible searchs
        $('#search-results').html("");
        $('#search-results').addClass('hide');

		$('div#acepted-title-table').css({ 'color': 'white'});
        $('div#pendent-title-table').css({ 'color': '#3AEEF5'});	
		$('table#admin-pendent-questions-table, div#slide-pendent, #slide-pendent .range2, #slide-pendent .range1').removeClass('hide');
		$('table#admin-acepted-questions-table, div#slide-acepted, #slide-acepted .range2, #slide-acepted .range1').addClass('hide');
	}); //end of click #pendent-title-table

//section for admin index management
	$(document).on('click','div#slide-pendent p.range1', function(){  
		// clean posible searchs
        $('#search-results').html("");
        $('#search-results').addClass('hide');
		//get the numbers of range
		var BiggestNumber = parseInt($('div#slide-pendent span').text().split("-")[1]);
		console.log('BiggestNumber = ' + BiggestNumber);
		var ShortestNumber = parseInt($('div#slide-pendent span').text().split("-")[0]);
		console.log('ShortestNumber = ' + ShortestNumber);
		// get the minimun id on the list to send it to ajax query
		var lastminimumId = $('table#admin-pendent-questions-table tr:nth-child(2) td:first-child').text();
		console.log('lastminimumId = ' + lastminimumId );

		$.ajax({  
	        url: "ajax/index.backward.pendent.ajax.php",
	        type: "POST",
	        data: {
	         'lastminimumId':lastminimumId
	        }, //end of data  
	        'success' : function(response) {
	        	console.log('response = ' + response);

	        	var rowCount = $('table#admin-pendent-questions-table tr').length;
				// console.log('rowCount before loop = ' + rowCount);

	        	if (ShortestNumber>1) {
	        		//delete the old rows
	        	if (rowCount <= 11) {    	   	
		        	for (var i = 0; i < rowCount; i++) {
		        		$("table#admin-pendent-questions-table tr.row-pendent:last").remove();
	        		}; //end of for
	        		$('table#admin-pendent-questions-table tbody').append(response); 
	        		//get the array of tr of table and reverse
	        		var tbody = $('table#admin-pendent-questions-table tbody');
    				tbody.html($('tr',tbody).get().reverse()); 
    				//put the heading on the 1st row
    				$("table#admin-pendent-questions-table tbody tr:last").insertBefore("table#admin-pendent-questions-table tr.row-pendent:first-child");
    				//recolocate range on the middle botton of the pendent questions table
    				var PendentQTable = $('table#admin-pendent-questions-table').width();
			            // console.log(PendentQTable + 'px');		            
			        $('div#slide-pendent').css({ 
						'width': PendentQTable + 'px',
						'margin-left': (PendentQTable/2) - (55/2)+ 'px'
					});
    				//change the range
	        		$('div#slide-pendent span').text((ShortestNumber - 10)+ "-" +(BiggestNumber - rowCount +1));     		
	        	} //end of if rowCount <11
	        	}; //end of if shortestnumber	        	
			} // End success  
	    }); // End AJAX 	
	}); //end of click div#slide-pendent p.range1

	$(document).on('click','div#slide-pendent p.range2', function(){  
		// clean posible searchs
        $('#search-results').html("");
        $('#search-results').addClass('hide');

		var BiggestNumber = parseInt($('div#slide-pendent span').text().split("-")[1]);
		console.log('BiggestNumber = ' + BiggestNumber);
		var ShortestNumber = parseInt($('div#slide-pendent span').text().split("-")[0]);
		console.log('ShortestNumber = ' + ShortestNumber);
		// get the largest id on the list to send it to ajax query
		var lastId = $('table#admin-pendent-questions-table tr:last td:first-child').text();
		console.log('lastId = ' + lastId );

		$.ajax({  
	        url: "ajax/index.forward.pendent.ajax.php",
	        type: "POST",
	        data: {
	         'lastId':lastId
	        }, //end of data  
	        'success' : function(response) {
	        	console.log('response = ' + response);
	        	console.log('response.length = ' + response.length)
	        	if (response.length == 1) {
	        		console.log('response = 0');
	        		//nothing
	        	} //end of if
	        	else {
	        	// var responseOk = response;	    
	        	var rowCount = $('table#admin-pendent-questions-table tr').length;
				// console.log('rowCount before loop = ' + rowCount);

	        	if (rowCount == 11) {    	   	
	        		//delete old rows
		        	for (var i = 1; i < rowCount; i++) {
		        		$("table#admin-pendent-questions-table tr.row-pendent:last").remove();
	        		}; //end of for
	        		//add new rows
	        		$('table#admin-pendent-questions-table tbody').append(response);
	        		//count new rows   
	        		var rowCount = $('table#admin-pendent-questions-table tr').length;
	        		// console.log('rowCountT new = ' + rowCount);
	        		//recolocate range on screen on the middle of pendent questions table
	        		var PendentQTable = $('table#admin-pendent-questions-table').width();
			            // console.log(PendentQTable + 'px');		            
			            $('div#slide-pendent').css({ 
						    'width': PendentQTable + 'px',
						    'margin-left': (PendentQTable/2) - (55/2)+ 'px'
						});
	        		//update the range
	        		$('div#slide-pendent span').text((ShortestNumber + 10)+ "-" +(BiggestNumber + rowCount -1));     		
	        	} //end of if rowCount <10	
	        	}; //end of else of response!=0	        	
			} // End success  
	    }); // End AJAX 			
	}); //end of click div#slide-pendent p.range2	

	$(document).on('click','div#slide-acepted p.range1', function(){
		// clean posible searchs
        $('#search-results').html("");
        $('#search-results').addClass('hide');
		//get the numbers of range
		var BiggestNumber = parseInt($('div#slide-acepted span').text().split("-")[1]);
		console.log('BiggestNumber = ' + BiggestNumber);
		var ShortestNumber = parseInt($('div#slide-acepted span').text().split("-")[0]);
		console.log('ShortestNumber = ' + ShortestNumber);
		// get the minimun id on the list to send it to ajax query
		var lastminimumId = $('table#admin-acepted-questions-table tr:nth-child(2) td:first-child').text();
		console.log('lastminimumId = ' + lastminimumId );

		$.ajax({  
	        url: "ajax/index.backward.acepted.ajax.php",
	        type: "POST",
	        data: {
	         'lastminimumId':lastminimumId
	        }, //end of data  
	        'success' : function(response) {
	        	console.log('response = ' + response);

	        	var rowCount = $('table#admin-acepted-questions-table tr').length;
				console.log('rowCount before loop = ' + rowCount);

	        	if (ShortestNumber>1) {
	        		//delete the old rows
		        	if (rowCount <= 11) {    	   	
			        	for (var i = 0; i < rowCount; i++) {
			        		$("table#admin-acepted-questions-table tr.row-acepted:last-child").remove();
		        		}; //end of for
		        		$('table#admin-acepted-questions-table tbody').append(response); 
		        		//get the array of tr of table and reverse
		        		var tbody = $('table#admin-acepted-questions-table tbody');
	    				tbody.html($('tr',tbody).get().reverse()); 
	    				//put the heading on the 1st row
	    				$("table#admin-acepted-questions-table tbody tr:last").insertBefore("table#admin-acepted-questions-table tr.row-acepted:first-child");
	    				//recolocate range on screen

		        		var AceptedQTable = $('table#admin-acepted-questions-table').width();
			            // console.log(PendentQTable + 'px');
			            
			            $('div#slide-acepted').css({ 
						    'width': AceptedQTable + 'px',
						    'margin-left': (AceptedQTable/2) - (55/2)+ 'px'
						});
	    				//change the range
		        		$('div#slide-acepted span').text((ShortestNumber - 10)+ "-" +(BiggestNumber - rowCount +1));     		
		        	} //end of if rowCount <11
	        	}; //end of if shortestnumber	        	
			} // End success  
	    }); // End AJAX 	
	}); //end of click div#slide-acepted p.range1

	$(document).on('click','div#slide-acepted p.range2', function(){
		// clean posible searchs
        $('#search-results').html("");
        $('#search-results').addClass('hide');
		var BiggestNumber = parseInt($('div#slide-acepted span').text().split("-")[1]);
		console.log('BiggestNumber = ' + BiggestNumber);
		var ShortestNumber = parseInt($('div#slide-acepted span').text().split("-")[0]);
		console.log('ShortestNumber = ' + ShortestNumber);
		// get the largest id on the list to send it to ajax query
		var lastId = $('table#admin-acepted-questions-table tr:last td:first-child').text();
		console.log('lastId = ' + lastId );

		$.ajax({  
	        url: "ajax/index.forward.acepted.ajax.php",
	        type: "POST",
	        data: {
	         'lastId':lastId
	        }, //end of data  
	        'success' : function(response) {
	        	// var responseOk = response;	 
	        	console.log(response);
	        	var rowCount = $('table#admin-acepted-questions-table tr').length;
				console.log('rowCount before loop = ' + rowCount);

	        	if (rowCount == 11) {    	   
	        		//delete old rows	
		        	for (var i = 1; i < rowCount; i++) {
		        		$("table#admin-acepted-questions-table tr.row-acepted:last").remove();
	        		}; //end of for
	        		//add new rows
	        		$('table#admin-acepted-questions-table tbody').append(response);  
	        		//recolocate range on screen

	        		var AceptedQTable = $('table#admin-acepted-questions-table').width();
		            // console.log(PendentQTable + 'px');
		            
		            $('div#slide-acepted').css({ 
					    'width': AceptedQTable + 'px',
					    'margin-left': (AceptedQTable/2) - (55/2)+ 'px'
					});
	        		//count new rows
	        		var rowCount = $('table#admin-acepted-questions-table tr').length;
	        		console.log('rowCount new = ' + rowCount);
	        		//update range
	        		$('div#slide-acepted span').text((ShortestNumber + 10)+"-" +(BiggestNumber + rowCount -1));     		
	        	} //end of if rowCount <10	        	
			} // End success  
	    }); // End AJAX 			
	}); //end of click div#slide-acepted p.range2
	
	$(document).on('click','table#admin-pendent-questions-table .question-delete', function(){
		// clean posible searchs
        $('#search-results').html("");
        $('#search-results').addClass('hide');
		//get the id of the question to be deleted
		$idDelete = $(this).parent().parent().children('td:first').text();
		console.log('id to be deleted = ' + $idDelete);
		// //intital range numbers
		var ShortestNumberP = parseInt($('div#slide-pendent span').text().split("-")[0]);
		console.log('ShortestNumber = ' + ShortestNumberP);
		var LargestNumberP = parseInt($('div#slide-pendent span').text().split("-")[1]);
		console.log('LargestNumberP  = ' + LargestNumberP);
		var rowCount0 = $('table#admin-pendent-questions-table tr').length;
		console.log('rowCount before action = ' + rowCount0);
		//delete the select row and refresh
		//delete on the bbdd
		$.ajax({  
	        url: "ajax/index.delete.proposed.question.ajax.php",
	        type: "POST",
	        data: {
	         'idDelete': $idDelete
	        }, //end of data  

	        'success' : function(response) {
	        	console.log('rowCount0 = ' +rowCount0);
	        	//delete the row selected on screen
	        	$("table#admin-pendent-questions-table tr#pair_of_questions_proposed_" + $idDelete).remove();
	        	console.log('id Deleted = ', $idDelete);
	        	//recheck if just 1 pendent proposed question from de begining
	        	if (NumberOfInitialPendentQuestions == 2){
	        		$('table#admin-pendent-questions-table tr:nth-child(2)').remove();
	        	}
	        	//count the number of rows after remove the clicked row
				var rowCountFirst = $('table#admin-pendent-questions-table tbody tr').length;
				console.log('rowCount 1st after remove row clicked = ' + rowCountFirst);

				if (rowCountFirst >1){ //if there are at least 1 row of questions then do it:
		        	//get the min id of the list
		        	console.log('option rowCountFirst >1');
		        	var minimumIdTable = $('table#admin-pendent-questions-table tr:nth-child(2)').attr('id').split('_')[4];
		        	console.log('minimumIdTable = ' + minimumIdTable);

	        		// // count new rows
	        		// var rowCountPT = $('table#admin-pendent-questions-table tr').length;
	        		// console.log('rowCountPT new = ' + rowCountPT);

	        		//ajax to refresh table with more rows until ten more questions if they exist
	        		$.ajax({  
				        url: "ajax/index.refresh.table.proposed.question.ajax.php",
				        type: "POST",
				        data: {
				         'minimumIdTable': minimumIdTable
				        }, //end of data  
				        'success' : function(response) {
				        	// console.log(response);
				        	//delete the rest of the remainding rows
				        	// console.log('rowCountFirst = ' + rowCountFirst);
				        	for (var i = 1; i < rowCountFirst; i++) {
				        		$("table#admin-pendent-questions-table tr.row-pendent:last").remove();
			        		}; //end of for

			        		//refresh with 10 rows or the rows left
		        			$('table#admin-pendent-questions-table tbody').append(response); 

		        			// var minimumIdTable2 = $('table#admin-pendent-questions-table tr:nth-child(2)').attr('id').split('_')[4];
		        			// console.log('minimumIdTable2 = ' + minimumIdTable2);

		        			// count new rows
			        		var rowCount2nd = $('table#admin-pendent-questions-table tr').length;
			        		console.log('rowCount2nd refreshed = ' + rowCount2nd );

			        		// console.log('last id = ' + $idDelete);
			        		//if no rows refresh with the 10 previous questions
			        		//if is not the only index, not the 1-10 only
			        		var ShortestNumberP = parseInt($('div#slide-pendent span').text().split("-")[0]);
							console.log('ShortestNumber = ' + ShortestNumberP);

							if (rowCount2nd < 11) {//that means that we are in the last index of questions
								
								var BiggestNumberP = ShortestNumberP + rowCount2nd  - 2; 
								//3 = 1 (heading) + 1 (removed question) + 1 (very substraccion)
								console.log('BiggestNumberP = '+ BiggestNumberP);
								var NewSpanRange = ShortestNumberP.toString() + '-' + BiggestNumberP.toString();
								console.log(NewSpanRange);
								$('div#slide-pendent span').text(NewSpanRange);

							} // end of if rowCount2nd < 11   		        	
						} // End success refresh table with rest of the questions
		    		}); // End AJAX
		    	}//end of ifr RowCountFirst >1  

		    	else { //If there are not rows on the table
		    		console.log('option rowCountFirst <1');
		    		if (ShortestNumberP>1) { //if are not left only the 10 1st questions
		    			//the last id clicked and the highest id is the id clicked $idDelete
		    			var lastId = $idDelete;
		    			console.log('last id = ' + lastId);
		    			//ajax to get the previous 10 questions
		        		$.ajax({  
					        url: "ajax/index.refresh.table.deleted.proposed.question.ajax.php",
					        type: "POST",
					        data: { 'lastId': lastId }, //end of data  
					        'success' : function(response) {
					        	console.log(response);
					       		//refresh with 10 rows or the rows left
		        				$('table#admin-pendent-questions-table tbody').append(response); 

		        				//get the array of tr of table and reverse
				        		var tbody = $('table#admin-pendent-questions-table tbody');
			    				tbody.html($('tr',tbody).get().reverse()); 
			    				//put the heading on the 1st row
			    				$("table#admin-pendent-questions-table tbody tr:last").insertBefore("table#admin-pendent-questions-table tr.row-pendent:first-child");

		        				ShortestNumberP = ShortestNumberP - 10;
		        				var LargestNumberP2 = ShortestNumberP + 9;
		        				var NewSpanRange2 = ShortestNumberP.toString() + '-' + LargestNumberP2.toString();
								console.log(NewSpanRange2);
								$('div#slide-pendent span').text(NewSpanRange2);

					        } // End success refresh table with rest of the questions
		    			}); // End AJAX
		    		} 
		    		else {
		    			$('div#slide-pendent span').text('0-0');
		    		}
		    		//last id = $idDelete
		    		//ajax to get the previous 10 questions
		    		//add it
		    		//update the range
		    	}	//end of else	
				} // End success delete			
	    }); // End AJAX		
	}); //end of click .question-delete

	$(document).on('click','table#admin-pendent-questions-table .question-acept', function(){
		// clean posible searchs
        $('#search-results').html("");
        $('#search-results').addClass('hide');
		//get the id of the question to be deleted
		$idDelete = $(this).parent().parent().children('td:first').text();
		console.log('id to be deleted = ' + $idDelete);
		//questions
		var question1 = $(this).parent().parent().children('td:nth-child(2)').text();
		console.log('question1 = '+question1);
		var question2 = $(this).parent().parent().children('td:nth-child(3)').text();
		console.log('question2 = '+ question2);
		//intital range numbers
		var ShortestNumberP = parseInt($('div#slide-pendent span').text().split("-")[0]);
		console.log('ShortestNumber = ' + ShortestNumberP);
		var LargestNumberP = parseInt($('div#slide-pendent span').text().split("-")[1]);
		console.log('LargestNumberP  = ' + LargestNumberP);
		//number of rows
		var rowCount0 = $('table#admin-pendent-questions-table tr').length;
		console.log('rowCount before action = ' + rowCount0);
		//get the number of row clicked
		var NumRow = $(this).parent().parent().index();
		console.log('Number of row clicked = ' + NumRow);
		//delete the select row on table proposed_questions and 
		//add the question to pair_of_questinons and user_questions
		//and refresh
		$.ajax({  
	        url: "ajax/index.approved.proposed.question.ajax.php",
	        type: "POST",
	        data: {
	         'idDelete': $idDelete,
	         'idUser':idUser,
	         'question1': question1,
	         'question2': question2
	        }, //end of data  

	        'success' : function(response) {

	        	console.log('question deleted and introduce in tables user_questions + pair_of_questinons');
	        	// console.log('rowCount0 = ' +rowCount0);

	        	//delete the row acepted on screen
	        	$('table#admin-pendent-questions-table tr:nth-child('+ (NumRow+1) + ")").remove();
	        	//count the number of rows after remove the clicked row
				var rowCountFirst = $('table#admin-pendent-questions-table tbody tr').length;
				console.log('rowCount 1st after remove row clicked = ' + rowCountFirst);
				
				//refresh the table
				if (rowCountFirst >1){ //if there are at least 1 row of questions then do it:
		        	//get the min id of the list
		        	console.log('option rowCountFirst >1');
		        	var minimumIdTable = $('table#admin-pendent-questions-table tr:nth-child(2)').attr('id').split('_')[4];
		        	console.log('minimumIdTable = ' + minimumIdTable);

	        		//ajax to refresh table with more rows until ten more questions if they exist
	        		$.ajax({  
				        url: "ajax/index.refresh.table.proposed.question.ajax.php",
				        type: "POST",
				        data: {
				         'minimumIdTable': minimumIdTable
				        }, //end of data  
				        'success' : function(response) {
				        	console.log(response);
				        	//delete the rest of the remainding rows
				        	// console.log('rowCountFirst = ' + rowCountFirst);
				        	for (var i = 1; i < rowCountFirst; i++) {
				        		$("table#admin-pendent-questions-table tr.row-pendent:last").remove();
			        		}; //end of for

			        		//refresh with 10 rows or the rows left
		        			$('table#admin-pendent-questions-table tbody').append(response); 

		        			// var minimumIdTable2 = $('table#admin-pendent-questions-table tr:nth-child(2)').attr('id').split('_')[4];
		        			// console.log('minimumIdTable2 = ' + minimumIdTable2);

		        			// count new rows
			        		var rowCount2nd = $('table#admin-pendent-questions-table tr').length;
			        		console.log('rowCount2nd refreshed = ' + rowCount2nd );

			        		// console.log('last id = ' + $idDelete);
			        		//if no rows refresh with the 10 previous questions
			        		//if is not the only index, not the 1-10 only
			        		var ShortestNumberP = parseInt($('div#slide-pendent span').text().split("-")[0]);
							console.log('ShortestNumber = ' + ShortestNumberP);

							if (rowCount2nd < 11) {//that means that we are in the last index of questions
								
								var BiggestNumberP = ShortestNumberP + rowCount2nd  - 2; 
								//3 = 1 (heading) + 1 (removed question) + 1 (very substraccion)
								console.log('BiggestNumberP = '+ BiggestNumberP);
								var NewSpanRange = ShortestNumberP.toString() + '-' + BiggestNumberP.toString();
								console.log(NewSpanRange);
								$('div#slide-pendent span').text(NewSpanRange);

							} // end of if rowCount2nd < 11   		        	
						} // End success refresh table with rest of the questions
		    		}); // End AJAX
		    	}//end of ifr RowCountFirst >1  

		    	else { //If there are not rows on the table
		    		console.log('option rowCountFirst <1');
		    		if (ShortestNumberP>1) { //if are not left only the 10 1st questions
		    			//the last id clicked and the highest id is the id clicked $idDelete
		    			var lastId = $idDelete;
		    			console.log('last id = ' + lastId);
		    			//ajax to get the previous 10 questions
		        		$.ajax({  
					        url: "ajax/index.refresh.table.deleted.proposed.question.ajax.php",
					        type: "POST",
					        data: { 'lastId': lastId }, //end of data  
					        'success' : function(response) {
					        	console.log(response);
					       		//refresh with 10 rows or the rows left
		        				$('table#admin-pendent-questions-table tbody').append(response); 

		        				//get the array of tr of table and reverse
				        		var tbody = $('table#admin-pendent-questions-table tbody');
			    				tbody.html($('tr',tbody).get().reverse()); 
			    				//put the heading on the 1st row
			    				$("table#admin-pendent-questions-table tbody tr:last").insertBefore("table#admin-pendent-questions-table tr.row-pendent:first-child");

		        				ShortestNumberP = ShortestNumberP - 10;
		        				var LargestNumberP2 = ShortestNumberP + 9;
		        				var NewSpanRange2 = ShortestNumberP.toString() + '-' + LargestNumberP2.toString();
								console.log(NewSpanRange2);
								$('div#slide-pendent span').text(NewSpanRange2);

					        } // End success refresh table with rest of the questions
		    			}); // End AJAX
		    		} 
		    		else {
		    			$('div#slide-pendent span').text('0-0');
		    		}
		    	}	//end of else	
				} // End success delete and add			
	    }); // End AJAX		
	}); //end of click .question-acept
		
}); // end of document