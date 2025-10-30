(function() {
    'use strict';
    
    Lampa.Lang.add({
        ui_enhancer: {
            ru: "Улучшения UI",
            en: "UI Enhancements",
            uk: "Покращення UI",
            be: "Пакульваньне UI",
            zh: "UI 改进",
            pt: "Melhorias de UI",
            bg: "Подобрения на UI",
            he: "שיפורי UI",
            cs: "Vylepšení UI"
        },
        ui_enhancer_incardtemplate: {
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
        ui_enhancer_bigbuttons: {
            ru: "Большие кнопки в карточке",
            en: "Large buttons in card",
            uk: "Великі кнопки в картці",
            be: "Вялікія кнопкі ў картцы",
            zh: "卡片中的大按钮",
            pt: "Botões grandes no cartão",
            bg: "Големи бутони в картата",
            he: "כפתורים גדולים בכרטיס",
            cs: "Velká tlačítka v kartě"
        },
        maxsmthemes: {
            ru: "Темы",
            en: "Themes",
            uk: "Теми",
            be: "Тэмы",
            zh: "主题",
            pt: "Temas",
            bg: "Теми",
            he: "ערכות נושא",
            cs: "Témata"
        },
        maxsmthemestheme: {
            ru: "Тема интерфейса",
            en: "Interface theme",
            uk: "Тема інтерфейсу",
            be: "Тэма інтэрфэйсу",
            zh: "界面主题",
            pt: "Tema de interface",
            bg: "Тема на интерфейса",
            he: "ערכת נושא ממשק",
            cs: "Téma rozhraní"
        }
    });

    // SVG-иконка для настроек (шестеренка для UI-улучшений)
    var uiIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>' +
        '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06 .06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2H5.09a1.65 1.65 0 0 0 1.1-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.1 1z" stroke="currentColor" stroke-width="2"/>' +
        '</svg>';

    // Основной объект плагина
    var ui_enhancer = {
        name: 'ui_enhancer',
        version: '1.0.0',
        settings: {}
    };

    // Переменные для тем (минимально, как в оригинале)
    var applyTheme = false;
    var onetime = false;

    // Функция применения тем (только логика для макета/кнопок, без цветов)
    function applyThemes() {
        applyTheme = localStorage.getItem('maxsmthemestheme') === 'true';
        if (applyTheme) {
            // Базовые стили тем для поддержки макета и кнопок (как в оригинале, нейтрально)
            var theme_style = "\n<style id=\"htmlthemes\">\n" +
                // Фокус и скругления для кнопок (оригинал)
                ".full-start__button.focus::after { border-radius: 1em; }\n" +
                ".full-start-new__buttons { display: flex; flex-wrap: wrap; justify-content: flex-start; gap: 0.5em; }\n" +
                // Overflow и мобильная логика (связано с темами)
                "@media screen and (max-width: 580px) { .full-start-new__buttons { overflow: auto; padding: 0 1em; } }\n" +
                "</style>\n";
            $('body').append(theme_style);
        }
    }

    // Функция для применения фиксированных улучшений
    function applyEnhancements() {
        if (onetime === false) {
            onetime = true;
            forall();
            removeFromSettingsMenu();
            applyThemes();  // Применяем темы для поддержки макета
            incardtemplate();
        }
        bigbuttons();
    }
    
    function removeFromSettingsMenu() {
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
        // Базовые настройки (как оригинал)
        Lampa.Storage.set('light_version', 'false');
        Lampa.Storage.set('background', 'false');
        Lampa.Storage.set('card_interfice_type', 'new');
        Lampa.Storage.set('glass_style', 'false');
        Lampa.Storage.set('card_interfice_poster', 'false');
        Lampa.Storage.set('card_interfice_cover', 'true');
        Lampa.Storage.set('advanced_animation', 'false');
    }
    
    function forall() {
        // Шаблоны карточек (как оригинал)
        Lampa.Template.add('card', "<div class=\"card selector layer--visible layer--render\">\n    <div class=\"card__view\">\n        <img src=\"./img/img_load.svg\" class=\"card__img\" />\n\n        <div class=\"card__icons\">\n            <div class=\"card__icons-inner\">\n                \n            </div>\n        </div>\n    <div class=\"card__age\">{release_year}</div>\n    </div>\n\n    <div class=\"card__title\">{title}</div>\n    </div>");
        Lampa.Template.add('card_episode', "<div class=\"card-episode selector layer--visible layer--render\">\n    <div class=\"card-episode__body\">\n        <div class=\"full-episode\">\n            <div class=\"full-episode__img\">\n                <img />\n            </div>\n\n            <div class=\"full-episode__body\">\n     <div class=\"card__title\">{title}</div>\n            <div class=\"card__age\">{release_year}</div>\n            <div class=\"full-episode__num hide\">{num}</div>\n                <div class=\"full-episode__name\">{name}</div>\n                <div class=\"full-episode__date\">{date}</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"card-episode__footer hide\">\n        <div class=\"card__imgbox\">\n            <div class=\"card__view\">\n                <img class=\"card__img\" />\n            </div>\n        </div>\n\n        <div class=\"card__left\">\n            <div class=\"card__title\">{title}</div>\n            <div class=\"card__age\">{release_year}</div>\n        </div>\n    </div>\n</div>");
        // Стили forall (как оригинал, без тем)
        var forall_style = "\n<style id=\"ui_enhancer_forall\">\n " +
            // ... (все стили из предыдущего, без изменений: центр на мобиле, чекбоксы, рейтинги, плашки, скругления, скрытие TV и т.д.)
            "@media screen and (max-width: 480px) { .full-start-new__head, .full-start-new__title, .full-start__title-original, .full-start__rate, .full-start-new__reactions, .full-start-new__rate-line, .full-start-new__buttons, .full-start-new__details, .full-start-new__tagline { -webkit-justify-content: center; justify-content: center; text-align: center; }\n" +
            ".full-start__title-original {\n   max-width: 100%;\n}\n}" +
            "@media screen and (max-width: 480px) { .full-start-new__right { background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%); }}" +
            ".selectbox-item__checkbox { border-radius: 100%; }\n" +
            ".selectbox-item--checked .selectbox-item__checkbox { background: #ccc; }\n" +
            ".full-start-new__rate-line .full-start__pg { font-size: 1em; background: #fff; color: #000; }\n" +
            ".full-start__rate { border-radius: 0.25em; padding: 0.3em; background-color: rgba(0, 0, 0, 0.3); }\n" +
            // Плашки карточек
            ".card__title { height: 3.6em; text-overflow: ellipsis; -webkit-line-clamp: 3; line-clamp: 3; }\n " +
            ".card__age { position: absolute; right: 0em; bottom: 0em; z-index: 10; background: rgba(0, 0, 0, 0.6); color: #ffffff; font-weight: 700; padding: 0.4em 0.6em; border-radius: 0.48em 0 0.48em 0; line-height: 1.0; font-size: 1.0em; }\n " +
            ".card__vote { position: absolute; right: 0em; top: 0em; background: rgba(0, 0, 0, 0.6); font-weight: 700; color: #fff; border-radius: 0 0.34em 0 0.34em; line-height: 1.0; font-size: 1.4em; }\n  " +
            ".card__icons { position: absolute; top: 2em; left: 0; display: flex; justify-content: center; background: rgba(0, 0, 0, 0.6); color: #fff; border-radius: 0 0.5em 0.5em 0; }\n" +
            ".card__icons-inner { background: rgba(0, 0, 0, 0); }\n" +
            ".card__marker { position: absolute; left: 0em; top: 4em; background: rgba(0, 0, 0, 0.6); border-radius: 0 0.5em 0.5em 0; font-weight: 700; font-size: 1.0em; padding: 0.4em 0.6em; display: flex; align-items: center; line-height: 1.2; max-width: min(12em, 95%); box-sizing: border-box; }\n" +
            ".card__marker > span { max-width: min(12em, 95%); }\n" +
            ".items-line.items-line--type-cards + .items-line.items-line--type-cards { margin-top: 1em; }\n" +
            ".card--small .card__view { margin-bottom: 2em; }\n" +
            ".items-line--type-cards { min-height: 18em; }\n" +
            "@media screen and (min-width: 580px) { .full-start-new { min-height: 80vh; display: flex; } }\n" +
            ".full-start__background.loaded { opacity: 0.8; }\n.full-start__background.dim { opacity: 0.2; }\n" +
            // Скругления
            ".explorer__files .torrent-filter .simple-button { font-size: 1.2em; border-radius: 0.5em; }\n" +
            ".full-review-add, .full-review, .extensions__item, .extensions__block-add, .search-source, .bookmarks-folder__layer, .bookmarks-folder__body, .card__img, .card__promo, .full-episode--next .full-episode__img:after, .full-episode__img img, .full-episode__body, .full-person__photo, .card-more__box, .full-start__button, .simple-button, .register { border-radius: 0.5em; }\n" +
            ".extensions__item.focus::after, .extensions__block-add.focus::after, .full-episode.focus::after, .full-review-add.focus::after, .card-parser.focus::after, .card-episode.focus .full-episode::after, .card-episode.hover .full-episode::after, .card.focus .card__view::after, .card.hover .card__view::after, .card-more.focus .card-more__box::after, .register.focus::after { border-radius: 1em; }\n" +
            ".search-source.focus, .simple-button.focus, .menu__item.focus, .menu__item.traverse, .menu__item.hover, .full-start__button.focus, .full-descr__tag.focus, .player-panel .button.focus, .full-person.selector.focus, .tag-count.selector.focus { border-radius: 0.5em; }\n" +
            ".menu__item.focus { border-radius: 0 0.5em 0.5em 0; }\n" +
            ".menu__list { padding-left: 0em; }\n" +
            ".menu__item.focus .menu__ico { -webkit-filter: invert(1); filter: invert(1); }\n " +
            // Скрытие TV (опционально, как в оригинале)
            ".card__type { display: none; }\n.card--tv .card__type { display: none; }\n.card__type::after { display: none; }\n" +
            "</style>\n";
        Lampa.Template.add('forall_style_css', forall_style);
        $('body').append(Lampa.Template.get('forall_style_css', {}, true));
    }
    
    function incardtemplate() {
        var incardtemplate = localStorage.getItem('ui_enhancer_incardtemplate') === 'true' && applyTheme;
        if (incardtemplate) {
            // Шаблон full_start_new как оригинал, но торрент второй, онлайн третий
            Lampa.Template.add('full_start_new', "<div class=\"full-start-new\">\n\n<div class=\"full-start-new__body\">\n<div class=\"full-start-new__left\">\n<div class=\"full-start-new__poster\">\n<img class=\"full-start-new__img full--poster\" />\n</div>\n</div>\n\n<div class=\"full-start-new__right\">\n<div class=\"full-start-new__head\"></div>\n<div class=\"full-start-new__title\">{title}</div>\n<div class=\"full-start__title-original\">{original_title}</div>\n<div class=\"full-start-new__tagline full--tagline\">{tagline}</div>\n<div class=\"full-start-new__rate-line\">\n<div class=\"full-start__rate rate--tmdb\"><div>{rating}</div><div class=\"source--name\">TMDB</div></div>\n<div class=\"full-start__rate rate--imdb hide\"><div></div><div class=\"source--name\">IMDb</div></div>\n<div class=\"full-start__rate rate--kp hide\"><div></div><div class=\"source--name\">Кинопоиск</div></div>\n\n<div class=\"full-start__pg hide\"></div>\n<div class=\"full-start__status hide\"></div>\n</div>\n<div class=\"full-start-new__details\"></div>\n<div class=\"full-start-new__reactions\">\n<div>#{reactions_none}</div>\n</div>\n\n<div class=\"full-start-new__buttons\">\n<div class=\"full-start__button selector button--play\">\n<svg width=\"28\" height=\"29\" viewBox=\"0 0 28 29\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<circle cx=\"14\" cy=\"14.5\" r=\"13\" stroke=\"currentColor\" stroke-width=\"2.7\"/>\n<path d=\"M18.0739 13.634C18.7406 14.0189 18.7406 14.9811 18.0739 15.366L11.751 19.0166C11.0843 19.4015 10.251 18.9204 10.251 18.1506L10.251 10.8494C10.251 10.0796 11.0843 9.5985 11.751 9.9834L18.0739 13.634Z\" fill=\"currentColor\"/>\n</svg>\n\n<span>#{title_watch}</span>\n</div>\n\n<div class=\"full-start__button view--torrent\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\" width=\"50px\" height=\"50px\">\n<path d=\"M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M40.5,30.963c-3.1,0-4.9-2.4-4.9-2.4 S34.1,35,27,35c-1.4,0-3.6-0.837-3.6-0.837l4.17,9.643C26.727,43.92,25.874,44,25,44c-2.157,0-4.222-0.377-6.155-1.039L9.237,16.851 c0,0-0.7-1.2,0.4-1.5c1.1-0.3,5.4-1.2,5.4-1.2s1.475-0.494,1.8,0.5c0.5,1.3,4.063,11.112,4.063,11.112S22.6,29,27.4,29 c4.7,0,5.9-3.437,5.7-3.937c-1.2-3-4.993-11.862-4.993-11.862s-0.6-1.1,0.8-1.4c1.4-0.3,3.8-0.7,3.8-0.7s1.105-0.163,1.6,0.8 c0.738,1.437,5.193,11.262,5.193,11.262s1.1,2.9,3.3,2.9c0.464,0,0.834-0.046,1.152-0.104c-0.082,1.635-0.348,3.221-0.817,4.722 C42.541,30.867,41.756,30.963,40.5,30.963z\" fill=\"currentColor\"/>\n</svg>\n\n<span>#{full_torrents}</span>\n</div>\n\n<div class=\"full-start__button view--online selector\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"currentColor\">\n<path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93V17.93zm2-13.86c3.94.49 7 3.85 7 7.93s-3.06 7.44-7 7.93V4.07z\"/>\n<circle cx=\"12\" cy=\"12\" r=\"3\"/>\n</svg>\n\n<span>#{full_online}</span>\n</div>\n\n<div class=\"full-start__button selector view--trailer\">\n<svg height=\"70\" viewBox=\"0 0 80 70\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M71.2555 2.08955C74.6975 3.2397 77.4083 6.62804 78.3283 10.9306C80 18.7291 80 35 80 35C80 35 80 51.2709 78.3283 59.0694C77.4083 63.372 74.6975 66.7603 71.2555 67.9104C65.0167 70 40 70 40 70C40 70 14.9833 70 8.74453 67.9104C5.3025 66.7603 2.59172 63.372 1.67172 59.0694C0 51.2709 0 35 0 35C0 35 0 18.7291 1.67172 10.9306C2.59172 6.62804 5.3025 3.2395 8.74453 2.08955C14.9833 0 40 0 40 0C40 0 65.0167 0 71.2555 2.08955ZM55.5909 35.0004L29.9773 49.5714V20.4286L55.5909 35.0004Z\" fill=\"currentColor\"></path>\n</svg>\n\n<span>#{full_trailers}</span>\n</div>\n<div class=\"full-start__button selector button--book\">\n<svg width=\"21\" height=\"32\" viewBox=\"0 0 21 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M2 1.5H19C19.2761 1.5 19.5 1.72386 19.5 2V27.9618C19.5 28.3756 19.0261 28.6103 18.697 28.3595L12.6212 23.7303C11.3682 22.7757 9.63183 22.7757 8.37885 23.7303L2.30302 28.3595C1.9739 28.6103 1.5 28.3756 1.5 27.9618V2C1.5 1.72386 1.72386 1.5 2 1.5Z\" stroke=\"currentColor\" stroke-width=\"2.5\"/>\n</svg>\n\n<span>#{settings_input_links}</span>\n</div>\n\n<div class=\"full-start__button selector button--reaction\">\n<svg width=\"38\" height=\"34\" viewBox=\"0 0 38 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M37.208 10.9742C37.1364 10.8013 37.0314 10.6441 36.899 10.5117C36.7666 10.3794 36.6095 10.2744 36.4365 10.2028L12.0658 0.108375C11.7166 -0.0361828 11.3242 -0.0361227 10.9749 0.108542C10.6257 0.253206 10.3482 0.530634 10.2034 0.879836L0.108666 25.2507C0.0369593 25.4236 3.37953e-05 25.609 2.3187e-08 25.7962C-3.37489e-05 25.9834 0.0368249 26.1688 0.108469 26.3418C0.180114 26.5147 0.28514 26.6719 0.417545 26.8042C0.54995 26.9366 0.707139 27.0416 0.880127 27.1131L17.2452 33.8917C17.5945 34.0361 17.9869 34.0361 18.3362 33.8917L29.6574 29.2017C29.8304 29.1301 29.9875 29.0251 30.1199 28.8928C30.2523 28.7604 30.3573 28.6032 30.4289 28.4303L37.2078 12.065C37.2795 11.8921 37.3164 11.7068 37.3164 11.5196C37.3165 11.3325 37.2796 11.1471 37.208 10.9742ZM20.425 29.9407L21.8784 26.4316L25.3873 27.885L20.425 29.9407ZM28.3407 26.0222L21.6524 23.252C21.3031 23.1075 20.9107 23.1076 20.5615 23.2523C20.2123 23.3969 19.9348 23.6743 19.79 24.0235L17.0194 30.7123L3.28783 25.0247L12.2918 3.28773L34.0286 12.2912L28.3407 26.0222Z\" fill=\"currentColor\"/>\n<path d=\"M25.3493 16.976L24.258 14.3423L16.959 17.3666L15.7196 14.375L13.0859 15.4659L15.4161 21.0916L25.3493 16.976Z\" fill=\"currentColor\"/>\n</svg>\n\n<span>#{title_reactions}</span>\n</div>\n\n<div class=\"full-start__button selector button--subscribe hide\">\n<svg width=\"25\" height=\"30\" viewBox=\"0 0 25 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M6.01892 24C6.27423 27.3562 9.07836 30 12.5 30C15.9216 30 18.7257 27.3562 18.981 24H15.9645C15.7219 25.6961 14.2632 27 12.5 27C10.7367 27 9.27804 25.6961 9.03542 24H6.01892Z\" fill=\"currentColor\"/>\n<path d=\"M3.81972 14.5957V10.2679C3.81972 5.41336 7.7181 1.5 12.5 1.5C17.2819 1.5 21.1803 5.41336 21.1803 10.2679V14.5957C21.1803 15.8462 21.5399 17.0709 22.2168 18.1213L23.0727 19.4494C24.2077 21.2106 22.9392 23.5 20.9098 23.5H4.09021C2.06084 23.5 0.792282 21.2106 1.9273 19.4494L2.78317 18.1213C3.46012 17.0709 3.81972 15.8462 3.81972 14.5957Z\" stroke=\"currentColor\" stroke-width=\"2.5\"/>\n</svg>\n\n<span>#{title_subscribe}</span>\n</div>\n\n<div class=\"full-start__button selector button--options\">\n<svg width=\"38\" height=\"10\" viewBox=\"0 0 38 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<circle cx=\"4.88968\" cy=\"4.98563\" r=\"4.75394\" fill=\"currentColor\"/>\n<circle cx=\"18.9746\" cy=\"4.98563\" r=\"4.75394\" fill=\"currentColor\"/>\n<circle cx=\"33.0596\" cy=\"4.98563\" r=\"4.75394\" fill=\"currentColor\"/>\n</svg>\n</div>\n\n</div>\n</div>\n</div>\n</div>");
        }
    }
    
    function bigbuttons() {
        var bigbuttons = localStorage.getItem('ui_enhancer_bigbuttons') === 'true' && applyTheme;
        $('#ui_enhancer_bigbuttons').remove();
        if (bigbuttons) {
            // Стили больших кнопок как оригинал (связано с темами для фокуса)
            var bigbuttons_style = "\n<style id=\"ui_enhancer_bigbuttons\">\n " +
                ".full-start-new__buttons .full-start__button span { display: inline; }\n" +
                "@media screen and (max-width: 580px) {\n" +
                "  .full-start-new__buttons { overflow: auto; }\n" +
                "  .full-start-new__buttons .full-start__button:not(.focus) span { display: none; }\n" +
                "  .full-start__button.focus { min-width: 4em; }  /* Как оригинал для последовательности */\n" +
                "}\n" +
                "</style>\n";
            $('body').append(bigbuttons_style);
        }
    }    
    
    function startPlugin() {
        // Дефолты (как оригинал)
        if (!localStorage.getItem('ui_enhancer_incardtemplate')) localStorage.setItem('ui_enhancer_incardtemplate', 'false');
        if (!localStorage.getItem('ui_enhancer_bigbuttons')) localStorage.setItem('ui_enhancer_bigbuttons', 'false');
        if (!localStorage.getItem('maxsmthemestheme')) localStorage.setItem('maxsmthemestheme', 'false');
        
        // Компонент с темами (как оригинал)
        Lampa.SettingsApi.addComponent({
            component: "maxsmthemes",
            name: Lampa.Lang.translate('maxsmthemes'),
            icon: uiIcon
        });
        
        // Параметр темы (триггер для активации макета/кнопок)
        Lampa.SettingsApi.addParam({
            component: 'maxsmthemes',
            param: {
                name: 'maxsmthemestheme',
                type: "trigger",
                default: false
            },
            field: {
                name: Lampa.Lang.translate('maxsmthemestheme'),
                description: 'Включает макет и большие кнопки'
            },
            onChange: function(value) {
                applyThemes();
                if (value) {
                    window.location.reload();  // Перезагрузка для полного применения, как оригинал
                }
            }
        });
        
        // Параметры UI (под темами)
        Lampa.SettingsApi.addParam({
            component: 'maxsmthemes',
            param: {
                name: 'ui_enhancer_incardtemplate',
                type: "trigger",
                default: false
            },
            field: {
                name: Lampa.Lang.translate('ui_enhancer_incardtemplate'),
                description: ''
            },
            onChange: function(value) {
                if (applyTheme) window.location.reload();
            }
        });
        
        Lampa.SettingsApi.addParam({
            component: 'maxsmthemes',
            param: {
                name: 'ui_enhancer_bigbuttons',
                type: "trigger",
                default: false
            },
            field: {
                name: Lampa.Lang.translate('ui_enhancer_bigbuttons'),
                description: ''
            },
            onChange: function(value) {
                bigbuttons();
            }
        });
        
        applyEnhancements();
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
        name: 'ui_enhancer',
        version: '1.0.0',
        description: 'UI Enhancements for Cards'
    };

    window.ui_enhancer = ui_enhancer;
})();
