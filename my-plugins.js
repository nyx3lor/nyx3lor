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
        },
        maxsm_themes_show_year_rating: {
            ru: "Рік і рейтинг зверху справа",
            en: "Year and rating top right",
            uk: "Рік і рейтинг зверху справа",
            be: "Год і рэйтынг зверху справа",
            zh: "右上角显示年份和评分",
            pt: "Ano e classificação no canto superior direito",
            bg: "Година и рейтинг горе вдясно",
            he: "שנה ודירוג למעלה מימין",
            cs: "Rok a hodnocení vpravo nahoře"
        }
    });

    var maxsm_themes = {
        settings: {
            translate_tv: false,
            big_buttons: false,
            show_year_rating: false
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
/* Большие кнопки на странице фильма/сериала */
.full-start__buttons .button {
    font-size: 1.3em !important;
    padding: 1.2em 2.5em !important;
    min-height: 3.5em !important;
}

/* Увеличиваем иконки в кнопках */
.full-start__buttons .button svg {
    width: 1.5em !important;
    height: 1.5em !important;
}

/* Увеличиваем отступы между кнопками */
.full-start__buttons {
    gap: 1em !important;
}
`;
        $('<style id="' + styleId + '">' + css + '</style>').appendTo('head');
    }

    function showYearAndRating() {
        if (!maxsm_themes.settings.show_year_rating) {
            $('#maxsm_themes_year_rating').remove();
            return;
        }

        var styleId = 'maxsm_themes_year_rating';
        $('#' + styleId).remove();

        var css = `
/* Позиционируем год и рейтинг справа сверху */
.full-start__head {
    position: relative;
}

/* Контейнер для года и рейтинга */
.full-start__head::after {
    content: '';
    position: absolute;
    top: 1em;
    right: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5em;
    z-index: 10;
}

/* Год справа сверху */
.full-start__details .full-start__title-sub {
    position: absolute !important;
    top: 1em !important;
    right: 1em !important;
    left: auto !important;
    font-size: 1.2em !important;
    font-weight: bold !important;
    background: rgba(0, 0, 0, 0.7) !important;
    padding: 0.5em 1em !important;
    border-radius: 0.5em !important;
    z-index: 11 !important;
}

/* Рейтинг TMDB справа сверху (под годом) */
.full-start__rate {
    position: absolute !important;
    top: 4em !important;
    right: 1em !important;
    left: auto !important;
    font-size: 1.5em !important;
    background: rgba(0, 0, 0, 0.8) !important;
    padding: 0.5em 1em !important;
    border-radius: 0.5em !important;
    z-index: 11 !important;
}

.full-start__rate-value {
    font-weight: bold !important;
}
`;
        $('<style id="' + styleId + '">' + css + '</style>').appendTo('head');
    }

    function applySettings() {
        translate_tv();
        bigbuttons();
        showYearAndRating();

        if (onetime === false) {
            onetime = true;
        }
    }

    function createSettingsMenu() {
        Lampa.Settings.listener.follow('open', function (e) {
            if (e.name === 'maxsm_themes') {
                translate_tv();
                bigbuttons();
                showYearAndRating();
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

        Lampa.SettingsApi.addParam({
            component: 'maxsm_themes',
            param: {
                name: 'maxsm_themes_show_year_rating',
                type: 'trigger',
                default: false
            },
            field: {
                name: Lampa.Lang.translate('maxsm_themes_show_year_rating')
            },
            onRender: function(item) {
                maxsm_themes.settings.show_year_rating = Lampa.Storage.get('maxsm_themes_show_year_rating', false);
            },
            onChange: function(value) {
                maxsm_themes.settings.show_year_rating = value;
                Lampa.Storage.set('maxsm_themes_show_year_rating', value);
                showYearAndRating();
            }
        });
    }

    function startPlugin() {
        // Загружаем сохраненные настройки
        maxsm_themes.settings.translate_tv = Lampa.Storage.get('maxsm_themes_translate_tv', false);
        maxsm_themes.settings.big_buttons = Lampa.Storage.get('maxsm_themes_big_buttons', false);
        maxsm_themes.settings.show_year_rating = Lampa.Storage.get('maxsm_themes_show_year_rating', false);

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
