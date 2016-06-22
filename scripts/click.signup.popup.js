$(document).ready(function() {
    //center the pop on the window
	var singUp = $('form#sign-up');
	singUp.css({ 
	    'left': ($(window).width() / 2 - $(singUp).width() / 2) + 'px', 
	    'top': ($(window).height() / 2 - $(singUp).height() / 2 - 50) + 'px'
	});
    //drag the signup popup
    $(function() { $("#draggable-signup").draggable(); });
    //when click "registrarse" display the pop up or "Crea una cuenta" on login, clean the input boxes and remove the login popup
	$("ul.header.sing-up, #sign-up-from-login").click(function() {
        // console.log('#sing-up clicked');
        $("form#sign-up").css("display", "block");
        $('span#title-popup-sign-up').css("display", "inline-block");
        $('#close-sign-up-wrap').parent().parent().show();
        // console.log('clicked onclick');
        $('#sign-up-error-popup').text("");
        $("#namesu, #emailsu, #passwordsu, #cpasswordsu").val("");
        //remove the popup login
        $('#close-login-wrap').parent().parent().hide();
        $('#login-error-popup').text("");
        $("#email, #password" ).val("");
    });

    //when you click the cross hide the popup and clean the boxes and message errors
    $("#sign-up-close").click(function() {
        $('#close-sign-up-wrap').parent().parent().hide();
        // console.log('clicked close icon');
        $('#sign-up-error-popup').text("");
        $("#namesu, #emailsu, #passwordsu, #cpasswordsu").val("");
    });

    //when press esc is the same when you click on the cross
    $(document).on('keydown','#namesu, #emailsu, #passwordsu, #cpasswordsu', function(e){
        // console.log('e.keycode = ', e.keyCode)
        if (e.keyCode === 27) $('#sign-up-close').click();
    })//end of keypress function

    // function to validate data on SignUp

    function validateSignUp () {
        var name = $("#namesu").val();
        var email = $("#emailsu").val();
        var passwordsu = $("#passwordsu").val();
        var cpasswordsu = $("#cpasswordsu").val();
        var filter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; //>=8 characteres, at least 1 uppercase, 1 lowercase and a number
        console.log('passwords = ' + passwordsu + '-'+ cpasswordsu);
        //if email and password are empty
        if (name == "" || email == "" || passwordsu == "" || cpasswordsu == "") {
            // $('span#title-popup-sign-up').text("");
            $('#sign-up-error-popup').text("Por favor rellena los campos");
            $('span#title-popup-sign-up').css("display", "none");
        } 

        else if (passwordsu != cpasswordsu) {
            // $('span#title-popup-sign-up').text("");
            $('#sign-up-error-popup').text("Las contraseñas no coinciden");
            $('span#title-popup-sign-up').css("display", "none");
        } 

        else if (!filter.test(passwordsu)){
            // $('span#title-popup-sign-up').text("");
            $('#sign-up-error-popup').text("La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 minúscula");
            $('span#title-popup-sign-up').css("display", "none");
        }

        else {//validations if name, email and passwords are typed correctly
            
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
            if (validateEmail(email)) {
                //recolocate footer
                // $('footer').css({ 
                //     'top': 0,
                //     'margin-top': '0px',
                //     // 'z-index': '5'
                // });
                // console.log('validate');
                //check if the email is already in the bbdd, if not return a new user
                $.ajax({
                    url: "ajax/check.signup.ajax.php",
                    type: "POST",
                    data: {
                        'name'      :name,
                        'email'     :email,
                        'passwordsu'  :passwordsu,
                        'cpasswordsu' :cpasswordsu
                    },
                    'success' : function(response) {
                        //the response will be valid_id/emaillallready
                        console.log('response check.signup.ajax = ' + response);
                        //hide top ten questions
                        
                        //if exist in ddbb hide the pop-up, remove the questions and
                        //display the user information
                        // $('#user-dashboard').removeClass('hide');
                        // console.log(response);
                        // var check = response;
                        var check0 = response.split("_")[0];
                        var idUser = response.split("_")[1];
                        console.log('check0 = ' + check0 );
                        // adminStatus = false;
                        // console.log('idUser = ' + idUser);
                        // console.log($name);
                        // console.log(check[0]);
                        // console.log('name = ' + name);
                        if (check0 == 0) {
                            console.log('name after check0 = ' + name);
                            console.log("(check[0] == 'valid')");
                            // delete the title "registrate" on signup form popup
                            $('span#title-popup-sign-up').css("display", "none");
                            //put the text message on error area
                            $('#sign-up-error-popup').text("Por favor, confirma tu cuenta en el email que te hemos enviado");

                            // $('#wrap-top-ten').addClass('hide');
                            // $('wrap-top-ten').css({ 
                            //     'display': 'relative',
                            // });
                            // $('#section#complementblack').addClass('hide');
                            //recolocate top questions, footer and wrap questions
                            $('.wrap-questions').css({ 
                                'height': '290px',
                            });
                            $('section#top-ten').css({ 
                                'background':'transparent',
                            });
                            $('footer').css({ 
                             'top': '200px',
                            });
                            $('div#wrap-top-ten').css({ 
                             'margin-top': '200px',
                            });
                        } //if (check[0] == 'valid')
                        else{ 
                            // if doesn't exist in ddbb or error message
                            // delete the title "registrate" on signup form popup
                            $('span#title-popup-sign-up').css("display", "none");
                            //put the text message on error area
                            $('#sign-up-error-popup').text(response);
                            //recolocate top questions, footer and wrap questions
                            $('.wrap-questions').css({ 
                                'height': '290px',
                            });
                            $('section#top-ten').css({ 
                                'background':'transparent',
                            });
                            $('footer').css({ 
                             'top': '200px',    
                            });
                            $('div#wrap-top-ten').css({ 
                             'margin-top': '200px',
                            });
                        } //end of else of if (check[0] == 'valid')               
                    } // End success of ajax/check.signup.ajax.php
                }); // End AJAX ajax/check.signup.ajax.php    
            } 
            else { // of validateEmail(email)
                // $('span#title-popup-sign-up').text("");
                $('span#title-popup-sign-up').css("display", "none");
                $('#sign-up-error-popup').text("Por favor, introduce email válido");
                $('section#top-ten').css({ 
                    'background':'transparent',
                });
            } //end of else f validateEmail(email)

        } //end of else validations if name, email and passwords are typed
    } //end of function

    
    // SignUp form popup sign-button click event. When you click clean the input boxes
    // and validate the email, add user
    $(document).on('click', '#signupbtn', function(){
        validateSignUp ();  
    }); //end of click #signupbtn

    $(document).on('keypress','#namesu, #emailsu, #passwordsu, #cpasswordsu', function(e){
        if (e.keyCode == 13) {
        // Cancel the default action on keypress event
            e.preventDefault(); 
            validateSignUp ();  
        } //end of if
    })//end of keypress function
}); // end of document
