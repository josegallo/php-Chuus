$(document).ready(function() {

    // hide search-results
    $('div#search-results').addClass('hide');
    // variables
    var Header = $('Header');
    var Title = $('h2.que-prefieres');
    var CenterSignal = $('.questions.or-signal');
    var LeftArrow = $('.left-arrow');
    var RightArrow = $('.right-arrow');
    var LeftSquare = $('.left-square');
    var RightSquare = $('.right-square');
    var Footer = $('Footer');
    var Overlap = 15;
    var SocialButtons = $('.social');
    var DeltaTop = 50;
   	var MinimunDistanceWindow = CenterSignal.width() + 
   								LeftArrow.width() +
   								RightArrow.width() +
   								LeftSquare.width() +
   								RightSquare.width();

    var FooterTop = parseInt(LeftSquare.css('top')) - Header.height() + 20;

    //recolocate functions
    function CenterSignalPos() {
    	CenterSignal.css({ 
		    'left': ($(window).width()/2 - CenterSignal.width()/2 -5) + 'px', 
            'top': + parseInt(CenterSignal.css('top'))  + DeltaTop + 'px',
		});
    }

    function TitlePos() {
    	Title.css({ 
		    'left': ($(window).width()/2 - Title.width()/2 - 10) + 'px',
            'top': TitleTop - Title.height()+  'px', 
		});
    }

    function LeftArrowPos() {  	        
    	LeftArrow.css({ 
		    'left': ($(window).width()/2 - CenterSignal.width()/2 - $(".left-square").width() - LeftArrow.width()) + 'px', 
            'top': + parseInt(LeftArrow.css('top'))  + DeltaTop + 'px', 
        });
    }

    function RightArrowPos() {
    	RightArrow.css({ 
		    'left': ($(window).width()/2 + CenterSignal.width()/2 + $(".right-square").width()) + 'px', 
		    'top': + parseInt(RightArrow.css('top'))  + DeltaTop + 'px', 
        });
    }

   	function LeftSquarePos() {
    	LeftSquare.css({ 
		    'left': ($(window).width()/2 - CenterSignal.width()/2 - $(".right-square").width() + Overlap) + 'px', 
            'top': + parseInt(LeftSquare.css('top'))  + DeltaTop + 'px', 
		});
    }

   	function RightSquarePos() {
    	RightSquare.css({ 
		    'left': ($(window).width()/2 + CenterSignal.width()/2 - Overlap) + 'px', 
            'top': + parseInt(RightSquare.css('top'))  + DeltaTop + 'px', 
		});
    }

    function FooterPos() {
        Footer.css({ 
            // 'top': FooterTop + 'px',
            // 'margin-top': 
            // 'z-index': '0'
        });
    }

    function SocialButPos() {
        SocialButtons.css({ 
            'left': ($(window).width()/2 - (200)) + 'px',
        });
    }

    //call functions
    CenterSignalPos();
    LeftArrowPos();LeftSquarePos();
    RightArrowPos(); RightSquarePos();
    // FooterPos(); 
    SocialButtons.css;

    //Tittle have to be recolocated after the other elements
    var TitleTop = Header.height() + (parseInt(LeftSquare.css('top')) - Header.height())/5; 
    TitlePos();

    //hide the complement black
    $('section#complementblack').addClass('hide');
    
    // recolocate witht the resize of window
    $(window).resize(function(){
        DeltaTop = 0;
    	if ($(window).width()> MinimunDistanceWindow) {
	    	TitlePos(); CenterSignalPos(); 
	    	LeftArrowPos(); LeftSquarePos();
			RightArrowPos();RightSquarePos();
            SocialButPos();
    	};//end of if ($(window).width()>MinimunDistanceWindow) 
	}); // end of $(window).resize
}); // end of document