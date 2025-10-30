(function() {
    const style = document.createElement('style');
    style.textContent = `
        .card_type[bis_skin_checked="1"] {
            display: none !important;
        }
        .card_type {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
})();
