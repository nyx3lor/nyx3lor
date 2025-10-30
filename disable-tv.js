(function() {
    'use strict';
    
    Lampa.Lang.add({
        lampa_ui: {
            ru: "Интерфейс",
            en: "Interface",
            uk: "Інтерфейс",
            be: "Інтэрфейс",
            zh: "界面",
            pt: "Interface",
            bg: "Интерфейс",
            he: "ממשק",
            cs: "Rozhraní"
        },
        lampa_ui_animations: {
            ru: "Анимации",
            en: "Animations",
            uk: "Анімації",
            be: "Анімацыі",
            zh: "动画",
            pt: "Animações",
            bg: "Анимации",
            he: "אנימציות",
            cs: "Animace"
        },
        lampa_ui_translate_tv: {
            ru: "Заменять слова 'Сериал' на 'Серіал'",
            en: "Replace word 'Serial' to 'Cepiал'",
            uk: "Заміняти слова 'Серіал' на 'Серіал'",
            be: "Замяняць словы 'Серыял' на 'Серіал'",
            zh: "将单词"Serial"替换为"Cepiал"",
            pt: "Substituir palavra 'Serial' por 'Cepiал'",
            bg: "Заменете думата 'Сериал' с 'Серіал'",
            he: "החלף מילה 'Serial' ל-'Cepiал'",
            cs: "Nahradit slovo 'Seriál' za 'Серіал'"
        },
        lampa_ui_bigbuttons: {
            ru: "Большие кнопки в карточке",
            en: "Big buttons in card",
            uk: "Великі кнопки в картці",
            be: "Вялікія кнопкі ў картцы",
            zh: "卡片中的大按钮",
            pt: "Botões grandes no cartão",
            bg: "Големи бутони в картата",
            he: "כפתורים גדולים בכרטיס",
            cs: "Velká tlačítka na kartě"
        }
    });

    var themes_svg = '<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" fill=\"white\"/><path d=\"M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z\" fill=\"white\" fill-opacity=\"0.6\"/></svg>';

    var onetime = false;

    Lampa.SettingsApi.addComponent({
        component: "lampa_ui",
        name: Lampa.Lang.translate('lampa_ui'),
        icon: themes_svg
    });

    Lampa.SettingsApi.addParam({
        component: 'lampa_ui',
        param: {
            name: 'lampa_ui_animations',
            type: 'trigger',
            default: true
        },
        field: {
            name: Lampa.Lang.translate('lampa_ui_animations')
        },
        onChange: function(value) {
            animations();
        }
    });

    Lampa.SettingsApi.addParam({
        component: 'lampa_ui',
        param: {
            name: 'lampa_ui_translate_tv',
            type: 'trigger',
            default: false
        },
        field: {
            name: Lampa.Lang.translate('lampa_ui_translate_tv')
        },
        onChange: function(value) {
            translate_tv();
        }
    });

    Lampa.SettingsApi.addParam({
        component: 'lampa_ui',
        param: {
            name: 'lampa_ui_bigbuttons',
            type: 'trigger',
            default: false
        },
        field: {
            name: Lampa.Lang.translate('lampa_ui_bigbuttons')
        },
        onChange: function(value) {
            bigbuttons();
        }
    });

    function applyTheme() {
        animations();
        translate_tv();
        bigbuttons();

        if (onetime === false) {
            onetime = true;
            forall();
            removeFromSettingsMenu();
            fix_lang();
            incardtemplate();
        }
    }

    function animations() {
        var animationsEnabled = Lampa.Storage.get('lampa_ui_animations', true);
        if (animationsEnabled) {
            $('body').removeClass('no-animations');
        } else {
            $('body').addClass('no-animations');
        }
    }

    function translate_tv() {
        var translateEnabled = Lampa.Storage.get('lampa_ui_translate_tv', false);
        if (translateEnabled) {
            var style = document.getElementById('translate-tv-style');
            if (!style) {
                style = document.createElement('style');
                style.id = 'translate-tv-style';
                style.textContent = '.card__title::after { content: "" !important; }';
                document.head.appendChild(style);
            }
        } else {
            var style = document.getElementById('translate-tv-style');
            if (style) {
                style.remove();
            }
        }
    }

    function bigbuttons() {
        var bigButtonsEnabled = Lampa.Storage.get('lampa_ui_bigbuttons', false);
        if (bigButtonsEnabled) {
            $('body').addClass('big-buttons');
        } else {
            $('body').removeClass('big-buttons');
        }
    }

    function forall() {
        // Дополнительная логика
    }

    function removeFromSettingsMenu() {
        // Логика удаления из меню настроек
    }

    function fix_lang() {
        // Исправление языка
    }

    function incardtemplate() {
        // Шаблоны карточек
    }

    Lampa.Listener.follow('app', function(e) {
        if (e.type == 'ready') {
            applyTheme();
        }
    });

})();
