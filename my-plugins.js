(function() {
    'use strict';
    
    Lampa.Lang.add({
        ui_customizer: {
            ru: "Кастомизация UI",
            en: "UI Customizer",
            uk: "Кастомізація UI",
            be: "Кастамізацыя UI",
            zh: "UI 自定义",
            pt: "Personalizador de UI",
            bg: "Персонализиране на UI",
            he: "התאמה אישית של UI",
            cs: "Přizpůsobení UI"
        },
        ui_customizer_card_layout: {
            ru: "Кастомный макет карточек",
            en: "Custom card layout",
            uk: "Кастомний макет карток",
            be: "Кастомны макет карт",
            zh: "自定义卡片布局",
            pt: "Layout personalizado de cartões",
            bg: "Персонализиран макет на карти",
            he: "פריסת כרטיסים מותאמת אישית",
            cs: "Vlastní rozložení karet"
        },
        ui_customizer_series_label: {
            ru: "Показывать метку сериалов",
            en: "Show series label",
            uk: "Показувати мітку серіалів",
            be: "Паказваць пазнаку серыялаў",
            zh: "显示剧集标签",
            pt: "Mostrar rótulo de séries",
            bg: "Показвай етикет на сериали",
            he: "הצג תווית סדרות",
            cs: "Zobrazit štítek seriálů"
        },
        ui_customizer_series_caption: {
            ru: "СЕРИАЛ",       
            en: "SERIES",   
            uk: "СЕРІАЛ",    
            be: "СЕРЫЯЛ",     
            zh: "剧集",       
            pt: "SÉRIE",     
            bg: "СЕРИАЛ",      
            he: "סִדְרָה",  
            cs: "SERIÁL" 
        },
        ui_customizer_big_buttons: {
            ru: "Большие кнопки действий",
            en: "Large action buttons",
            uk: "Великі кнопки дій",
            be: "Вялікія кнопкі дзеяньняў",
            zh: "大动作按钮",
            pt: "Botões de ação grandes",
            bg: "Големи бутони за действия",
            he: "כפתורי פעולה גדולים",
            cs: "Velké akční tlačítka"
        },
        ui_customizer_animations: {
            ru: "Анимации элементов",
            en: "Element animations",
            uk: "Анімації елементів",
            be: "Анімацыі элементаў",
            zh: "元素动画",
            pt: "Animações de elementos",
            bg: "Анимации на елементи",
            he: "אנימציות אלמנטים",
            cs: "Animace prvků"
        }
    });

    var ui_customizer = {
        name: 'ui_customizer',
        version: '1.0.1'  // Обновлена версия
    };

    var onetime = false;

    function applyCustomizations() {
        // Удаляем старые стили
        $('#ui_customizer_layout').remove();
        $('#ui_customizer_series').remove();
        $('#ui_customizer_buttons').remove();
        $('#ui_customizer_animations').remove();
        $('#ui_customizer_base').remove();

        // Базовые стили для года, рейтинга и макета (всегда применяются)
        var base_styles = `
        <style id="ui_customizer_base">
            .card__age {
                position: absolute;
                right: 0em;
                bottom: 0em;
                z-index: 10;
                background: rgba(0, 0, 0, 0.6);
                color: #ffffff;
                font-weight: 700;
                padding: 0.4em 0.6em;
                border-radius: 0.48em 0 0.48em 0;
                line-height: 1.0;
                font-size: 1.0em;
            }
            .card__vote {
                position: absolute;
                top: 0em;
                right: 0em;
                background: rgba(0, 0, 0, 0.6);
                font-weight: 700;
                color: #fff;
                border-radius: 0 0.34em 0 0.34em;
                line-height: 1.0;
                font-size: 1.4em;
            }
            .card__title {
                height: 3.6em;
                text-overflow: ellipsis;
                -webkit-line-clamp: 3;
                line-clamp: 3;
            }
            .card__icons {
                position: absolute;
                top: 2em;
                left: 0;
                display: flex;
                justify-content: center;
                background: rgba(0, 0, 0, 0.6);
                color: #fff;
                border-radius: 0 0.5em 0.5em 0;
            }
            .card--small .card__view {
                margin-bottom: 2em;
            }
            .items-line--type-cards {
                min-height: 18em;
            }
            @media screen and (max-width: 480px) {
                .full-start-new__head, .full-start-new__title, .full-start__title-original, .full-start__rate, .full-start-new__reactions, .full-start-new__rate-line, .full-start-new__buttons, .full-start-new__details, .full-start-new__tagline {
                    justify-content: center;
                    text-align: center;
                }
                .full-start__title-original {
                    max-width: 100%;
                }
            }
            .full-start__background.loaded {
                opacity: 0.8;
            }
            .full-start__background.dim {
                opacity: 0.2;
            }
            .selectbox-item__checkbox {
                border-radius: 100%;
            }
            .selectbox-item--checked .selectbox-item__checkbox {
                background: #ccc;
            }
            .full-start__rate {
                border-radius: 0.25em;
                padding: 0.3em;
                background-color: rgba(0, 0, 0, 0.3);
            }
            .explorer__files .torrent-filter .simple-button {
                font-size: 1.2em;
                border-radius: 0.5em;
            }
            .full-review-add, .full-review, .search-source, .bookmarks-folder__layer, .bookmarks-folder__body, .card__img, .card__promo, .full-episode--next .full-episode__img:after, .full-episode__img img, .full-episode__body, .full-person__photo, .card-more__box, .full-start__button, .simple-button, .register {
                border-radius: 0.5em;
            }
            .items-line.items-line--type-cards + .items-line.items-line--type-cards {
                margin-top: 1em;
            }
            @media screen and (min-width: 580px) {
                .full-start-new {
                    min-height: 80vh;
                    display: flex;
                }
            }
        </style>
        `;
        $('body').append(base_styles);

        if (onetime === false) {
            onetime = true;
            applyCardTemplates();
            removeIncompatibleSettings();
        }

        applySeriesLabel();
        applyBigButtons();
        applyAnimations();
    }

    function applyCardTemplates() {
        var custom_layout = localStorage.getItem('ui_customizer_card_layout') === 'true';
        if (custom_layout) {
            // Шаблон карточки с годом выше
            Lampa.Template.add('card', `<div class="card selector layer--visible layer--render">
                <div class="card__view">
                    <img src="./img/img_load.svg" class="card__img" />
                    <div class="card__icons">
                        <div class="card__icons-inner"></div>
                    </div>
                    <div class="card__age">{release_year}</div>
                </div>
                <div class="card__title">{title}</div>
            </div>`);

            // Шаблон эпизода
            Lampa.Template.add('card_episode', `<div class="card-episode selector layer--visible layer--render">
                <div class="card-episode__body">
                    <div class="full-episode">
                        <div class="full-episode__img">
                            <img />
                        </div>
                        <div class="full-episode__body">
                            <div class="card__title">{title}</div>
                            <div class="card__age">{release_year}</div>
                            <div class="full-episode__num hide">{num}</div>
                            <div class="full-episode__name">{name}</div>
                            <div class="full-episode__date">{date}</div>
                        </div>
                    </div>
                </div>
                <div class="card-episode__footer hide">
                    <div class="card__imgbox">
                        <div class="card__view">
                            <img class="card__img" />
                        </div>
                    </div>
                    <div class="card__left">
                        <div class="card__title">{title}</div>
                        <div class="card__age">{release_year}</div>
                    </div>
                </div>
            </div>`);
        }
    }

    function applySeriesLabel() {
        var show_series = localStorage.getItem('ui_customizer_series_label') === 'true';
        var series_caption = Lampa.Lang.translate('ui_customizer_series_caption') || 'SERIES';

        $('#ui_customizer_series').remove();

        var style = $('<style id="ui_customizer_series"></style>');
        $('body').append(style);
        var sheet = style[0].sheet;

        if (show_series) {
            // Скрываем оригинальный .card__type и добавляем кастом ::after с меткой
            sheet.insertRule('.card__type { display: none; }', sheet.cssRules.length);
            var escaped_caption = series_caption.replace(/"/g, '\\"');
            var rule = `.card--tv .card__type::after { content: "${escaped_caption}"; display: block; background: linear-gradient(to right, #1e6262dd, #3da18ddd); color: white; padding: 0.2em 0.4em; border-radius: 0.25em; font-size: 0.8em; font-weight: bold; position: absolute; top: 0.5em; left: 0.5em; z-index: 5; }`;
            sheet.insertRule(rule, sheet.cssRules.length);
        } else {
            // Полностью скрываем
            sheet.insertRule('.card__type, .card--tv .card__type { display: none !important; }', sheet.cssRules.length);
            sheet.insertRule('.card--tv .card__type::after { display: none !important; }', sheet.cssRules.length);
        }
    }

    function applyBigButtons() {
        var big_buttons = localStorage.getItem('ui_customizer_big_buttons') === 'true';
        var style_id = '#ui_customizer_buttons';
        $(style_id).remove();

        if (big_buttons) {
            var buttons_style = `
            <style id="ui_customizer_buttons">
                @media screen and (max-width: 580px) {
                    .full-start-new__buttons {
                        overflow: auto;
                    }
                    .full-start-new__buttons .full-start__button:not(.focus) span {
                        display: none;
                    }
                }
                .full-start-new__buttons .full-start__button:not(.focus) span {
                    display: inline;
                }
            </style>
            `;
            $('body').append(buttons_style);
        }
    }

    function applyAnimations() {
        var animations = localStorage.getItem('ui_customizer_animations') === 'true';
        var style_id = '#ui_customizer_animations';
        $(style_id).remove();

        if (animations) {
            var anim_style = `
            <style id="ui_customizer_animations">
                .card, .torrent-item, .online-prestige, .extensions__item, .extensions__block-add, .full-review-add, .full-review, .tag-count, .full-person, .full-episode, .simple-button, .full-start__button, .items-cards .selector, .card-more, .explorer-card__head-img.selector, .card-episode {
                    transform: scale(1);
                    transition: transform 0.3s ease;
                }
                .card.focus, .torrent-item.focus, .online-prestige.focus, .extensions__item.focus, .extensions__block-add.focus, .full-review-add.focus, .full-review.focus, .tag-count.focus, .full-person.focus, .full-episode.focus, .simple-button.focus, .full-start__button.focus, .items-cards .selector.focus, .card-more.focus, .explorer-card__head-img.selector.focus, .card-episode.focus {
                    transform: scale(1.03);
                }
                .torrent-item.focus, .online-prestige.focus {
                    transform: scale(1.01);
                }
                .menu__item {
                    transition: transform 0.3s ease;
                }
                .menu__item.focus {
                    transform: translateX(-0.2em);
                }
                .selectbox-item, .settings-folder, .settings-param {
                    transition: transform 0.3s ease;
                }
                .selectbox-item.focus, .settings-folder.focus, .settings-param.focus {
                    transform: translateX(0.2em);
                }
            </style>
            `;
            $('body').append(anim_style);
        }
    }

    function removeIncompatibleSettings() {
        Lampa.Settings.listener.follow('open', function(e) {
            if (e.name == 'interface') {
                e.body.find('[data-name="light_version"]').remove();
                e.body.find('[data-name="background"]').remove();
                e.body.find('[data-name="background_type"]').remove();
                e.body.find('[data-name="card_interfice_type"]').remove();
                e.body.find('[data-name="glass_style"]').prev('.settings-param-title').remove();
                e.body.find('[data-name="glass_style"]').remove();
                e.body.find('[data-name="glass_opacity"]').remove();
                e.body.find('[data-name="card_interfice_poster"]').prev('.settings-param-title').remove();
                e.body.find('[data-name="card_interfice_poster"]').remove();
                e.body.find('[data-name="card_interfice_cover"]').remove();
                e.body.find('[data-name="advanced_animation"]').remove();
            }
        });
        Lampa.Storage.set('light_version', 'false');
        Lampa.Storage.set('background', 'false');
        Lampa.Storage.set('card_interfice_type', 'new');
        Lampa.Storage.set('glass_style', 'false');
        Lampa.Storage.set('card_interfice_poster', 'false');
        Lampa.Storage.set('card_interfice_cover', 'true');
        Lampa.Storage.set('advanced_animation', 'false');
    }

    function startPlugin() {
        // Значения по умолчанию
        if (!localStorage.getItem('ui_customizer_series_label')) localStorage.setItem('ui_customizer_series_label', 'true');
        if (!localStorage.getItem('ui_customizer_big_buttons')) localStorage.setItem('ui_customizer_big_buttons', 'true');
        if (!localStorage.getItem('ui_customizer_card_layout')) localStorage.setItem('ui_customizer_card_layout', 'false');
        if (!localStorage.getItem('ui_customizer_animations')) localStorage.setItem('ui_customizer_animations', 'true');

        // Меню
        var icon_svg = '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m491.238281 20.761719c-14.375-14.375-34.265625-21.890625-54.550781-20.625-20.289062 1.269531-39.078125 11.207031-51.550781 27.261719l-98.660157 127.007812-41.109374-41.109375c-12.015626-12.019531-27.996094-18.636719-44.988282-18.636719-16.996094 0-32.972656 6.617188-44.992187 18.636719l-142.363281 142.363281c-17.363282 17.363282-17.363282 45.617188 0 62.980469l180.335937 180.335937c8.679687 8.683594 20.085937 13.023438 31.488281 13.023438 11.40625 0 22.808594-4.339844 31.492188-13.023438l142.363281-142.363281c12.019531-12.019531 18.636719-27.996093 18.636719-44.992187 0-16.992188-6.617188-32.972656-18.636719-44.988282l-41.109375-41.109374 127.007812-98.660157c16.054688-12.472656 25.992188-31.261719 27.261719-51.550781 1.269531-20.292969-6.25-40.175781-20.625-54.550781zm-276.386719 456.722656-15.898437-15.898437 22.957031-22.957032c5.933594-5.9375 5.933594-15.558594 0-21.496094-5.933594-5.933593-15.558594-5.933593-21.492187 0l-22.957031 22.957032-10.152344-10.148438 44.210937-44.210937c5.9375-5.933594 5.9375-15.558594 0-21.492188-5.933593-5.9375-15.558593-5.9375-21.492187 0l-44.210938 44.210938-42.265625-42.265625 22.957031-22.957032c5.9375-5.9375 5.9375-15.558593 0-21.496093-5.933593-5.933594-15.558593-5.933594-21.492187 0l-22.957031 22.957031-10.152344-10.148438 44.210938-44.210937c5.9375-5.933594 5.9375-15.558594 0-21.492187-5.933594-5.9375-15.558594-5.9375-21.492188 0l-44.210938 44.210937-15.898437-15.898437c-5.511719-5.511719-5.511719-14.484376 0-19.996094l77.199219-77.195313 200.328125 200.328125-77.199219 77.199219c-5.511719 5.511719-14.480469 5.511719-19.992188 0zm118.6875-98.695313-200.328124-200.328124 18.175781-18.175782 200.328125 200.328125zm53.40625-67.167968c0 8.875-3.457031 17.222656-9.734374 23.496094l-4 4.003906-191.484376-191.480469-8.847656-8.847656 4.003906-4.003907c6.273438-6.277343 14.621094-9.730468 23.496094-9.730468s17.21875 3.453125 23.492188 9.730468l153.339844 153.335938c6.277343 6.277344 9.734374 14.621094 9.734374 23.496094zm94.578126-238.210938c-.726563 11.589844-6.398438 22.324219-15.570313 29.449219l-130.019531 101-27.796875-27.792969 101.003906-130.019531c7.125-9.171875 17.855469-14.847656 29.449219-15.570313 11.578125-.71875 22.945312 3.566407 31.15625 11.777344 8.210937 8.210938 12.503906 19.570313 11.777344 31.15625zm0 0" fill="#000000" style="fill: rgb(255, 255, 255);"></path><path d="m439.84375 56.953125c-7.949219 0-15.566406 6.992187-15.195312 15.199219.367187 8.234375 6.675781 15.199218 15.195312 15.199218 7.953125 0 15.566406-6.988281 15.199219-15.199218-.367188-8.234375-6.675781-15.199219-15.199219-15.199219zm0 0" fill="#000000" style="fill: rgb(255, 255, 255);"></path></svg>`;

        Lampa.SettingsApi.addComponent({
            component: "ui_customizer",
            name: Lampa.Lang.translate('ui_customizer'),
            icon: icon_svg
        });

        Lampa.SettingsApi.addParam({
            component: 'ui_customizer',
            param: {
                name: 'ui_customizer_card_layout',
                type: "trigger",
                "default": false
            },
            field: {
                name: Lampa.Lang.translate('ui_customizer_card_layout'),
                description: 'Переносит год выше названия, оптимизирует рейтинг и иконки в карточках. Требует перезагрузки страницы.'
            },
            onChange: function(value) {
                if (value) window.location.reload();
                else applyCustomizations();
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'ui_customizer',
            param: {
                name: 'ui_customizer_series_label',
                type: "trigger",
                "default": true
            },
            field: {
                name: Lampa.Lang.translate('ui_customizer_series_label'),
                description: 'Заменяет лейбл "TV" на "СЕРИАЛ" (или эквивалент). Выкл — скрывает лейбл полностью.'
            },
            onChange: function(value) {
                applySeriesLabel();
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'ui_customizer',
            param: {
                name: 'ui_customizer_big_buttons',
                type: "trigger",
                "default": true
            },
            field: {
                name: Lampa.Lang.translate('ui_customizer_big_buttons'),
                description: 'Увеличивает кнопки (play, torrent) в полном экране, текст скрывается на мобильных.'
            },
            onChange: function(value) {
                applyBigButtons();
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'ui_customizer',
            param: {
                name: 'ui_customizer_animations',
                type: "trigger",
                "default": true
            },
            field: {
                name: Lampa.Lang.translate('ui_customizer_animations'),
                description: 'Добавляет лёгкое масштабирование при фокусе на элементах.'
            },
            onChange: function(value) {
                applyAnimations();
            }
        });

        applyCustomizations();
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

    Lampa.Manifest.plugins = {
        name: 'ui_customizer',
        version: '1.0.1',
        description: 'UI Customizer for Lampac'
    };

    window.ui_customizer = ui_customizer;
})();
