(function () {
    'use strict';
    
    function hideTVIcon() {
        const hideCSS = `
            .card_type {
                display: none !important;
                visibility: hidden !important;
            }
        `;

        const styleTag = document.createElement("style");
        styleTag.textContent = hideCSS;
        document.head.appendChild(styleTag);
    }

    if (window.appready) {
        hideTVIcon();
    }
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                hideTVIcon();
            }
        });
    }
})();
