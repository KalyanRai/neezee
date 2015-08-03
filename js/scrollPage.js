var scrollPage = (function() {
    // Cache and initialise some values
    var config = {
        // Webpage sections
        $sections : $('.wrapper > section'),
        // The navigation links
        $navlinks : $('.nav-wrapper ul li a'), 
        // Index of current section
        currentSection : 0,
        // The body element
        $body : $('html, body'),
        // The body animation speed
        animspeed : 650,
        // The body animation easing (jquery easing)
        animeasing : 'easeInOutExpo'
    };
    
    function init() {
		// Click on a navigation link: the body is scrolled to the position of the respective section
        config.$navlinks.click(function(event) {              
			scrollAnim(config.$sections.eq(getSectionIndex($(this).parent().index())).offset().top);
			return false;
		});

		// 2 waypoints defined:
		// First one when we scroll down: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
		// Second one when we scroll up: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
		config.$sections.waypoint( function(direction) {if(direction === 'down'){changeNav($(this));}}, { offset: '30%' } ).waypoint( function( direction ) {if(direction === 'up'){changeNav($(this));}}, { offset: '-30%' } );

		// On window resize: the body is scrolled to the position of the current section
		$(window).on( 'debouncedresize', function() {
			scrollAnim(config.$sections.eq(config.currentSection).offset().top);
		} );
		
	}

	// Update the current navigation link
	function changeNav($section) {
		config.$navlinks.eq(getLinkIndex(config.currentSection)).removeClass('section-current');
		config.currentSection = $section.index('section');
		config.$navlinks.eq(getLinkIndex(config.currentSection)).addClass('section-current');
	}
    
    // Convert link index to section index
    function getSectionIndex(linkIndex) {
        var sectionIndex = -1;
        if(linkIndex === 0) {
            sectionIndex = 2;
        } else if(linkIndex === 1) {
            sectionIndex = 1;
        } else if(linkIndex === 2) {
            sectionIndex = 0;
        }
        return sectionIndex;
    }
    
    // Convert section index to link index
    function getLinkIndex(sectionIndex) {
        var linkIndex = -1;
        if(sectionIndex === 0) {
            linkIndex = 2;
        } else if(sectionIndex === 1) {
            linkIndex = 1;
        } else if(sectionIndex === 2) {
            linkIndex = 0;
        }
        return linkIndex;
    }        

	// Function to scroll / animate the body
	function scrollAnim(top) {
		config.$body.stop().animate( { scrollTop : top }, config.animspeed, config.animeasing );
	}

	return { init : init };

})();