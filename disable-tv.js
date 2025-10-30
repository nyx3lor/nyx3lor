(function() {
    'use strict';
    
    // Підключаємося до рендеру карток Lampa
    Lampa.Listener.follow('full', function(e) {
        if (e.type === 'complite') {
            setTimeout(function() {
                // Знаходимо всі TV іконки після повного завантаження
                document.querySelectorAll('.card_type').forEach(function(el) {
                    el.remove(); // Видаляємо елемент повністю
                });
            }, 100);
        }
    });
    
    // Додатково через CSS для швидкості
    var style = document.createElement('style');
    style.innerHTML = '.card_type { display: none !important; visibility: hidden !important; }';
    document.head.appendChild(style);
    
})();
