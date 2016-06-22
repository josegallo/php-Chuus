$(document).ready(function() {

	$(document).on('keypress','#words-search', function(e){
		$('#search-results').html(""); 
        if (e.keyCode == 13) {
        	// Cancel the default action on keypress event
            e.preventDefault(); 
        	// get the word of search in a list
            var wordsSearch = $("#words-search").val().split(' ');
            // console.log(wordsSearch);
            $("#words-search").val("");
			//consult on ddbb to match the words
            $.ajax({  
                url: "ajax/words.search.ajax.php",
                type: "POST",
                data: {
                 'wordsSearch':wordsSearch
                }, //end of data  
                'success' : function(response) {
                	// console.log(response);
                    $('div#search-results').removeClass('hide');
                	//introduce the results
                	$('#search-results').append("<p>Estas son las respuestas para tu busqueda:</p><br>"); 
                	$('#search-results').append(response);
                	//delete repeated questions
                	var seen = {};
					$('#search-results a').each(function() {
					    var txt = $(this).text();
					    if (seen[txt])
					        $(this).remove();
					    else
					        seen[txt] = true;
					}); //end of each function 

                    //hide questions
                    //variables

                    var Title = $('h2.que-prefieres');
                    var CenterSignal = $('.questions.or-signal');
                    var LeftArrow = $('.left-arrow');
                    var RightArrow = $('.right-arrow');
                    var LeftSquare = $('.left-square');
                    var RightSquare = $('.right-square');
                    var Social = $('.social');
                    var Author = $('.author');

                    listofElements = [Title, CenterSignal, LeftArrow, RightArrow, LeftSquare, RightSquare, Social, Author ];

                    for (var i = 0; i < listofElements.length; i++) {
                        listofElements[i].addClass('hide');
                    };
//      
                    //recolocate footer
                    $('footer').css({ 
                        'margin-top': '-18px',
                        'z-index': '0'
                    });
                } // End success  
            }); // End AJAX    
        } //end of if
        else {
            $('div#search-results').addClass('hide');
        }
    })//end of keypress function

}); // end of document