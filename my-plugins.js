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
        version: '1.0.4'  // Обновлена версия
    };

    var onetime = false;
    var seriesObserver = null;
    var customLayoutEnabled = false;

    function applyCustomizations() {
        // Удаляем старые стили
        $('#ui_customizer_buttons').remove();
        $('#ui_customizer_animations').remove();
        $('#ui_customizer_base').remove();

        // Базовые стили для рейтинга, иконок, лейбла (всегда применяются)
        var base_styles = `
        <style id="ui_customizer_base">
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
                z-index: 10;
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
            /* Стили для лейбла сериалов */
            .card__type {
                position: absolute;
                top: 0.5em;
                left: 0.5em;
                z-index: 5;
                background: linear-gradient(to right, #1e6262dd, #3da18ddd);
                color: white;
                padding: 0.2em 0.4em;
                border-radius: 0.25em;
                font-size: 0.8em;
                font-weight: bold;
            }
            /* Стили для года в оригинальной позиции */
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
            /* Стили для года при кастомном макете (над названием) */
            .ui-custom-layout .card__age {
                position: relative !important;
                right: auto !important;
                bottom: auto !important;
                top: auto !important;
                left: auto !important;
                margin: 0.2em 0 0.5em 0;
                display: block;
                background: rgba(0, 0, 0, 0.7);
                padding: 0.3em 0.5em;
                border-radius: 0.25em;
                z-index: auto;
            }
            .ui-custom-layout .card__title {
                margin-top: 0;
                height: auto;
                max-height: 3.6em;
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
            removeIncompatibleSettings();
            setupObserver();  // Единый observer для лейблов и макета
            updateExistingCards();  // Применяем к текущим карточкам
        }

        applyBigButtons();
        applyAnimations();
        updateCustomLayout();  // Обновляем класс body для макета
    }

    function setupObserver() {
        // Удаляем старый observer
        if (seriesObserver) {
            seriesObserver.disconnect();
        }

        // Единый MutationObserver для карточек (лейблы + макет)
        seriesObserver = new MutationObserver(function(mutations) {
            var shouldUpdate = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1 && (node.classList && (node.classList.contains('card') || node.querySelector('.card')))) {
                            shouldUpdate = true;
                        }
                    });
                }
            });
            if (shouldUpdate) {
                updateSeriesLabels(document.body);
                updateCardLayout(document.body);
            }
        });

        // Наблюдаем за body
        seriesObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function updateExistingCards() {
        updateSeriesLabels(document.body);
        updateCardLayout(document.body);
    }

    function updateSeriesLabels(container) {
        var show_series = localStorage.getItem('ui_customizer_series_label') === 'true';
        var series_caption = Lampa.Lang.translate('ui_customizer_series_caption') || 'SERIES';

        var tvCards = container.querySelectorAll('.card--tv');
        tvCards.forEach(function(card) {
            var view = card.querySelector('.card__view');
            if (!view) return;

            // Оригинальный .card__type (если есть, скрываем или заменяем)
            var originalType = card.querySelector('.card__type.original-type');
            if (originalType) {
                originalType.style.display = show_series ? 'none' : 'block';
            }

            // Кастомный .card__type
            var typeEl = card.querySelector('.card__type');
            if (!typeEl) {
                typeEl = document.createElement('div');
                typeEl.className = 'card__type';
                view.appendChild(typeEl);
            }

            if (show_series) {
                typeEl.textContent = series_caption;
                typeEl.style.display = 'block';
                // Скрываем оригинал
                if (originalType) originalType.style.display = 'none';
            } else {
                typeEl.style.display = 'none';
                // Показываем оригинал, если был
                if (originalType) originalType.style.display = 'block';
            }
        });
    }

    function updateCardLayout(container) {
        var custom_layout = localStorage.getItem('ui_customizer_card_layout') === 'true';
        var cards = container.querySelectorAll('.card');

        cards.forEach(function(card) {
            var ageEl = card.querySelector('.card__age');
            if (!ageEl) return;  // Если года нет, пропускаем

            var titleEl = card.querySelector('.card__title');
            if (!titleEl) return;

            if (custom_layout) {
                // Перемещаем год перед названием
                if (ageEl.parentNode !== card || ageEl.nextSibling !== titleEl) {
                    card.insertBefore(ageEl, titleEl);
                }
            } else {
                // Возвращаем в оригинальную позицию (в .card__view, bottom)
                var view = card.querySelector('.card__view');
                if (view && ageEl.parentNode !== view) {
                    view.appendChild(ageEl);
                }
            }
        });
    }

    function updateCustomLayout() {
        customLayoutEnabled = localStorage.getItem('ui_customizer_card_layout') === 'true';
        if (customLayoutEnabled) {
            $('body').addClass('ui-custom-layout');
        } else {
            $('body').removeClass('ui-custom-layout');
        }
        updateCardLayout(document.body);  // Применяем сразу к существующим
    }

    function applySeriesLabel() {
        updateSeriesLabels(document.body);
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

        // Меню с простым SVG
        var icon_svg = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="currentColor"/></svg>';

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
                description: 'Переносит год выше названия карточки (динамически, без релоада). Рейтинг остаётся как в оригинале.'
            },
            onChange: function(value) {
                updateCustomLayout();
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
                description: 'Показывает метку "СЕРИАЛ" вместо "TV" на карточках сериалов. Выкл — скрывает лейбл.'
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
        version: '1.0.4',
        description: 'UI Customizer for Lampac (Dynamic labels & layout)'
    };

    window.ui_customizer = ui_customizer;
})();
