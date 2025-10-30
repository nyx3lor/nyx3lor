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
        ui_customizer_incardtemplate: {
            ru: "Макет содержимого карточки",
            en: "Card content layout",
            uk: "Макет вмісту картки",
            be: "Макет змесціва карткі",
            zh: "卡片内容布局",
            pt: "Layout do conteúdo do cartão",
            bg: "Оформление на съдържанието в картата",
            he: "פריסת תוכן בכרטיס",
            cs: "Rozvržení obsahu karty"
        },
        ui_customizer_animations: {
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
        ui_customizer_bigbuttons: {
            ru: "Большие кнопки в карточке",
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

    // Основной объект плагина
    var ui_customizer = {
        // Название плагина
        name: 'ui_customizer',
        // Версия плагина
        version: '1.0.5',  // Обновлена для адаптации
        // Настройки по умолчанию
        settings: {
            theme: 'mint_dark'  // Фиксированная базовая тема
        }
    };

    // Запускаем только один раз
    var onetime = false;
    var seriesObserver = null;

    // Функция для применения кастомизаций (адаптировано от applyTheme)
    function applyCustomizations() {
        // Удаляем предыдущие стили
        $('#ui_customizer_theme').remove();
        $('#ui_customizer_animations').remove();
        $('#ui_customizer_bigbuttons').remove();
        $('#ui_customizer_forall').remove();
        $('#ui_customizer_series_label').remove();

        // Базовые стили для фиксированной темы (mint_dark, адаптировано под новый Lampa)
        var base_styles = `
        <style id="ui_customizer_theme">
            .navigation-bar__body {
                background: rgba(18, 32, 36, 0.96);
            }
            .card__quality,
            .card__type::after {
                background: linear-gradient(to right, #1e6262dd, #3da18ddd);
            }
            html, body, .extensions {
                background: linear-gradient(135deg, #0a1b2a, #1a4036);
                color: #ffffff;
            }
            .company-start.icon--broken .company-start__icon,
            .explorer-card__head-img > img,
            .bookmarks-folder__layer,
            .card-more__box,
            .card__img,
            .extensions__block-add,
            .extensions__item {
                background-color: #1e2c2f;
            }
            .search-source.focus,
            .simple-button.focus,
            .menu__item.focus,
            .menu__item.traverse,
            .menu__item.hover,
            .full-start__button.focus,
            .full-descr__tag.focus,
            .player-panel .button.focus,
            .full-person.selector.focus,
            .tag-count.selector.focus,
            .full-review.focus {
                background: linear-gradient(to right, #1e6262, #3da18d);
                color: #fff;
                box-shadow: 0 0.0em 0.4em rgba(61, 161, 141, 0.0);
            }
            .selectbox-item.focus,
            .settings-folder.focus,
            .settings-param.focus {
                background: linear-gradient(to right, #1e6262, #3da18d);
                color: #fff;
                box-shadow: 0 0.0em 0.4em rgba(61, 161, 141, 0.0);
                border-radius: 0.5em 0 0 0.5em;
            }
            .full-episode.focus::after,
            .card-episode.focus .full-episode::after,
            .items-cards .selector.focus::after,
            .card-more.focus .card-more__box::after,
            .card-episode.focus .full-episode::after,
            .card-episode.hover .full-episode::after,
            .card.focus .card__view::after,
            .card.hover .card__view::after,
            .torrent-item.focus::after,
            .online-prestige.selector.focus::after,
            .online-prestige--full.selector.focus::after,
            .explorer-card__head-img.selector.focus::after,
            .extensions__item.focus::after,
            .extensions__block-add.focus::after,
            .full-review-add.focus::after {
                border: 0.2em solid #3da18d;
                box-shadow: 0 0 0.8em rgba(61, 161, 141, 0.0);
            }
            .head__action.focus,
            .head__action.hover {
                background: linear-gradient(45deg, #3da18d, #1e6262);
            }
            .modal__content {
                background: rgba(18, 32, 36, 0.96);
                border: 0em solid rgba(18, 32, 36, 0.96);
            }
            .settings__content,
            .settings-input__content,
            .selectbox__content,
            .settings-input {
                background: rgba(18, 32, 36, 0.96);
            }
            .torrent-serial {
                background: rgba(0, 0, 0, 0.22);
                border: 0.2em solid rgba(0, 0, 0, 0.22);
            }
            .torrent-serial.focus {
                background-color: #1a3b36cc;
                border: 0.2em solid #3da18d;
            }
        </style>
        `;
        $('head').append(base_styles);

        // Всегда применяем замену лейбла сериалов (без toggle)
        applySeriesLabel();

        // Стили для всех элементов (forall, как в оригинале)
        var forall_style = `
        <style id="ui_customizer_forall">
            @media screen and (max-width: 480px) {
                .full-start-new__head, .full-start-new__title, .full-start__title-original, .full-start__rate, .full-start-new__reactions, .full-start-new__rate-line, .full-start-new__buttons, .full-start-new__details, .full-start-new__tagline {
                    -webkit-justify-content: center;
                    justify-content: center;
                    text-align: center;
                }
                .full-start__title-original {
                    max-width: 100%;
                }
            }
            @media screen and (max-width: 480px) {
                .full-start-new__right {
                    background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0)));
                    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
                    background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
                    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
                }
            }
            .selectbox-item__checkbox {
                border-radius: 100%;
            }
            .selectbox-item--checked .selectbox-item__checkbox {
                background: #ccc;
            }
            .full-start-new__rate-line .full-start__pg {
                font-size: 1em;
                background: #fff;
                color: #000;
            }
            .full-start__rate {
                border-radius: 0.25em;
                padding: 0.3em;
                background-color: rgba(0, 0, 0, 0.3);
            }
            .card__title {
                height: 3.6em;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                -webkit-line-clamp: 3;
                line-clamp: 3;
            }
            .card__age {
                position: absolute;
                right: 0em;
                bottom: 0em;
                z-index: 10;
                background: rgba(0, 0, 0, 0.6);
                color: #ffffff;
                font-weight: 700;
                padding: 0.4em 0.6em;
                -webkit-border-radius: 0.48em 0 0.48em 0;
                -moz-border-radius: 0.48em 0 0.48em 0;
                border-radius: 0.48em 0 0.48em 0;
                line-height: 1.0;
                font-size: 1.0em;
            }
            .card__vote {
                position: absolute;
                bottom: auto;
                right: 0em;
                top: 0em;
                background: rgba(0, 0, 0, 0.6);
                font-weight: 700;
                color: #fff;
                -webkit-border-radius: 0 0.34em 0 0.34em;
                -moz-border-radius: 0 0.34em 0 0.34em;
                border-radius: 0 0.34em 0 0.34em;
                line-height: 1.0;
                font-size: 1.4em;
            }
            .card__icons {
                position: absolute;
                top: 2em;
                left: 0;
                right: auto;
                display: -webkit-box;
                display: -webkit-flex;
                display: -moz-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: center;
                -webkit-justify-content: center;
                -moz-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.6);
                color: #fff;
                -webkit-border-radius: 0 0.5em 0.5em 0;
                -moz-border-radius: 0 0.5em 0.5em 0;
                border-radius: 0 0.5em 0.5em 0;
            }
            .card__icons-inner {
                background: rgba(0, 0, 0, 0);
            }
            .card__marker {
                position: absolute;
                left: 0em;
                top: 4em;
                bottom: auto;
                background: rgba(0, 0, 0, 0.6);
                -webkit-border-radius: 0 0.5em 0.5em 0;
                -moz-border-radius: 0 0.5em 0.5em 0;
                border-radius: 0 0.5em 0.5em 0;
                font-weight: 700;
                font-size: 1.0em;
                padding: 0.4em 0.6em;
                display: -webkit-box;
                display: -webkit-flex;
                display: -moz-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -webkit-align-items: center;
                -moz-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                line-height: 1.2;
                max-width: min(12em, 95%);
                box-sizing: border-box;
            }
            .card__marker > span {
                max-width: min(12em, 95%);
            }
            .items-line.items-line--type-cards + .items-line.items-line--type-cards {
                margin-top: 1em;
            }
            .card--small .card__view {
                margin-bottom: 2em;
            }
            .items-line--type-cards {
                min-height: 18em;
            }
            @media screen and (min-width: 580px) {
                .full-start-new {
                    min-height: 80vh;
                    display: flex;
                }
            }
            .full-start__background.loaded {
                opacity: 0.8;
            }
            .full-start__background.dim {
                opacity: 0.2;
            }
            .explorer__files .torrent-filter .simple-button {
                font-size: 1.2em;
                -webkit-border-radius: 0.5em;
                -moz-border-radius: 0.5em;
                border-radius: 0.5em;
            }
            .full-review-add,
            .full-review,
            .extensions__item,
            .extensions__block-add,
            .search-source,
            .bookmarks-folder__layer,
            .bookmarks-folder__body,
            .card__img,
            .card__promo,
            .full-episode--next .full-episode__img:after,
            .full-episode__img img,
            .full-episode__body,
            .full-person__photo,
            .card-more__box,
            .full-start__button,
            .simple-button,
            .register {
                border-radius: 0.5em;
            }
            .extensions__item.focus::after,
            .extensions__block-add.focus::after,
            .full-episode.focus::after,
            .full-review-add.focus::after,
            .card-parser.focus::after,
            .card-episode.focus .full-episode::after,
            .card-episode.hover .full-episode::after,
            .card.focus .card__view::after,
            .card.hover .card__view::after,
            .card-more.focus .card-more__box::after,
            .register.focus::after {
                border-radius: 1em;
            }
            .search-source.focus,
            .simple-button.focus,
            .menu__item.focus,
            .menu__item.traverse,
            .menu__item.hover,
            .full-start__button.focus,
            .full-descr__tag.focus,
            .player-panel .button.focus,
            .full-person.selector.focus,
            .tag-count.selector.focus {
                border-radius: 0.5em;
            }
            .menu__item.focus {
                border-radius: 0 0.5em 0.5em 0;
            }
            .menu__list {
                padding-left: 0em;
            }
            .menu__item.focus .menu__ico {
                -webkit-filter: invert(1);
                filter: invert(1);
            }
        </style>
        `;
        $('body').append(forall_style);

        // Всегда скрываем оригинальный .card__type для TV (адаптировано)
        var series_hide_style = `
        <style id="ui_customizer_series_label">
            .card__type {
                display: none !important;
            }
            .card--tv .card__type.original-type {
                display: none !important;
            }
        </style>
        `;
        $('body').append(series_hide_style);

        // Применяем toggles
        animations();
        bigbuttons();

        if (onetime === false) {
            onetime = true;
            incardtemplate();
            removeFromSettingsMenu();
        }
    }

    // Динамическая замена лейбла сериалов (всегда активна, observer для новых карточек)
    function applySeriesLabel() {
        var series_caption = Lampa.Lang.translate('ui_customizer_series_caption') || 'SERIES';

        // Удаляем старый observer
        if (seriesObserver) {
            seriesObserver.disconnect();
        }

        // MutationObserver для .card--tv (адаптировано под новый рендер Lampa)
        seriesObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1 && node.classList && node.classList.contains('card--tv')) {
                            updateSeriesLabel(node);
                        }
                    });
                }
            });
        });

        seriesObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Применяем к существующим
        document.querySelectorAll('.card--tv').forEach(function(card) {
            updateSeriesLabel(card);
        });

        function updateSeriesLabel(card) {
            if (!card) return;
            var view = card.querySelector('.card__view');
            if (!view) return;

            // Скрываем оригинал (если есть)
            var originalType = card.querySelector('.card__type.original-type') || card.querySelector('.card__type');
            if (originalType) {
                originalType.classList.add('original-type');
                originalType.style.display = 'none';
            }

            // Добавляем/обновляем кастомный лейбл
            var typeEl = card.querySelector('.card__type.custom-series');
            if (!typeEl) {
                typeEl = document.createElement('div');
                typeEl.className = 'card__type custom-series';
                view.insertBefore(typeEl, view.firstChild);  // В начало view для позиционирования
            }

            typeEl.textContent = series_caption;
            typeEl.style.display = 'block';
            typeEl.style.position = 'absolute';
            typeEl.style.top = '0.5em';
            typeEl.style.left = '0.5em';
            typeEl.style.zIndex = '5';
            typeEl.style.background = 'linear-gradient(to right, #1e6262dd, #3da18ddd)';
            typeEl.style.color = 'white';
            typeEl.style.padding = '0.2em 0.4em';
            typeEl.style.borderRadius = '0.25em';
            typeEl.style.fontSize = '0.8em';
            typeEl.style.fontWeight = 'bold';
        }
    }

    // Шаблоны для макета карточки (как в оригинале, с переносом года)
    function incardtemplate() {
        var incardtemplate = Lampa.Storage.get('ui_customizer_incardtemplate') === 'true';
        if (incardtemplate) {
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

            // Шаблон эпизода с годом
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

    function animations() {
        var animations = Lampa.Storage.get('ui_customizer_animations') === 'true';
        $('#ui_customizer_animations').remove();
        if (animations) {
            var animations_style = `
            <style id="ui_customizer_animations">
                .card {
                    transform: scale(1);
                    transition: transform 0.3s ease;
                }
                .card.focus {
                    transform: scale(1.03);
                }
                .torrent-item,
                .online-prestige {
                    transform: scale(1);
                    transition: transform 0.3s ease;
                }
                .torrent-item.focus,
                .online-prestige.focus {
                    transform: scale(1.01);
                }
                .extensions__item,
                .extensions__block-add,
                .full-review-add,
                .full-review,
                .tag-count,
                .full-person,
                .full-episode,
                .simple-button,
                .full-start__button,
                .items-cards .selector,
                .card-more,
                .explorer-card__head-img.selector,
                .card-episode {
                    transform: scale(1);
                    transition: transform 0.3s ease;
                }
                .extensions__item.focus,
                .extensions__block-add.focus,
                .full-review-add.focus,
                .full-review.focus,
                .tag-count.focus,
                .full-person.focus,
                .full-episode.focus,
                .simple-button.focus,
                .full-start__button.focus,
                .items-cards .selector.focus,
                .card-more.focus,
                .explorer-card__head-img.selector.focus,
                .card-episode.focus {
                    transform: scale(1.03);
                }
                .menu__item {
                    transition: transform 0.3s ease;
                }
                .menu__item.focus {
                    transform: translateX(-0.2em);
                }
                .selectbox-item,
                .settings-folder,
                .settings-param {
                    transition: transform 0.3s ease;
                }
                .selectbox-item.focus,
                .settings-folder.focus,
                .settings-param.focus {
                    transform: translateX(0.2em);
                }
            </style>
            `;
            $('body').append(animations_style);
        }
    }

    function bigbuttons() {
        var bigbuttons = Lampa.Storage.get('ui_customizer_bigbuttons') === 'true';
        $('#ui_customizer_bigbuttons').remove();
        if (bigbuttons) {
            var bigbuttons_style = `
            <style id="ui_customizer_bigbuttons">
                .full-start-new__buttons .full-start__button:not(.focus) span {
                    display: inline;
                }
                @media screen and (max-width: 580px) {
                    .full-start-new__buttons {
                        overflow: auto;
                    }
                    .full-start-new__buttons .full-start__button:not(.focus) span {
                        display: none;
                    }
                }
            </style>
            `;
            $('body').append(bigbuttons_style);
        }
    }

    function removeFromSettingsMenu() {
        // Скрываем несовместимые настройки (как в оригинале)
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
        // Устанавливаем значения по умолчанию
        Lampa.Storage.set('light_version', 'false');
        Lampa.Storage.set('background', 'false');
        Lampa.Storage.set('card_interfice_type', 'new');
        Lampa.Storage.set('glass_style', 'false');
        Lampa.Storage.set('card_interfice_poster', 'false');
        Lampa.Storage.set('card_interfice_cover', 'true');
        Lampa.Storage.set('advanced_animation', 'false');
    }

    // Функция инициализации плагина
    function startPlugin() {
        // Значения по умолчанию (убрал translate_tv)
        if (Lampa.Storage.get('ui_customizer_animations') === undefined) {
            Lampa.Storage.set('ui_customizer_animations', 'true');
        }
        if (Lampa.Storage.get('ui_customizer_incardtemplate') === undefined) {
            Lampa.Storage.set('ui_customizer_incardtemplate', 'false');
        }
        if (Lampa.Storage.get('ui_customizer_bigbuttons') === undefined) {
            Lampa.Storage.set('ui_customizer_bigbuttons', 'true');  // По умолчанию включено
        }

        // Простой SVG для иконки (шестерёнка, как ранее)
        var icon_svg = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="currentColor"/></svg>';

        Lampa.SettingsApi.addComponent({
            component: "ui_customizer",
            name: Lampa.Lang.translate('ui_customizer'),
            icon: icon_svg
        });

        Lampa.SettingsApi.addParam({
            component: 'ui_customizer',
            param: {
                name: 'ui_customizer_incardtemplate',
                type: "trigger",
                "default": false
            },
            field: {
                name: Lampa.Lang.translate('ui_customizer_incardtemplate'),
                description: 'Переносит год выше названия в карточках (требует перезагрузки). Рейтинг остаётся как в оригинале.'
            },
            onChange: function(value) {
                if (value) window.location.reload();
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
                description: 'Добавляет лёгкие анимации масштабирования при фокусе.'
            },
            onChange: function(value) {
                animations();
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'ui_customizer',
            param: {
                name: 'ui_customizer_bigbuttons',
                type: "trigger",
                "default": true
            },
            field: {
                name: Lampa.Lang.translate('ui_customizer_bigbuttons'),
                description: 'Увеличивает кнопки (play, torrent) в полном экране, текст скрывается на мобильных.'
            },
            onChange: function(value) {
                bigbuttons();
            }
        });

        // Применяем
        applyCustomizations();
    }

    // Ждем загрузки приложения
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function(event) {
            if (event.type === 'ready') {
                startPlugin();
            }
        });
    }

    // Регистрация плагина
    Lampa.Manifest.plugins = {
        name: 'ui_customizer',
        version: '1.0.5',
        description: 'UI Customizer for Lampac (Simplified, TV label fixed)'
    };

    // Экспорт
    window.ui_customizer = ui_customizer;
})();
