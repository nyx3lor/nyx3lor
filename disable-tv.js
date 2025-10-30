(function() {
    'use strict';
    
    // Функция для скрытия TV иконок
    function hideTVIcons() {
        // Находим все элементы с классом card_type
        const tvIcons = document.querySelectorAll('.card_type');
        
        // Скрываем каждый найденный элемент
        tvIcons.forEach(icon => {
            icon.style.display = 'none';
        });
    }
    
    // Запускаем при загрузке страницы
    hideTVIcons();
    
    // Наблюдаем за изменениями DOM для динамически загружаемых карточек
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                hideTVIcons();
            }
        });
    });
    
    // Настройка наблюдателя
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
