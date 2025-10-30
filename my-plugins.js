(function() {
    'use strict';

    Lampa.Lang.add({
        maxsm_themes: {
            ru: "Налаштування",
            en: "Settings",
            uk: "Налаштування",
            be: "Налады",
            zh: "设置",
            pt: "Configurações",
            bg: "Настройки",
            he: "הגדרות",
            cs: "Nastavení"
        },
        maxsm_themes_translate_tv: {
            ru: "Перекладати TV",
            en: "Translate TV",
            uk: "Перекладати TV",
            be: "Перакладаць TV",
            zh: "翻译电视",
            pt: "Traduzir TV",
            bg: "Превод на ТВ",
            he: "תרגום טלוויזיה",
            cs: "Přeložit TV"
        },
        maxsm_themes_big_buttons: {
            ru: "Великі кнопки в картці",
            en: "Large buttons in card",
            uk: "Великі кнопки в картці",
            be: "Вялікія кнопкі ў картцы",
            zh: "卡片中的大按钮",
            pt: "Botões grandes no cartão",
            bg: "Големи бутони в картата",
            he: "כפתורים גדולים בכרטיס",
            cs: "Velká tlačítka v kartě"
        }
    });

    var maxsm_themes = {
        settings: {
            translate_tv: false,
            big_buttons: false
        }
    };

    var onetime = false;

    function translate_tv() {
        if (!maxsm_themes.settings.translate_tv) {
            $('#maxsm_themes_translate_tv').remove();
            return;
        }

        var styleId = 'maxsm_themes_translate_tv';
        $('#' + styleId).remove();

        var css = `
.card__type::after {
    content: "" !important;
}
`;
        $('<style id="' + styleId + '">' + css + '</style>').appendTo('head');
    }

    function bigbuttons() {
        if (!maxsm_themes.settings.big_buttons) {
            $('#maxsm_themes_big_buttons').remove();
            return;
        }

        var styleId = 'maxsm_themes_big_buttons';
        $('#' + styleId).remove();

        var css = `
.full-start__buttons .button {
    font-size: 1.3em !important;
    padding: 1.2em 2.5em !important;
}
`;
        $('<style id="' + styleId + '">' + css + '</style>').appendTo('head');
    }

    function hideYearOnPosters() {
        var styleId = 'maxsm_themes_hide_year';
        $('#' + styleId).remove();

        var css = `
.card__year {
    display: none !important;
}
`;
        $('<style id="' + styleId + '">' + css + '</style>').appendTo('head');
    }

    function forall() {
        // Постоянное скрытие года на постерах
        hideYearOnPosters();
    }

    function applySettings() {
        translate_tv();
        bigbuttons();

        if (onetime === false) {
            onetime = true;
            forall();
        }
    }

    function createSettingsMenu() {
        Lampa.Settings.listener.follow('open', function (e) {
            if (e.name === 'maxsm_themes') {
                translate_tv();
                bigbuttons();
            }
        });

        Lampa.SettingsApi.addComponent({
            component: 'maxsm_themes',
            name: Lampa.Lang.translate('maxsm_themes'),
            icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>'
        });

        Lampa.SettingsApi.addParam({
            component: 'maxsm_themes',
            param: {
                name: 'maxsm_themes_translate_tv',
                type: 'trigger',
                default: false
            },
            field: {
                name: Lampa.Lang.translate('maxsm_themes_translate_tv')
            },
            onRender: function(item) {
                maxsm_themes.settings.translate_tv = Lampa.Storage.get('maxsm_themes_translate_tv', false);
            },
            onChange: function(value) {
                maxsm_themes.settings.translate_tv = value;
                Lampa.Storage.set('maxsm_themes_translate_tv', value);
                translate_tv();
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'maxsm_themes',
            param: {
                name: 'maxsm_themes_big_buttons',
                type: 'trigger',
                default: false
            },
            field: {
                name: Lampa.Lang.translate('maxsm_themes_big_buttons')
            },
            onRender: function(item) {
                maxsm_themes.settings.big_buttons = Lampa.Storage.get('maxsm_themes_big_buttons', false);
            },
            onChange: function(value) {
                maxsm_themes.settings.big_buttons = value;
                Lampa.Storage.set('maxsm_themes_big_buttons', value);
                bigbuttons();
            }
        });
    }

    function startPlugin() {
        // Загружаем сохраненные настройки
        maxsm_themes.settings.translate_tv = Lampa.Storage.get('maxsm_themes_translate_tv', false);
        maxsm_themes.settings.big_buttons = Lampa.Storage.get('maxsm_themes_big_buttons', false);

        // Создаем меню настроек
        createSettingsMenu();

        // Применяем настройки
        applySettings();
    }

    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                startPlugin();
            }
        });
    }
})();
