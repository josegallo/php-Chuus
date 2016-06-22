$(document).ready(function() {
    //center the pop on the window
	var popup = $('#login');
	popup.css({ 
	    'left': ($(window).width() / 2 - $(popup).width() / 2) + 'px', 
	    'top': ($(window).height() / 2 - $(popup).height() / 2 - 50) + 'px'
	});

    //drag and drop 
    $(function() {
        $( "#draggable-login").draggable();
    });
    //when click login or "enviar preguntas" display the pop up, 
    //if you click again clean the input boxes
	$("#onclick, div#header-submit a").click(function() {
    // $("#onclick, #header-submit").click(function() {

        // console.log('#onclick clicked');
        $("#login").css("display", "block");
        $('#close-login-wrap').parent().parent().show();
        // console.log('clicked onclick');
        $('#login-error-popup').text("");
        $("#email").val("");
        $("#password").val("");
        //remove the signup popup
        $('#close-sign-up-wrap').parent().parent().hide();
        $('#sign-up-error-popup').text("");
        $("#namesu, #emailsu, #passwordsu, #cpasswordsu").val("");
    });

    //when you click the cross hide the popup and clean the boxes and message errors
    $("#login #popup-close").click(function() {
        $('#close-login-wrap').parent().parent().hide();
        // console.log('clicked close icon');
        $('#login-error-popup').text("");
        $("#email").val("");
        $("#password").val("");
    });

    //when press esc is the same that when you click on the cross
    $(document).on('keydown','#email, #password', function(e){
        // console.log('e.keycode = ', e.keyCode)
        if (e.keyCode === 27) $('#popup-close').click();
    })//end of keypress function
    // function to validate data on login popup

    function validateLogin () {
        var email = $("#email").val();
        emailLogin = email;
        // console.log('emailLogin = ' + emailLogin);
        var password = $("#password").val();
        // console.log('password = ' + password);
        //if email and password are empty
        if (email == "" || password == "") {
            $('#login-error-popup').text("Por favor rellena los campos");
        } 
        //validations if email and password are typed
        else {
            function validateEmail(email) {
                var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
                if (filter.test(email)) { 
                    // console.log('filter true');
                    return true;} 
                else { 
                    // console.log('filter false');
                    return false; }
                } //end of validate
            //if the email is correctly written
            if (validateEmail(emailLogin)) {
                // console.log('validate');
                //recolocate the footer
                $('footer').css({ 
                    'top': 0,
                    'margin-top': '0px',
                    'z-index': '0'
                });

                //check if the email and password match in the ddbb
                $.ajax({
                    url: "ajax/check.login.ajax.php",
                    type: "POST",
                    data: {
                        'email'     :email,
                        'password'  :password
                    },
                    'success' : function(response) {
                        // //the response is numofrows_false/true_name_idUser_adminstatus(true/false)
                        //hide top ten questions
                        // $('#wrap-top-ten').addClass('hide');
                        //add complement black
                        $('section#complementblack').removeClass('hide');
                        //if exist in ddbb hide the pop-up, remove the questions and
                        // display the user information
                        $('#user-dashboard').removeClass('hide');
                        // console.log(response);
                        var check = response;
                        check = check.split("_");
                        $name = check[2];
                        idUser = check[3];
                        adminStatus = check[4];
                        var active = check[5];
                        // console.log('idUser = ' + idUser);
                        // console.log($name);
                        // console.log(check[0]);
                        if (check[1] == 'true') {
                            if (active == 1) { //if the account have been validated
                                // console.log(check[1]);
                                //remove pop-up
                                $("#login").css("display", "none");
                                // console.log("display none");
                                //clean error-get-id errors
                                $("h1#allready-logged").text("");
                                //remove questions
                                //consider add class hide that displays none
                                // $('.wrap-questions').remove();
                                $('.wrap-questions, .que-prefieres').addClass('hide');
                                //add greeting
                                $('#user-dashboard').append("<h3>Hola " + $name + "!</h3>");
                                $('#user-dashboard').append("<h4>Aqui puedes añadir preguntas</h4>");
                                //add head of table 
                                $headerTable = "<table id ='all-user-questions'>";
                                $headerTable += "<tr>";
                                $headerTable += "<th>Primera Pregunta</th>";
                                $headerTable += "<th>Segunda Pregunta</th>";
                                $headerTable += "<th></th>";
                                $headerTable += "</tr>";
                                // console.log($headerTable);
                                
                                $('#user-dashboard').append($headerTable);
                                
                                //add rows of user questions

                                $.ajax({  
                                    url: "ajax/showUserQuestions.ajax.php",
                                    type: "POST",
                                    data: {
                                     'email'    :email,
                                     'idUser'   :idUser
                                    }, //end of data  
                                    'success' : function(response) {
                                        // clean posible searchs
                                        $('#search-results').html("");
                                        $('#search-results').addClass('hide');
                                        //hide recover password
                                        $("div#user-dashboard div#recover-pass2").remove();
                                        //hide "envia preguntas" CTA
                                        $('div#header-submit').addClass('hide');
                                        //add error message area
                                        $('#user-dashboard').append("<div id = 'error-cpasword-message'></div>");
                                        
                                        $('wrap-top-ten').addClass('hide');
                                        //response with the list of questions
                                        var listOfQuestions = response;
                                        // console.log(listOfQuestions);
                                        //add the questions in the table
                                        $('#user-dashboard #all-user-questions tbody').append(listOfQuestions);
                                        //add last row of new questions
                                        var lastrow = "<tr>";
                                        lastrow += "<td><input type = 'text' id = 'question_proposed_1' name = 'Question1' placeholder ='Escribe 1ª pregunta'></td>";
                                        lastrow += "<td><input type = 'text' id = 'question_proposed_2' name = 'Question2' placeholder ='Escribe 2ª pregunta'></td>";
                                        lastrow += "<td id = 'addQuestion'>añade</td>";
                                        lastrow += "</tr>";
                                        lastrow  += "</table>";
                                        $('#user-dashboard #all-user-questions tbody').append(lastrow);

                                        //change login menu to user menu

                                        $('#menu-changable').prepend("<a id='remove-login-header' href='#''>Perfil</a>");
                                        // $('#menu-changable').prepend("<a id='Profile-menu' href='#'>Perfil</a>");
                                        $('#onclick').remove();
                                        $('.sing-up a').text("Cambiar contraseña").attr('id','change-password');
                                        //Check if the user is the admin 
                                        if (adminStatus == "True") {
                                            $('.sing-up').append("<li><a id ='admin-access' href='#'>Admin</a></li>");
                                         };
                                        $('.sing-up').append("<li><a id ='logout' href='index.php'>Salir</a></li>");
                                        //eliminate the author and social buttons
                                        $('.author, .social').addClass('hide');
                                        //remove top ten questions
                                        //recolocate elements
                                        $('div#wrap-top-ten').addClass('hide');
                                        $('#user-dashboard').css ({ 
                                            'background': 'black',
                                        });  
                                        $('form#login, form#sign-up').remove();
                                        } // End success  
                                }); // End AJAX 
                            } //end of if (active == 1) 
                            else {
                                $('#login-error-popup').text("Primero activa tu cuenta desde el correo electronico que te hemos enviado");
                            }  //end of else of if (active == 1) 
                        } else{ 
                            // console.log('closed');
                            // if doesn't exist in ddbb error message
                            $('#login-error-popup').text("Revisa usuario y contraseña");
                             $('#user-dashboard').css ({ 
                                'min-height': '477px',
                                'background': 'none',
                        });  
                        };                   
                    } // End success  
                }); // End AJAX     
            } else {
                $('#login-error-popup').text("Por favor, introduce email válido");
            } //end of else login-error-popup       
        } //end of if email and password
    } //end of function

    // Login form popup login-button click event. When you click clean the input boxes
    // and validate the email
    $(document).on('click', '#loginbtn', function(){
        //another option: call via ajax the routines for validation of data on login pop-up
        // $.ajax({ url: "scripts/login.popup.fn.js" }); // End AJAX  
        validateLogin();  
    }); //end of click #loginbtn

    $(document).on('keypress','#email, #password', function(e){
        if (e.keyCode == 13) {
        // Cancel the default action on keypress event
            e.preventDefault(); 
            //another option: call via ajax the routines for validation of data on login pop-up
            // $.ajax({ url: "scripts/login.popup.fn.js" }); // End AJAX
            validateLogin();  
        } //end of if
    })//end of keypress function
}); // end of document
