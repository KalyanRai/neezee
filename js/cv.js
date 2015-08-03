;(function($) {
    $.timeliner = function(options) {
        if ($.timeliners == null) {
            $.timeliners = { options: []};
            $.timeliners.options.push(options);
        }
        else {
            $.timeliners.options.push(options);
        }
        $(document).ready(function() {
            for (var i = 0; i < $.timeliners.options.length; i++) {
                startTimeliner($.timeliners.options[i]);
            }
        });
    }
    
    function startTimeliner(options) {
        var settings = {
            timelineContainer: options['timelineContainer'] || '.cv-timeline-education',
            timelineSectionMarker: options['timelineSectionMarker'] || '.cv-timeline-year',
            timelineSectionContent: options['timelineSectionContent'] || '.cv-timeline-qualification',
            expandAllText: options['expandAllText'] || '+ expand all',
            collapseAllText: options['collapseAllText'] || '- collapse all',
            startOpen: options['startOpen'] || []
        };
                
        function openStartEvents(events) {
            $.each(events, function(index, value) {
                $(value).addClass('selected');
                $(value).css('color' , '#000000');                
                openEvent($(value));
            });
        }
                
        function openEvent(eventHeading) {
            $(eventHeading).addClass('selected');
            $(eventHeading).css('color' , '#000000');             
            $(eventHeading).parent().next().slideDown('slow', function() {
                $(eventHeading).parent().next().children(settings.timelineSectionContent).show('clip');
            });            
        }
        
        function closeEvent(eventHeading) {
            $(eventHeading).removeClass('selected');                    
            $(eventHeading).parent().next().children(settings.timelineSectionContent).hide('clip', function() {
                $(eventHeading).parent().next().slideUp('slow');
                $(eventHeading).css('color' , '#ffffff');                 
            });            
        }
        
        var timelineHeading = settings.timelineSectionMarker + ' ' + '>' + ' h5';
        var timelineToggle = settings.timelineContainer + ' ' + '.timeline-toggle';  
        
        openStartEvents(settings.startOpen);
        
        $(timelineHeading).click(function() {
            if ($(this).hasClass('selected') || $(timelineToggle).hasClass('expanded')) {
                closeEvent($(this));
            } else {
                openEvent($(this));
            }
        });
        
        $(timelineToggle).click(function() {
            if($(timelineToggle).hasClass('expanded')) {
                closeEvent(timelineHeading);  
                $(timelineToggle).removeClass('expanded').html(settings.expandAllText);
            } else {
                $(timelineToggle).addClass('expanded').html(settings.collapseAllText);
                openEvent(timelineHeading);            
            }            
        });       
    };            
})(jQuery);