(function() {
    'use strict';
    
    function removeTV() {
        var style = `<style id="remove-tv-marker">
            .card__type,
            .card--tv .card__type {
                display: none !important;
            }
        </style>`;
        
        $('head').append(style);
    }
    
    function startPlugin() {
        removeTV();
    }
    
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function(event) {
            if (event.type === 'ready') {
                startPlugin();
            }
        });
    }
    
    Lampa.Manifest.plugins.push({
        name: 'remove_tv',
        version: '1.0',
        description: 'Remove TV marker from posters'
    });
    
})();
