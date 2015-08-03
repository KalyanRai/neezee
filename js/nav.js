$(document).ready(function() {
    var open = false;
    
    $('#nav-button').click(function(event) {
        $('#nav-hint').css('display', 'none');
        if(!open) {            
            $('.nav-wrapper').addClass('opened-nav');
            $(this).text('-');
            open = true;
        } else {
            $('.nav-wrapper').removeClass('opened-nav');
            $(this).text('+');
            open = false;
        }
        event.stopPropagation();
    });    
});