(function () {
    'use strict';
    
    // CSS для скрытия иконки TV (как в предыдущем коде)
    const hideTVIconCSS = `
        .items-line .items-cards .card[data-type="tv"]:before,
        .card--category-tv .full-icon:before,
        .full-start.tv:before,
        .full-icon.tv-icon:before {
            content: none !important;
            display: none !important;
        }
        .items-line .items-cards .card[data-type="tv"] .badge-tv,
        .card .tv-badge {
            visibility: hidden !important;
            opacity: 0 !important;
        }
    `;
    
    // CSS для toggle-кнопки (простой switch)
    const toggleButtonCSS = `
        #tv-icon-toggle {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9999;
            display: inline-block;
        }
        .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
        }
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 34px;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        input:checked + .slider {
            background-color: #2196F3;
        }
        input:checked + .slider:before {
            transform: translateX(26px);
        }
        .toggle-label {
            color: white;
            margin-right: 10px;
            font-size: 14px;
        }
    `;
    
    let styleTag = null;
    let toggleEnabled = localStorage.getItem('hideTVIcon') === 'true';
    
    function applyHideTV(hide) {
        if (styleTag) {
            if (hide) {
                styleTag.textContent += hideTVIconCSS;
            } else {
                // Удаляем только правила скрытия
                styleTag.textContent = toggleButtonCSS;
            }
        }
        localStorage.setItem('hideTVIcon', hide);
        toggleEnabled = hide;
    }
    
    function createToggle() {
        // Создаём стили для кнопки и скрытия
        styleTag = document.createElement('style');
        styleTag.id = 'tv-toggle-styles';
        styleTag.textContent = toggleButtonCSS + (toggleEnabled ? hideTVIconCSS : '');
        document.head.appendChild(styleTag);
        
        // Создаём HTML для кнопки
        const toggleDiv = document.createElement('div');
        toggleDiv.id = 'tv-icon-toggle';
        toggleDiv.innerHTML = `
            <label class="toggle-label">TV Icon</label>
            <label class="switch">
                <input type="checkbox" id="tv-toggle-input" ${toggleEnabled ? 'checked' : ''}>
                <span class="slider"></span>
            </label>
        `;
        document.body.appendChild(toggleDiv);
        
        // Обработчик toggle
        document.getElementById('tv-toggle-input').addEventListener('change', function() {
            const hide = this.checked;
            applyHideTV(hide);
            // Перезагружаем карточки, если нужно (в Lampa)
            if (window.Lampa && Lampa.Activity.active()) {
                Lampa.Activity.active().render(); // Принудительный ререндер активной страницы
            }
        });
    }
    
    if (window.appready) {
        createToggle();
        applyHideTV(toggleEnabled);
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                createToggle();
                applyHideTV(toggleEnabled);
            }
        });
    }
})();
