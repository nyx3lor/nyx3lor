/* jshint esversion: 6, bitwise: false */
(function() {
    'use strict';
    
    /*
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║                        🎨 DRXAOS THEMES PLUGIN 🎨                           ║
    ║                     SOOPER 2025 Style for Lampa&Lampac                      ║
    ║                                                                              ║
    ║  ┌────────────────────────────────────────────────────────────────────────┐  ║
    ║  │  💎 9 PREMIUM THEMES | ⚡ OPTIMIZED | 🎬 TMDB INTEGRATION             │  ║
    ║  └────────────────────────────────────────────────────────────────────────┘  ║
    ║                                                                              ║
    ║  Автор: DrXAOS                                                               ║
    ║  Версия: 2.6 (ATV Performance Optimized)                      
║ 
║ ⚡ PERFORMANCE OPTIMIZATIONS (v2.4):
║    • Removed all backdrop-filter: blur() (25 instances)
║    • Simplified all box-shadow effects
║    • Fixed transparency at 99.5% for all elements
║    • Optimized transitions (transform, opacity only)
║    • Added GPU acceleration (translateZ, will-change)
║    • Removed heavy pseudo-elements
║    • Faster animations (0.15s)
║    • Perfect for Android TV, Fire TV, Google TV
║║
    ║                                                                              ║
    ║                                                                              ║
    ║  ┌────────────────────────────────────────────────────────────────────────┐ ║
    ║  │  💰 ПОДДЕРЖКА РАЗРАБОТЧИКА / SUPPORT THE DEVELOPER                     │ ║
    ║  │                                                                         │ ║
    ║  │  🇷🇺 Если вам нравится плагин и вы хотите поблагодарить копейкой:         │ ║
    ║  │  🇺🇦 Якщо вам подобається плагін і ви хочете подякувати копійчиною:       │ ║
    ║  │  🇬🇧 If you like the plugin and want to say thanks:                       │ ║
    ║  │                                                                         │ ║
    ║  │  💳 USDT (TRC-20):  TBLUWM16Eiufc6GLJaMGxaFy7oTBiDgar8                    ║
    ║  │                                                                           ║ 
    ║  │                                                                         │ ║
    ║  │  🙏 Каждый донат мотивирует на дальнейшую разработку!                 │  ║
    ║  │  🙏 Кожен донат мотивує на подальший розвиток!                         │  ║
    ║  │  🙏 Every donation motivates further development!                      │  ║
    ║  └────────────────────────────────────────────────────────────────────────┘  ║
    ║                                                                              ║
    ║  Спасибо за использование! / Дякую за використання! / Thank you for using!   ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
    */

    var CONFIG = {
        PLUGIN_NAME: 'drxaos_themes',
        VERSION: '2.3.0',
        AUTHOR: 'DrXAOS',
        LAMPA_MIN_VERSION: 240,
        LAMPA_3_SUPPORT: true,
        API: {
            TMDB_URL: 'https://api.themoviedb.org/3',
            JACRED_URL: 'https://jacred.xyz'
        },
        PERFORMANCE: {
            DEBOUNCE_DELAY: 300,
            THROTTLE_LIMIT: 100,
            BATCH_UPDATE_DELAY: 100,
            MUTATION_THROTTLE: 50
        },
        FEATURES: {
            TMDB_INTEGRATION: true,
            JACRED_INTEGRATION: true,
            TRACKS_FIX: true,
            MUTATION_OBSERVER: true,
            UTILITIES_BUTTON: true
        },
        DEBUG: true,
        VERBOSE_LOGGING: true
    };
    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait || CONFIG.PERFORMANCE.DEBOUNCE_DELAY);
        };
    }
    function throttle(func, limit) {
        var inThrottle;
        return function() {
            var args = arguments;
            var context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() { inThrottle = false; }, limit || CONFIG.PERFORMANCE.THROTTLE_LIMIT);
            }
        };
    }
    function log(message, data) {
        if (CONFIG.DEBUG || CONFIG.VERBOSE_LOGGING) {
            console.log('[' + CONFIG.PLUGIN_NAME + ' v' + CONFIG.VERSION + ']', message, data || '');
        }
    }
    function logError(message, error) {
        console.error('[' + CONFIG.PLUGIN_NAME + ']', message, error);
    }
    
    // Проверка версии Lampa
    function isLampa3() {
        return window.Lampa && window.Lampa.Manifest && window.Lampa.Manifest.app_digital >= 300;
    }
    
    function getLampaVersion() {
        if (window.Lampa && window.Lampa.Manifest) {
            return window.Lampa.Manifest.app_digital || 0;
        }
        return 0;
    }
    
    // Логирование версии при старте
    if (window.Lampa) {
        log('Lampa version detected: ' + getLampaVersion() + (isLampa3() ? ' (3.0+)' : ' (legacy)'));
    }
    
    var netflixFontStyles = `
        body, .body,
        .menu, .settings, .layer, .modal,
        h1, h2, h3, h4, h5, h6,
        p, span, div, a, button, input, textarea {
            font-family: 'Netflix Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
        }
.head__action:not(.open--profile),
.drxaos-theme-quick-btn {
    background: var(--theme-color, rgba(0, 0, 0, var(--drxaos-surface-opacity))) !important;
    border-radius: 8px !important;
    padding: 8px !important;
    !important;
    transition: transform 0.3s ease !important, opacity 0.3s ease !important;
}
.head__action:not(.open--profile):hover,
.head__action:not(.open--profile):focus,
.head__action:not(.open--profile).focus,
.drxaos-theme-quick-btn:hover,
.drxaos-theme-quick-btn:focus,
.drxaos-theme-quick-btn.focus {
    background: var(--theme-color, rgba(0, 0, 0, var(--drxaos-surface-opacity))) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    transform: scale(1.05) !important;
}
.head__action:not(.open--profile) svg,
.drxaos-theme-quick-btn svg {
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, var(--drxaos-surface-opacity))) !important;
    transition: transform 0.3s ease !important, opacity 0.3s ease !important;
}
.head__action:not(.open--profile):hover svg,
.head__action:not(.open--profile):focus svg,
.head__action:not(.open--profile).focus svg,
.drxaos-theme-quick-btn:hover svg,
.drxaos-theme-quick-btn:focus svg,
.drxaos-theme-quick-btn.focus svg {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.95)) !important;
    transform: scale(1.1) !important;
}
.speedtest {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.18) 0%, rgba(var(--bg-rgb), 0.995) 40%, rgba(var(--secondary-rgb), 0.12) 100%) !important;
    border: 2px solid rgba(var(--primary-rgb), 0.5) !important;
    border-radius: 16px !important;
}
.speedtest__progress { stroke: var(--theme-accent) !important; }
.speedtest__frequency { stroke: rgba(var(--primary-rgb), 0.3) !important; }
.speedtest text { fill: var(--text-main) !important; }
#speedtest_num { fill: var(--theme-accent) !important; }
#speedtest_graph { stroke: var(--theme-accent) !important; }`;
    if (!document.querySelector('#drxaos-netflix-fonts')) {
        var netflixFontStyle = document.createElement('style');
        netflixFontStyle.id = 'drxaos-netflix-fonts';
        netflixFontStyle.textContent = netflixFontStyles;
        document.head.appendChild(netflixFontStyle);
    }
    var globalFontStyles = `
        * {
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
            font-display: swap !important;
            font-synthesis: none !important;
            font-feature-settings: "kern" 1, "liga" 1, "calt" 1 !important;
            font-variant-ligatures: common-ligatures !important;
            font-optical-sizing: auto !important;
            text-rendering: optimizeLegibility !important;
        }
    `;
    if (!document.querySelector('#drxaos-global-font-styles')) {
        var globalFontStyle = document.createElement('style');
        globalFontStyle.id = 'drxaos-global-font-styles';
        globalFontStyle.textContent = globalFontStyles;
        document.head.appendChild(globalFontStyle);
    }
    var performanceMonitor = {
        startTime: 0,
        metrics: {},
        start: function(operation) {
            this.startTime = performance.now();
            this.metrics[operation] = { start: this.startTime };
        },
        end: function(operation) {
            if (this.metrics[operation]) {
                this.metrics[operation].duration = performance.now() - this.startTime;
            }
        },
        log: function(message, data) {
        }
    };
    var renderingOptimizer = {
        originClean: true,
        checkOriginClean: function() {
            var isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
            this.originClean = isSecure;
            if (!this.originClean) {
            }
            return this.originClean;
        },
        usePremultipliedAlpha: true,
        willReadFrequently: function() {
            return /Android TV|Google TV|WebOS|Tizen|Smart TV|TV|Fire TV|FireTV|AFT|Roku|Apple TV|Chromecast/i.test(navigator.userAgent);
        },
        applyCanvasOptimizations: function() {
            try {
                var canvasElements = document.querySelectorAll('canvas');
                canvasElements.forEach(function(canvas) {
                    if (canvas.getContext) {
                        try {
                            var context2d = canvas.getContext('2d', { willReadFrequently: true });
                            if (context2d) {
                            }
                        } catch(e) {
                        }
                        try {
                            var gl = canvas.getContext('webgl', { willReadFrequently: true });
                            if (gl) {
                            }
                        } catch(e) {
                        }
                        try {
                            var gl2 = canvas.getContext('webgl2', { willReadFrequently: true });
                            if (gl2) {
                            }
                        } catch(e) {
                        }
                        try {
                            var bitmap = canvas.getContext('bitmaprenderer', { willReadFrequently: true });
                            if (bitmap) {
                            }
                        } catch(e) {
                        }
                    }
                });
                if (typeof OffscreenCanvas !== 'undefined') {
                    var offscreenCanvases = document.querySelectorAll('canvas');
                    offscreenCanvases.forEach(function(canvas) {
                        if (canvas.transferControlToOffscreen) {
                            try {
                                var offscreen = canvas.transferControlToOffscreen();
                                if (offscreen.getContext) {
                                    var offscreenContext = offscreen.getContext('2d', { willReadFrequently: true });
                                    if (offscreenContext) {
                                    }
                                }
                            } catch(e) {
                            }
                        }
                    });
                }
                this.interceptCanvasContext();
            } catch(e) {
            }
        },
        interceptCanvasContext: function() {
            try {
                var originalGetContext = HTMLCanvasElement.prototype.getContext;
                HTMLCanvasElement.prototype.getContext = function(contextType, contextAttributes) {
                    if (contextType === '2d') {
                        if (!contextAttributes) {
                            contextAttributes = {};
                        }
                        contextAttributes.willReadFrequently = true;
                    }
                    if (contextType === 'webgl' || contextType === 'webgl2') {
                        if (!contextAttributes) {
                            contextAttributes = {};
                        }
                        contextAttributes.willReadFrequently = true;
                    }
                    if (contextType === 'bitmaprenderer') {
                        if (!contextAttributes) {
                            contextAttributes = {};
                        }
                        contextAttributes.willReadFrequently = true;
                    }
                    return originalGetContext.call(this, contextType, contextAttributes);
                };
                if (typeof OffscreenCanvas !== 'undefined' && OffscreenCanvas.prototype.getContext) {
                    var originalOffscreenGetContext = OffscreenCanvas.prototype.getContext;
                    OffscreenCanvas.prototype.getContext = function(contextType, contextAttributes) {
                        if (contextType === '2d') {
                            if (!contextAttributes) {
                                contextAttributes = {};
                            }
                            contextAttributes.willReadFrequently = true;
                        }
                        return originalOffscreenGetContext.call(this, contextType, contextAttributes);
                    };
                }
            } catch(e) {
            }
        },
        optimizeForDevice: function() {
            var isTV = deviceDetection.isTV();
            var isMobile = deviceDetection.isMobile();
            if (isTV) {
                return {
                    useGPU: true,
                    premultipliedAlpha: true,
                    willReadFrequently: false,
                    optimizeForSpeed: true
                };
            } else if (isMobile) {
                return {
                    useGPU: true,
                    premultipliedAlpha: true,
                    willReadFrequently: true,
                    optimizeForSpeed: false
                };
            } else {
                return {
                    useGPU: false,
                    premultipliedAlpha: true,
                    willReadFrequently: true,
                    optimizeForSpeed: false
                };
            }
        },
        applyOptimizations: function() {
            this.checkOriginClean();
            var optimizations = this.optimizeForDevice();
            this.applyCanvasOptimizations();
            this.fixDeprecatedSliders();
        },
        fixDeprecatedSliders: function() {
            try {
                var sliders = document.querySelectorAll('[style*="appearance: slider-vertical"], [style*="appearance:slider-vertical"]');
                sliders.forEach(function(slider) {
                    if (slider.tagName !== 'INPUT' || slider.type !== 'range') {
                        var newSlider = document.createElement('input');
                        newSlider.type = 'range';
                        newSlider.style.cssText = 'writing-mode: vertical-lr; direction: rtl;';
                        Array.from(slider.attributes).forEach(function(attr) {
                            if (attr.name !== 'style') {
                                newSlider.setAttribute(attr.name, attr.value);
                            }
                        });
                        slider.parentNode.replaceChild(newSlider, slider);
                    }
                });
                var deprecatedCSS = `
                    input[type="range"] {
                        writing-mode: vertical-lr !important;
                        direction: rtl !important;
                        appearance: none !important;
                        -webkit-appearance: none !important;
                        -moz-appearance: none !important;
                    }
                    *[style*="appearance: slider-vertical"],
                    *[style*="appearance:slider-vertical"] {
                        appearance: none !important;
                        -webkit-appearance: none !important;
                        -moz-appearance: none !important;
                        writing-mode: vertical-lr !important;
                        direction: rtl !important;
                    }
                    * {
                        appearance: none !important;
                        -webkit-appearance: none !important;
                        -moz-appearance: none !important;
                    }
                    input, button, select, textarea {
                        appearance: auto !important;
                        -webkit-appearance: auto !important;
                        -moz-appearance: auto !important;
                    }
                    input[type="range"] {
                        appearance: none !important;
                        -webkit-appearance: none !important;
                        -moz-appearance: none !important;
                        writing-mode: vertical-lr !important;
                        direction: rtl !important;
                    }
                `;
                styleManager.setStyle('drxaos-slider-fixes', deprecatedCSS);
            } catch(e) {
            }
        },
        setupDynamicElementObserver: function() {
            try {
                var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.type === 'childList') {
                            mutation.addedNodes.forEach(function(node) {
                                if (node.nodeType === 1) {
                                    if (node.style && (node.style.appearance === 'slider-vertical' || 
                                        node.getAttribute('style') && node.getAttribute('style').includes('slider-vertical'))) {
                                        node.style.appearance = 'none';
                                        node.style.writingMode = 'vertical-lr';
                                        node.style.direction = 'rtl';
                                    }
                                    if (node.tagName === 'CANVAS') {
                                        if (node.getContext) {
                                            try {
                                                var context = node.getContext('2d', { willReadFrequently: true });
                                                if (context) {
                                                }
                                            } catch(e) {
                                            }
                                        }
                                    }
                                    if (node.classList && node.classList.contains('selectbox-item')) {
                                        addIconsToSelectboxItem(node);
                                    }
                                    var childSliders = node.querySelectorAll && node.querySelectorAll('[style*="appearance: slider-vertical"], [style*="appearance:slider-vertical"]');
                                    if (childSliders) {
                                        childSliders.forEach(function(slider) {
                                            slider.style.appearance = 'none';
                                            slider.style.writingMode = 'vertical-lr';
                                            slider.style.direction = 'rtl';
                                        });
                                    }
                                    var childCanvases = node.querySelectorAll && node.querySelectorAll('canvas');
                                    if (childCanvases) {
                                        childCanvases.forEach(function(canvas) {
                                            if (canvas.getContext) {
                                                try {
                                                    var context = canvas.getContext('2d', { willReadFrequently: true });
                                                    if (context) {
                                                    }
                                                } catch(e) {
                                                }
                                            }
                                        });
                                    }
                                    var selectboxItems = node.querySelectorAll && node.querySelectorAll('.selectbox-item');
                                    if (selectboxItems && selectboxItems.length > 0) {
                                        selectboxItems.forEach(function(item) {
                                            addIconsToSelectboxItem(item);
                                        });
                                    }
                                }
                            });
                        }
                    });
                });
                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['style']
                });
                return observer;
            } catch(e) {
                return null;
            }
        }
    };
    function addIconsToSelectboxItem(item) {
        try {
            var title = item.querySelector('.selectbox-item__title');
            if (!title) return;
            var titleText = title.textContent.trim();
            var iconContainer = item.querySelector('.selectbox-item__icon');
            if (!iconContainer) {
                iconContainer = document.createElement('div');
                iconContainer.className = 'selectbox-item__icon';
                item.insertBefore(iconContainer, item.firstChild);
            }
            var iconSVG = '';
            if (titleText.includes('Онлайн') || titleText.includes('Lampac')) {
                iconSVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7z" fill="#3B82F6"/><circle cx="12" cy="12" r="3" fill="#1E40AF"/><circle cx="12" cy="12" r="1.5" fill="white"/></svg>';
            } else if (titleText.includes('Торренты') || titleText.includes('Торрент')) {
                iconSVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 8v8l8 6 8-6V8l-8-6z" fill="#10B981"></path><path d="M12 8v8h-4v-4l4-4z" fill="#059669"></path><path d="M12 8v8h4v-4l-4-4z" fill="#047857"></path></svg>';
            }
            if (iconSVG) {
                iconContainer.innerHTML = iconSVG;
                iconContainer.style.display = 'inline-block';
            } else {
                iconContainer.style.display = 'none';
            }
        } catch(e) {
        }
    }
    var lampaLogger = {
        log: function(message, data) {
        },
        error: function(message, error) {
        },
        warn: function(message, data) {
        },
        info: function(message, data) {
        }
    };
    var deviceDetection = {
        isTV: function() {
            return /Android TV|Google TV|WebOS|Tizen|Smart TV|TV|Fire TV|FireTV|AFT|Roku|Apple TV|Chromecast/i.test(navigator.userAgent) || 
                   (window.screen.width >= 1920 && window.screen.height >= 1080 && 
                   /Android|Linux/i.test(navigator.userAgent)) ||
                   /AFT/i.test(navigator.userAgent) ||
                   (window.screen.width >= 3840 && window.screen.height >= 2160) ||
                   (navigator.userAgent.includes('TV') && window.screen.width > 1280);
        },
        isMobile: function() {
            return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        isDesktop: function() {
            return !this.isTV() && !this.isMobile();
        },
        getDeviceType: function() {
            if (this.isTV()) return 'tv';
            if (this.isMobile()) return 'mobile';
            return 'desktop';
        }
    };
    var styleManager = {
        styles: {},
        setStyle: function(id, css) {
            this.removeStyle(id);
            this.styles[id] = $('<style id="' + id + '">' + css + '</style>').appendTo('head');
        },
        removeStyle: function(id) {
            if (this.styles[id]) {
                this.styles[id].remove();
                delete this.styles[id];
            } else {
                $('#' + id).remove();
            }
        },
        clearAllStyles: function() {
            var styleIds = [
                'drxaos-advanced-styles',
                'drxaos-poster-styles', 
                'drxaos-hover-scale-styles',
                'drxaos-interface-size-styles',
                'drxaos_animations_style',
                'drxaos_font_weight_style',
                'drxaos-glow-styles',
                'drxaos_fullbuttons_style',
                'drxaos_fullbuttons_style_on',
                'drxaos_theme_style'
            ];
            styleIds.forEach(function(id) {
                $('#' + id).remove();
            });
            this.styles = {};
        }
    };
    function createPosterOutlines() {}
    var ADVANCED_SCHEMA = {
        posterGlowIntensity: {
            storage: 'poster_glow_intensity',
            "default": 10,
            parse: function(value) {
                return clamp(parseInt(value, 10), 0, 60, 10);
            },
            serialize: function(value) {
                return value.toString();
            }
        },
        posterAnimationSpeed: {
            storage: 'poster_animation_speed',
            "default": 0.3,
            parse: function(value) {
                return clamp(parseFloat(value), 0.1, 1.5, 0.3);
            },
            serialize: function(value) {
                return value.toString();
            }
        },
        cardBackgroundOpacity: {
            storage: 'card_background_opacity',
            "default": 70,
            parse: function(value) {
                return clamp(parseInt(value, 10), 0, 100, 70);
            },
            serialize: function(value) {
                return value.toString();
            }
        },
        hoverScale: {
            storage: 'hover_scale',
            "default": 1.05,
            parse: function(value) {
                return clamp(parseFloat(value), 1, 1.3, 1.05);
            },
            serialize: function(value) {
                return value.toString();
            }
        },
        animationSpeed: {
            storage: 'animation_speed',
            "default": 0.3,
            parse: function(value) {
                return clamp(parseFloat(value), 0.1, 1, 0.3);
            },
            serialize: function(value) {
                return value.toString();
            }
        }
    };
    function buildAdvancedDefaults() {
        var base = {
            modalOpacity: 95,
            modalBlur: 50,
            modalRadius: 2,
            menuWidth: 20,
            menuOpacity: 95,
            menuBlur: 30,
            contrast: 100,
            brightness: 100,
            saturation: 100,
            hue: 0
        };
        Object.keys(ADVANCED_SCHEMA).forEach(function(key) {
            base[key] = ADVANCED_SCHEMA[key]["default"];
        });
        return base;
    }
    var advancedSettings = buildAdvancedDefaults();
    function clamp(value, min, max, fallback) {
        var num = parseFloat(value);
        if (isNaN(num)) num = fallback;
        if (typeof min === 'number') num = Math.max(min, num);
        if (typeof max === 'number') num = Math.min(max, num);
        return num;
    }
    function loadAdvancedSettings() {
        try {
            Object.keys(ADVANCED_SCHEMA).forEach(function(key) {
                var schema = ADVANCED_SCHEMA[key];
                var stored = Lampa.Storage.get(schema.storage);
                advancedSettings[key] = schema.parse(stored);
            });
        } catch(e) {
        }
    }
    function saveAdvancedSettings() {
        try {
            Object.keys(ADVANCED_SCHEMA).forEach(function(key) {
                var schema = ADVANCED_SCHEMA[key];
                var value = advancedSettings[key];
                Lampa.Storage.set(schema.storage, schema.serialize ? schema.serialize(value) : value);
            });
        } catch(e) {
        }
    }
    function setAdvancedSetting(key, rawValue) {
        if (!ADVANCED_SCHEMA[key]) return;
        advancedSettings[key] = ADVANCED_SCHEMA[key].parse(rawValue);
        saveAdvancedSettings();
        applyAdvancedSettings();
    }
    function applyAdvancedSettings() {
        try {
            performanceMonitor.start('applyAdvancedSettings');
            if (!window.jQuery || !window.$) return;
            applyModernHoverStyles();
            styleManager.removeStyle('drxaos-advanced-styles');
            styleManager.removeStyle('drxaos-poster-styles');
            styleManager.removeStyle('drxaos-hover-scale-styles');
            var s = advancedSettings;
            var cardOverlay = clamp(s.cardBackgroundOpacity, 0, 100, ADVANCED_SCHEMA.cardBackgroundOpacity["default"]) / 100;
            var glowPx = clamp(s.posterGlowIntensity, 0, 60, ADVANCED_SCHEMA.posterGlowIntensity["default"]);
            var hoverScale = clamp(s.hoverScale, 1, 1.3, ADVANCED_SCHEMA.hoverScale["default"]).toFixed(2);
            var animationSpeed = clamp(s.animationSpeed, 0.1, 1, ADVANCED_SCHEMA.animationSpeed["default"]);
            var baseCSS = `
                :root {
                    --drxaos-card-overlay: rgba(6, 8, 15, ${cardOverlay});
                }
                .modal, .modal__content {
                    border-radius: ${s.modalRadius}em !important;
                    background: rgba(10, 12, 20, ${s.modalOpacity / 100}) !important;
                    !important;
                }
                .menu {
                    width: ${s.menuWidth}em !important;
                    background: rgba(6, 8, 15, ${s.menuOpacity / 100}) !important;
                    !important;
                }
                .card__view {
                    background: var(--drxaos-card-overlay) !important;
                }
                .card__img img {
                    filter: contrast(${s.contrast}%) brightness(${s.brightness}%) saturate(${s.saturation}%) hue-rotate(${s.hue}deg) !important;
                }
                .card-more__box {
                    background: rgba(8, 10, 18, var(--drxaos-surface-opacity)) !important;
                    border: 2px solid rgba(255, 255, 255, 0.95) !important;
                    border-radius: 12px !important;
                    padding: 1.5em !important;
                }
                .card-more__title {
                    color: var(--text-main) !important;
                    font-weight: 700 !important;
                }
                .online-prestige {
                    background: rgba(8, 10, 18, var(--drxaos-surface-opacity)) !important;
                    border: 2px solid rgba(255, 255, 255, 0.95) !important;
                    border-radius: 12px !important;
                    padding: 1em !important;
                    transition: transform 0.3s ease !important;
                }
                .online-prestige.focus,
                .online-prestige:hover {
                    border-color: var(--theme-primary) !important;
                    box-shadow: 0 0 20px var(--theme-primary) !important;
                    transform: scale(1.02) !important;
                }
            `;
            var posterCSS = `
                body .card,
                body .card.card {
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                }
                body .card .card__img,
                body .card .card__img img,
                body .card.card .card__img img {
                    background: transparent !important;
                    border-radius: 12px !important;
                    transition: border ${s.posterAnimationSpeed}s ease, box-shadow ${s.posterAnimationSpeed}s ease !important;
                    border: none !important;
                    outline: none !important;
                }
                body .card:hover .card__img,
                body .card.focus .card__img,
                body .card.card--focus .card__img {
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
                }
                body .card.focus .card__img,
                body .card.card--focus .card__img {
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
                }
                .card .card__view {
                    border-radius: 12px !important;
                }
            `;
            var hoverScaleCSS = `
                body .card {
                    transition: transform ${animationSpeed}s ease, box-shadow ${animationSpeed}s ease !important;
                }
                body .card:hover,
                body .card.hover,
                body .card.focus,
                body .card.card--focus {
                    transform: scale(${hoverScale}) translateZ(0) !important;
                }
            `;
            styleManager.setStyle('drxaos-advanced-styles', baseCSS);
            styleManager.setStyle('drxaos-poster-styles', posterCSS);
            styleManager.setStyle('drxaos-hover-scale-styles', hoverScaleCSS);
            performanceMonitor.end('applyAdvancedSettings');
            performanceMonitor.log('Advanced settings applied successfully');
        } catch(e) {
        }
    }
    loadAdvancedSettings();
'use strict';
Lampa.Lang.add({
drxaos_themes: { ru: 'DRXAOS Темы', en: 'DRXAOS Themes', uk: 'DRXAOS Теми' },
drxaos_theme: { ru: 'Цветовая схема', en: 'Color Scheme', uk: 'Кольорова схема' },
drxaos_animations: { ru: 'Анимации', en: 'Animations', uk: 'Анімації' },
drxaos_glow: { ru: 'Свечение', en: 'Glow', uk: 'Світіння' },
drxaos_fullbuttons: { ru: 'Полные названия кнопок', en: 'Full Button Labels', uk: 'Повні назви кнопок' },
drxaos_theme_desc: { ru: 'Выберите цветовую схему интерфейса', en: 'Choose interface color scheme', uk: 'Виберіть кольорову схему інтерфейсу' },
drxaos_glow_desc: { ru: 'Интенсивность свечения карточек и кнопок при наведении', en: 'Intensity of cards and buttons glow on hover', uk: 'Інтенсивність світіння карток і кнопок при наведенні' },
drxaos_fullbuttons_desc: { ru: 'Показывать текст кнопок в карточках фильмов (Онлайн/Торренты/Избранное)', en: 'Show button text in movie cards', uk: 'Показувати текст кнопок в картках фільмів' },
drxaos_animations_desc: { ru: 'Плавные анимации при наведении (отключите на слабых устройствах)', en: 'Smooth animations on hover (disable on weak devices)', uk: 'Плавні анімації при наведенні (вимкніть на слабких пристроях)' },
drxaos_font_weight: { ru: 'Толщина шрифта', en: 'Font Weight', uk: 'Товщина шрифту' },
drxaos_font_weight_desc: { ru: 'Глобальная настройка толщины шрифта для всех тем', en: 'Global font weight setting for all themes', uk: 'Глобальне налаштування товщини шрифту для всіх тем' },
drxaos_quick_theme: { ru: 'Быстрый выбор темы', en: 'Quick Theme Selector', uk: 'Швидкий вибір теми' },
theme_midnight: { ru: '🌙 Полночь', en: '🌙 Midnight', uk: '🌙 Північ' },
theme_crimson: { ru: '🔴 Багровый', en: '🔴 Crimson', uk: '🔴 Багряний' },
theme_ocean: { ru: '🌊 Океан', en: '🌊 Ocean', uk: '🌊 Океан' },
theme_forest: { ru: '🌲 Лес', en: '🌲 Forest', uk: '🌲 Ліс' },
theme_sunset: { ru: '🌅 Закат', en: '🌅 Sunset', uk: '🌅 Захід' },
theme_slate: { ru: '⚫ Грифель', en: '⚫ Slate', uk: '⚫ Грифель' },
theme_lavender: { ru: '💜 Лаванда', en: '💜 Lavender', uk: '💜 Лаванда' },
theme_emerald: { ru: '💚 Изумруд', en: '💚 Emerald', uk: '💚 Смарагд' },
theme_amber: { ru: '🟠 Янтарь', en: '🟠 Amber', uk: '🟠 Бурштин' },
poster_glow_intensity: { ru: 'Интенсивность свечения', en: 'Glow Intensity', uk: 'Інтенсивність світіння' },
poster_glow_intensity_desc: { ru: 'Сила свечения обводок постеров', en: 'Poster border glow strength', uk: 'Сила світіння обведень постерів' },
animation_speed: { ru: 'Скорость анимации', en: 'Animation Speed', uk: 'Швидкість анімації' },
animation_speed_desc: { ru: 'Скорость анимации обводок', en: 'Border animation speed', uk: 'Швидкість анімації обведень' },
card_opacity: { ru: 'Прозрачность фона', en: 'Background Opacity', uk: 'Прозорість фону' },
card_opacity_desc: { ru: 'Прозрачность фона карточек', en: 'Card background opacity', uk: 'Прозорість фону карток' },
hover_scale: { ru: 'Масштаб при наведении', en: 'Hover Scale', uk: 'Масштаб при наведенні' },
hover_scale_desc: { ru: 'Увеличение карточки при наведении (отключено)', en: 'Card scaling on hover (disabled)', uk: 'Збільшення картки при наведенні (вимкнено)' },
global_animation_speed: { ru: '⚡ Скорость анимации', en: '⚡ Animation Speed', uk: '⚡ Швидкість анімації' },
global_animation_speed_desc: { ru: 'Глобальная скорость анимаций', en: 'Global animation speed', uk: 'Глобальна швидкість анімацій' },
reset_settings: { ru: '🔄 Сбросить настройки', en: '🔄 Reset Settings', uk: '🔄 Скинути налаштування' },
reset_settings_desc: { ru: 'Вернуть все настройки к значениям по умолчанию', en: 'Reset all settings to defaults', uk: 'Повернути всі налаштування до значень за замовчуванням' },
season_info: { ru: '📺 Информация о сезонах', en: '📺 Season Info', uk: '📺 Інформація про сезони' },
season_info_desc: { ru: 'Показывает прогресс сезонов (требует TMDB API)', en: 'Show season progress (requires TMDB API)', uk: 'Показує прогрес сезонів (потрібен TMDB API)' },
source_filter: { ru: '🔍 Фильтр источников', en: '🔍 Source Filter', uk: '🔍 Фільтр джерел' },
source_filter_desc: { ru: 'Показывает тип источника (Онлайн/Торрент)', en: 'Show source type (Online/Torrent)', uk: 'Показує тип джерела (Онлайн/Торент)' },
movie_quality: { ru: '🎯 Качество фильмов', en: '🎯 Movie Quality', uk: '🎯 Якість фільмів' },
movie_quality_desc: { ru: 'Показывает качество: 4K, FHD, HD, SD (требует JacRed)', en: 'Show quality: 4K, FHD, HD, SD (requires JacRed)', uk: 'Показує якість: 4K, FHD, HD, SD (потрібен JacRed)' },
tmdb_api_key_set: { ru: 'TMDB API: ', en: 'TMDB API: ', uk: 'TMDB API: ' },
tmdb_api_key_notset: { ru: 'TMDB API (не указан)', en: 'TMDB API (not set)', uk: 'TMDB API (не вказано)' },
tmdb_api_key_desc: { ru: 'Нажмите для ввода ключа. Получить: themoviedb.org/settings/api', en: 'Click to enter key. Get it: themoviedb.org/settings/api', uk: 'Натисніть для введення ключа. Отримати: themoviedb.org/settings/api' },
jacred_url_set: { ru: 'JacRed: ', en: 'JacRed: ', uk: 'JacRed: ' },
jacred_url_notset: { ru: 'JacRed URL (не указан)', en: 'JacRed URL (not set)', uk: 'JacRed URL (не вказано)' },
jacred_url_desc: { ru: 'Нажмите для ввода URL (без http://)', en: 'Click to enter URL (without http://)', uk: 'Натисніть для введення URL (без http://)' },
tmdb_prompt: { ru: 'Введите TMDB API ключ (32 символа):', en: 'Enter TMDB API key (32 characters):', uk: 'Введіть TMDB API ключ (32 символи):' },
tmdb_saved: { ru: '✅ TMDB API ключ сохранён: ', en: '✅ TMDB API key saved: ', uk: '✅ TMDB API ключ збережено: ' },
tmdb_removed: { ru: '🗑️ TMDB API ключ удалён', en: '🗑️ TMDB API key removed', uk: '🗑️ TMDB API ключ видалено' },
jacred_prompt: { ru: 'Введите JacRed URL (например: jacred.xyz):', en: 'Enter JacRed URL (e.g. jacred.xyz):', uk: 'Введіть JacRed URL (наприклад: jacred.xyz):' },
jacred_saved: { ru: '✅ JacRed URL сохранён: ', en: '✅ JacRed URL saved: ', uk: '✅ JacRed URL збережено: ' },
setting_off: { ru: 'Выключено', en: 'Off', uk: 'Вимкнено' },
setting_on: { ru: 'Включено', en: 'On', uk: 'Увімкнено' }
});
/* DRXAOS Themes — включение трех функций по умолчанию (embedded, first-run safe) */
(function(){ 'use strict';
  function whenReady(cb){
    if (window.Lampa && Lampa.Storage) cb();
    else setTimeout(function(){ whenReady(cb); }, 200);
  }
  whenReady(function(){
    try{
      // Варианты ключей для совместимости разных ревизий
      var defaults = {
        'season_info': true,            // 📺 Информация о сезонах
        'source_filter': true,          // 🔍 Фильтр источников
        'movie_quality': true,          // 🎯 Качество фильмов
        'drxaos_season_info': true,
        'drxaos_source_filter': true,
        'drxaos_movie_quality': true
      };
      Object.keys(defaults).forEach(function(k){
        var cur = Lampa.Storage.get(k);
        if (cur === undefined || cur === null) Lampa.Storage.set(k, defaults[k]);
      });
      // Сообщим окружению о возможном изменении настроек
      try{
        if (Lampa.Listener && Lampa.Listener.send){
          Lampa.Listener.send('settings:updated', { name: 'drxaos_themes', source: 'defaults' });
        }
      }catch(e){}
    }catch(e){}
  });
})();
var prevtheme = '';
var applyThemeQueue = [];
var applyThemeTimer = null;
function batchApplyTheme(theme) {
    applyThemeQueue.push(theme);
    clearTimeout(applyThemeTimer);
    applyThemeTimer = setTimeout(function() {
        var latestTheme = applyThemeQueue[applyThemeQueue.length - 1];
        applyThemeQueue = [];
        applyThemeImmediate(latestTheme);
    }, CONFIG.PERFORMANCE.BATCH_UPDATE_DELAY);
}
var applyTheme = debounce(function(theme) {
    applyThemeImmediate(theme);
}, CONFIG.PERFORMANCE.DEBOUNCE_DELAY);
function applyThemeImmediate(theme) {
    try {
        if (!window.jQuery || !window.$) {
            logError('jQuery не загружен');
            return;
        }
        log('Применение темы:', theme);
styleManager.removeStyle('drxaos_theme_style');
prevtheme = theme;
if (theme === 'darkred') {
    // DARK RED ТЕМА - ЧЁРНЫЙ ФОН + КРАСНЫЕ ШРИФТЫ
    var darkRedStyles = `body,html,.background,.wrap{background:#0a0a0a!important;color:#ff1744!important}.layer,.modal,.menu,.modal__content{background:rgba(10,10,10,0.98)!important;color:#ff1744!important}*{color:#ff1744!important}.card__title,.full-start__title,.menu__item,.settings-param__name,.full-start__text,.item{color:#ff1744!important}`;
    styleManager.setStyle('drxaos_theme_style', darkRedStyles);
    return;
}
var glow = Lampa.Storage.get('drxaos_glow', 'medium');
var glowValues = { 'off': '0', 'low': '0.15em', 'medium': '0.3em', 'high': '0.5em' };
var glowSize = glowValues[glow] || '0.3em';
var alpha = 0.995;
var commonStyles = `/* ЦЕНТРИРОВАНИЕ ИКОНКИ PLAY + ЦВЕТ ТЕМЫ */
.card__icons{position:absolute!important;top:50%!important;left:50%!important;transform:translate(-50%,-50%)!important;z-index:5!important}
.card__icons-inner{display:flex!important;align-items:center!important;justify-content:center!important}
.card__icon{margin:0!important;color:rgb(var(--primary-rgb))!important;filter:drop-shadow(0 0 8px rgba(var(--primary-rgb),0.8))!important}
.icon--play{color:rgb(var(--primary-rgb))!important}
.icon--play svg,.card__icon svg{fill:rgb(var(--primary-rgb))!important;stroke:rgb(var(--primary-rgb))!important}
/* ПЛАШКИ НА КАРТОЧКАХ - ЦВЕТ ТЕМЫ */
body .card__type,body .card__vote,body .card--content-type,body .card--country,body .card--season-progress,body .card--season-complete,body .card__age{background:rgba(var(--primary-rgb),0.9)!important;color:#fff!important}
body .card-quality{background:rgba(var(--primary-rgb),0.95)!important;color:#fff!important}
body .card-next-episode{background:rgba(var(--primary-rgb),0.85)!important;color:#fff!important}

body .card__type,body .card__quality,body .card__rate,body .full-start__rate,body .full-start-new__rate{background:rgba(var(--primary-rgb),0.9)!important;color:#fff!important}
body .full-start__tags>*,body .full-start-new__tags>*{background:rgba(var(--primary-rgb),0.85)!important;color:#fff!important}
:root {
    --perf-blur: none;
    --perf-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    --perf-transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --perf-backdrop: none;
    --perf-transform: translateZ(0);
}
@media (max-width: 1366px) and (max-height: 768px) {
    :root {
        --perf-blur: blur(10px);
        --perf-shadow: 0 2px 8px rgba(0, 0, 0, var(--drxaos-surface-opacity));
        --perf-transition: transform 0.2s ease, opacity 0.2s ease;
        --perf-backdrop: blur(10px);
    }
}
@media (pointer: coarse) and (hover: none), 
       (max-width: 1920px) and (min-width: 1280px) and (orientation: landscape) {
    :root {
        --perf-blur: none;
        --perf-shadow: 0 2px 4px rgba(0, 0, 0, var(--drxaos-surface-opacity));
        --perf-transition: none;
        --perf-backdrop: none;
        --perf-transform: none;
    }
}
@media (min-width: 1920px) and (pointer: coarse) {
    :root {
        --perf-blur: none;
        --perf-shadow: 0 1px 3px rgba(0, 0, 0, var(--drxaos-surface-opacity));
        --perf-transition: none;
        --perf-backdrop: none;
    }
}
@font-face {
    font-family: 'Netflix Sans';
    font-weight: 100;
    src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Th.woff2') format('woff2');
}
@font-face {
    font-family: 'Netflix Sans';
    font-weight: 300;
    src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Lt.woff2') format('woff2');
}
@font-face {
    font-family: 'Netflix Sans';
    font-weight: 400;
    src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff2') format('woff2');
}
@font-face {
    font-family: 'Netflix Sans';
    font-weight: 700;
    src: url('https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Bd.woff2') format('woff2');
}
:root {
    --netflix-radius-sm: 8px;
    --netflix-radius-md: 12px;
    --netflix-radius-lg: 16px;
    --netflix-radius-xl: 20px;
    --netflix-shadow-sm: 0 2px 8px rgba(0, 0, 0, var(--drxaos-surface-opacity));
    --netflix-shadow-md: 0 4px 16px rgba(0, 0, 0, var(--drxaos-surface-opacity));
    --netflix-shadow-lg: 0 8px 32px rgba(0, 0, 0, var(--drxaos-surface-opacity));
    --netflix-transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --netflix-glass: rgba(20, 20, 20, 0.95);
    --netflix-glass-border: rgba(255, 255, 255, 0.95);
}
card-more__box {
    background: rgba(var(--layer-rgb), var(--drxaos-surface-opacity)) !important;
    border: 2px solid var(--theme-primary, #5a3494) !important;
    border-radius: 1em !important;
    saturate(180%) !important;
    -webkit-saturate(180%) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    padding: 1em !important;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important, opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.card-more__box:hover,
.card-more__box.focus {
    background: var(--theme-primary, #5a3494) !important;
    border: 2px solid var(--theme-accent, #0088bb) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    transform: scale(1.02) !important;
}
.card-more__title {
    color: var(--text-main, #ffffff) !important;
    font-family: var(--font-family, 'Netflix Sans') !important;
    font-weight: 600 !important;
    text-align: center !important;
}
.online-prestige {
    background: var(--drxaos-bg-color) !important;
    border: 2px solid var(--drxaos-accent-color) !important;
    border-radius: 12px !important;
    padding: 1em !important;
    transition: transform 0.3s ease !important, opacity 0.3s ease !important;
}
.online-prestige.focus,
.online-prestige:hover {
    border-color: var(--drxaos-accent-color) !important;
    box-shadow: 0 0 20px var(--drxaos-accent-color) !important;
    transform: scale(1.02) !important;
}
.online-prestige__img {
    border-radius: 8px !important;
    overflow: hidden !important;
}
.online-prestige__title,
.online-prestige__info,
.online-prestige__footer {
    color: var(--drxaos-text-color) !important;
    font-family: 'Netflix Sans', 'Netflix Sans', sans-serif !important;
}
body {
    background: #141414 !important;
    background: linear-gradient(135deg, #141414 0%, #0a0a0a 100%) !important;
}

.app {
    background: #141414 !important;
}

.app__default {
    background: transparent !important;
}

body .card, .card {
    background: transparent !important;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    overflow: visible !important;
    transition: var(--netflix-transition) !important;
}
body .card:hover,
body .card.focus,
body .card.hover {
    transform: var(--perf-transform) !important;
    z-index: 999 !important;
    position: relative !important;
}
body:not(.drxaos-buttons-ready) .full-start__buttons .full-start__button,
body:not(.drxaos-buttons-ready) .full-start-new__buttons .full-start__button {
    opacity: 0 !important;
    pointer-events: none !important;
}
body.drxaos-buttons-ready .full-start__buttons .full-start__button,
body.drxaos-buttons-ready .full-start-new__buttons .full-start__button {
    opacity: 1 !important;
}
body .card__view,
.card__view {
    border-radius: 12px !important;
    overflow: hidden !important;
    background: transparent !important;
    border: none !important;
}
body .card__img,
.card__img {
    border-radius: 12px !important;
    overflow: hidden !important;
}
body .card__img img,
.card__img img {
    border-radius: 12px !important;
}
body .card:hover .card__view,
body .card.focus .card__view,
body .card.hover .card__view {
    box-shadow: var(--perf-shadow) !important;
}
body .card .card__view {
    position: relative !important;
}
body .card .card__view::after {
    content: '' !important;
    position: absolute !important;
    inset: 0 !important;
    border-radius: inherit !important;
    border: 4px solid transparent !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    opacity: 0 !important;
    pointer-events: none !important;
    transition: border var(--perf-transition), box-shadow var(--perf-transition), opacity var(--perf-transition) !important;
    z-index: 5 !important;
}
body .card:hover .card__img,
body .card.focus .card__img,
body .card.hover .card__img {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
body .card.focus .card__img,
body .card.card--focus .card__img {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
body .card:hover .card__view::after,
body .card.focus .card__view::after,
body .card.hover .card__view::after {
    border-color: rgba(var(--primary-rgb), 0.995) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    opacity: 1 !important;
}
body .card.focus .card__view::after,
body .card.card--focus .card__view::after {
    border-color: rgba(var(--secondary-rgb), 0.995) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
body .settings-param, .settings-param,
body .settings-folder, .settings-folder {
    background: rgba(var(--bg-rgb, 12, 12, 12), var(--drxaos-surface-opacity)) !important;
    border: 1px solid rgba(255, 255, 255, 0.95) !important;
    border-radius: var(--netflix-radius-md) !important;
    padding: 1em 1.2em !important;
    margin: 0.4em 0 !important;
    transition: var(--perf-transition) !important;
    backdrop-filter: var(--perf-backdrop) !important;
    -webkit-backdrop-filter: var(--perf-backdrop) !important;
    box-shadow: var(--perf-shadow) !important;
}
body .settings-param.focus, body .settings-param:hover,
body .settings-folder.focus, body .settings-folder:hover {
    background: rgba(var(--primary-rgb), 0.25) !important;
    border: 1px solid rgba(var(--primary-rgb), 0.55) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    transform: var(--perf-transform) !important;
}
body .settings-param.focus *, body .settings-param:hover *,
body .settings-folder.focus *, body .settings-folder:hover * {
    color: var(--text-main) !important;
}
body .full-start__buttons {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 0.8em !important;
    align-items: center !important;
    justify-content: flex-start !important;
}
body .full-start__button, .full-start__button {
    background: rgba(var(--primary-rgb), 0.9) !important;
    border: 2px solid transparent !important;
    color: #000000 !important;
    border-radius: var(--netflix-radius-lg) !important;
    padding: 0.6em 1.2em !important;
    font-weight: 600 !important;
    transition: var(--perf-transition) !important;
    backdrop-filter: var(--perf-backdrop) !important;
    -webkit-backdrop-filter: var(--perf-backdrop) !important;
    box-shadow: var(--perf-shadow) !important;
    width: auto !important;
    min-width: auto !important;
    max-width: fit-content !important;
    flex: 0 0 auto !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0.5em !important;
    white-space: nowrap !important;
}
.full-start__button:hover {
    transform: var(--perf-transform) !important;
    box-shadow: var(--perf-shadow) !important;
    outline: 2px solid rgba(255, 255, 255, 0.95) !important;
}
.full-start__button {
    transition: var(--perf-transition) !important;
}
body .full-start__button svg,
body .full-start__button img {
    width: 1.2em !important;
    height: 1.2em !important;
    min-width: 1.2em !important;
    min-height: 1.2em !important;
    max-width: 1.2em !important;
    max-height: 1.2em !important;
    flex-shrink: 0 !important;
}
body .full-start__button.focus, 
body .full-start__button:hover,
body .full-start__button.hover {
    background: rgb(var(--primary-rgb)) !important;
    border: 2px solid rgba(255, 255, 255, 0.95) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    transform: translateY(-2px) translateZ(0) !important;
}
body .full-start__button svg,
.full-start__button svg {
    fill: #000000 !important;
    color: #000000 !important;
    flex-shrink: 0 !important;
    height: 28px !important;
    width: 28px !important;
    margin: 0 !important;
}
body .full-start__button span { color: #000 !important; font-weight: 700 !important; margin-left: 8px !important; }
.drxaos-watch-hidden {
    display: none !important;
}
body.drxaos-icon-buttons .full-start__button {
    padding: 0 !important;
    width: 3.6em !important;
    height: 3.6em !important;
    min-width: 3.6em !important;
    min-height: 3.6em !important;
    max-width: 3.6em !important;
    max-height: 3.6em !important;
    border-radius: 50% !important;
    justify-content: center !important;
    align-items: center !important;
    overflow: hidden !important;
    gap: 0 !important;
}
body.drxaos-icon-buttons .full-start__button span {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
}
body.drxaos-icon-buttons .full-start__button svg,
body.drxaos-icon-buttons .full-start__button img {
    margin: 0 !important;
    width: 1.6em !important;
    height: 1.6em !important;
    min-width: 1.6em !important;
    min-height: 1.6em !important;
    max-width: 1.6em !important;
    max-height: 1.6em !important;
}
body .selectbox-item, .selectbox-item {
    background: transparent !important;
    border: none !important;
    border-bottom: 1px solid rgba(var(--primary-rgb), 0.2) !important;
    border-radius: 0 !important;
    padding: 0.8em 1em !important;
    margin: 0 !important;
    transition: background 0.2s ease !important;
}
body .selectbox-item.focus, body .selectbox-item:hover {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-bottom: 1px solid var(--theme-accent) !important;
    box-shadow: none !important;
}
body .selectbox-item__poster, .selectbox-item__poster { display: none !important; }
body .selectbox-item__icon, .selectbox-item__icon { 
    display: inline-block !important; 
    width: 24px !important;
    height: 24px !important;
    margin-right: 12px !important;
    vertical-align: middle !important;
    flex-shrink: 0 !important;
}
body .selectbox-item__title, .selectbox-item__title {
    font-size: 1.1em !important;
    line-height: 1.3 !important;
    padding: 0 !important;
}
body .selectbox-item__subtitle, .selectbox-item__subtitle {
    font-size: 0.995em !important;
    margin-top: 0.3em !important;
    opacity: 0.95 !important;
}
body .torrent-serial, .torrent-serial {
    display: flex !important;
    flex-direction: row !important;
    align-items: flex-start !important;
    gap: 1em !important;
    background: rgba(255, 255, 255, 0.03) !important; 
    border: 1px solid rgba(255, 255, 255, 0.95) !important; 
    border-radius: 0.5em !important; 
    padding: 1em !important;
    margin: 0.5em 0 !important; 
    min-height: 140px !important;
    transition: transform 0.2s ease !important, opacity 0.2s ease !important;
}
/* ЧЕРНАЯ ТОЛСТАЯ ОБВОДКА С УМЕНЬШЕНИЕМ + ЧЕРНЫЙ ТЕКСТ */
body .torrent-serial:hover, .torrent-serial:hover,
body .torrent-serial.focus, .torrent-serial.focus,
body .torrent-serial.selector:hover,
body .torrent-serial.selector.focus {
    border: 4px solid rgba(0, 0, 0, 0.95) !important;
    border-color: rgba(0, 0, 0, 0.95) !important;
    background: rgba(255, 255, 255, 0.95) !important;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7) !important;
    transform: translateZ(0) scale(0.98) !important;
    outline: 3px solid rgba(0, 0, 0, 0.9) !important;
    outline-offset: 1px !important;
    color: #000 !important;
}

/* Чёрный текст для вложенных элементов */
body .torrent-serial:hover *,
body .torrent-serial.focus *,
body .torrent-serial.selector:hover *,
body .torrent-serial.selector.focus * {
    color: #000 !important;
}


/* Обычное состояние торрент-файлов - БЕЗ БЕЛОЙ ГРАНИЦЫ */
body .torrent-serial,
body .torrent-serial.selector,
.torrent-serial,
.torrent-serial.selector {
    border: 1px solid transparent !important;
    border-color: transparent !important;
    transition: all 0.2s ease !important;
}

/* Дополнительно для .selector класса */
/* Стили .selector объединены с общими выше */

body .torrent-serial__img, .torrent-serial__img {
    height: 120px !important;
    object-fit: cover !important;
    border-radius: 0.3em !important;
    flex-shrink: 0 !important;
}
body .torrent-serial__content, .torrent-serial__content {
    flex: 1 !important;
    padding: 0 !important;
    min-width: 0 !important;
}
body .tracks-metainfo, .tracks-metainfo,
body .torrent-files, .torrent-files {
    margin-top: 0.5em !important;
    padding: 0 !important;
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
}
body .tracks-metainfo__item, .tracks-metainfo__item {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important; 
    align-items: center !important;
    gap: 0.3em !important;
    padding: 0.4em 0.6em !important;
    margin: 0 !important;
    font-size: 0.9em !important;
    background: transparent !important;
    border: none !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
    border-radius: 0 !important;
    min-height: 2em !important;
    max-height: 3em !important;
    overflow: hidden !important;
    line-height: 1.3 !important;
}
body .tracks-metainfo__column--num, .tracks-metainfo__column--num,
body .tracks-metainfo__column--lang, .tracks-metainfo__column--lang,
body .tracks-metainfo__column--name, .tracks-metainfo__column--name,
body .tracks-metainfo__column--codec, .tracks-metainfo__column--codec,
body .tracks-metainfo__column--channels, .tracks-metainfo__column--channels,
body .tracks-metainfo__column--rate, .tracks-metainfo__column--rate,
body [class*="tracks-metainfo__column"], [class*="tracks-metainfo__column"] {
    display: inline-block !important;
    padding: 0.2em 0.4em !important;
    margin: 0 !important;
    font-size: 0.85em !important;
    white-space: nowrap !important;
    background: rgba(255, 255, 255, 0.05) !important;
    border-radius: 0.2em !important;
    flex-shrink: 0 !important;
}
body .torrent-files__title, .torrent-files__title,
body .tracks-metainfo__title, .tracks-metainfo__title {
    font-size: 1em !important;
    padding: 0.5em 0 !important;
    margin: 0 !important;
    opacity: 0.95 !important;
}
body .torrent-serial .scroll__body, .torrent-serial .scroll__body {
    padding: 0 !important;
}
body .tracks-metainfo__line, .tracks-metainfo__line {
    display: flex !important;
    align-items: center !important;
    gap: 0.5em !important;
    padding: 0.4em 0.6em !important;
    margin: 0.2em 0 !important;
    font-size: 0.9em !important;
background: transparent !important;
border: none !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
    border-radius: 0 !important;
}
body .torrent-file, .torrent-file {
    display: block !important;
    background: transparent !important;
    border: none !important;
    border-bottom: 1px solid rgba(var(--primary-rgb), 0.15) !important;
    border-radius: 0 !important;
    padding: 0.6em 0.8em !important;
    margin: 0 !important;
    transition: background 0.2s ease !important;
    padding-bottom: 0.6em !important; 
    align-items: flex-start !important; 
}
body .torrent-file + .torrent-file, .torrent-file + .torrent-file {
    margin-top: 0 !important;
}
body .torrent-file.focus, body .torrent-file:hover,
body .torrent-file.focus::after, body .torrent-file:hover::after {
    background: rgba(var(--primary-rgb), 0.15) !important;
    border-bottom: 1px solid var(--theme-accent) !important;
    box-shadow: none !important;
    border: none !important; 
}
body .torrent-file__title, .torrent-file__title {
    font-size: 1.1em !important;
    line-height: 1.3 !important;
    padding-right: 0.5em !important;
}
body .torrent-file__quality, .torrent-file__quality {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 0.3em !important;
    margin-top: 0.4em !important;
    align-items: center !important;
}
body .torrent-file__quality > *, .torrent-file__quality > * {
    display: inline-block !important;
    font-size: 0.8em !important;
    padding: 0.25em 0.5em !important;
    margin: 0 !important;
    border-radius: 0.25em !important;
    background: rgba(var(--primary-rgb), 0.25) !important;
    border: 1px solid rgba(var(--primary-rgb), 0.35) !important;
white-space: nowrap !important;
    line-height: 1.2 !important;
}
body .torrent-file__size, .torrent-file__size {
    font-size: 1em !important;
    padding: 0.3em 0.5em !important;
border-radius: 0.3em !important;
    background: rgba(var(--primary-rgb), 0.3) !important;
    border: 1px solid rgba(var(--primary-rgb), 0.4) !important;
}
body .files__item, .files__item,
body .torrent-item, .torrent-item {
background: transparent !important;
border: none !important;
    border-bottom: 1px solid rgba(var(--primary-rgb), 0.2) !important;
border-radius: 0 !important;
    padding: 0.5em 0.8em !important;
    margin: 0 !important;
    transition: background 0.2s ease !important;
}
body .files__item.focus, body .files__item:hover,
body .torrent-item.focus, body .torrent-item:hover {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-bottom: 1px solid var(--theme-accent) !important;
box-shadow: none !important;
}
body .menu__item, .menu__item {
background: var(--glass-bg, rgba(0, 0, 0, var(--drxaos-surface-opacity))) !important;
    border: none !important;
border-radius: 0 !important;
    padding: 1em 1.5em !important;
    margin: 0 !important;
    border-bottom: 1px solid rgba(var(--primary-rgb), 0.2) !important;
transition: transform 0.3s ease !important, opacity 0.3s ease !important;
saturate(180%) !important;
-webkit-saturate(180%) !important;
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    box-sizing: border-box !important;
}
body .menu__item:first-child {
    border-top: 1px solid rgba(var(--primary-rgb), 0.2) !important;
}
body .menu {
    border-radius: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
}
body .menu__item.focus, body .menu__item:hover {
background: linear-gradient(90deg, var(--theme-primary), var(--theme-secondary)) !important;
border: none !important;
border-left: 4px solid var(--theme-accent) !important;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    padding: 1em 1.5em !important;
    margin: 0 !important;
}
.card__quality, .card__quality *, .card__type::after,
.head__action.focus, .head__action.focus *,
.head__action:hover, .head__action:hover *,
.menu__item.focus, .menu__item.focus *,
.menu__item:hover, .menu__item:hover *,
.settings-param.focus, .settings-param.focus *,
.settings-param:hover, .settings-param:hover *,
.files__item.focus, .files__item.focus *,
.files__item:hover, .files__item:hover *,
.torrent-item.focus, .torrent-item.focus *,
.torrent-item:hover, .torrent-item:hover *,
.filter__item.focus, .filter__item.focus *,
.filter__item:hover, .filter__item:hover *,
.sort__item.focus, .sort__item.focus *,
.sort__item:hover, .sort__item:hover *,
.selectbox-item.focus, .selectbox-item.focus *,
.selectbox-item:hover, .selectbox-item:hover *,
.online__item.focus, .online__item.focus *,
.online__item:hover, .online__item:hover *,
.online__item-line.focus, .online__item-line.focus *,
.online__item-line:hover, .online__item-line:hover *,
.online-prestige__item.focus, .online-prestige__item.focus *,
.online-prestige__item:hover, .online-prestige__item:hover *,
.online-prestige__line.focus, .online-prestige__line.focus *,
.online-prestige__line:hover, .online-prestige__line:hover *,
.online__tabs-item.focus, .online__tabs-item.focus *,
.online__tabs-item:hover, .online__tabs-item:hover *,
.card.focus, .card.focus *,
.card:hover, .card:hover * {
    text-shadow: none !important;
}
@media (max-width: 768px), (hover: none), (pointer: coarse) {
    @keyframes navigation-pulse {
        0%, 100% {
            color: var(--theme-primary) !important;
            opacity: 0.95 !important;
        }
        50% {
            color: var(--theme-accent) !important;
            opacity: 1 !important;
        }
    }
    @-webkit-keyframes navigation-pulse {
        0%, 100% {
            color: var(--theme-primary) !important;
            opacity: 0.95 !important;
        }
        50% {
            color: var(--theme-accent) !important;
            opacity: 1 !important;
        }
    }
    body.true--mobile .navigation-bar,
    body.true--mobile .navigation-bar.navigation-bar,
    body .navigation-bar,
    .navigation-bar,
    .navigation-bar.navigation-bar {
        background: #000000 !important;
        background-color: #000000 !important;
        opacity: 0.95 !important;
        saturate(180%) !important;
        -webkit-saturate(180%) !important;
        border-top: 2px solid rgba(var(--primary-rgb), 0.6) !important;
        border-radius: 0 !important;
        padding: 0.5em 0 !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    }
    body.true--mobile .navigation-bar__body,
    body .navigation-bar__body,
    .navigation-bar__body {
        background: transparent !important;
        background-color: transparent !important;
    }
    body.true--mobile .navigation-bar__item,
    body.true--mobile .navigation-bar__item.navigation-bar__item,
    body .navigation-bar__item,
    .navigation-bar__item,
    .navigation-bar__item.navigation-bar__item {
        background: transparent !important;
        background-color: transparent !important;
        border: none !important;
        border-radius: 0.8em !important;
        padding: 0.8em 1em !important;
        margin: 0.2em !important;
        transition: transform 0.3s ease !important, opacity 0.3s ease !important;
        color: rgba(255, 255, 255, 0.95) !important;
    }
    body.true--mobile .navigation-bar__item.focus,
    body.true--mobile .navigation-bar__item:active,
    body.true--mobile .navigation-bar__item.selector,
    body.true--mobile .navigation-bar__item.selector.focus,
    body .navigation-bar__item.focus,
    .navigation-bar__item.focus,
    .navigation-bar__item:active,
    .navigation-bar__item.selector,
    .navigation-bar__item.selector.focus {
        background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.7), rgba(var(--secondary-rgb), 0.6)) !important;
        background-color: transparent !important;
        border-bottom: 3px solid var(--theme-accent) !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
        color: #ffffff !important;
        transform: translateY(-2px) !important;
    }
    body.true--mobile .navigation-bar__item svg,
    body.true--mobile .navigation-bar__item svg path,
    body.true--mobile .navigation-bar__item svg circle,
    body .navigation-bar__item svg,
    body .navigation-bar__item svg path,
    body .navigation-bar__item svg circle,
    .navigation-bar__item svg,
    .navigation-bar__item svg path,
    .navigation-bar__item svg circle {
        animation: navigation-pulse 2.5s ease-in-out infinite !important;
        -webkit-animation: navigation-pulse 2.5s ease-in-out infinite !important;
        fill: currentColor !important;
        stroke: currentColor !important;
    }
}
.settings-param:hover, .settings-param:focus, .settings-param.focus, .settings-param.hover,
.menu__item:hover, .menu__item:focus, .menu__item.focus, .menu__item.hover,
.files__item:hover, .files__item:focus, .files__item.focus, .files__item.hover,
.torrent-item:hover, .torrent-item:focus, .torrent-item.focus, .torrent-item.hover,
.filter__item:hover, .filter__item:focus, .filter__item.focus, .filter__item.hover,
.sort__item:hover, .sort__item:focus, .sort__item.focus, .sort__item.hover,
.selectbox-item:hover, .selectbox-item:focus, .selectbox-item.focus, .selectbox-item.hover,
.online__item:hover, .online__item:focus, .online__item.focus, .online__item.hover,
.online__item-line:hover, .online__item-line:focus, .online__item-line.focus, .online__item-line.hover,
.online-prestige__item:hover, .online-prestige__item:focus, .online-prestige__item.focus, .online-prestige__item.hover,
.online-prestige__line:hover, .online-prestige__line:focus, .online-prestige__line.focus, .online-prestige__line.hover,
.online__tabs-item:hover, .online__tabs-item:focus, .online__tabs-item.focus, .online__tabs-item.hover,
.full-start__button:hover, .full-start__button:focus, .full-start__button.focus, .full-start__button.hover,
.head__action:hover, .head__action:focus, .head__action.focus, .head__action.hover,
.bottom-bar__item:hover, .bottom-bar__item:focus, .bottom-bar__item.focus, .bottom-bar__item.hover,
.bottom-bar__btn:hover, .bottom-bar__btn:focus, .bottom-bar__btn.focus, .bottom-bar__btn.hover,
.settings-folder:hover, .settings-folder:focus, .settings-folder.focus, .settings-folder.hover,
.drxaos-theme-quick-btn:hover, .drxaos-theme-quick-btn:focus, .drxaos-theme-quick-btn.focus, .drxaos-theme-quick-btn.hover,
.button:hover, .button:focus, .button.focus, .button.hover,
.settings-param:hover, .settings-param:focus, .settings-param.focus, .settings-param.hover {
    text-shadow: none !important;
}
.button, .button *, .settings-param, .settings-param *,
.menu__item, .menu__item *,
.full-start__button, .full-start__button * {
    font-weight: inherit !important;
    text-shadow: none !important;
}
*:hover, *:focus, *.focus, *.hover {
    transform: none !important;
}
.settings-param:hover *, .settings-param:focus *, .settings-param.focus *, .settings-param.hover *,
.menu__item:hover *, .menu__item:focus *, .menu__item.focus *, .menu__item.hover *,
.files__item:hover *, .files__item:focus *, .files__item.focus *, .files__item.hover *,
.torrent-item:hover *, .torrent-item:focus *, .torrent-item.focus *, .torrent-item.hover *,
.filter__item:hover *, .filter__item:focus *, .filter__item.focus *, .filter__item.hover *,
.sort__item:hover *, .sort__item:focus *, .sort__item.focus *, .sort__item.hover *,
.selectbox-item:hover *, .selectbox-item:focus *, .selectbox-item.focus *, .selectbox-item.hover *,
.online__item:hover *, .online__item:focus *, .online__item.focus *, .online__item.hover *,
.online__item-line:hover *, .online__item-line:focus *, .online__item-line.focus *, .online__item-line.hover *,
.online-prestige__item:hover *, .online-prestige__item:focus *, .online-prestige__item.focus *, .online-prestige__item.hover *,
.online-prestige__line:hover *, .online-prestige__line:focus *, .online-prestige__line.focus *, .online-prestige__line.hover *,
.online__tabs-item:hover *, .online__tabs-item:focus *, .online__tabs-item.focus *, .online__tabs-item.hover *,
.full-start__button:hover *, .full-start__button:focus *, .full-start__button.focus *, .full-start__button.hover *,
.head__action:hover *, .head__action:focus *, .head__action.focus *, .head__action.hover *,
.bottom-bar__item:hover *, .bottom-bar__item:focus *, .bottom-bar__item.focus *, .bottom-bar__item.hover *,
.bottom-bar__btn:hover *, .bottom-bar__btn:focus *, .bottom-bar__btn.focus *, .bottom-bar__btn.hover *,
.settings-folder:hover *, .settings-folder:focus *, .settings-folder.focus *, .settings-folder.hover *,
.drxaos-theme-quick-btn:hover *, .drxaos-theme-quick-btn:focus *, .drxaos-theme-quick-btn.focus *, .drxaos-theme-quick-btn.hover * {
    text-shadow: none !important;
}
*[style*="color: #000000"], *[style*="color:#000000"], 
*[style*="color: #001a1f"], *[style*="color:#001a1f"],
*[style*="color: #0a0a0a"], *[style*="color:#0a0a0a"],
*[style*="color: var(--text-contrast)"], 
.card__quality, .card__quality *, .card__type::after,
.head__action, .head__action *,
.menu__item, .menu__item *,
.settings-param, .settings-param *,
.files__item, .files__item *,
.torrent-item, .torrent-item *,
.filter__item, .filter__item *,
.sort__item, .sort__item *,
.selectbox-item, .selectbox-item *,
.online__item, .online__item *,
.online__item-line, .online__item-line *,
.online-prestige__item, .online-prestige__item *,
.online-prestige__line, .online-prestige__line *,
.online__tabs-item, .online__tabs-item *,
.card, .card *,
.bottom-bar__item, .bottom-bar__item *,
.bottom-bar__btn, .bottom-bar__btn *,
.settings-folder, .settings-folder *,
.drxaos-theme-quick-btn, .drxaos-theme-quick-btn * {
    text-shadow: none !important;
}
body .head__actions .head__action,
body .head__action,
.head__action,
.drxaos-theme-quick-btn {
    background: transparent !important;
    border-radius: 8px !important;
    padding: 8px !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    transition: var(--perf-transition) !important;
    box-shadow: none !important;
}
body .head__actions .head__action:hover,
body .head__actions .head__action.focus,
body .head__action:hover,
body .head__action.focus,
.head__action:hover,
.head__action.focus,
.drxaos-theme-quick-btn:hover,
.drxaos-theme-quick-btn.focus {
    background: rgba(var(--primary-rgb), 0.2) !important;
    transform: var(--perf-transform) !important;
}
*[style*="color: #000"], *[style*="color:#000"],
*[style*="color: #001"], *[style*="color:#001"],
*[style*="color: #002"], *[style*="color:#002"],
*[style*="color: #003"], *[style*="color:#003"],
*[style*="color: #004"], *[style*="color:#004"],
*[style*="color: #005"], *[style*="color:#005"],
*[style*="color: #006"], *[style*="color:#006"],
*[style*="color: #007"], *[style*="color:#007"],
*[style*="color: #008"], *[style*="color:#008"],
*[style*="color: #009"], *[style*="color:#009"],
*[style*="color: #00a"], *[style*="color:#00a"],
*[style*="color: #00b"], *[style*="color:#00b"],
*[style*="color: #00c"], *[style*="color:#00c"],
*[style*="color: #00d"], *[style*="color:#00d"],
*[style*="color: #00e"], *[style*="color:#00e"],
*[style*="color: #00f"], *[style*="color:#00f"],
*[style*="color: #010"], *[style*="color:#010"],
*[style*="color: #020"], *[style*="color:#020"],
*[style*="color: #030"], *[style*="color:#030"],
*[style*="color: #040"], *[style*="color:#040"],
*[style*="color: #050"], *[style*="color:#050"],
*[style*="color: #060"], *[style*="color:#060"],
*[style*="color: #070"], *[style*="color:#070"],
*[style*="color: #080"], *[style*="color:#080"],
*[style*="color: #090"], *[style*="color:#090"],
*[style*="color: #0a0"], *[style*="color:#0a0"],
*[style*="color: #0b0"], *[style*="color:#0b0"],
*[style*="color: #0c0"], *[style*="color:#0c0"],
*[style*="color: #0d0"], *[style*="color:#0d0"],
*[style*="color: #0e0"], *[style*="color:#0e0"],
*[style*="color: #0f0"], *[style*="color:#0f0"],
*[style*="color: #100"], *[style*="color:#100"],
*[style*="color: #200"], *[style*="color:#200"],
*[style*="color: #300"], *[style*="color:#300"],
*[style*="color: #400"], *[style*="color:#400"],
*[style*="color: #500"], *[style*="color:#500"],
*[style*="color: #600"], *[style*="color:#600"],
*[style*="color: #700"], *[style*="color:#700"],
*[style*="color: #800"], *[style*="color:#800"],
*[style*="color: #900"], *[style*="color:#900"],
*[style*="color: #a00"], *[style*="color:#a00"],
*[style*="color: #b00"], *[style*="color:#b00"],
*[style*="color: #c00"], *[style*="color:#c00"],
*[style*="color: #d00"], *[style*="color:#d00"],
*[style*="color: #e00"], *[style*="color:#e00"],
*[style*="color: #f00"], *[style*="color:#f00"] {
    text-shadow: none !important;
}
*[style*="color: rgb(0,"], *[style*="color:rgb(0,"],
*[style*="color: rgb(1,"], *[style*="color:rgb(1,"],
*[style*="color: rgb(2,"], *[style*="color:rgb(2,"],
*[style*="color: rgb(3,"], *[style*="color:rgb(3,"],
*[style*="color: rgb(4,"], *[style*="color:rgb(4,"],
*[style*="color: rgb(5,"], *[style*="color:rgb(5,"],
*[style*="color: rgb(6,"], *[style*="color:rgb(6,"],
*[style*="color: rgb(7,"], *[style*="color:rgb(7,"],
*[style*="color: rgb(8,"], *[style*="color:rgb(8,"],
*[style*="color: rgb(9,"], *[style*="color:rgb(9,"],
*[style*="color: rgb(10,"], *[style*="color:rgb(10,"],
*[style*="color: rgb(11,"], *[style*="color:rgb(11,"],
*[style*="color: rgb(12,"], *[style*="color:rgb(12,"],
*[style*="color: rgb(13,"], *[style*="color:rgb(13,"],
*[style*="color: rgb(14,"], *[style*="color:rgb(14,"],
*[style*="color: rgb(15,"], *[style*="color:rgb(15,"],
*[style*="color: rgb(16,"], *[style*="color:rgb(16,"],
*[style*="color: rgb(17,"], *[style*="color:rgb(17,"],
*[style*="color: rgb(18,"], *[style*="color:rgb(18,"],
*[style*="color: rgb(19,"], *[style*="color:rgb(19,"],
*[style*="color: rgb(20,"], *[style*="color:rgb(20,"],
*[style*="color: rgb(21,"], *[style*="color:rgb(21,"],
*[style*="color: rgb(22,"], *[style*="color:rgb(22,"],
*[style*="color: rgb(23,"], *[style*="color:rgb(23,"],
*[style*="color: rgb(24,"], *[style*="color:rgb(24,"],
*[style*="color: rgb(25,"], *[style*="color:rgb(25,"],
*[style*="color: rgb(26,"], *[style*="color:rgb(26,"],
*[style*="color: rgb(27,"], *[style*="color:rgb(27,"],
*[style*="color: rgb(28,"], *[style*="color:rgb(28,"],
*[style*="color: rgb(29,"], *[style*="color:rgb(29,"],
*[style*="color: rgb(30,"], *[style*="color:rgb(30,"],
*[style*="color: rgb(31,"], *[style*="color:rgb(31,"],
*[style*="color: rgb(32,"], *[style*="color:rgb(32,"],
*[style*="color: rgb(33,"], *[style*="color:rgb(33,"],
*[style*="color: rgb(34,"], *[style*="color:rgb(34,"],
*[style*="color: rgb(35,"], *[style*="color:rgb(35,"],
*[style*="color: rgb(0,0,0)"], *[style*="color:rgb(0,0,0)"],
*[style*="color: rgb(1,1,1)"], *[style*="color:rgb(1,1,1)"],
*[style*="color: rgb(2,2,2)"], *[style*="color:rgb(2,2,2)"],
*[style*="color: rgb(3,3,3)"], *[style*="color:rgb(3,3,3)"],
*[style*="color: rgb(4,4,4)"], *[style*="color:rgb(4,4,4)"],
*[style*="color: rgb(5,5,5)"], *[style*="color:rgb(5,5,5)"],
*[style*="color: rgb(6,6,6)"], *[style*="color:rgb(6,6,6)"],
*[style*="color: rgb(7,7,7)"], *[style*="color:rgb(7,7,7)"],
*[style*="color: rgb(8,8,8)"], *[style*="color:rgb(8,8,8)"],
*[style*="color: rgb(9,9,9)"], *[style*="color:rgb(9,9,9)"],
*[style*="color: rgb(10,10,10)"], *[style*="color:rgb(10,10,10)"],
*[style*="color: rgb(11,11,11)"], *[style*="color:rgb(11,11,11)"],
*[style*="color: rgb(12,12,12)"], *[style*="color:rgb(12,12,12)"],
*[style*="color: rgb(13,13,13)"], *[style*="color:rgb(13,13,13)"],
*[style*="color: rgb(14,14,14)"], *[style*="color:rgb(14,14,14)"],
*[style*="color: rgb(15,15,15)"], *[style*="color:rgb(15,15,15)"],
*[style*="color: rgb(16,16,16)"], *[style*="color:rgb(16,16,16)"],
*[style*="color: rgb(17,17,17)"], *[style*="color:rgb(17,17,17)"],
*[style*="color: rgb(18,18,18)"], *[style*="color:rgb(18,18,18)"],
*[style*="color: rgb(19,19,19)"], *[style*="color:rgb(19,19,19)"],
*[style*="color: rgb(20,20,20)"], *[style*="color:rgb(20,20,20)"],
*[style*="color: rgb(21,21,21)"], *[style*="color:rgb(21,21,21)"],
*[style*="color: rgb(22,22,22)"], *[style*="color:rgb(22,22,22)"],
*[style*="color: rgb(23,23,23)"], *[style*="color:rgb(23,23,23)"],
*[style*="color: rgb(24,24,24)"], *[style*="color:rgb(24,24,24)"],
*[style*="color: rgb(25,25,25)"], *[style*="color:rgb(25,25,25)"],
*[style*="color: rgb(26,26,26)"], *[style*="color:rgb(26,26,26)"],
*[style*="color: rgb(27,27,27)"], *[style*="color:rgb(27,27,27)"],
*[style*="color: rgb(28,28,28)"], *[style*="color:rgb(28,28,28)"],
*[style*="color: rgb(29,29,29)"], *[style*="color:rgb(29,29,29)"],
*[style*="color: rgb(30,30,30)"], *[style*="color:rgb(30,30,30)"],
*[style*="color: rgb(31,31,31)"], *[style*="color:rgb(31,31,31)"],
*[style*="color: rgb(32,32,32)"], *[style*="color:rgb(32,32,32)"],
*[style*="color: rgb(33,33,33)"], *[style*="color:rgb(33,33,33)"],
*[style*="color: rgb(34,34,34)"], *[style*="color:rgb(34,34,34)"],
*[style*="color: rgb(35,35,35)"], *[style*="color:rgb(35,35,35)"] {
    text-shadow: none !important;
}
.card__view-time, .card__view--time, .card-watched, .card__time,
.time--line, .card .time, body .card__view .time, body .card .time {
    display: none !important;
}
.card, .card__view, .card__img {
    transform: translateZ(0) !important;
    will-change: auto !important;
    backface-visibility: hidden !important;
    -webkit-backface-visibility: hidden !important;
    perspective: 1000px !important;
    -webkit-perspective: 1000px !important;
}
.card {
    contain: style paint !important; 
    isolation: isolate !important; 
}
.card, .card__view, .card__img {
    transition: none !important;
}
@media (pointer: coarse) and (hover: none) {
    .card, .card__view, .card__img {
        transition: none !important;
    }
}
body .console {
    background: var(--netflix-glass) !important;
    backdrop-filter: var(--perf-backdrop) !important;
    -webkit-backdrop-filter: var(--perf-backdrop) !important;
    border: 1px solid var(--netflix-glass-border) !important;
    border-radius: var(--netflix-radius-lg) !important;
    box-shadow: var(--perf-shadow) !important;
    padding: 0 !important;
    overflow: hidden !important;
}
body .console .head-backward {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--secondary-rgb), 0.15)) !important;
    border: none !important;
    border-bottom: 1px solid var(--netflix-glass-border) !important;
    padding: 1em 1.5em !important;
    margin: 0 !important;
}
body .console .head-backward__button {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-radius: 50% !important;
    width: 2.5em !important;
    height: 2.5em !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: var(--perf-transition) !important;
    box-shadow: var(--perf-shadow) !important;
}
body .console .head-backward__button:hover,
body .console .head-backward.focus .head-backward__button {
    background: rgba(var(--primary-rgb), 0.4) !important;
    transform: var(--perf-transform) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
body .console .head-backward__button svg {
    width: 1.2em !important;
    height: 1.2em !important;
    color: rgba(var(--primary-rgb), 1) !important;
}
body .console .head-backward__title {
    font-family: 'Netflix Sans', sans-serif !important;
    font-size: 1.4em !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin-left: 1em !important;
}
body .console__tabs {
    background: rgba(0, 0, 0, var(--drxaos-surface-opacity)) !important;
    border-bottom: 1px solid var(--netflix-glass-border) !important;
    padding: 0.5em 0 !important;
}
body .console__tab {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.95) !important;
    border-radius: var(--netflix-radius-md) !important;
    padding: 0.6em 1.2em !important;
    margin: 0 0.5em !important;
    font-family: 'Netflix Sans', sans-serif !important;
    font-size: 0.9em !important;
    font-weight: 500 !important;
    color: rgba(255, 255, 255, 0.95) !important;
    transition: var(--perf-transition) !important;
    cursor: pointer !important;
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.5em !important;
}
body .console__tab span {
    background: rgba(var(--primary-rgb), 0.3) !important;
    color: rgba(var(--primary-rgb), 1) !important;
    border-radius: var(--netflix-radius-sm) !important;
    padding: 0.2em 0.5em !important;
    font-size: 0.85em !important;
    font-weight: 600 !important;
    min-width: 1.5em !important;
    text-align: center !important;
}
body .console__tab:hover,
body .console__tab.focus,
body .console__tab.active {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.3), rgba(var(--secondary-rgb), 0.3)) !important;
    border: 1px solid rgba(var(--primary-rgb), 0.5) !important;
    color: #ffffff !important;
    transform: var(--perf-transform) !important;
    box-shadow: var(--perf-shadow) !important;
}
body .console__tab.active span {
    background: rgba(var(--primary-rgb), 1) !important;
    color: #000000 !important;
}
body .console__body {
    background: rgba(0, 0, 0, var(--drxaos-surface-opacity)) !important;
    padding: 1em !important;
}
body .console__line {
    background: rgba(255, 255, 255, 0.03) !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    border-radius: var(--netflix-radius-sm) !important;
    padding: 0.6em 1em !important;
    margin: 0.3em 0 !important;
    font-family: 'Consolas', 'Monaco', monospace !important;
    font-size: 0.85em !important;
    color: rgba(255, 255, 255, 0.95) !important;
    transition: var(--perf-transition) !important;
    cursor: pointer !important;
}
body .console__line:hover,
body .console__line.focus {
    background: rgba(255, 255, 255, 0.95) !important;
    border: 1px solid rgba(var(--primary-rgb), 0.3) !important;
    transform: var(--perf-transform) !important;
}
body .console__time {
    color: rgba(var(--primary-rgb), 0.8) !important;
    font-weight: 600 !important;
    margin-right: 0.5em !important;
}
body .console__line span[style*="hsl(105"] {
    color: #4ade80 !important;
    font-weight: 600 !important;
}
body .console__line span[style*="hsl(45"] {
    color: #fbbf24 !important;
    font-weight: 600 !important;
}
body .console__line span[style*="hsl(0"] {
    color: #f87171 !important;
    font-weight: 600 !important;
}
body .console__line span[style*="hsl(200"] {
    color: #60a5fa !important;
    font-weight: 600 !important;
}
body .console .scroll {
    scrollbar-width: thin !important;
    scrollbar-color: rgba(var(--primary-rgb), 0.5) rgba(0, 0, 0, var(--drxaos-surface-opacity)) !important;
}
body .console .scroll::-webkit-scrollbar {
    width: 8px !important;
    height: 8px !important;
}
body .console .scroll::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, var(--drxaos-surface-opacity)) !important;
    border-radius: var(--netflix-radius-sm) !important;
}
body .console .scroll::-webkit-scrollbar-thumb {
    background: rgba(var(--primary-rgb), 0.5) !important;
    border-radius: var(--netflix-radius-sm) !important;
    transition: var(--perf-transition) !important;
}
body .console .scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(var(--primary-rgb), 0.8) !important;
}
body .console__tabs .scroll--horizontal {
    padding: 0.5em 1em !important;
}
body .console__tabs .scroll__body {
    display: flex !important;
    gap: 0.5em !important;
    align-items: center !important;
}
body .head__time {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--secondary-rgb), 0.15)) !important;
    backdrop-filter: var(--perf-backdrop) !important;
    -webkit-backdrop-filter: var(--perf-backdrop) !important;
    border: 1px solid var(--netflix-glass-border) !important;
    border-radius: var(--netflix-radius-lg) !important;
    box-shadow: var(--perf-shadow) !important;
    padding: 0.8em 1.2em !important;
    display: flex !important;
    align-items: center !important;
    gap: 1em !important;
    transition: var(--perf-transition) !important;
}
body .head__time:hover {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.25), rgba(var(--secondary-rgb), 0.25)) !important;
    border: 1px solid rgba(var(--primary-rgb), 0.4) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
body .head__time-now,
body .time--clock {
    font-family: 'Netflix Sans', sans-serif !important;
    font-size: 1.8em !important;
    font-weight: 700 !important;
    color: rgba(var(--primary-rgb), 1) !important;
    line-height: 1 !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
    letter-spacing: 0.02em !important;
    min-width: 2.5em !important;
    width: 100% !important;
    display: block !important;
    text-align: center !important;
}
body .head__time > div:last-child {
    display: flex !important;
    flex-direction: column !important;
    gap: 0.2em !important;
    width: 100% !important;
}
body .head__time {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0.3em !important;
    padding: 0.8em 1.2em !important;
}
body .head__time-date,
body .time--full {
    font-family: 'Netflix Sans', sans-serif !important;
    font-size: 0.995em !important;
    font-weight: 600 !important;
    color: #ffffff !important;
    line-height: 1.2 !important;
    white-space: nowrap !important;
    text-align: center !important;
}
body .head__time-week,
body .time--week {
    font-family: 'Netflix Sans', sans-serif !important;
    font-size: 0.8em !important;
    font-weight: 400 !important;
    color: rgba(255, 255, 255, 0.95) !important;
    line-height: 1.2 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
    white-space: nowrap !important;
    display: none !important;
}
body .head__action,
body .head__actions .head__action {
    width: 2.5em !important;
    height: 2.5em !important;
    min-width: 2.5em !important;
    min-height: 2.5em !important;
    flex-shrink: 0 !important;
}
body .head__action.open--profile {
    width: 2.5em !important;
    height: 2.5em !important;
    min-width: 2.5em !important;
    min-height: 2.5em !important;
    padding: 0 !important;
    border-radius: 50% !important;
    overflow: hidden !important;
    flex-shrink: 0 !important;
}
body .head__action.open--profile img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    border-radius: 50% !important;
}
body .head__action svg {
    width: 1.5em !important;
    height: 1.5em !important;
}
body .head__logo-icon {
    width: 3em !important;
    height: 3em !important;
    min-width: 3em !important;
    min-height: 3em !important;
    flex-shrink: 0 !important;
}
@keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0.95; }
}
body .time--clock::after {
    animation: blink 1s infinite !important;
}
@media (max-width: 768px) {
    body .head__time {
        padding: 0.6em 1em !important;
        gap: 0.3em !important;
    }
    body .head__time-now,
    body .time--clock {
        font-size: 1.4em !important;
    }
    body .head__time-date,
    body .time--full {
        font-size: 0.85em !important;
    }
}
body .selectbox-item,
body .selectbox-item--icon {
    background: transparent !important;
    border: none !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.95) !important;
    border-radius: 0 !important;
    padding: 1em 1.2em !important;
    margin: 0 !important;
    display: flex !important;
    align-items: center !important;
    gap: 1em !important;
    transition: var(--perf-transition) !important;
    cursor: pointer !important;
    min-height: 3.5em !important;
}
body .selectbox-item:hover,
body .selectbox-item.focus,
body .selectbox-item--icon:hover,
body .selectbox-item--icon.focus {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--secondary-rgb), 0.15)) !important;
    border-bottom: 1px solid rgba(var(--primary-rgb), 0.3) !important;
    transform: var(--perf-transform) !important;
}
body .selectbox-item__icon {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    width: 2.5em !important;
    height: 2.5em !important;
    margin: 0 !important;
    padding: 0 !important;
}
body .selectbox-item__icon svg {
    width: 100% !important;
    height: 100% !important;
    display: block !important;
}
body .selectbox-item > div:not(.selectbox-item__icon) {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 0.3em !important;
    min-width: 0 !important;
}
body .selectbox-item__title {
    font-family: 'Netflix Sans', sans-serif !important;
    font-size: 1.1em !important;
    font-weight: 600 !important;
    color: #ffffff !important;
    line-height: 1.3 !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
}
body .selectbox-item__subtitle {
    font-family: 'Netflix Sans', sans-serif !important;
    font-size: 0.85em !important;
    font-weight: 400 !important;
    color: rgba(255, 255, 255, 0.95) !important;
    line-height: 1.2 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
}
body .selectbox-item:hover .selectbox-item__title,
body .selectbox-item.focus .selectbox-item__title {
    color: rgba(var(--primary-rgb), 1) !important;
}
body .selectbox-item:hover .selectbox-item__subtitle,
body .selectbox-item.focus .selectbox-item__subtitle {
    color: rgba(255, 255, 255, 0.95) !important;
}
body .selectbox-item:first-child {
    border-top: none !important;
}
body .selectbox-item:last-child {
    border-bottom: none !important;
}
body .torrent-filter {
    background: var(--netflix-glass) !important;
    backdrop-filter: var(--perf-backdrop) !important;
    -webkit-backdrop-filter: var(--perf-backdrop) !important;
    border: 1px solid var(--netflix-glass-border) !important;
    border-radius: var(--netflix-radius-lg) !important;
    box-shadow: var(--perf-shadow) !important;
    padding: 1em !important;
    display: flex !important;
    gap: 0.8em !important;
    align-items: center !important;
    flex-wrap: wrap !important;
    margin: 1em 0 !important;
}
body .torrent-filter .filter--back {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border: 1px solid rgba(var(--primary-rgb), 0.3) !important;
    border-radius: var(--netflix-radius-md) !important;
    padding: 0.6em 0.8em !important;
    transition: var(--perf-transition) !important;
    box-shadow: var(--perf-shadow) !important;
    cursor: pointer !important;
}
body .torrent-filter .filter--back:hover,
body .torrent-filter .filter--back.focus {
    background: rgba(var(--primary-rgb), 0.4) !important;
    border: 1px solid rgba(var(--primary-rgb), 0.6) !important;
    transform: var(--perf-transform) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
body .torrent-filter .filter--back svg {
    color: rgba(var(--primary-rgb), 1) !important;
    width: 2em !important;
    height: auto !important;
}
body .simple-button--filter {
    background: rgba(255, 255, 255, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.95) !important;
    border-radius: var(--netflix-radius-md) !important;
    padding: 0.8em 1.2em !important;
    font-family: 'Netflix Sans', sans-serif !important;
    font-size: 0.995em !important;
    font-weight: 500 !important;
    color: rgba(255, 255, 255, 0.95) !important;
    transition: var(--perf-transition) !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    gap: 0.8em !important;
    min-height: 2.5em !important;
}
body .simple-button--filter:hover,
body .simple-button--filter.focus,
body .simple-button--filter.active {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.25), rgba(var(--secondary-rgb), 0.25)) !important;
    border: 1px solid rgba(var(--primary-rgb), 0.5) !important;
    color: #ffffff !important;
    transform: var(--perf-transform) !important;
    box-shadow: var(--perf-shadow) !important;
}
body .simple-button--filter span {
    color: rgba(255, 255, 255, 0.95) !important;
    font-size: 0.85em !important;
    font-weight: 400 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
}
body .simple-button--filter > div {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-radius: var(--netflix-radius-sm) !important;
    padding: 0.3em 0.8em !important;
    font-weight: 600 !important;
    color: rgba(var(--primary-rgb), 1) !important;
    max-width: 200px !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
}
body .simple-button--filter:hover > div,
body .simple-button--filter.focus > div {
    background: rgba(var(--primary-rgb), 0.4) !important;
    color: #ffffff !important;
}
body .simple-button--filter > div.hide {
    display: none !important;
}
body .torrent-filter .filter--search {
    background: rgba(var(--secondary-rgb), 0.15) !important;
    border: 1px solid rgba(var(--secondary-rgb), 0.3) !important;
}
body .torrent-filter .filter--search:hover,
body .torrent-filter .filter--search.focus {
    background: linear-gradient(135deg, rgba(var(--secondary-rgb), 0.3), rgba(var(--primary-rgb), 0.3)) !important;
    border: 1px solid rgba(var(--secondary-rgb), 0.6) !important;
}
body .torrent-filter .filter--search svg {
    color: rgba(var(--secondary-rgb), 1) !important;
    width: 1.2em !important;
    height: 1.2em !important;
    flex-shrink: 0 !important;
}
body .torrent-filter .filter--search > div {
    background: rgba(var(--secondary-rgb), 0.2) !important;
    color: rgba(var(--secondary-rgb), 1) !important;
}
body .torrent-filter .filter--search:hover > div,
body .torrent-filter .filter--search.focus > div {
    background: rgba(var(--secondary-rgb), 0.4) !important;
    color: #ffffff !important;
}
body .filter--filter {
    position: relative !important;
}
body .filter--filter::after {
    content: '' !important;
    position: absolute !important;
    top: -3px !important;
    right: -3px !important;
    width: 8px !important;
    height: 8px !important;
    background: rgba(var(--primary-rgb), 1) !important;
    border-radius: 50% !important;
    opacity: 0 !important;
    transition: var(--perf-transition) !important;
}
body .filter--filter.active::after {
    opacity: 1 !important;
    animation: pulse 2s infinite !important;
}
@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.5);
        opacity: 0.95;
    }
}
@media (max-width: 768px) {
    body .torrent-filter {
        flex-direction: column !important;
        align-items: stretch !important;
    }
    body .simple-button--filter {
        width: 100% !important;
        justify-content: space-between !important;
    }
}
[data-component="plugins"] .settings,
[data-component="plugins"] .settings__wrap {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--bg-rgb), 0.995) 100%) !important;
}
[data-component="plugins"] .settings-param,
[data-component="plugins"] .settings-folder {
    background: var(--netflix-glass) !important;
    border: 1px solid var(--netflix-glass-border) !important;
    border-radius: var(--netflix-radius-md) !important;
    padding: 1em 1.2em !important;
    margin: 0.4em 0 !important;
    transition: var(--netflix-transition) !important;
    saturate(180%) !important;
    -webkit-saturate(180%) !important;
}
[data-component="plugins"] .settings-param.focus,
[data-component="plugins"] .settings-param:hover,
[data-component="plugins"] .settings-folder.focus,
[data-component="plugins"] .settings-folder:hover {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.2), rgba(var(--secondary-rgb), 0.2)) !important;
    border: 1px solid rgba(var(--primary-rgb), 0.5) !important;
    box-shadow: var(--netflix-shadow-md) !important;
    transform: translateX(4px) !important;
}
[data-component="plugins"] .settings-param__name,
[data-component="plugins"] .settings-folder__name {
    color: var(--text-main) !important;
}
[data-component="plugins"] .settings-param.focus *,
[data-component="plugins"] .settings-param:hover *,
[data-component="plugins"] .settings-folder.focus *,
[data-component="plugins"] .settings-folder:hover * {
    color: var(--text-main) !important;
}
[data-component="plugins"] .selectbox__item,
[data-component="plugins"] .selector__item {
    background: rgba(var(--primary-rgb), 0.15) !important;
    border-radius: var(--netflix-radius-sm) !important;
    border: 1px solid rgba(var(--primary-rgb), 0.3) !important;
}
[data-component="plugins"] .selectbox__item.focus,
[data-component="plugins"] .selectbox__item.selected,
[data-component="plugins"] .selector__item.focus,
[data-component="plugins"] .selector__item.selected {
    background: rgba(var(--primary-rgb), 0.4) !important;
    border-color: var(--theme-primary) !important;
}
[data-component="plugins"] .settings__title {
    color: var(--text-main) !important;
    font-weight: 600 !important;
}
/* ========================================
   ВОЗРАСТНОЙ РЕЙТИНГ / STATUS / QUALITY
   Hi-Tech 2025 Style (ATV Optimized)
   ======================================== */

/* Возрастной рейтинг (PG) */
.full-start__pg {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    min-width: 42px;
    height: 32px;
    
    /* Hi-Tech градиент с прозрачностью */
    background: rgba(0, 0, 0, 0.95) !important;
    
    /* Тонкая рамка цвета темы */
    border: 1.5px solid rgba(var(--primary-rgb), 0.5);
    border-radius: 8px;
    
    /* Простая тень для ATV */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    
    /* GPU ускорение */
    transform: translateZ(0);
    will-change: transform, opacity;
    transition: transform 0.15s ease, border-color 0.15s ease;
    
    opacity: 0.995;
    font-size: 13px;
    font-weight: 700;
    color: rgba(var(--primary-rgb), 1);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.full-start__pg:hover {
    transform: translateY(-1px) translateZ(0);
    border-color: rgba(var(--primary-rgb), 0.8);
    box-shadow: 0 3px 8px rgba(var(--primary-rgb), 0.3);
}

/* Статус (общий) */
.full-start__status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    height: 32px;
    
    /* Полупрозрачный фон с градиентом */
    background: linear-gradient(135deg, 
        rgba(30, 41, 59, 0.85) 0%, 
        rgba(15, 23, 42, 0.85) 100%);
    
    border: 1px solid rgba(100, 116, 139, 0.4);
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    
    transform: translateZ(0);
    will-change: transform;
    transition: transform 0.15s ease, border-color 0.15s ease;
    
    opacity: 0.995;
    font-size: 13px;
    font-weight: 500;
    color: rgba(226, 232, 240, 0.95);
    white-space: nowrap;
}

.full-start__status:hover {
    transform: translateY(-1px) translateZ(0);
    border-color: rgba(139, 92, 246, 0.5);
}

/* Иконка внутри статуса */
.full-start__status svg {
    width: 16px;
    height: 16px;
    opacity: 0.9;
    flex-shrink: 0;
}

/* Качество (surs_quality) - специальный акцент */
.full-start__status.surs_quality {
    /* Яркий градиент для качества */
    background: linear-gradient(135deg, 
        rgba(16, 185, 129, 0.25) 0%, 
        rgba(5, 150, 105, 0.2) 100%);
    
    border-color: rgba(52, 211, 153, 0.6);
    color: rgba(167, 243, 208, 1);
    font-weight: 600;
}

.full-start__status.surs_quality:hover {
    border-color: rgba(52, 211, 153, 0.8);
    box-shadow: 0 3px 10px rgba(16, 185, 129, 0.35);
    transform: translateY(-2px) translateZ(0);
}

/* Текст качества выделяем */
.full-start__status.surs_quality::before {
    content: '●';
    margin-right: 4px;
    color: rgba(52, 211, 153, 0.9);
    animation: pulse-quality 2s ease-in-out infinite;
}

@keyframes pulse-quality {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}

/* Группировка бейджей */
.full-start__pg + .full-start__status,
.full-start__status + .full-start__status,
.full-start__status + .full-start__pg {
    margin-left: 8px;
}

/* ========================================
   ВАРИАНТЫ СТАТУСОВ ПО ТИПУ
   ======================================== */

/* Онлайн источник */
.full-start__status[data-source="online"] {
    background: linear-gradient(135deg, 
        rgba(59, 130, 246, 0.25) 0%, 
        rgba(37, 99, 235, 0.2) 100%);
    border-color: rgba(96, 165, 250, 0.6);
    color: rgba(191, 219, 254, 1);
}

.full-start__status[data-source="online"]:hover {
    border-color: rgba(96, 165, 250, 0.8);
    box-shadow: 0 3px 10px rgba(59, 130, 246, 0.35);
}

/* Торрент источник */
.full-start__status[data-source="torrent"] {
    background: linear-gradient(135deg, 
        rgba(16, 185, 129, 0.25) 0%, 
        rgba(5, 150, 105, 0.2) 100%);
    border-color: rgba(52, 211, 153, 0.6);
    color: rgba(167, 243, 208, 1);
}

.full-start__status[data-source="torrent"]:hover {
    border-color: rgba(52, 211, 153, 0.8);
    box-shadow: 0 3px 10px rgba(16, 185, 129, 0.35);
}

/* Статус "В процессе" / Ongoing */
.full-start__status[data-type="ongoing"] {
    background: linear-gradient(135deg, 
        rgba(251, 146, 60, 0.25) 0%, 
        rgba(249, 115, 22, 0.2) 100%);
    border-color: rgba(251, 146, 60, 0.6);
    color: rgba(254, 215, 170, 1);
}

/* Статус "Завершён" / Completed */
.full-start__status[data-type="completed"] {
    background: linear-gradient(135deg, 
        rgba(139, 92, 246, 0.25) 0%, 
        rgba(109, 40, 217, 0.2) 100%);
    border-color: rgba(167, 139, 250, 0.6);
    color: rgba(221, 214, 254, 1);
}

/* ========================================
   АДАПТАЦИЯ ПОД РАЗНЫЕ ЭКРАНЫ
   ======================================== */

@media (max-width: 768px) {
    .full-start__pg,
    .full-start__status {
        height: 28px;
        padding: 4px 10px;
        font-size: 12px;
    }
    
    .full-start__status svg {
        width: 14px;
        height: 14px;
    }
    
    .full-start__pg + .full-start__status,
    .full-start__status + .full-start__status {
        margin-left: 6px;
    }
}

@media (max-width: 480px) {
    .full-start__pg,
    .full-start__status {
        height: 26px;
        padding: 4px 8px;
        font-size: 11px;
    }
    
    .full-start__status svg {
        width: 12px;
        height: 12px;
    }
}

/* ========================================
   ОПТИМИЗАЦИЯ ДЛЯ ANDROID TV
   ======================================== */

@media (hover: none) and (pointer: coarse) {
    .full-start__pg:hover,
    .full-start__status:hover {
        transform: translateZ(0);
    }
    
    /* Focus для TV-пульта */
    .full-start__pg:focus,
    .full-start__status:focus {
        border-color: rgba(var(--primary-rgb), 1);
        box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.3);
        transform: scale(1.05) translateZ(0);
    }
    
    .full-start__status.surs_quality:focus {
        border-color: rgba(52, 211, 153, 1);
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.4);
    }
}`;
var style = $('<style id="drxaos_theme_style"></style>');
var additionalStyles = `
.card__img, .card__img img,
.poster, .poster__img, .poster__img img,
.full-start__poster img, .info__poster img,
.full-start-new__img.full--poster,
.full-start-new__img.full--poster img {
    border-radius: 12px !important;
    overflow: hidden !important;
}
.card {
    border-radius: 12px !重要;
    overflow: visible !important;
}
.card__view {
    border-radius: 0 !important;
    overflow: visible !important;
}
.full-start__poster, .full-start__poster img {
    border-radius: 16px !important;
    overflow: hidden !important;
}
.selectbox-item__poster, .selectbox-item__poster img {
    border-radius: 8px !important;
    overflow: hidden !important;
}
.card__img, .poster__img, .full-start__poster {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
.full-start__button--torrent .full-start__button-icon,
.button--torrent .button__icon {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNSAyaDV2MTJhMiAyIDAgMSAwIDQgMFYyaDV2MTJhNyA3IDAgMSAxLTE0IDBWMnoiIGZpbGw9IiNEQzI2MjYiLz48cGF0aCBkPSJNNSAyaDV2NEg1ek0xNCAyaDV2NGgtNXoiIGZpbGw9IiNGODcxNzEiLz48cGF0aCBkPSJNNSA2aDV2M0g1ek0xNCA2aDV2M2gtNXoiIGZpbGw9IiNGOTczMTYiLz48cGF0aCBkPSJNNSAyaDV2Mkg1ek0xNCAyaDV2MmgtNXoiIGZpbGw9IiNFMkU4RjAiLz48L3N2Zz4=') !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
}
.full-start__button--play .full-start__button-icon,
.button--play .button__icon {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNFRjQ0NDQiLz4KPHBhdGggZD0iTTEwIDh2OGw2LTRsLTYtNHoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==') !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
}
.full-start__button--online .full-start__button-icon,
.button--online .button__icon {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDVDNyA1IDIuNzMgOC4xMSAxIDEyYzEuNzMgMy44OSA2IDcgMTEgN3M5LjI3LTMuMTEgMTEtN2MtMS43My0zLjg5LTYtNy0xMS03eiIgZmlsbD0iIzNCODJGNiIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIiBmaWxsPSIjMUU1NUFGIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEuNSIgZmlsbD0id2hpdGUiLz4KPC9zdmc+') !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
}
.full-start__button--trailer .full-start__button-icon,
.button--trailer .button__icon {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE0IiByeD0iMiIgZmlsbD0iI0ZGOTgwMCIvPgo8cGF0aCBkPSJNMTAgOXY2bDUtM2wtNS0zeiIgZmlsbD0id2hpdGUiLz4KPGNpcmNsZSBjeD0iNiIgY3k9IjgiIHI9IjEiIGZpbGw9IiNGRkMyNEIiLz4KPGNpcmNsZSBjeD0iMTgiIGN5PSI4IiByPSIxIiBmaWxsPSIjRkZDMjRCIi8+Cjwvc3ZnPg==') !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
}
.full-start__button-icon::before,
.button__icon::before {
    content: '' !important;
}
.card, .card__view { position: relative !important; }
.card__type,
.card__type::after {
    display: none !important;
}
:root {
    --drxaos-badge-height: 24px;
    --drxaos-badge-radius: 12px;
    --drxaos-badge-font: 12px;
}
.card__quality, .card-quality, .card__vote, .card__seasons, .card-seasons, .card--content-type, .card--country, .card__next-episode, .card__episode-date, .card-next-episode, .card--season-complete, .card--season-progress, .card__age {
    position: absolute !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: var(--drxaos-badge-height) !important;
    padding: 0 10px !important;
    border-radius: var(--drxaos-badge-radius) !important;
    font-size: var(--drxaos-badge-font) !important;
    font-weight: 700 !important;
    letter-spacing: 0.02em !important;
    color: #fff !important;
    background: rgba(6, 8, 15, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.95) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    text-shadow: none !important;
    margin: 0 !important;
    z-index: 4 !important;
    !important;
}
.card__quality, .card-quality {
    top: 8px !important;
    right: 8px !important;
    left: auto !important;
    background: linear-gradient(135deg, rgba(255, 184, 64, 0.95), rgba(255, 138, 0, 0.95)) !important;
    border-color: rgba(255, 214, 153, 0.95) !important;
}
.card__vote {
    top: 40px !important;
    right: 8px !important;
    left: auto !important;
    background: rgba(8, 189, 113, 0.95) !important;
    border-color: rgba(255, 255, 255, 0.95) !important;
}
.card--content-type {
    top: 8px !important;
    left: 8px !important;
    background: linear-gradient(135deg, rgba(172, 119, 255, 0.95), rgba(118, 77, 255, 0.95)) !important;
    border-color: rgba(214, 191, 255, 0.95) !important;
}
.card--country {
    top: 40px !important;
    left: 8px !important;
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.95), rgba(56, 189, 248, 0.95)) !important;
    border-color: rgba(152, 222, 255, 0.95) !important;
}
.card__next-episode, .card__episode-date, .card-next-episode {
    bottom: 8px !important;
    left: 8px !important;
    top: auto !important;
    right: auto !important;
    background: linear-gradient(135deg, rgba(255, 112, 67, 0.95), rgba(255, 64, 129, 0.95)) !important;
    border-color: rgba(255, 200, 170, 0.95) !important;
}
.card__seasons, .card-seasons, .card--season-complete, .card--season-progress {
    bottom: 40px !important;
    left: 8px !important;
    top: auto !important;
    right: auto !important;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(37, 99, 235, 0.95)) !important;
    border-color: rgba(173, 209, 255, 0.95) !important;
}
.card__age {
    bottom: 8px !important;
    right: 8px !important;
    top: auto !important;
    left: auto !important;
    min-width: 46px !important;
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.9), rgba(var(--secondary-rgb), 0.9)) !important;
    border-color: rgba(255, 255, 255, 0.95) !important;
    color: #ffffff !important;
    font-weight: 800 !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
}
.card--season-complete div, .card--season-progress div {
    display: contents !important;
}
.online-prestige {
    background: rgba(var(--layer-rgb), var(--drxaos-surface-opacity)) !important;
    !important;
    border-radius: 12px !important;
    overflow: hidden !important;
    border: 2px solid transparent !important;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important, opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    transform: scale(1) !important;
}
.online-prestige.focus,
.online-prestige:focus,
.online-prestige.hover,
.online-prestige:hover {
    border: 2px solid var(--theme-primary) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    transform: scale(1.05) !important;
}
.online-prestige__body {
    background: transparent !important;
}
.online-prestige__title {
    color: var(--text-main) !important;
}
.online-prestige__time,
.online-prestige__info {
    color: var(--text-secondary) !important;
}
.online-prestige__quality {
    background: var(--theme-primary) !important;
    color: var(--text-main) !important;
    border-radius: 6px !important;
    padding: 4px 8px !important;
}
.online-prestige-rate {
    color: var(--text-main) !important;
}
.online-prestige-rate svg path {
    fill: var(--theme-primary) !important;
}
.online-prestige__timeline .time-line > div {
    background: var(--theme-primary) !important;
}
.online-prestige__viewed {
    background: rgba(0, 0, 0, var(--drxaos-surface-opacity)) !important;
    color: var(--theme-primary) !important;
    border-radius: 50% !important;
    padding: 8px !important;
}
.extensions { background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--bg-rgb), 0.96) 35%, rgba(var(--secondary-rgb), 0.08) 100%) !important; }
.head-backward { background: linear-gradient(90deg, rgba(var(--primary-rgb), 0.3), rgba(var(--secondary-rgb), 0.25)) !important; border-bottom: 2px solid var(--theme-accent) !important; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95); }
.head-backward__title { color: var(--theme-accent) !important; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95); }
.extensions__block-title { color: var(--theme-accent) !important; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95); }
.extensions__item { background: rgba(var(--primary-rgb), 0.15) !important; border: 1px solid rgba(var(--primary-rgb), 0.35) !important; border-radius: 12px !important; transition: transform 0.3s ease !important, opacity 0.3s ease !important; }
.extensions__item:hover, .extensions__item.focus { background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.45), rgba(var(--secondary-rgb), 0.4)) !important; border-color: var(--theme-accent) !important; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95); transform: translateY(-4px) scale(1.03) !important; }
.extensions__block-add { background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.3), rgba(var(--secondary-rgb), 0.25)) !important; border: 2px dashed var(--theme-accent) !important; color: var(--theme-accent) !important; }
.extensions__item-name { color: var(--text-main) !important; }
.extensions__item:hover .extensions__item-name, .extensions__item.focus .extensions__item-name { color: var(--theme-accent) !important; text-shadow: 0 0 15px var(--theme-accent) !important; }
.extensions__item-status { color: #10B981 !important; text-shadow: 0 0 8px #10B981 !important; }
.extensions__cub { background: var(--theme-accent) !important; box-shadow: 0 0 12px var(--theme-accent) !important; }
.selectbox__content {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--bg-rgb), 0.995) 30%, rgba(var(--secondary-rgb), 0.1) 100%) !important;
    border: 2px solid rgba(var(--primary-rgb), 0.5) !important;
    border-radius: 16px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    !important;
}
.selectbox__head {
    background: linear-gradient(90deg, rgba(var(--primary-rgb), 0.35), rgba(var(--secondary-rgb), 0.3)) !important;
    border-bottom: 2px solid var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
.selectbox__title {
    color: var(--theme-accent) !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
    font-weight: 700 !important;
}
.selectbox-item {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important, opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.selectbox-item:hover, .selectbox-item.focus, .selectbox-item.selected {
    background: linear-gradient(90deg, rgba(var(--primary-rgb), 0.4), rgba(var(--secondary-rgb), 0.35)) !important;
    border-left: 4px solid var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    transform: translateX(6px) !important;
}
.selectbox-item__title {
    color: var(--text-main) !important;
}
.selectbox-item:hover .selectbox-item__title, .selectbox-item.focus .selectbox-item__title, .selectbox-item.selected .selectbox-item__title {
    color: var(--theme-accent) !important;
    text-shadow: 0 0 12px var(--theme-accent) !important;
}
.settings-input {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--bg-rgb), 0.995) 30%, rgba(var(--secondary-rgb), 0.1) 100%) !important;
    border: 2px solid rgba(var(--primary-rgb), 0.5) !important;
    border-radius: 16px !important;
}
.settings-input__content {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.12) 0%, rgba(var(--bg-rgb), 0.995) 40%, rgba(var(--secondary-rgb), 0.08) 100%) !important;
    !important;
    border-radius: 12px !important;
    padding: 2em !important;
}
.settings-input__title {
    color: var(--text-main) !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
    font-weight: 600 !important;
    margin-bottom: 1.5em !important;
}
.simple-keyboard-input {
    background: rgba(var(--bg-rgb), 0.8) !important;
    border: 2px solid rgba(var(--primary-rgb), 0.5) !important;
    border-radius: 12px !important;
    color: var(--text-main) !important;
    padding: 0.8em 1.2em !important;
    font-size: 1.1em !important;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important, opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.simple-keyboard-input:focus, .simple-keyboard-input.focus {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-color: var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    outline: none !important;
}
.simple-keyboard-input::placeholder {
    color: rgba(var(--text-rgb), 0.5) !important;
}
.settings-input__links {
    color: var(--theme-accent) !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
    margin-top: 1em !important;
}
.settings__content {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.12) 0%, rgba(var(--bg-rgb), 0.995) 40%, rgba(var(--secondary-rgb), 0.08) 100%) !important;
    !important;
}
.settings__head {
    background: linear-gradient(90deg, rgba(var(--primary-rgb), 0.35), rgba(var(--secondary-rgb), 0.25)) !important;
    border-bottom: 2px solid var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
.settings__title {
    color: var(--text-main) !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
    font-weight: 600 !important;
}
.settings-folder {
    background: rgba(var(--primary-rgb), 0.15) !important;
    border: 1px solid rgba(var(--primary-rgb), 0.3) !important;
    border-radius: 12px !important;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important, opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.settings-folder:hover, .settings-folder.focus {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.4), rgba(var(--secondary-rgb), 0.35)) !important;
    border-color: var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    transform: translateX(8px) scale(1.02) !important;
}
.settings-folder__icon svg, .settings-folder__icon img {
    filter: drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.6)) !important;
}
.settings-folder__name {
    color: var(--text-main) !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
}
.settings-folder:hover .settings-folder__name, .settings-folder.focus .settings-folder__name {
    color: var(--theme-accent) !important;
    text-shadow: 0 0 20px var(--theme-accent) !important;
}`;
var themes = {
midnight: `
:root {
--theme-primary: #4a5fd9;
--theme-secondary: #4a5a8c;
--theme-accent: #7ba3d9;
--bg-color: #0f1419;
--text-contrast: #ffffff;
--text-main: #e8f0f7;
--primary-rgb: 45, 53, 97;
--secondary-rgb: 74, 90, 140;
--bg-rgb: 15, 20, 25;
--theme-color: rgba(74, 95, 217, 0.95);
}
.settings, .modal, .select, .layer {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--bg-rgb), 0.995) 100%) !important;
}
.settings-param, .settings-folder,
.filter__item, .filter--filter,
.simple-button {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-color: rgba(var(--primary-rgb), 0.4) !important;
}
.settings-param.focus, .settings-param:hover,
.settings-folder.focus, .settings-folder:hover,
.filter__item.focus, .filter__item:hover,
.simple-button.focus, .simple-button:hover {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.4), rgba(var(--secondary-rgb), 0.4)) !important;
    border-color: var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
.full-start__button--torrent .full-start__button-icon {
    background: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2L4 8v8l8 6 8-6V8l-8-6z" fill="%230EC26D"/></svg>') center/contain no-repeat !important;
}
.full-start__button--play .full-start__button-icon {
    background: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23EF4444"/><path d="M10 8v8l6-4-6-4z" fill="white"/></svg>') center/contain no-repeat !important;
}
.full-start__button--online .full-start__button-icon {
    background: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7z" fill="%233B82F6"/><circle cx="12" cy="12" r="3" fill="white"/></svg>') center/contain no-repeat !important;
}
.full-start__button--trailer .full-start__button-icon {
    background: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" fill="%23FF9800"/><path d="M10 9v6l5-3-5-3z" fill="white"/></svg>') center/contain no-repeat !important;
}
.full-start__button-icon::before { content: none !important; }
${commonStyles}
`,
crimson: `
:root {
--theme-primary: #e63946;
--theme-secondary: #a54652;
--theme-accent: #d4758b;
--bg-color: #1a0f11;
--text-contrast: #ffffff;
--text-main: #f5e8eb;
--primary-rgb: 139, 47, 57;
--secondary-rgb: 165, 70, 82;
--bg-rgb: 26, 15, 17;
}
.settings, .modal, .select, .layer {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--bg-rgb), 0.995) 100%) !important;
}
.settings-param, .settings-folder,
.filter__item, .filter--filter,
.simple-button {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-color: rgba(var(--primary-rgb), 0.4) !important;
}
.settings-param.focus, .settings-param:hover,
.settings-folder.focus, .settings-folder:hover,
.filter__item.focus, .filter__item:hover,
.simple-button.focus, .simple-button:hover {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.4), rgba(var(--secondary-rgb), 0.4)) !important;
    border-color: var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
${commonStyles}
`,
ocean: `
:root {
--theme-primary: #0ea5e9;
--theme-secondary: #3d7a8c;
--theme-accent: #6db8cc;
--bg-color: #0a1419;
--text-contrast: #ffffff;
--text-main: #e0f2f7;
--primary-rgb: 45, 95, 111;
--secondary-rgb: 61, 122, 140;
--bg-rgb: 10, 20, 25;
}
.settings, .modal, .select, .layer {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--bg-rgb), 0.995) 100%) !important;
}
.settings-param, .settings-folder,
.filter__item, .filter--filter,
.simple-button {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-color: rgba(var(--primary-rgb), 0.4) !important;
}
.settings-param.focus, .settings-param:hover,
.settings-folder.focus, .settings-folder:hover,
.filter__item.focus, .filter__item:hover,
.simple-button.focus, .simple-button:hover {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.4), rgba(var(--secondary-rgb), 0.4)) !important;
    border-color: var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
${commonStyles}
`,
forest: `
:root {
--theme-primary: #22c55e;
--theme-secondary: #527552;
--theme-accent: #7ea67e;
--bg-color: #0f1410;
--text-contrast: #ffffff;
--text-main: #e8f5e8;
--primary-rgb: 61, 92, 61;
--secondary-rgb: 82, 117, 82;
--bg-rgb: 15, 20, 16;
}
.settings, .modal, .select, .layer {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--bg-rgb), 0.995) 100%) !important;
}
.settings-param, .settings-folder,
.filter__item, .filter--filter,
.simple-button {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-color: rgba(var(--primary-rgb), 0.4) !important;
}
.settings-param.focus, .settings-param:hover,
.settings-folder.focus, .settings-folder:hover,
.filter__item.focus, .filter__item:hover,
.simple-button.focus, .simple-button:hover {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.4), rgba(var(--secondary-rgb), 0.4)) !important;
    border-color: var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
${commonStyles}
`,
sunset: `
:root {
--theme-primary: #f97316;
--theme-secondary: #c2654a;
--theme-accent: #e89966;
--bg-color: #1a0f0a;
--text-contrast: #ffffff;
--text-main: #f7ebe0;
--primary-rgb: 166, 77, 46;
--secondary-rgb: 194, 101, 74;
--bg-rgb: 26, 15, 10;
}
.settings, .modal, .select, .layer {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--bg-rgb), 0.995) 100%) !important;
}
.settings-param, .settings-folder,
.filter__item, .filter--filter,
.simple-button {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-color: rgba(var(--primary-rgb), 0.4) !important;
}
.settings-param.focus, .settings-param:hover,
.settings-folder.focus, .settings-folder:hover,
.filter__item.focus, .filter__item:hover,
.simple-button.focus, .simple-button:hover {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.4), rgba(var(--secondary-rgb), 0.4)) !important;
    border-color: var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
${commonStyles}
`,
slate: `
:root {
--theme-primary: #64748b;
--theme-secondary: #545b6b;
--theme-accent: #7d8599;
--bg-color: #0d0e12;
--text-contrast: #ffffff;
--text-main: #e8eaed;
--primary-rgb: 61, 68, 81;
--secondary-rgb: 84, 91, 107;
--bg-rgb: 13, 14, 18;
}
.settings, .modal, .select, .layer {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--bg-rgb), 0.995) 100%) !important;
}
.settings-param, .settings-folder,
.filter__item, .filter--filter,
.simple-button {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-color: rgba(var(--primary-rgb), 0.4) !important;
}
.settings-param.focus, .settings-param:hover,
.settings-folder.focus, .settings-folder:hover,
.filter__item.focus, .filter__item:hover,
.simple-button.focus, .simple-button:hover {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.4), rgba(var(--secondary-rgb), 0.4)) !important;
    border-color: var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
${commonStyles}
`,
lavender: `
:root {
--theme-primary: #a855f7;
--theme-secondary: #8573a6;
--theme-accent: #a894c9;
--bg-color: #13101a;
--text-contrast: #ffffff;
--text-main: #f0ebf7;
--primary-rgb: 107, 91, 140;
--secondary-rgb: 133, 115, 166;
--bg-rgb: 19, 16, 26;
}
.settings, .modal, .select, .layer {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--bg-rgb), 0.995) 100%) !important;
}
.settings-param, .settings-folder,
.filter__item, .filter--filter,
.simple-button {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-color: rgba(var(--primary-rgb), 0.4) !important;
}
.settings-param.focus, .settings-param:hover,
.settings-folder.focus, .settings-folder:hover,
.filter__item.focus, .filter__item:hover,
.simple-button.focus, .simple-button:hover {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.4), rgba(var(--secondary-rgb), 0.4)) !important;
    border-color: var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
${commonStyles}
`,
emerald: `
:root {
--theme-primary: #10b981;
--theme-secondary: #3d8a7a;
--theme-accent: #5fb89f;
--bg-color: #0a1914;
--text-contrast: #ffffff;
--text-main: #e0f7f0;
--primary-rgb: 45, 107, 95;
--secondary-rgb: 61, 138, 122;
--bg-rgb: 10, 25, 20;
}
.settings, .modal, .select, .layer {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--bg-rgb), 0.995) 100%) !important;
}
.settings-param, .settings-folder,
.filter__item, .filter--filter,
.simple-button {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-color: rgba(var(--primary-rgb), 0.4) !important;
}
.settings-param.focus, .settings-param:hover,
.settings-folder.focus, .settings-folder:hover,
.filter__item.focus, .filter__item:hover,
.simple-button.focus, .simple-button:hover {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.4), rgba(var(--secondary-rgb), 0.4)) !important;
    border-color: var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
${commonStyles}
`,
amber: `
:root {
--theme-primary: #f59e0b;
--theme-secondary: #c2944a;
--theme-accent: #e8b366;
--bg-color: #1a140a;
--text-contrast: #ffffff;
--text-main: #f7f0e0;
--primary-rgb: 166, 124, 46;
--secondary-rgb: 194, 148, 74;
--bg-rgb: 26, 20, 10;
}
.settings, .modal, .select, .layer {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--bg-rgb), 0.995) 100%) !important;
}
.settings-param, .settings-folder,
.filter__item, .filter--filter,
.simple-button {
    background: rgba(var(--primary-rgb), 0.2) !important;
    border-color: rgba(var(--primary-rgb), 0.4) !important;
}
.settings-param.focus, .settings-param:hover,
.settings-folder.focus, .settings-folder:hover,
.filter__item.focus, .filter__item:hover,
.simple-button.focus, .simple-button:hover {
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.4), rgba(var(--secondary-rgb), 0.4)) !important;
    border-color: var(--theme-accent) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
${commonStyles}
`,
default: `
${commonStyles}
`
};
var themeCSS = themes[theme] || '';
if (false) {
    themeCSS = themeCSS.replace(/-webkit-backdrop-filter:\s*blur\([^)]+\)\s*saturate\([^)]+\)[^;]*;?/gi, '');
    themeCSS += `
    .card, .menu__item, .settings-param, .files__item, .torrent-item,
    .filter__item, .sort__item, .selectbox-item, .online__item, .online__item-line,
    .online-prestige__item, .online-prestige__line, .online__tabs-item, 
    .full-start__button, .head__action {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    }
    `;
}
style.html(commonStyles + '\n\n' + additionalStyles + '\n\n' + themeCSS);
$('head').append(style);
        applyAnimations();
        applyFontWeight();
        applyGlow();
        applyFixedSurfaceOpacity();
        var outlineCSS = `
            body .card .card__view {
                position: relative !important;
            }
            body .card .card__view::after {
                content: '' !important;
                position: absolute !important;
                inset: 0 !important;
                border-radius: inherit !important;
                border: 4px solid transparent !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
                opacity: 0 !important;
                pointer-events: none !important;
                transition: border var(--perf-transition), box-shadow var(--perf-transition), opacity var(--perf-transition) !important;
                z-index: 5 !important;
            }
            body .card:hover .card__view::after,
            body .card.focus .card__view::after,
            body .card.hover .card__view::after {
                border-color: rgba(var(--primary-rgb), 0.995) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
                opacity: 1 !important;
            }
            body .card.focus .card__view::after,
            body .card.card--focus .card__view::after {
                border-color: rgba(var(--secondary-rgb), 0.995) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
            }
        `;
        if (!$('#drxaos-outline-styles').length) {
            $('head').append('<style id="drxaos-outline-styles">' + outlineCSS + '</style>');
        }
    } catch(e) {
    }
applyFullButtons();
}
function applyAnimations() {
    try {
        if (!window.jQuery || !window.$) return;
var animations = Lampa.Storage.get('drxaos_animations', true);
styleManager.removeStyle('drxaos_animations_style');
if (animations) {
    var animationCSS = '.card, .menu__item, .settings-param, .files__item, .torrent-item, .filter__item, .sort__item, .selectbox-item, .online__item, .online__item-line, .online-prestige__item, .online-prestige__line, .online__tabs-item, .full-start__button, .head__action { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important, opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; will-change: auto !important; }';
    styleManager.setStyle('drxaos_animations_style', animationCSS);
    setTimeout(function() {
    }, 50);
}
    } catch(e) {
    }
}
function applyFontWeight() {
    try {
        if (!window.jQuery || !window.$) return;
        var fontWeight = Lampa.Storage.get('drxaos_font_weight', '400');
        styleManager.removeStyle('drxaos_font_weight_style');
        var additionalCSS = `
            text-shadow: none !important;
            font-stretch: normal !important;
            letter-spacing: normal !important;
        `;
        var fontWeightCSS = `
            :root {
                --font-weight: ${fontWeight} !important;
            }
            *, body, .card, .menu__item, .settings-param, .files__item, .torrent-item,
            .filter__item, .sort__item, .selectbox-item, .online__item, .online__item-line,
            .online-prestige__item, .online-prestige__line, .online__tabs-item, 
            .full-start__button, .head__action, .card__title, .card__description,
            .menu__item-title, .settings__title, .full-start__title {
                font-weight: var(--font-weight, ${fontWeight}) !important;
                ${additionalCSS}
            }
        `;
        styleManager.setStyle('drxaos_font_weight_style', fontWeightCSS);
    } catch(e) {
    }
}
function applyGlow() {
    try {
        if (!window.jQuery || !window.$) return;
        var glow = Lampa.Storage.get('drxaos_glow', 'medium');
        var glowValues = { 'off': 0, 'low': 6, 'medium': 12, 'high': 20 };
        var glowSize = glowValues.hasOwnProperty(glow) ? glowValues[glow] : glowValues.medium;
        styleManager.removeStyle('drxaos-glow-styles');
        var glowCSS = `
            body .card:hover .card__img,
            body .card.focus .card__img {
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
            }
            .menu__item:hover,
            .button:hover,
            .settings-param:hover,
            .drxaos-theme-quick-btn:hover,
            .filter--search:hover,
            .filter--sort:hover,
            .filter--filter:hover,
            .simple-button--filter:hover,
            .selector--filter:hover,
            div.simple-button.simple-button--filter.filter--filter.selector:hover,
            .torrent-serial_content:hover,
            div.torrent-serial_content:hover {
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
            }
        `;
        styleManager.setStyle('drxaos-glow-styles', glowCSS);
    } catch(e) {
        logError('Error applying glow styles:', e);
    }
}
function applyFixedSurfaceOpacity() {
    try {
        var surfaceCSS = `
:root {
    --modal-opacity: 0.95;
    --drxaos-surface-opacity: 0.95;
}
.settings__content,
.extensions,
.speedtest {
    background: rgba(var(--bg-rgb, 12, 12, 12), var(--drxaos-surface-opacity)) !important;
    opacity: 1 !important;
}
body .settings,
body .settings__head,
body .modal,
body .modal__content,
body .select,
body .select__content,
body .layer,
body .layer__body,
body .selectbox,
body .selectbox__body,
body .panel,
body .panel__body,
body .settings-folder,
body .settings-param,
body .settings-folder.selector,
body .settings-param.selector,
body .selectbox-item,
body .menu__item,
body .files__item,
body .torrent-item,
body .filter__item,
body .sort__item,
body .filter--filter,
body .filter--sort,
body .filter--search,
body .filter--source,
body .simple-button,
body .simple-button--filter,
body .simple-button--filter.filter--filter,
body .simple-button--filter.filter--sort,
body .simple-button--filter.filter--search,
body .simple-button--filter.filter--source,
body .simple-button--filter.filter--type,
body .simple-button--filter.filter--view,
body .online__item,
body .online__item-line,
body .full-start__buttons .full-start__button,
body .full-start-new__buttons .full-start__button {
    background: rgba(var(--bg-rgb, 12, 12, 12), var(--drxaos-surface-opacity)) !important;
    background-image: none !important;
    opacity: 1 !important;
}
body .settings__head,
body .settings__head * {
    background: rgba(var(--bg-rgb, 12, 12, 12), var(--drxaos-surface-opacity)) !important;
    color: var(--text-main, #ffffff) !important;
}
body .settings-folder,
body .settings-param,
body .settings-folder.selector,
body .settings-param.selector,
body .selectbox-item,
body .menu__item,
body .files__item,
body .torrent-item,
body .filter__item,
body .sort__item,
body .filter--filter,
body .filter--sort,
body .filter--search,
body .filter--source,
body .filter--type,
body .filter--view,
body .simple-button,
body .simple-button--filter {
    border: 1px solid rgba(255, 255, 255, 0.95) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease !important;
}
body .settings-param:hover,
body .settings-param.focus,
body .settings-folder:hover,
body .settings-folder.focus,
body .selectbox-item:hover,
body .selectbox-item.focus,
body .simple-button--filter:hover,
body .simple-button--filter.focus,
body .filter--filter:hover,
body .filter--filter.focus,
body .filter--sort:hover,
body .filter--sort.focus,
body .filter--search:hover,
body .filter--search.focus,
body .filter--source:hover,
body .filter--source.focus,
body .filter--type:hover,
body .filter--type.focus,
body .filter--view:hover,
body .filter--view.focus {
    background: rgba(var(--primary-rgb), var(--drxaos-surface-opacity)) !important;
    border-color: rgba(var(--primary-rgb), 1) !important;
    color: var(--text-main, #ffffff) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
body .settings-folder.selector:hover,
body .settings-folder.selector.focus,
body .settings-param.selector:hover,
body .settings-param.selector.focus,
body .simple-button--filter:hover,
body .simple-button--filter.focus,
body .filter--filter:hover,
body .filter--filter.focus,
body .filter--sort:hover,
body .filter--sort.focus,
body .filter--search:hover,
body .filter--search.focus,
body .filter--source:hover,
body .filter--source.focus,
body .filter--type:hover,
body .filter--type.focus,
body .filter--view:hover,
body .filter--view.focus {
    background: rgba(var(--primary-rgb), var(--drxaos-surface-opacity)) !important;
    border-color: rgba(var(--primary-rgb), 1) !important;
    color: var(--text-main, #ffffff) !important;
}
body .simple-button--filter .simple-button__text,
body .filter--filter .simple-button__text,
body .filter--sort .simple-button__text,
body .filter--search .simple-button__text,
body .filter--source .simple-button__text,
body .filter--type .simple-button__text,
body .filter--view .simple-button__text {
    color: var(--text-main, #ffffff) !important;
}
`;
        styleManager.setStyle('drxaos_surface_fix', surfaceCSS);
    } catch(e) {
        logError('Error applying surface opacity fix:', e);
    }
}
function applyModernHoverStyles() {
    try {
        styleManager.removeStyle('drxaos-modern-hover-styles');
        var modernHoverCSS = `
            /* Netflix 2025 Modern Hover Styles - используем CSS переменные из активной темы */
            body .selectbox-item:hover,
            body .selectbox-item.focus,
            body .selectbox-item.selector:hover,
            body .settings-param:hover,
            body .settings-param.focus,
            body .menu__item:hover,
            body .menu__item.focus,
            body .files__item:hover,
            body .files__item.focus,
            body .torrent-item:hover,
            body .torrent-item.focus,
            body .filter__item:hover,
            body .filter__item.focus,
            body .sort__item:hover,
            body .sort__item.focus,
            body .online__item:hover,
            body .online__item.focus,
            body .online__item-line:hover,
            body .online__item-line.focus,
            body .online-prestige__item:hover,
            body .online-prestige__item.focus,
            body .online-prestige__line:hover,
            body .online-prestige__line.focus,
            body .online__tabs-item:hover,
            body .online__tabs-item.focus,
            body .full-start__button:hover,
            body .full-start__button.focus,
            body .button:hover,
            body .button.focus {
                background: linear-gradient(135deg, rgba(var(--primary-rgb), var(--drxaos-surface-opacity)), rgba(var(--secondary-rgb), var(--drxaos-surface-opacity))) !important;
                border: 1px solid rgba(var(--primary-rgb), 0.5) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
            }
            
            body .card:hover .card__title,
            body .card.focus .card__title,
            body .card:hover .card__text,
            body .card.focus .card__text,
            body .card:hover .card__description,
            body .card.focus .card__description,
            body .card:hover .info,
            body .card.focus .info,
            body .card:hover .card-watched__line,
            body .card.focus .card-watched__line {
                color: #ffffff !important;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
            }
        `;
        styleManager.setStyle('drxaos-modern-hover-styles', modernHoverCSS);
    } catch(e) {
        logError('Error applying modern hover styles:', e);
    }
}
function applyFullButtons() {
    try {
        if (!window.jQuery || !window.$) return;
        var fullbuttons = Lampa.Storage.get('drxaos_fullbuttons', false);
        if (document.body) {
            if (fullbuttons) document.body.classList.remove('drxaos-icon-buttons');
            else document.body.classList.add('drxaos-icon-buttons');
        }
        styleManager.removeStyle('drxaos_fullbuttons_style');
        styleManager.removeStyle('drxaos_fullbuttons_style_on');
        if (fullbuttons) {
            styleManager.setStyle('drxaos_fullbuttons_style_on', `
                .full-start__button span { 
                    display: inline !important; 
                    opacity: 1 !important; 
                    visibility: visible !important;
                    color: #000 !important; 
                    font-weight: 700 !important; 
                    margin-left: 8px !important;
                }
                .full-start__button { 
                    padding: 0.8em 1.5em !important;
                    min-width: auto !important;
                    width: auto !important;
                }
            `);
        } else {
            styleManager.setStyle('drxaos_fullbuttons_style', `
                .full-start__button span { 
                    display: none !important; 
                    opacity: 0 !important; 
                    visibility: hidden !important;
                }
                .full-start__button { 
                    padding: 0 !important;
                    min-width: 3.6em !important;
                    min-height: 3.6em !important;
                    width: 3.6em !important;
                    height: 3.6em !important;
                    justify-content: center !important;
                    border-radius: 50% !important;
                }
                .full-start__button svg {
                    margin: 0 !important;
                    width: 1.6em !important;
                    height: 1.6em !important;
                }
            `);
        }
    } catch(e) {
        logError('Error applying full buttons:', e);
    }
}
function createQuickThemeModal() {
    try {
        if (!window.jQuery || !window.$) return;
        var controller_name = 'drxaos_quick_theme_modal';

        function closeModal() {
            try {
                // Удаляем контроллер из Lampa
                Lampa.Controller.toggle(controller_name);

                var modal = document.querySelector('.drxaos-quick-theme-modal');
                if (modal) {
                    modal.remove();
                }

                // Очищаем все обработчики
                $(document).off('keydown.quickThemeModal');
                $(document).off('keyup.quickThemeModal');
                $(document).off('keydown.quickThemeNavigation');

                // Убираем фокус с кнопки
                var quickBtn = document.querySelector('#drxaos-quick-theme-btn');
                if (quickBtn) {
                    quickBtn.classList.remove('focus', 'focused', 'active');
                    quickBtn.blur();
                }

                // Возвращаем фокус основному контенту
                Lampa.Controller.toggle('content');
            } catch(e) {
                console.error('[DrxThemes] Error closing modal:', e);
            }
        }
var modal = $('<div class="drxaos-quick-theme-modal"></div>');
var overlay = $('<div class="drxaos-modal-overlay"></div>');
var content = $('<div class="drxaos-modal-content"></div>');
var title = $('<h2 class="drxaos-modal-title">🎨 Выберите тему</h2>');
var themesGrid = $('<div class="drxaos-themes-grid"></div>');
var themesList = [
{ id: 'midnight', name: 'Midnight', icon: '🌙' },
{ id: 'crimson', name: 'Crimson', icon: '🔴' },
{ id: 'ocean', name: 'Ocean', icon: '🌊' },
{ id: 'forest', name: 'Forest', icon: '🌲' },
{ id: 'sunset', name: 'Sunset', icon: '🌅' },
{ id: 'slate', name: 'Slate', icon: '⚫' },
{ id: 'lavender', name: 'Lavender', icon: '💜' },
{ id: 'emerald', name: 'Emerald', icon: '💚' },
{ id: 'amber', name: 'Amber', icon: '🟠' },
            { id: 'darkred', name: 'DARK RED', icon: '🔴' }
];
var currentTheme = Lampa.Storage.get('drxaos_theme', 'darkred');
function activateTheme(themeId) {
    var previousTheme = Lampa.Storage.get('drxaos_theme', 'darkred');
    try {
        Lampa.Storage.set('drxaos_theme', themeId);
        applyTheme(themeId);
        applyAdvancedSettings();
    } catch(e) {
        console.error('Ошибка активации темы:', e);
        if (previousTheme !== themeId) {
            Lampa.Storage.set('drxaos_theme', previousTheme);
            try {
                applyTheme(previousTheme);
                applyAdvancedSettings();
            } catch(restoreError) {
                console.error('Ошибка восстановления темы:', restoreError);
            }
        }
    }
    setTimeout(function() {
        var filterButtons = document.querySelectorAll('div.simple-button.simple-button--filter.filter--filter.selector');
        filterButtons.forEach(function(button) {
            if (button) {
                button.style.setProperty('background', 'var(--glass-bg, rgba(0, 0, 0, var(--drxaos-surface-opacity)))', 'important');
                button.style.setProperty('border', '2px solid var(--theme-primary, #5a3494)', 'important');
                button.style.setProperty('border-radius', '2em', 'important');
                button.style.setProperty('color', 'var(--text-main, #ffffff)', 'important');
                button.style.setProperty('box-shadow', '0 4px 12px rgba(0, 0, 0, var(--drxaos-surface-opacity))', 'important');
            }
        });
    }, 200);
    setTimeout(function() {
        closeModal();
        setTimeout(function() {
            if (document.activeElement && document.activeElement.blur) {
                document.activeElement.blur();
            }
            var $btn = $('#drxaos-quick-theme-btn');
            if ($btn.length) {
                $btn.focus();
            }
        }, 200);
    }, 100);
}
themesList.forEach(function(theme) {
    var themeBtn = $('<div class="drxaos-theme-item' + (currentTheme === theme.id ? ' active' : '') + '" data-theme="' + theme.id + '" tabindex="0" role="button" aria-label="Выбрать тему ' + theme.name + '"><span class="drxaos-theme-icon">' + theme.icon + '</span><span class="drxaos-theme-name">' + theme.name + '</span></div>');
    themeBtn.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        try {
            var selectedTheme = $(this).data('theme');
            activateTheme(selectedTheme);
            closeModal();
        } catch(error) {
            console.error('Ошибка при выборе темы:', error);
            closeModal();
        }
    });
    themeBtn.on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
            e.stopPropagation();
            var selectedTheme = $(this).data('theme');
            activateTheme(selectedTheme);
            closeModal();
        }
    });
    themeBtn.on('focus', function() {
        $('.drxaos-theme-item').removeClass('active');
        $(this).addClass('active');
    });
    themeBtn.on('mouseenter', function() {
        $('.drxaos-theme-item').removeClass('active');
        $(this).addClass('active');
});
themesGrid.append(themeBtn);
});
content.append(title).append(themesGrid);
modal.append(overlay).append(content);
if (typeof Lampa !== 'undefined' && Lampa.Listener) {
    var backHandler = function() {
        var $modal = $('.drxaos-quick-theme-modal');
        if ($modal.length > 0 && $modal.is(':visible')) {
            closeModal();
            return false;
        }
        return true;
    };

        // ===== КОНТРОЛЛЕР LAMPA ДЛЯ БЫСТРОЙ СМЕНЫ ТЕМ =====
        var modalController = {
            name: controller_name,
            toggle: function() {
                Lampa.Controller.add(controller_name, {
                    toggle: function() {},
                    back: function() { closeModal(); },
                    up: function() {
                        var $items = $('.drxaos-theme-item');
                        var $focused = $items.filter('.focus, .active');
                        var currentIndex = $items.index($focused);
                        if (currentIndex > 0) {
                            $focused.removeClass('focus active');
                            var $next = $items.eq(currentIndex - 1);
                            $next.addClass('focus active').focus();
                            $next[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    },
                    down: function() {
                        var $items = $('.drxaos-theme-item');
                        var $focused = $items.filter('.focus, .active');
                        var currentIndex = $items.index($focused);
                        if (currentIndex < $items.length - 1) {
                            $focused.removeClass('focus active');
                            var $next = $items.eq(currentIndex + 1);
                            $next.addClass('focus active').focus();
                            $next[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    },
                    left: function() {
                        var $items = $('.drxaos-theme-item');
                        var $focused = $items.filter('.focus, .active');
                        var currentIndex = $items.index($focused);
                        if (currentIndex > 0) {
                            $focused.removeClass('focus active');
                            var $next = $items.eq(currentIndex - 1);
                            $next.addClass('focus active').focus();
                            $next[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    },
                    right: function() {
                        var $items = $('.drxaos-theme-item');
                        var $focused = $items.filter('.focus, .active');
                        var currentIndex = $items.index($focused);
                        if (currentIndex < $items.length - 1) {
                            $focused.removeClass('focus active');
                            var $next = $items.eq(currentIndex + 1);
                            $next.addClass('focus active').focus();
                            $next[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    },
                    enter: function() {
                        var $focused = $('.drxaos-theme-item.focus, .drxaos-theme-item.active');
                        if ($focused.length) {
                            var selectedTheme = $focused.data('theme');
                            if (selectedTheme) {
                                activateTheme(selectedTheme);
                                // Закрываем модал с задержкой для применения темы
                                setTimeout(function() {
                                    closeModal();
                                }, 100);
                            }
                        }
                    }
                });
                Lampa.Controller.toggle(controller_name);
            }
        };

        modalController.toggle();
        setTimeout(function() {
            var $items = $('.drxaos-theme-item');
            var $current = $items.filter('[data-theme="' + currentTheme + '"]');
            if ($current.length) {
                $current.addClass('focus active').focus();
            } else {
                $items.first().addClass('focus active').focus();
            }
            $items.attr('tabindex', '0');
        }, 100);
        // ===== КОНЕЦ КОНТРОЛЛЕРА БЫСТРОЙ СМЕНЫ ТЕМ =====

    Lampa.Listener.follow('back', backHandler);
}
$(document).on('keydown.quickThemeGlobal', function(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
        var $modal = $('.drxaos-quick-theme-modal');
        if ($modal.length > 0 && $modal.is(':visible')) {
            closeModal();
        } else {
            if (document.activeElement && document.activeElement.blur) {
                document.activeElement.blur();
            }
            var $btn = $('#drxaos-quick-theme-btn');
            if ($btn.length) {
                $btn.focus();
            }
        }
    }
});
overlay.on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
});
$(document).on('keydown.quickThemeModal', function(e) {
    if (document.querySelector('.drxaos-quick-theme-modal')) {
        if (e.key === 'Escape' || e.keyCode === 27 || 
            e.key === 'Backspace' || e.keyCode === 8 ||
            e.key === 'Back' || e.keyCode === 166 ||
            e.keyCode === 461 || e.keyCode === 462 || e.keyCode === 10009 ||
            e.keyCode === 4 || e.keyCode === 111 || e.keyCode === 115) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
            return false;
        }
    }
});
$(document).on('keyup.quickThemeModal', function(e) {
    if (document.querySelector('.drxaos-quick-theme-modal')) {
        if (e.keyCode === 4 || e.keyCode === 111 || e.keyCode === 115) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
            return false;
        }
    }
});
content.on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
});
$(document).on('keydown.quickThemeNavigation', function(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        var $items = $('.drxaos-theme-item');
        var $active = $items.filter('.active');
        var currentIndex = $items.index($active);
        var newIndex = currentIndex;
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : $items.length - 1;
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            newIndex = currentIndex < $items.length - 1 ? currentIndex + 1 : 0;
        }
        $active.removeClass('active');
        $items.eq(newIndex).addClass('active').focus();
    } else if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
        e.stopPropagation();
            var selectedTheme = $('.drxaos-theme-item.active').data('theme');
            if (selectedTheme) {
                activateTheme(selectedTheme);
                closeModal();
            }
    } else if (e.key === 'Backspace' || e.keyCode === 8 ||
               e.key === 'Back' || e.keyCode === 166 ||
               e.keyCode === 461 || e.keyCode === 462 || e.keyCode === 10009) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
        return false;
    }
});
var styles = `
<style>
        /* ═══════════════════════════════════════════════════════════════════════
           🚀 PERFORMANCE OPTIMIZATION + 95% OPACITY FIX + MOBILE MENU
           ═══════════════════════════════════════════════════════════════════════ */

        /* GPU-ускорение для всех анимируемых элементов */
        .card,
        .menu__item,
        .scroll-line,
        .selector,
        .focus,
        .card-poster,
        .card-img,
        .selectbox__list,
        .settings-param__value {
            transform: translateZ(0);
            will-change: transform, opacity;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            -webkit-font-smoothing: antialiased;
        }

        /* Оптимизация изображений */
        .card-poster img,
        .card-img img,
        img {
            transform: translate3d(0, 0, 0);
            image-rendering: -webkit-optimize-contrast;
        }

        /* Быстрые transitions */
        .card {
            transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), 
                        opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .menu__item {
            transition: transform 0.15s ease-out, 
                        opacity 0.15s ease-out !important;
        }

        /* Focus-эффекты */
        .focus,
        .card:focus,
        .card.focus {
            transform: scale(1.05) translateZ(0) !important;
            transition: transform 0.15s ease-out !important;
        }

        /* Убираем тяжелые псевдоэлементы */
        .card-poster::after,
        .card-img::after {
            content: none !important;
        }

        /* Оптимизация скролла */
        .scroll,
        .line {
            -webkit-overflow-scrolling: touch;
            overflow: auto;
            will-change: scroll-position;
        }

        /* Упрощение border-radius */


        /* ═══════════════════════════════════════════════════════════════════════
           🎨 BACKGROUND COLOR FIX - ALWAYS USE THEME COLORS
           ═══════════════════════════════════════════════════════════════════════ */

        /* Принудительно фиксируем фон темы - не даем Lampa менять его */
        .background,
        body > .background,
        #app .background {
            background: linear-gradient(135deg, 
                rgba(var(--primary-rgb), 0.15) 0%, 
                rgb(var(--bg-rgb)) 50%,
                rgba(var(--secondary-rgb), 0.1) 100%) !important;
            background-color: rgb(var(--bg-rgb)) !important;
            background-image: linear-gradient(135deg, 
                rgba(var(--primary-rgb), 0.15) 0%, 
                rgb(var(--bg-rgb)) 50%,
                rgba(var(--secondary-rgb), 0.1) 100%) !important;
        }

        /* Убираем все динамические картинки фона */
        .background::before,
        .background::after,
        .background > * {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
        }

        /* Если Lampa пытается добавить background-image через style="" */
        .background[style*="background-image"] {
            background-image: linear-gradient(135deg, 
                rgba(var(--primary-rgb), 0.15) 0%, 
                rgb(var(--bg-rgb)) 50%,
                rgba(var(--secondary-rgb), 0.1) 100%) !important;
        }

        /* Также фиксируем body */
        body {
            background: linear-gradient(135deg, 
                rgba(var(--primary-rgb), 0.15) 0%, 
                rgb(var(--bg-rgb)) 50%,
                rgba(var(--secondary-rgb), 0.1) 100%) !important;
            background-attachment: fixed !important;
        }
        * {
            border-radius: 4px;
        }

        /* Фиксация прозрачности на 95% */
        .modal,
        .modal__content,
        .selectbox__list,
        .menu,
        .info__panel,
        .settings-panel {
            opacity: 0.95 !important;
        }

        /* ═══════════════════════════════════════════════════════════════════════
           📱 MOBILE BOTTOM MENU STYLING
           ═══════════════════════════════════════════════════════════════════════ */

        /* Нижнее меню на мобильных - темный фон */
        .bottom-tabs,
        .menu-bottom,
        .bottom-navigation,
        .footer-menu,
        .menu--bottom {
            background: rgba(0, 0, 0, 0.95) !important;
        }

        /* Кнопки: НАЗАД, ГЛАВНАЯ, ПОИСК, НАСТРОЙКИ - белый текст со свечением */
        .bottom-tabs__item,
        .menu-bottom__item,
        .bottom-navigation__button,
        .footer-menu__button,
        .menu--bottom .menu__item,
        .menu__item[data-action="back"],
        .menu__item[data-action="main"],
        .menu__item[data-action="search"],
        .menu__item[data-action="settings"] {
            color: #ffffff !important;
            text-shadow: 0 0 10px var(--theme-color, #e50914),
                         0 0 20px var(--theme-color, #e50914),
                         0 0 30px var(--theme-color, #e50914) !important;
            transition: all 0.2s ease-out !important;
        }

        /* Иконки кнопок - белые со свечением */
        .bottom-tabs__item svg,
        .menu-bottom__item svg,
        .bottom-navigation__button svg,
        .footer-menu__button svg,
        .menu--bottom .menu__item svg,
        .menu__item[data-action] svg {
            fill: #ffffff !important;
            stroke: #ffffff !important;
            filter: drop-shadow(0 0 8px var(--theme-color, #e50914)) !important;
        }

        /* Активная кнопка - усиленное свечение */
        .bottom-tabs__item.active,
        .bottom-tabs__item--active,
        .menu-bottom__item.active,
        .menu-bottom__item--active,
        .bottom-navigation__button.active,
        .footer-menu__button.active,
        .menu--bottom .menu__item.active,
        .menu--bottom .menu__item.focus,
        .menu__item[data-action].active,
        .menu__item[data-action].focus {
            color: #ffffff !important;
            text-shadow: 0 0 15px var(--theme-color, #e50914),
                         0 0 30px var(--theme-color, #e50914),
                         0 0 45px var(--theme-color, #e50914),
                         0 0 60px var(--theme-color, #e50914) !important;
            transform: scale(1.1) translateZ(0) !important;
        }

        /* Иконки активной кнопки - усиленное свечение */
        .bottom-tabs__item.active svg,
        .menu-bottom__item.active svg,
        .bottom-navigation__button.active svg,
        .menu--bottom .menu__item.active svg,
        .menu--bottom .menu__item.focus svg,
        .menu__item[data-action].active svg,
        .menu__item[data-action].focus svg {
            filter: drop-shadow(0 0 12px var(--theme-color, #e50914))
                    drop-shadow(0 0 20px var(--theme-color, #e50914)) !important;
        }

        /* Текст кнопок */
        .bottom-tabs__text,
        .menu-bottom__text,
        .bottom-navigation__text,
        .footer-menu__text,
        .menu--bottom .menu__item-text,
        .menu__item span {
            color: #ffffff !important;
            font-weight: 500 !important;
        }

        /* Hover эффект */
        @media (hover: hover) {
            .bottom-tabs__item:hover,
            .menu-bottom__item:hover,
            .bottom-navigation__button:hover,
            .footer-menu__button:hover,
            .menu--bottom .menu__item:hover,
            .menu__item[data-action]:hover {
                text-shadow: 0 0 12px var(--theme-color, #e50914),
                             0 0 25px var(--theme-color, #e50914),
                             0 0 40px var(--theme-color, #e50914) !important;
            }
        }


        /* ═══════════════════════════════════════════════════════════════════════
           🚀 PERFORMANCE OPTIMIZATION + 95% OPACITY FIX
           ═══════════════════════════════════════════════════════════════════════ */

        /* GPU-ускорение для всех анимируемых элементов */
        .card,
        .menu__item,
        .scroll-line,
        .selector,
        .focus,
        .card-poster,
        .card-img,
        .selectbox__list,
        .settings-param__value {
            transform: translateZ(0);
            will-change: transform, opacity;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            -webkit-font-smoothing: antialiased;
        }

        /* Оптимизация изображений */
        .card-poster img,
        .card-img img,
        img {
            transform: translate3d(0, 0, 0);
            image-rendering: -webkit-optimize-contrast;
        }

        /* Быстрые transitions */
        .card {
            transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), 
                        opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .menu__item {
            transition: transform 0.15s ease-out, 
                        opacity 0.15s ease-out !important;
        }

        /* Focus-эффекты */
        .focus,
        .card:focus,
        .card.focus {
            transform: scale(1.05) translateZ(0) !important;
            transition: transform 0.15s ease-out !important;
        }

        /* Убираем тяжелые псевдоэлементы */
        .card-poster::after,
        .card-img::after {
            content: none !important;
        }

        /* Оптимизация скролла */
        .scroll,
        .line {
            -webkit-overflow-scrolling: touch;
            overflow: auto;
            will-change: scroll-position;
        }

        /* Упрощение border-radius */
        * {
            border-radius: 4px;
        }

        /* Фиксация прозрачности на 95% для дополнительной производительности */
        .modal,
        .modal__content,
        .selectbox__list,
        .menu,
        .info__panel,
        .settings-panel {
            opacity: 0.95 !important;
        }


.drxaos-quick-theme-modal {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 10000;
display: flex;
align-items: center;
justify-content: center;
font-family: var(--font-family, 'Netflix Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif);
font-weight: var(--font-weight, 400);
}
.drxaos-modal-overlay {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, var(--drxaos-surface-opacity));
-webkit-cursor: pointer;
z-index: 1;
}
.drxaos-modal-content {
position: relative;
z-index: 2;
background: rgba(30, 30, 40, 0.95);
saturate(180%);
-webkit-saturate(180%);
border: 2px solid rgba(107, 63, 174, 0.95);
border-radius: 1.5em;
padding: 2em;
max-width: 90%;
width: 700px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
animation: modalSlideIn 0.3s ease-out;
cursor: default;
}
@keyframes modalSlideIn {
from {
opacity: 0;
transform: translateY(-30px) scale(0.995);
}
to {
opacity: 1;
transform: translateY(0) scale(1);
}
}
.drxaos-modal-title {
color: #00c8e6;
font-size: 1.8em;
font-weight: 700;
margin: 0 0 1em 0;
text-align: center;
text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
}
.drxaos-themes-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
gap: 1em;
}
.drxaos-theme-item {
background: rgba(50, 50, 70, 0.95);
border: 2px solid rgba(107, 63, 174, 0.95);
border-radius: 1em;
padding: 1.5em 1em;
cursor: pointer;
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
display: flex;
flex-direction: column;
align-items: center;
gap: 0.5em;
-webkit-}
.drxaos-theme-item:hover {
background: linear-gradient(135deg, rgba(107, 63, 174, 0.95), rgba(0, 153, 204, 0.95));
border-color: #00c8e6;
transform: translateY(-5px) scale(1.05);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
.drxaos-theme-item.active {
background: linear-gradient(135deg, #6b3fae, #0099cc);
border-color: #00c8e6;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
.drxaos-theme-item:focus {
outline: none;
background: linear-gradient(135deg, rgba(107, 63, 174, 0.95), rgba(0, 153, 204, 0.95));
border-color: #00c8e6;
transform: translateY(-3px) scale(1.02);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
.drxaos-theme-icon {
font-size: 2.5em;
line-height: 1;
filter: drop-shadow(0 2px 4px rgba(0, 0, 0, var(--drxaos-surface-opacity)));
}
.drxaos-theme-name {
color: #fff;
font-size: 0.9em;
font-weight: 600;
text-align: center;
text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
}
.drxaos-theme-item.active .drxaos-theme-name {
color: #fff;
font-weight: 700;
text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
}
</style>
`;
$('head').append(styles);
$('body').append(modal);
modal.hide().fadeIn(300, function() {
    var $activeItem = $('.drxaos-theme-item.active');
    if ($activeItem.length > 0) {
        $activeItem.focus();
    } else {
        $('.drxaos-theme-item').first().focus().addClass('active');
    }
});
    } catch(e) {
    }
}
function addQuickThemeButton() {
    try {
        if (!window.jQuery || !window.$) return;
var checkInterval = setInterval(function() {
if ($('.head__actions').length > 0 && $('#drxaos-quick-theme-btn').length === 0) {
                var btn = $('<div class="head__action drxaos-theme-quick-btn selector" id="drxaos-quick-theme-btn" title="Быстрый выбор темы" data-action="drxaos-quick-theme"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.71 4.63l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41zM7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z" fill="currentColor"/></svg></div>');
$('.head__actions').prepend(btn);
                if (btn && btn.length > 0) {
                    btn.on('hover:enter', function() {
                        if (!document.querySelector('.drxaos-quick-theme-modal')) {
                            createQuickThemeModal();
                        }
                    });
                    btn.on('click', function() {
                        if (!document.querySelector('.drxaos-quick-theme-modal')) {
                            createQuickThemeModal();
                        }
                    });
                    btn.on('focus', function() {
                        if (!document.querySelector('.drxaos-quick-theme-modal')) {
                            createQuickThemeModal();
                        }
                    });
                }
clearInterval(checkInterval);
}
}, 100);
setTimeout(function() {
clearInterval(checkInterval);
}, 10000);
        var lastHash = window.location.hash;
        setInterval(function() {
            var currentHash = window.location.hash;
            if (currentHash !== lastHash) {
                lastHash = currentHash;
                if ($('.head__actions').length > 0 && $('#drxaos-quick-theme-btn').length === 0) {
                    var btn = $('<div class="head__action drxaos-theme-quick-btn selector" id="drxaos-quick-theme-btn" title="Быстрый выбор темы" data-action="drxaos-quick-theme"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.71 4.63l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41zM7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z" fill="currentColor"/></svg></div>');
                    $('.head__actions').prepend(btn);
                    btn.on('hover:enter', function() {
                        if (!document.querySelector('.drxaos-quick-theme-modal')) {
                            createQuickThemeModal();
                        }
                    });
                    btn.on('click', function() {
                        if (!document.querySelector('.drxaos-quick-theme-modal')) {
                            createQuickThemeModal();
                        }
                    });
                    btn.on('focus', function() {
                        if (!document.querySelector('.drxaos-quick-theme-modal')) {
                            createQuickThemeModal();
                        }
                    });
                }
            }
        }, 500);
    } catch(e) {
    }
}
function addSettings() {
    // Инициализация значений по умолчанию
    if (!Lampa.Storage.get('tmdb_api_key')) {
        Lampa.Storage.set('tmdb_api_key', 'c87a543116135a4120443155bf680876');
    }
    if (!Lampa.Storage.get('jacred_url')) {
        Lampa.Storage.set('jacred_url', 'jacred.xyz');
    }
    
    function ensureIntegrationDefaults() {
        try {
            var builtinTmdb = 'c87a543116135a4120443155bf680876';
            var tmdbKey = (Lampa.Storage.get('tmdb_api_key') || '').toString().trim();
            if (!tmdbKey) {
                Lampa.Storage.set('tmdb_api_key', builtinTmdb);
            }
            var jacredUrl = (Lampa.Storage.get('jacred_url') || '').toString().trim();
            if (jacredUrl) {
                jacredUrl = jacredUrl.replace(/^https?:\/\//i, '').replace(/\/+$/, '');
            }
            if (!jacredUrl) {
                jacredUrl = 'jacred.xyz';
            }
            if (Lampa.Storage.get('jacred_url') !== jacredUrl) {
                Lampa.Storage.set('jacred_url', jacredUrl);
            }
        } catch(err) {
            logError('Error ensuring integration defaults', err);
        }
    }
    ensureIntegrationDefaults();
    Lampa.SettingsApi.addComponent({
        component: 'drxaos_themes',
        name: 'DRXAOS Themes',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" fill="currentColor"/></svg>',
        order: -999
    });
    
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'drxaos_theme',
        type: 'select',
        values: {
            'midnight': Lampa.Lang.translate('theme_midnight'),
            'crimson': Lampa.Lang.translate('theme_crimson'),
            'ocean': Lampa.Lang.translate('theme_ocean'),
            'forest': Lampa.Lang.translate('theme_forest'),
            'sunset': Lampa.Lang.translate('theme_sunset'),
            'slate': Lampa.Lang.translate('theme_slate'),
            'lavender': Lampa.Lang.translate('theme_lavender'),
            'emerald': Lampa.Lang.translate('theme_emerald'),
            'amber': Lampa.Lang.translate('theme_amber')
        },
        default: 'midnight'
    },
        field: {
        name: Lampa.Lang.translate('drxaos_theme'),
        description: Lampa.Lang.translate('drxaos_theme_desc')
    },
        onChange: applyTheme
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'drxaos_glow',
        type: 'select',
        values: {
            'off': 'Off',
            'low': 'Low',
            'medium': 'Medium',
            'high': 'High'
        },
        default: 'medium'
    },
        field: {
        name: Lampa.Lang.translate('drxaos_glow'),
        description: Lampa.Lang.translate('drxaos_glow_desc')
    },
        onChange: function() {
        applyAdvancedSettings();
        applyGlow();
    }
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'drxaos_fullbuttons',
        type: 'trigger',
        default: false
    },
        field: {
        name: Lampa.Lang.translate('drxaos_fullbuttons'),
        description: Lampa.Lang.translate('drxaos_fullbuttons_desc')
    },
        onChange: applyFullButtons
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'drxaos_animations',
        type: 'trigger',
        default: true
    },
        field: {
        name: Lampa.Lang.translate('drxaos_animations'),
        description: Lampa.Lang.translate('drxaos_animations_desc')
    },
        onChange: applyAnimations
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'drxaos_font_weight',
        type: 'select',
        values: {
            '400': 'Normal',
            '600': 'Semi-Bold',
            '700': 'Bold',
            '800': 'Extra Bold',
            '900': 'Black'
        },
        default: '400'
    },
        field: {
        name: Lampa.Lang.translate('drxaos_font_weight'),
        description: Lampa.Lang.translate('drxaos_font_weight_desc')
    },
        onChange: applyFontWeight
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'poster_glow_intensity',
        type: 'select',
        values: {
            '0': '0px',
            '5': '5px',
            '10': '10px',
            '15': '15px',
            '20': '20px',
            '30': '30px'
        },
        default: '10'
    },
        field: {
        name: Lampa.Lang.translate('poster_glow_intensity'),
        description: Lampa.Lang.translate('poster_glow_intensity_desc')
    },
        onChange: function(v) {
            setAdvancedSetting('posterGlowIntensity', v);
        }
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'poster_animation_speed',
        type: 'select',
        values: {
            '0.1': '0.1s',
            '0.2': '0.2s',
            '0.3': '0.3s',
            '0.5': '0.5s',
            '0.8': '0.8s',
            '1': '1s'
        },
        default: '0.3'
    },
        field: {
        name: Lampa.Lang.translate('animation_speed'),
        description: Lampa.Lang.translate('animation_speed_desc')
    },
        onChange: function(v) {
            setAdvancedSetting('posterAnimationSpeed', v);
        }
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'card_background_opacity',
        type: 'select',
        values: {
            '0': '0%',
            '10': '10%',
            '20': '20%',
            '30': '30%',
            '50': '50%',
            '70': '70%',
            '90': '90%',
            '100': '100%'
        },
        default: '70'
    },
        field: {
        name: Lampa.Lang.translate('card_opacity'),
        description: Lampa.Lang.translate('card_opacity_desc')
    },
        onChange: function(v) {
            setAdvancedSetting('cardBackgroundOpacity', v);
        }
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'hover_scale',
        type: 'select',
        values: {
            '1.0': '1.0x',
            '1.02': '1.02x',
            '1.05': '1.05x',
            '1.08': '1.08x',
            '1.1': '1.1x',
            '1.15': '1.15x',
            '1.2': '1.2x',
            '1.25': '1.25x',
            '1.3': '1.3x'
        },
        default: '1.05'
    },
        field: {
        name: Lampa.Lang.translate('hover_scale'),
        description: Lampa.Lang.translate('hover_scale_desc')
    },
        onChange: function(v) {
            setAdvancedSetting('hoverScale', v);
        }
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'animation_speed',
        type: 'select',
        values: {
            '0.1': 'Очень быстро (0.1с)',
            '0.2': 'Быстро (0.2с)',
            '0.3': 'Средне (0.3с)',
            '0.5': 'Медленно (0.5с)',
            '0.8': 'Очень медленно (0.8с)',
            '1.0': 'Максимально медленно (1.0с)'
        },
        default: '0.3'
    },
        field: {
        name: Lampa.Lang.translate('global_animation_speed'),
        description: Lampa.Lang.translate('global_animation_speed_desc')
    },
        onChange: function(v) {
            setAdvancedSetting('animationSpeed', v);
        }
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'reset_advanced',
        type: 'trigger',
        default: false
    },
        field: {
        name: Lampa.Lang.translate('reset_settings'),
        description: Lampa.Lang.translate('reset_settings_desc')
    },
        onChange: function() {
            advancedSettings = buildAdvancedDefaults();
            saveAdvancedSettings();
            applyAdvancedSettings();
            if (Lampa.Noty) {
                Lampa.Noty.show('✅ Расширенные настройки сброшены!');
            }
        }
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'season_info',
        type: 'select',
        values: {
            'off': 'Выключено',
            'on': 'Включено'
        },
        default: 'off'
    },
        field: {
        name: Lampa.Lang.translate('season_info'),
        description: Lampa.Lang.translate('season_info_desc')
    },
        onChange: applySeasonInfo
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'source_filter',
        type: 'select',
        values: {
            'off': 'Выключено',
            'on': 'Включено'
        },
        default: 'off'
    },
        field: {
        name: Lampa.Lang.translate('source_filter'),
        description: Lampa.Lang.translate('source_filter_desc')
    },
        onChange: applySourceFilter
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'movie_quality',
        type: 'select',
        values: {
            'off': 'Выключено',
            'on': 'Включено'
        },
        default: 'off'
    },
        field: {
        name: Lampa.Lang.translate('movie_quality'),
        description: Lampa.Lang.translate('movie_quality_desc')
    },
        onChange: applyMovieQuality
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'tmdb_api_key',
        type: 'select',
        values: {
            'c87a543116135a4120443155bf680876': 'Built-in key (default)',
            'custom': 'Enter custom key...'
        },
        default: 'c87a543116135a4120443155bf680876'
    },
        field: {
        name: '🔑 TMDB API Key',
        description: Lampa.Lang.translate('tmdb_api_key_desc')
    },
        onChange: function(value) {
        if (value === 'custom') {
            var currentCustomKey = Lampa.Storage.get('tmdb_api_key_custom', '');
            var newKey = prompt(Lampa.Lang.translate('tmdb_prompt'), currentCustomKey);
            if (newKey !== null && newKey.trim()) {
                newKey = newKey.trim();
                Lampa.Storage.set('tmdb_api_key_custom', newKey);
                Lampa.Storage.set('tmdb_api_key', newKey);
                if (Lampa.Noty) {
                    Lampa.Noty.show(Lampa.Lang.translate('tmdb_saved') + newKey.substring(0, 8) + '***');
                }
                if (newKey.length > 10) {
                    applySeasonInfo();
                }
            } else {
                // Если отменили или пусто - вернуть на встроенный ключ
                Lampa.Storage.set('tmdb_api_key', 'c87a543116135a4120443155bf680876');
            }
        } else {
            // Выбран встроенный ключ
            Lampa.Storage.set('tmdb_api_key', value);
            applySeasonInfo();
        }
    }
});
    Lampa.SettingsApi.addParam({
        component: 'drxaos_themes',
        param: {
        name: 'jacred_url',
        type: 'select',
        values: {
            'jacred.xyz': 'jacred.xyz (default)',
            'jacred.net': 'jacred.net',
            'custom': 'Enter custom URL...'
        },
        default: 'jacred.xyz'
    },
        field: {
        name: '🌐 JacRed URL',
        description: Lampa.Lang.translate('jacred_url_desc')
    },
        onChange: function(value) {
        if (value === 'custom') {
            var currentCustomUrl = Lampa.Storage.get('jacred_url_custom', '');
            var newUrl = prompt(Lampa.Lang.translate('jacred_prompt'), currentCustomUrl);
            if (newUrl !== null && newUrl.trim()) {
                newUrl = newUrl.trim().replace(/^https?:\/\//, '');
                Lampa.Storage.set('jacred_url_custom', newUrl);
                Lampa.Storage.set('jacred_url', newUrl);
                if (Lampa.Noty) {
                    Lampa.Noty.show(Lampa.Lang.translate('jacred_saved') + newUrl);
                }
                applyMovieQuality();
            } else {
                // Если отменили или пусто - вернуть на jacred.xyz
                Lampa.Storage.set('jacred_url', 'jacred.xyz');
            }
        } else {
            // Выбран один из стандартных
            Lampa.Storage.set('jacred_url', value);
            applyMovieQuality();
        }
    }
});
}
var BUTTON_ICON_SVGS = {
    online: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7z" fill="#3B82F6"/><circle cx="12" cy="12" r="3" fill="#1E40AF"/><circle cx="12" cy="12" r="1.5" fill="white"/></svg>',
    torrent: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 2h5v12a2 2 0 1 0 4 0V2h5v12a7 7 0 1 1-14 0V2z" fill="#DC2626"/><path d="M5 2h5v4H5zM14 2h5v4h-5z" fill="#F87171"/><path d="M5 6h5v3H5zM14 6h5v3h-5z" fill="#F97316"/><path d="M5 2h5v2H5zM14 2h5v2h-5z" fill="#E2E8F0"/></svg>',
    play: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#EF4444"/><path d="M10 8v8l6-4-6-4z" fill="white"/></svg>',
    trailer: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" fill="#FF9800"/><path d="M10 9v6l5-3-5-3z" fill="white"/><circle cx="6" cy="8" r="1" fill="#FFB74D"/><circle cx="18" cy="8" r="1" fill="#FFB74D"/></svg>',
    book: '<svg width="21" height="32" viewBox="0 0 21 32" fill="none"><path d="M2 1.5H19C19.2761 1.5 19.5 1.72386 19.5 2V27.9618C19.5 28.3756 19.0261 28.6103 18.697 28.3595L12.6212 23.7303C11.3682 22.7757 9.63183 22.7757 8.37885 23.7303L2.30302 28.3595C1.9739 28.6103 1.5 28.3756 1.5 27.9618V2C1.5 1.72386 1.72386 1.5 2 1.5Z" fill="#FCD34D" stroke="#F59E0B" stroke-width="2"/></svg>'
};
function applyButtonIcons(scope) {
    try {
        if (!window.jQuery || !window.$) return;
        var $root = scope ? $(scope) : $(document.body || document);
        $root.find('.full-start__button.view--online, .lampac--button').each(function() {
            var svg = $(this).find('svg').first();
            if (svg.length) svg.replaceWith(BUTTON_ICON_SVGS.online);
        });
        $root.find('.full-start__button[class*="torrent"], .full-start__button.view--torrent').each(function() {
            var svg = $(this).find('svg').first();
            if (svg.length) svg.replaceWith(BUTTON_ICON_SVGS.torrent);
        });
        $root.find('.full-start__button[class*="play"], .full-start__button.button--play').each(function() {
            var svg = $(this).find('svg').first();
            if (svg.length) svg.replaceWith(BUTTON_ICON_SVGS.play);
        });
        $root.find('.full-start__button[class*="trailer"], .full-start__button.view--trailer').each(function() {
            var svg = $(this).find('svg').first();
            if (svg.length) svg.replaceWith(BUTTON_ICON_SVGS.trailer);
        });
        $root.find('.full-start__button[class*="book"], .full-start__button.button--book').each(function() {
            var svg = $(this).find('svg').first();
            if (svg.length) svg.replaceWith(BUTTON_ICON_SVGS.book);
        });
    } catch(e) {
        logError('Error applying button icons:', e);
    }
}
function pinSettingsComponentTop() {
    try {
        if (!window.jQuery || !window.$) return;
        if (!Lampa || !Lampa.Settings || !Lampa.Settings.listener) return;
        function ensureTop(body) {
            try {
                var $root = body ? $(body) : $('.settings .settings__body > div').first();
                if (!$root.length) return;
                var $folder = $root.children('.settings-folder[data-component="drxaos_themes"]').first();
                if (!$folder.length) $folder = $root.find('.settings-folder[data-component="drxaos_themes"]').first();
                if (!$folder.length) return;
                var $parent = $folder.parent();
                if (!$parent.length) return;
                if ($parent.children().first()[0] !== $folder[0]) {
                    $folder.prependTo($parent);
                }
            } catch(err) {
                logError('Error ensuring settings order:', err);
            }
        }
        Lampa.Settings.listener.follow('open', function(e) {
            if (e.name === 'main') {
                setTimeout(function() { ensureTop(e.body); }, 0);
                setTimeout(function() { ensureTop(e.body); }, 200);
            }
        });
        ensureTop();
    } catch(e) {
        logError('Error pinning settings component:', e);
    }
}
function flattenWatchButtons() {
    try {
        if (!window.jQuery || !window.$) return;
        var flattened = false;
		var $allTargets = $();
        $('.full-start-new, .activity__body .full-start').each(function() {
            var $view = $(this);
            var $hidden = $view.find('.buttons--container');
            if (!$hidden.length) return;
            var $target = $view.find('.full-start-new__buttons');
            if (!$target.length) $target = $view.find('.full-start__buttons');
            if (!$target.length) return;
            var inserted = false;
            $hidden.children('.full-start__button').each(function() {
                var $btn = $(this);
                if ($btn.data('drxaosFlattened')) return;
                $btn.data('drxaosFlattened', true);
                $btn.removeClass('hide');
                if (!$btn.hasClass('selector')) {
                    $btn.addClass('selector');
                }
                if (!$btn.attr('tabindex')) {
                    $btn.attr('tabindex', '0');
                }
                var $anchor = $target.find('.button--book, .button--reaction, .button--subscribe, .button--options').first();
                if ($anchor.length) {
                    $btn.insertBefore($anchor);
                } else {
                    $target.append($btn);
                }
                inserted = true;
            });
            if (inserted) {
                flattened = true;
				$allTargets = $allTargets.add($target);
                var $playBtn = $target.find('.button--play');
                if ($playBtn.length) {
                    $playBtn.addClass('hide drxaos-watch-hidden').attr('tabindex', '-1');
                }
            }
            if (!$hidden.children().length) {
                $hidden.remove();
            }
        });
        if (flattened) {
            applyFullButtons();
            applyButtonIcons($allTargets);
        }
    } catch(e) {
        logError('Error flattening watch buttons:', e);
    }
}
function reorderButtons() {
    try {
        if (!window.jQuery || !window.$) return;
var buttonInterval = setInterval(function() {
var $buttonsContainer = $('.full-start__buttons, .full-start-new__buttons, .full-start .full-start__buttons, .activity__body .full-start__buttons');
if ($buttonsContainer.length > 0) {
var buttons = [];
var $onlineBtn = null;
var $torrentsBtn = null;
var $watchBtn = null;
var $favoriteBtn = null;
$buttonsContainer.find('.full-start__button').each(function() {
var $btn = $(this);
var text = $btn.find('span').text().trim();
if (text === 'Онлайн' || text === 'Online') {
$onlineBtn = $btn;
var $svg = $onlineBtn.find('svg');
if ($svg.length) {
$svg.attr('viewBox', '0 0 24 24');
$svg.html('<path d="M8 5v14l11-7z" fill="currentColor"/>');
}
} 
else if (text === 'Смотреть' || text === 'Watch' || text === 'Дивитися') {
$watchBtn = $btn;
var $svg = $watchBtn.find('svg');
if ($svg.length) {
$svg.attr('viewBox', '0 0 24 24');
$svg.html('<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>');
}
} 
else if (text === 'Торренты' || text === 'Torrents') {
$torrentsBtn = $btn;
$svg = $torrentsBtn.find('svg');
if ($svg.length) {
$svg.attr('viewBox', '0 0 24 24');
$svg.html('<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>');
}
} 
else if (text === 'Избранное' || text === 'Favorite' || text === 'Обране') {
$favoriteBtn = $btn;
}
});
if ($onlineBtn && $watchBtn) {
if ($onlineBtn) $onlineBtn.detach();
if ($torrentsBtn) $torrentsBtn.detach();
if ($watchBtn) $watchBtn.detach();
if ($favoriteBtn) $favoriteBtn.detach();
$buttonsContainer.empty();
if ($onlineBtn) $buttonsContainer.append($onlineBtn);
if ($torrentsBtn) $buttonsContainer.append($torrentsBtn);
if ($watchBtn) $buttonsContainer.append($watchBtn);
if ($favoriteBtn) $buttonsContainer.append($favoriteBtn);
applyFullButtons();
flattenWatchButtons();
applyButtonIcons($buttonsContainer);
if (document.body) {
document.body.classList.add('drxaos-buttons-ready');
}
clearInterval(buttonInterval);
}
}
}, 100);
setTimeout(function() {
clearInterval(buttonInterval);
if (document.body) {
document.body.classList.add('drxaos-buttons-ready');
}
}, 5000);
    } catch(e) {
    }
}
function applySeasonInfo() {
    var seasonInfo = Lampa.Storage.get('season_info', 'on');
    if (seasonInfo === 'on') {
        var tmdbApiKey = Lampa.Storage.get('tmdb_api_key', '');
        if (!tmdbApiKey) {
            if (Lampa.Noty) {
                Lampa.Noty.show('Включено');
            }
            return;
        }
        var isTV = /Android TV|Google TV|Fire TV|Smart TV|TV|WebOS|Tizen/i.test(navigator.userAgent) || 
                   window.navigator.userAgent.includes('TV') ||
                   document.body.classList.contains('tv') ||
                   window.location.hostname.includes('tv');
        var styleTag = document.createElement("style");
        styleTag.id = "drxaos-season-info";
        styleTag.textContent = `
            .card--content-type {
                position: absolute;
                top: 5px;
                left: 5px;
                z-index: 12;
                width: fit-content;
                max-width: 150px;
                border-radius: 12px;
                overflow: hidden;
                opacity: 0;
                transition: opacity 0.22s ease-in-out;
                font-family: 'Netflix Sans', sans-serif;
                font-weight: 900;
                font-size: 14px;
                padding: 8px 12px;
                white-space: nowrap;
                text-align: center;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
                will-change: opacity;
                backface-visibility: hidden;
            }
            .card--content-type.movie {
                background-color: rgba(0, 0, 0, var(--drxaos-surface-opacity));
                color: #ffffff;
            }
            .card--content-type.tv {
                background-color: rgba(0, 0, 0, var(--drxaos-surface-opacity));
                color: #ffffff;
            }
            .card--content-type.show {
                opacity: 1;
            }
            .card__marker--look {
                position: absolute !important;
                top: 50% !important;
				left: 50% !important;
				transform: translate(-50%, -50%) !important;
				bottom: auto !important;
				right: auto !important;
				font-family: Netflix Sans, sans-serif !important;
				font-size: 16px !important;
				font-weight: 900 !important;
				padding: 8px 16px !important;
				border-radius: 16px !important;
				background: rgba(0, 0, 0, 0.95) !important;
				color: #ffffff !important;
				text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95) !important;
				box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95) !important;
				z-index: 10 !important;
			}
            .card--season-complete {
                position: absolute;
                left: 5px;
                bottom: 40px;
                background-color: rgba(0, 0, 0, var(--drxaos-surface-opacity));
                z-index: 12;
                width: fit-content;
                max-width: calc(100% - 1em);
                border-radius: 16px;
                overflow: hidden;
                opacity: 0;
                transition: opacity 0.22s ease-in-out;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
            }
            .card--season-progress {
                position: absolute;
                left: 5px;
                bottom: 40px;
                background-color: rgba(0, 0, 0, var(--drxaos-surface-opacity));
                z-index: 12;
                width: fit-content;
                max-width: calc(100% - 1em);
                border-radius: 16px;
                overflow: hidden;
                opacity: 0;
                transition: opacity 0.22s ease-in-out;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
            }
            .card--season-complete div,
            .card--season-progress div {
                text-transform: uppercase;
                font-family: 'Netflix Sans', sans-serif;  
                font-weight: 900;
                font-size: 14px;
                padding: 8px 12px;
                white-space: nowrap;
                display: flex;
                align-items: center;
                gap: 4px;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
                text-align: center;
            }
            .card--season-complete div {
                color: #ffffff;
            }
            .card--season-progress div {
                color: #ffffff;
            }
            .card--season-complete.show,
            .card--season-progress.show {
                opacity: 1;
            }
            .card--country {
                position: absolute;
                top: 40px;
                left: 5px;
                z-index: 12;
                width: fit-content;
                max-width: 80px;
                font-family: 'Netflix Sans', sans-serif;
                font-size: 14px;
                font-weight: 900;
                padding: 8px 12px;
                border-radius: 12px;
                background-color: rgba(0, 0, 0, var(--drxaos-surface-opacity));
                color: #ffffff;
                text-align: center;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
                opacity: 0;
                transition: opacity 0.3s ease;
                will-change: opacity;
                backface-visibility: hidden;
            }
            .card--country.show {
                opacity: 1;
            }
            .card__type {
                display: none !important;
            }
        .card-more__box {
            background: var(--theme-primary, rgba(0, 0, 0, var(--drxaos-surface-opacity))) !important;
            border: 2px solid var(--theme-secondary, rgba(255, 255, 255, 0.95)) !important;
            border-radius: 16px !important;
            padding: 16px !important;
            transition: transform 0.3s ease !important, opacity 0.3s ease !important;
        }
        .card-more__box:hover {
            background: var(--theme-secondary, rgba(255, 255, 255, 0.95)) !important;
            border-color: var(--theme-accent, #ffffff) !important;
            transform: scale(1.05);
        }
        .card-more__title {
            color: white !important;
            font-weight: 700 !important;
            font-size: 1.1em !important;
        }
.online-prestige {
    background: var(--drxaos-bg-color) !important;
    border: 2px solid var(--drxaos-accent-color) !important;
    border-radius: 12px !important;
    padding: 1em !important;
    transition: transform 0.3s ease !important, opacity 0.3s ease !important;
}
.online-prestige.focus,
.online-prestige:hover {
    border-color: var(--drxaos-accent-color) !important;
    box-shadow: 0 0 20px var(--drxaos-accent-color) !important;
    transform: scale(1.02) !important;
}
.online-prestige__img {
    border-radius: 8px !important;
    overflow: hidden !important;
}
.online-prestige__title,
.online-prestige__info,
.online-prestige__footer {
    color: var(--drxaos-text-color) !important;
    font-family: 'Netflix Sans', 'Netflix Sans', sans-serif !important;
}
`;
        document.head.appendChild(styleTag);
        var seasonCache = JSON.parse(localStorage.getItem('drxaos_season_cache') || '{}');
        var cacheTime = 12 * 60 * 60 * 1000;
        function fetchSeriesData(tmdbId) {
            return new Promise(function(resolve, reject) {
                if (seasonCache[tmdbId] && (Date.now() - seasonCache[tmdbId].timestamp < cacheTime)) {
                    return resolve(seasonCache[tmdbId].data);
                }
                var url = 'https://api.themoviedb.org/3/tv/' + tmdbId + '?api_key=' + tmdbApiKey + '&language=ru';
                fetch(url)
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error('HTTP error ' + response.status);
                        }
                        return response.json();
                    })
                    .then(function(data) {
                                if (data.success === false) {
                                    reject(new Error(data.status_message));
                                    return;
                                }
                                seasonCache[tmdbId] = { 
                                    data: data, 
                                    timestamp: Date.now() 
                                };
                                localStorage.setItem('drxaos_season_cache', JSON.stringify(seasonCache));
                                resolve(data);
                    })
                    .catch(function(error) {
                        reject(error);
                    });
            });
        }
        function addSeasonBadge(cardEl) {
            if (!cardEl || cardEl.hasAttribute('data-season-processed')) return;
            if (!cardEl.card_data) {
                setTimeout(function() { addSeasonBadge(cardEl); }, 100);
                return;
            }
            var data = cardEl.card_data;
            var view = cardEl.querySelector('.card__view');
            if (!view) return;
            var oldBadges = view.querySelectorAll('.card--content-type, .card--season-complete, .card--season-progress, .card--country');
            for (var i = 0; i < oldBadges.length; i++) {
                if (oldBadges[i].parentNode) {
                    oldBadges[i].parentNode.removeChild(oldBadges[i]);
                }
            }
            var contentTypeBadge = document.createElement('div');
            contentTypeBadge.className = 'card--content-type ' + (data.name ? 'tv' : 'movie');
            contentTypeBadge.textContent = data.name ? 'Сериал' : 'Фильм';
            view.appendChild(contentTypeBadge);
            if (data.origin_country && data.origin_country.length > 0) {
                var countryBadge = document.createElement('div');
                countryBadge.className = 'card--country';
                countryBadge.textContent = data.origin_country[0].toUpperCase();
                view.appendChild(countryBadge);
                setTimeout(function() {
                    countryBadge.classList.add('show');
                }, 50);
            }
            setTimeout(function() {
                contentTypeBadge.classList.add('show');
            }, 50);
            if (data.name) {
                var badge = document.createElement('div');
                badge.className = 'card--season-progress';
                badge.innerHTML = '<div>...</div>';
                view.appendChild(badge);
                cardEl.setAttribute('data-season-processed', 'loading');
                fetchSeriesData(data.id)
                    .then(function(tmdbData) {
                        if (tmdbData && tmdbData.seasons && tmdbData.last_episode_to_air) {
                            var lastEpisode = tmdbData.last_episode_to_air;
                            var currentSeason = null;
                            for (var i = 0; i < tmdbData.seasons.length; i++) {
                                var season = tmdbData.seasons[i];
                                if (season.season_number === lastEpisode.season_number && season.season_number > 0) {
                                    currentSeason = season;
                                    break;
                                }
                            }
                            if (currentSeason) {
                                var totalEpisodes = currentSeason.episode_count || 0;
                                var airedEpisodes = lastEpisode.episode_number || 0;
                                var isComplete = airedEpisodes >= totalEpisodes;
                                var content = '';
                                if (isComplete) {
                                    content = 'S' + lastEpisode.season_number;
                                } else {
                                    content = 'S' + lastEpisode.season_number + ' ' + airedEpisodes + '/' + totalEpisodes;
                                }
                                if (badge.parentNode) {
                                    badge.parentNode.removeChild(badge);
                                }
                                badge = document.createElement('div');
                                badge.className = isComplete ? 'card--season-complete' : 'card--season-progress';
                                badge.innerHTML = '<div>' + content + (isComplete ? ' ✓' : '') + '</div>';
                                view.appendChild(badge);
                                setTimeout(function() {
                                    badge.classList.add('show');
                                }, 50);
                                cardEl.setAttribute('data-season-processed', isComplete ? 'complete' : 'in-progress');
                            } else {
                                if (badge.parentNode) {
                                    badge.parentNode.removeChild(badge);
                                }
                                cardEl.setAttribute('data-season-processed', 'error');
                            }
                        } else {
                            if (badge.parentNode) {
                                badge.parentNode.removeChild(badge);
                            }
                            cardEl.setAttribute('data-season-processed', 'error');
                        }
                    })
                    .catch(function(error) {
                        if (badge.parentNode) {
                            badge.parentNode.removeChild(badge);
                        }
                        cardEl.setAttribute('data-season-processed', 'error');
                    });
            } else {
                cardEl.setAttribute('data-season-processed', 'not-tv');
            }
        }
        window.drxaosSeasonHandler = function(mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var mutation = mutations[i];
                var addedNodes = mutation.addedNodes;
                if (addedNodes) {
                    for (var j = 0; j < addedNodes.length; j++) {
                        var node = addedNodes[j];
                        if (node.nodeType !== 1) continue;
                        if (node.classList && node.classList.contains('card')) {
                            addSeasonBadge(node);
                        }
                        if (node.querySelectorAll) {
                            var cards = node.querySelectorAll('.card');
                            for (var k = 0; k < cards.length; k++) {
                                addSeasonBadge(cards[k]);
                            }
                        }
                    }
                }
            }
        };
        var existingCards = document.querySelectorAll('.card:not([data-season-processed])');
        for (var j = 0; j < existingCards.length; j++) {
            (function(index) {
                /* jshint -W083 */
                setTimeout(function() { addSeasonBadge(existingCards[index]); }, index * 300);
            })(j);
        }
    } else {
        var existingStyle = document.getElementById("drxaos-season-info");
        if (existingStyle) {
            existingStyle.remove();
        }
        $('.card--content-type, .card--season-complete, .card--season-progress, .card--country').remove();
    }
}
function applySourceFilter() {
    var sourceFilter = Lampa.Storage.get('source_filter', 'on');
    if (sourceFilter === 'on') {
        Lampa.Controller.listener.follow('toggle', function (event) {
            if (event.name !== 'select') {
                return;
            }
            var active = Lampa.Activity.active();
            var componentName = active.component.toLowerCase();
            if (componentName !== 'online' && componentName !== 'lampac' && componentName.indexOf('bwa') !== 0) {
                return;
            }
            var $filterTitle = $('.selectbox__title');
            if ($filterTitle.length !== 1 || $filterTitle.text() !== Lampa.Lang.translate('title_filter')) {
                return;
            }
            var $sourceBtn = $('.simple-button--filter.filter--sort');
            if ($sourceBtn.length !== 1 || $sourceBtn.hasClass('hide')) {
                return;
            }
            var $selectBoxItem = Lampa.Template.get('selectbox_item', {
                title: Lampa.Lang.translate('settings_rest_source'),
                subtitle: $('div', $sourceBtn).text()
            });
            $selectBoxItem.on('hover:enter', function () {
                $sourceBtn.trigger('hover:enter');
            });
            var $selectOptions = $('.selectbox-item');
            if ($selectOptions.length > 0) {
                $selectOptions.first().after($selectBoxItem);
            } else {
                $('body > .selectbox').find('.scroll__body').prepend($selectBoxItem);
            }
            Lampa.Controller.collectionSet($('body > .selectbox').find('.scroll__body'));
            Lampa.Controller.collectionFocus($('.selectbox-item').first());
        });
    }
}
function applyMovieQuality() {
    var movieQuality = Lampa.Storage.get('movie_quality', 'on');
    if (movieQuality === 'on') {
        var jacredUrl = Lampa.Storage.get('jacred_url', 'jacred.xyz');
        if (!jacredUrl) {
            if (Lampa.Noty) {
                Lampa.Noty.show('Включено');
            }
            return;
        }
        var styleTag = document.createElement("style");
        styleTag.id = "drxaos-movie-quality";
        styleTag.textContent = `
            .full-start__status.surs_quality.camrip {
                color: red !important;
            }
        .card-more__box {
            background: var(--theme-primary, rgba(0, 0, 0, var(--drxaos-surface-opacity))) !important;
            border: 2px solid var(--theme-secondary, rgba(255, 255, 255, 0.95)) !important;
            border-radius: 16px !important;
            padding: 16px !important;
            transition: transform 0.3s ease !important, opacity 0.3s ease !important;
        }
        .card-more__box:hover {
            background: var(--theme-secondary, rgba(255, 255, 255, 0.95)) !important;
            border-color: var(--theme-accent, #ffffff) !important;
            transform: scale(1.05);
        }
        .card-more__title {
            color: white !important;
            font-weight: 700 !important;
            font-size: 1.1em !important;
        }
.online-prestige {
    background: var(--drxaos-bg-color) !important;
    border: 2px solid var(--drxaos-accent-color) !important;
    border-radius: 12px !important;
    padding: 1em !important;
    transition: transform 0.3s ease !important, opacity 0.3s ease !important;
}
.online-prestige.focus,
.online-prestige:hover {
    border-color: var(--drxaos-accent-color) !important;
    box-shadow: 0 0 20px var(--drxaos-accent-color) !important;
    transform: scale(1.02) !important;
}
.online-prestige__img {
    border-radius: 8px !important;
    overflow: hidden !important;
}
.online-prestige__title,
.online-prestige__info,
.online-prestige__footer {
    color: var(--drxaos-text-color) !important;
    font-family: 'Netflix Sans', 'Netflix Sans', sans-serif !important;
}
`;
        document.head.appendChild(styleTag);
        initMovieQualitySystem(jacredUrl);
    } else {
        var existingStyle = document.getElementById("drxaos-movie-quality");
        if (existingStyle) {
            existingStyle.remove();
        }
        Lampa.Storage.set('drxaos_quality_cache', {});
    }
}
function initMovieQualitySystem(jacredUrl) {
    var Q_CACHE_TIME = 72 * 60 * 60 * 1000;
    var QUALITY_CACHE = 'drxaos_quality_cache';
    var JACRED_PROTOCOL = 'https://';
    var PROXY_LIST = [
        'http://api.allorigins.win/raw?url=',
        'http://cors.bwa.workers.dev/'
    ];
    var PROXY_TIMEOUT = 5000;
    if (typeof AbortController === 'undefined') {
        window.AbortController = function () {
            this.signal = {
                aborted: false,
                addEventListener: function (event, callback) {
                    if (event === 'abort') {
                        this._onabort = callback;
                    }
                }
            };
            this.abort = function () {
                this.signal.aborted = true;
                if (typeof this.signal._onabort === 'function') {
                    this.signal._onabort();
                }
            };
        };
    }
    function fetchWithProxy(url, cardId, callback) {
        var currentProxyIndex = 0;
        var callbackCalled = false;
        var controller = new AbortController();
        var signal = controller.signal;
        function tryNextProxy() {
            if (currentProxyIndex >= PROXY_LIST.length) {
                if (!callbackCalled) {
                    callbackCalled = true;
                    callback(new Error('Все прокси не сработали для ' + url));
                }
                return;
            }
            var proxyUrl = PROXY_LIST[currentProxyIndex] + encodeURIComponent(url);
            var timeoutId = setTimeout(function () {
                controller.abort();
                if (!callbackCalled) {
                    currentProxyIndex++;
                    tryNextProxy();
                }
            }, PROXY_TIMEOUT);
            fetch(proxyUrl, { signal: signal })
                .then(function (response) {
                    clearTimeout(timeoutId);
                    if (!response.ok) {
                        throw new Error('Ошибка прокси: ' + response.status);
                    }
                    return response.text();
                })
                .then(function (data) {
                    if (!callbackCalled) {
                        callbackCalled = true;
                        clearTimeout(timeoutId);
                        callback(null, data);
                    }
                })
                .catch(function (error) {
                    clearTimeout(timeoutId);
                    if (!callbackCalled) {
                        currentProxyIndex++;
                        tryNextProxy();
                    }
                });
        }
        var directTimeoutId = setTimeout(function () {
            controller.abort();
            if (!callbackCalled) {
                tryNextProxy();
            }
        }, PROXY_TIMEOUT);
        fetch(url, { signal: signal })
            .then(function (response) {
                clearTimeout(directTimeoutId);
                if (!response.ok) {
                    throw new Error('Ошибка прямого запроса: ' + response.status);
                }
                return response.text();
            })
            .then(function (data) {
                if (!callbackCalled) {
                    callbackCalled = true;
                    clearTimeout(directTimeoutId);
                    callback(null, data);
                }
            })
            .catch(function (error) {
                clearTimeout(directTimeoutId);
                if (!callbackCalled) {
                    tryNextProxy();
                }
            });
    }
    function getBestReleaseFromJacred(normalizedCard, cardId, callback) {
        if (!jacredUrl) {
            callback(null);
            return;
        }
        function translateQuality(quality, isCamrip, title) {
    if (isCamrip) return 'CAM';
    
    // Приоритет 1: Проверка названия релиза (более точно)
    if (title && typeof title === 'string') {
        var titleUpper = title.toUpperCase();
        
        // Проверка на 4K/2160p/UHD
        if (titleUpper.includes('2160P') || 
            titleUpper.includes('4K') || 
            titleUpper.includes('UHD') ||
            titleUpper.includes('ULTRA HD')) {
            return '4K';
        }
        
        // Проверка на FHD/1080p
        if (titleUpper.includes('1080P') || 
            titleUpper.includes('FHD') || 
            titleUpper.includes('FULL HD')) {
            return 'FHD';
        }
        
        // Проверка на HD/720p
        if (titleUpper.includes('720P') || 
            titleUpper.includes('HD') ||
            titleUpper.includes('HDTV') ||
            titleUpper.includes('HDRIP')) {
            return 'HD';
        }
        
        // Проверка на SD/480p
        if (titleUpper.includes('480P') || 
            titleUpper.includes('SD') ||
            titleUpper.includes('DVDRIP')) {
            return 'SD';
        }
    }
    
    // Приоритет 2: Числовое значение quality (фолбэк)
    if (typeof quality === 'string') {
        var numericQuality = parseInt(quality.replace(/\D/g, ''));
        if (numericQuality >= 2160) return '4K';
        if (numericQuality >= 1080) return 'FHD';
        if (numericQuality >= 720) return 'HD';
        if (numericQuality > 0) return 'SD';
        return quality;
    }
    
    if (typeof quality === 'number') {
        if (quality >= 2160) return '4K';
        if (quality >= 1080) return 'FHD';
        if (quality >= 720) return 'HD';
        if (quality > 0) return 'SD';
    }
    
    return null;
}
        var year = '';
        var dateStr = normalizedCard.release_date || '';
        if (dateStr.length >= 4) {
            year = dateStr.substring(0, 4);
        }
        function searchJacredApi(searchTitle, searchYear, exactMatch, strategyName, apiCallback) {
            var userId = Lampa.Storage.get('lampac_unic_id', '');
            var apiUrl = JACRED_PROTOCOL + jacredUrl + '/api/v1.0/torrents?search=' +
                encodeURIComponent(searchTitle) +
                (searchYear ? '&year=' + searchYear : '') +
                (exactMatch ? '&exact=true' : '');
            fetchWithProxy(apiUrl, cardId, function (error, responseText) {
                if (error || !responseText) {
                    apiCallback(null);
                    return;
                }
                try {
                    var torrents = JSON.parse(responseText);
                    if (!Array.isArray(torrents) || torrents.length === 0) {
                        apiCallback(null);
                        return;
                    }
                    var bestNumericQuality = -1;
                    var bestFoundTorrent = null;
                    var camripFound = false;
                    var camripQuality = -1;
                    for (var i = 0; i < torrents.length; i++) {
                        var currentTorrent = torrents[i];
                        var currentNumericQuality = currentTorrent.quality;
                        var lowerTitle = (currentTorrent.title || '').toLowerCase();
                        var isCamrip = /\b(ts|telesync|camrip|cam|TC|звук с TS)\b/i.test(lowerTitle);
                        if (!isCamrip) {
                            if (typeof currentNumericQuality === 'number' && currentNumericQuality > 0) {
                                if (currentNumericQuality > bestNumericQuality) {
                                    bestNumericQuality = currentNumericQuality;
                                    bestFoundTorrent = currentTorrent;
                                }
                            }
                        }
                    }
                    if (!bestFoundTorrent) {
                        for (var i2 = 0; i < torrents.length; i++) {
                            var torr2 = torrents[i2];
                            var qual2 = torr2.quality;
                            var title2 = (torr2.title || '').toLowerCase();
                            var camrip2 = /\b(ts|telesync|camrip|cam|TC|звук с TS)\b/i.test(title2);
                            if (camrip2) {
                                if (typeof qual2 === 'number' && qual2 >= 720) {
                                    camripFound = true;
                                    if (qual2 > camripQuality) {
                                        camripQuality = qual2;
                                        bestFoundTorrent = torr2;
                                    }
                                }
                            }
                        }
                    }
                    if (bestFoundTorrent) {
                        var camrip2 = camripFound && bestNumericQuality === -1;
                        var finalQuality = translateQuality(bestFoundTorrent.quality, camrip2, bestFoundTorrent.title);
                        apiCallback({
                            quality: finalQuality,
                            title: bestFoundTorrent.title,
                            camrip2: camrip2
                        });
                    } else {
                        apiCallback(null);
                    }
                } catch (e) {
                    logError('Ошибка при получении качества из JacRed:', e);
                    apiCallback(null);
                }
            });
        }
        var searchStrategies = [];
        if (normalizedCard.original_title && /[a-zа-яё0-9]/i.test(normalizedCard.original_title)) {
            searchStrategies.push({
                title: normalizedCard.original_title.trim(),
                year: year,
                exact: true,
                name: 'OriginalTitle Exact Year'
            });
        }
        if (normalizedCard.title && /[a-zа-яё0-9]/i.test(normalizedCard.title)) {
            searchStrategies.push({
                title: normalizedCard.title.trim(),
                year: year,
                exact: true,
                name: 'Title Exact Year'
            });
        }
        if (normalizedCard.type === 'tv' && (!year || isNaN(year))) {
            if (normalizedCard.original_title && /[a-zа-яё0-9]/i.test(normalizedCard.original_title)) {
                searchStrategies.push({
                    title: normalizedCard.original_title.trim(),
                    year: '',
                    exact: false,
                    name: 'OriginalTitle No Year'
                });
            }
            if (normalizedCard.title && /[a-zа-яё0-9]/i.test(normalizedCard.title)) {
                searchStrategies.push({
                    title: normalizedCard.title.trim(),
                    year: '',
                    exact: false,
                    name: 'Title No Year'
                });
            }
        }
        function executeNextStrategy(index) {
            if (index >= searchStrategies.length) {
                callback(null);
                return;
            }
            var strategy = searchStrategies[index];
            searchJacredApi(strategy.title, strategy.year, strategy.exact, strategy.name, function (result) {
                if (result !== null) {
                    callback(result);
                } else {
                    executeNextStrategy(index + 1);
                }
            });
        }
        if (searchStrategies.length > 0) {
            executeNextStrategy(0);
        } else {
            callback(null);
        }
    }
    function getQualityCache(key) {
        var cache = Lampa.Storage.get(QUALITY_CACHE) || {};
        var item = cache[key];
        return item && (Date.now() - item.timestamp < Q_CACHE_TIME) ? item : null;
    }
    function saveQualityCache(key, data, localCurrentCard) {
        var cache = Lampa.Storage.get(QUALITY_CACHE) || {};
        for (var cacheKey in cache) {
            if (cache.hasOwnProperty(cacheKey)) {
                if (Date.now() - cache[cacheKey].timestamp >= Q_CACHE_TIME) {
                    delete cache[cacheKey];
                }
            }
        }
        cache[key] = {
            quality: data.quality || null,
            isCamrip: data.isCamrip || false,
            timestamp: Date.now()
        };
        Lampa.Storage.set(QUALITY_CACHE, cache);
    }
    function clearQualityElements(localCurrentCard, render) {
        if (render) {
            $('.full-start__status.surs_quality', render).remove();
        }
    }
    function showQualityPlaceholder(localCurrentCard, render) {
        if (!render) {
            return;
        }
        var rateLine = $('.full-start-new__rate-line', render);
        if (!rateLine.length) {
            return;
        }
        if (!$('.full-start__status.surs_quality', render).length) {
            var placeholder = document.createElement('div');
            placeholder.className = 'full-start__status surs_quality';
            placeholder.textContent = '...';
            placeholder.style.opacity = '0.7';
            rateLine.append(placeholder);
        }
    }
    function updateQualityElement(quality, isCamrip, localCurrentCard, render) {
        if (!render) {
            return;
        }
        var element = $('.full-start__status.surs_quality', render);
        var rateLine = $('.full-start-new__rate-line', render);
        if (!rateLine.length) {
            return;
        }
        if (element.length) {
            element.text(quality).css('opacity', '1');
            if (isCamrip) {
                element.addClass('camrip');
            } else {
                element.removeClass('camrip');
            }
        } else {
            var div = document.createElement('div');
            div.className = 'full-start__status surs_quality' + (isCamrip ? ' camrip' : '');
            div.textContent = quality;
            rateLine.append(div);
        }
    }
    function fetchQualitySequentially(normalizedCard, localCurrentCard, qCacheKey, render) {
        getBestReleaseFromJacred(normalizedCard, localCurrentCard, function (jrResult) {
            var quality = (jrResult && jrResult.quality) || null;
            var isCamrip = (jrResult && jrResult.isCamrip) || false;
            if (quality && quality !== 'NO') {
                saveQualityCache(qCacheKey, { quality: quality, isCamrip: isCamrip }, localCurrentCard);
                updateQualityElement(quality, isCamrip, localCurrentCard, render);
            } else {
                clearQualityElements(localCurrentCard, render);
            }
        });
    }
    function getCardType(card) {
        var type = card.media_type || card.type;
        if (type === 'movie' || type === 'tv') {
            return type;
        }
        return card.name || card.original_name ? 'tv' : 'movie';
    }
    function fetchQualityForCard(card, render) {
        if (!render) {
            return;
        }
        var localCurrentCard = card.id;
        var normalizedCard = {
            id: card.id,
            title: card.title || card.name || '',
            original_title: card.original_title || card.original_name || '',
            type: getCardType(card),
            release_date: card.release_date || card.first_air_date || ''
        };
        var rateLine = $('.full-start-new__rate-line', render);
        var qCacheKey = normalizedCard.type + '_' + (normalizedCard.id || normalizedCard.imdb_id);
        var cacheQualityData = getQualityCache(qCacheKey);
        if (cacheQualityData) {
            updateQualityElement(cacheQualityData.quality, cacheQualityData.isCamrip, localCurrentCard, render);
        } else {
            showQualityPlaceholder(localCurrentCard, render);
            setTimeout(function() {
                fetchQualitySequentially(normalizedCard, localCurrentCard, qCacheKey, render);
            }, 100);
        }
    }
    Lampa.Listener.follow('full', function (e) {
        if (e.type === 'complite') {
            var render = e.object.activity.render();
            fetchQualityForCard(e.data.movie, render);
        }
    });
    function processAllCards() {
        var cards = document.querySelectorAll('.card:not([data-quality-processed])');
        var batchSize = 5;
        var currentIndex = 0;
        function processBatch() {
            var endIndex = Math.min(currentIndex + batchSize, cards.length);
            for (var i = currentIndex; i < endIndex; i++) {
                var card = cards[i];
                var cardData = getCardDataFromElement(card);
                if (cardData) {
                    addQualityToMiniCard(card, cardData);
                    moveCardAgeToPoster(card);
                    card.setAttribute('data-quality-processed', 'true');
                }
            }
            currentIndex = endIndex;
            if (currentIndex < cards.length) {
                setTimeout(processBatch, 10);
            }
        }
        if (cards.length > 0) {
            processBatch();
        }
    }
    var cardDataStorage = new WeakMap();
    function getCardDataFromElement(cardElement) {
        try {
            if (cardDataStorage.has(cardElement)) {
                return cardDataStorage.get(cardElement);
            }
            var tmdbId = null;
            var cardId = null;
            cardId = cardElement.getAttribute('data-id') || 
                        cardElement.getAttribute('id');
            if (!cardId) {
                var parent = cardElement.parentElement;
                while (parent && !cardId) {
                    cardId = parent.getAttribute('data-id') || 
                            parent.getAttribute('data-movie-id') ||
                            parent.getAttribute('data-tmdb-id') ||
                            parent.getAttribute('data-tv-id');
                    parent = parent.parentElement;
                }
            }
            if (!cardId) {
                cardId = getCardIdFromLampaData(cardElement);
            }
            if (!cardId) {
                return null;
            }
            var titleElement = cardElement.querySelector('.card__title, .card-title, .title, .card__name, .name');
            var title = titleElement ? titleElement.textContent.trim() : '';
            if (!title) {
                title = cardElement.getAttribute('data-title') || 
                       cardElement.getAttribute('data-name') || '';
            }
            var originalTitleElement = cardElement.querySelector('.card__original-title, .original-title, .card__original-name, .original-name');
            var originalTitle = originalTitleElement ? originalTitleElement.textContent.trim() : '';
            if (!originalTitle) {
                originalTitle = cardElement.getAttribute('data-original-title') || 
                              cardElement.getAttribute('data-original-name') || '';
            }
            var isTv = cardElement.classList.contains('card--tv') || 
                      cardElement.classList.contains('tv') ||
                      cardElement.querySelector('.card__type') ||
                      cardElement.querySelector('[data-type="tv"]') ||
                      cardElement.getAttribute('data-type') === 'tv';
            var year = cardElement.getAttribute('data-year') || 
                      cardElement.getAttribute('data-release-year') ||
                      cardElement.getAttribute('data-first-air-date') ||
                      cardElement.getAttribute('data-release-date') || '';
            if (!year) {
                var yearElement = cardElement.querySelector('.card__year, .year, .card__date, .date');
                if (yearElement) {
                    var yearText = yearElement.textContent.trim();
                    var yearMatch = yearText.match(/(\d{4})/);
                    if (yearMatch) {
                        year = yearMatch[1];
                    }
                }
            }
            if (!title && !cardId) {
                return null;
            }
            var cardData = {
                id: cardId,
                tmdb_id: tmdbId,
                title: title,
                original_title: originalTitle,
                type: isTv ? 'tv' : 'movie',
                release_date: year
            };
            return cardData;
        } catch (e) {
            logError('Ошибка при парсинге данных карточки:', e);
            return null;
        }
    }
    function getCardIdFromLampaData(cardElement) {
        try {
            if (window.Lampa && window.Lampa.Storage) {
                var cacheKeys = Object.keys(localStorage).filter(key => 
                    key.includes('lampa') || key.includes('card') || key.includes('movie') || key.includes('tv')
                );
                for (var i = 0; i < cacheKeys.length; i++) {
                    try {
                        var cacheData = JSON.parse(localStorage.getItem(cacheKeys[i]));
                        if (cacheData && typeof cacheData === 'object') {
                            if (cacheData.id || cacheData.tmdb_id) {
                                return cacheData.id || cacheData.tmdb_id;
                            }
                        }
                    } catch (e) {
                    }
                }
            }
            var href = cardElement.getAttribute('href') || '';
            var idMatch = href.match(/\/(\d+)/);
            if (idMatch) {
                return idMatch[1];
            }
            var onclick = cardElement.getAttribute('onclick') || '';
            var onclickMatch = onclick.match(/id[:\s]*(\d+)/);
            if (onclickMatch) {
                return onclickMatch[1];
            }
            var titleElement = cardElement.querySelector('.card__title, .card-title, .title, .card__name, .name');
            if (titleElement) {
                var title = titleElement.textContent.trim();
                if (title) {
            var foundId = findIdByTitle(title);
            if (foundId) {
                return foundId;
            }
            var tmdbId = findIdByTitleInTMDB(title);
            if (tmdbId) {
                return tmdbId;
            }
                    var hash = 0;
                    var i3;
                    for (i3 = 0; i3 < title.length; i3++) {
                        var char = title.charCodeAt(i3);
                        hash = ((hash << 5) - hash) + char;
                        hash = hash & hash;
                    }
                    var generatedId = Math.abs(hash).toString().substr(0, 8);
                    return generatedId;
                }
            }
            return null;
        } catch (e) {
            logError('Ошибка при парсинге данных карточки:', e);
            return null;
        }
    }
    function findIdByTitle(title) {
        try {
            var cacheKeys = Object.keys(localStorage);
            for (var i = 0; i < cacheKeys.length; i++) {
                var key = cacheKeys[i];
                if (key.includes('lampa') || key.includes('movie') || key.includes('tv') || key.includes('card')) {
                    try {
                        var data = JSON.parse(localStorage.getItem(key));
                        if (data && typeof data === 'object') {
                            if (data.title && data.title.toLowerCase().includes(title.toLowerCase())) {
                                return data.id || data.tmdb_id;
                            }
                            if (data.name && data.name.toLowerCase().includes(title.toLowerCase())) {
                                return data.id || data.tmdb_id;
                            }
                            if (data.original_title && data.original_title.toLowerCase().includes(title.toLowerCase())) {
                                return data.id || data.tmdb_id;
                            }
                        }
                    } catch (e) {
                    }
                }
            }
            if (window.Lampa && window.Lampa.Storage) {
                var activeData = window.Lampa.Storage.get('active_movie') || window.Lampa.Storage.get('active_tv');
                if (activeData && activeData.title && activeData.title.toLowerCase().includes(title.toLowerCase())) {
                    return activeData.id;
                }
            }
            return null;
        } catch (e) {
            logError('Ошибка при парсинге данных карточки:', e);
            return null;
        }
    }
    function findIdByTitleInTMDB(title) {
        try {
            var tmdbApiKey = Lampa.Storage.get('tmdb_api_key', '');
            if (!tmdbApiKey) {
                return null;
            }
            return null;
        } catch (e) {
            logError('Ошибка при парсинге данных карточки:', e);
            return null;
        }
    }
    function processBatch(items, processFunc, batchSize, callback) {
        batchSize = batchSize || 10;
        var index = 0;
        function processNextBatch() {
            var end = Math.min(index + batchSize, items.length);
            for (var i = index; i < end; i++) {
                processFunc(items[i], i);
            }
            index = end;
            if (index < items.length) {
                requestAnimationFrame(processNextBatch);
            } else if (callback) {
                callback();
            }
        }
        requestAnimationFrame(processNextBatch);
    }
    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this;
            var args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
            }
    function throttle(func, limit) {
        var inThrottle;
        return function() {
            var args = arguments;
            var context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }
    var requestIdleCallbackPolyfill = window.requestIdleCallback || function(cb) {
        var start = Date.now();
        return setTimeout(function() {
            cb({
                didTimeout: false,
                timeRemaining: function() {
                    return Math.max(0, 50 - (Date.now() - start));
        }
            });
        }, 1);
    };
    function addQualityToMiniCard(cardElement, cardData) {
        if (!cardData || !cardData.title) {
            return;
        }
        var qualityElement = document.createElement('div');
        qualityElement.className = 'card-quality';
        qualityElement.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(0, 0, 0, var(--drxaos-surface-opacity));
            color: white;
            padding: 8px 12px;
            border-radius: 12px;
            font-family: 'Netflix Sans', sans-serif;
            font-size: 14px;
            font-weight: 900;
            z-index: 10;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
            will-change: opacity;
            backface-visibility: hidden;
        `;
        qualityElement.textContent = '';
        qualityElement.style.display = 'none';
        cardElement.style.position = 'relative';
        var posterElement = cardElement.querySelector('.card__poster, .card-poster, .poster, .card__image, .card-image');
        if (posterElement) {
            posterElement.style.position = 'relative';
            posterElement.appendChild(qualityElement);
        } else {
            cardElement.appendChild(qualityElement);
        }
        var qCacheKey = cardData.type + '_' + cardData.id;
        var cacheQualityData = getQualityCache(qCacheKey);
        if (cacheQualityData && cacheQualityData.quality && cacheQualityData.quality !== 'undefined' && cacheQualityData.quality !== '') {
            qualityElement.textContent = cacheQualityData.quality;
            qualityElement.style.display = 'inline-flex';
            if (cacheQualityData.isCamrip) {
                qualityElement.style.color = 'red';
            }
        } else {
            queueRequest(function(done) {
                getBestReleaseFromJacred(cardData, cardData.id, function (result) {
                    if (result && result.quality && result.quality !== 'undefined' && result.quality !== '' && result.quality !== 'null') {
                        qualityElement.textContent = result.quality;
                        qualityElement.style.display = 'inline-flex';
                        if (result.isCamrip) {
                            qualityElement.style.color = 'red';
                        }
                        saveQualityCache(qCacheKey, { 
                            quality: result.quality, 
                            isCamrip: result.isCamrip 
                        }, cardData.id);
                    } else {
                        qualityElement.remove();
                    }
                    done();
                });
            });
        }
        addNextEpisodeInfo(cardElement, cardData);
    }
    function moveCardAgeToPoster(cardElement) {
        try {
            if (!cardElement) return;
            var ageElement = cardElement.querySelector('.card__age, .card-age, .card__year, .year');
            if (!ageElement || ageElement.classList.contains('drxaos-age-moved')) {
                return;
            }
            var posterContainer = cardElement.querySelector('.card__view, .card__poster, .poster, .card__image, .card-image');
            if (!posterContainer) {
                return;
            }
            posterContainer.appendChild(ageElement);
            ageElement.classList.add('drxaos-age-moved');
        } catch (e) {
            logError('Ошибка переноса бейджа года на постер:', e);
        }
    }
    function moveAllCardAges() {
        try {
            var cards = document.querySelectorAll('.card');
            cards.forEach(moveCardAgeToPoster);
        } catch (e) {
            logError('Глобальная синхронизация бейджей года не удалась:', e);
        }
    }
    setTimeout(moveAllCardAges, 200);
    var requestQueue = [];
    var activeRequests = 0;
    var maxConcurrentRequests = 3;
    function processRequestQueue() {
        if (requestQueue.length === 0 || activeRequests >= maxConcurrentRequests) {
            return;
        }
        var request = requestQueue.shift();
        if (request) {
            activeRequests++;
            var timeout = setTimeout(function() {
                activeRequests--;
                processRequestQueue();
            }, 30000);
            requestAnimationFrame(function() {
                try {
                    request.execute(function() {
                        clearTimeout(timeout);
                        activeRequests--;
                        setTimeout(processRequestQueue, 10);
                    });
                } catch (e) {
                    logError('Ошибка при выполнении запроса к TMDB:', e);
                    clearTimeout(timeout);
                    activeRequests--;
                    setTimeout(processRequestQueue, 10);
                }
            });
        }
        if (requestQueue.length > 0 && activeRequests < maxConcurrentRequests) {
            setTimeout(processRequestQueue, 0);
        }
    }
    function queueRequest(executeFn) {
        requestQueue.push({ execute: executeFn });
        processRequestQueue();
    }
    function resetRequestQueue() {
        requestQueue = [];
        activeRequests = 0;
    }
    resetRequestQueue();
    setTimeout(function() {
        if (activeRequests > 0) {
            activeRequests = 0;
            processRequestQueue();
        }
    }, 1000);
    setInterval(function() {
        if (activeRequests > 0 && requestQueue.length > 0) {
            activeRequests = 0;
            processRequestQueue();
        }
    }, 10000);
    function addNextEpisodeInfo(cardElement, cardData) {
        function getDaysLabel(days) {
            var n = Math.abs(days) % 100;
            var n1 = n % 10;
            if (n > 10 && n < 20) return 'дней';
            if (n1 === 1) return 'день';
            if (n1 >= 2 && n1 <= 4) return 'дня';
            return 'дней';
        }
        if (cardElement.hasAttribute('data-next-episode-processed')) {
            return;
        }
        cardElement.setAttribute('data-next-episode-processed', 'true');
		 if (cardData.type !== 'tv') {
        return;
    }
        var realTmdbId = cardData.tmdb_id || cardData.id;
        var tmdbApiKey = Lampa.Storage.get('tmdb_api_key', '');
        if (!tmdbApiKey) {
            return;
        }
        var nextEpisodeElement = document.createElement('div');
        nextEpisodeElement.className = 'card-next-episode';
        nextEpisodeElement.style.cssText = `
            position: absolute;
            bottom: 35px;
            left: 5px;
            background: rgba(0, 0, 0, var(--drxaos-surface-opacity));
            color: white;
            padding: 8px 16px;
            border-radius: 16px;
            font-family: 'Netflix Sans', sans-serif;
            font-size: 16px;
            font-weight: 900;
            z-index: 10;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.95);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            will-change: opacity;
            backface-visibility: hidden;
        `;
        var posterElement = cardElement.querySelector('.card__poster, .card-poster, .poster, .card__image, .card-image');
        if (posterElement) {
            posterElement.style.position = 'relative';
            posterElement.appendChild(nextEpisodeElement);
        } else {
            var viewElement = cardElement.querySelector('.card__view');
            if (viewElement) {
                viewElement.style.position = 'relative';
                viewElement.appendChild(nextEpisodeElement);
            } else {
                cardElement.style.position = 'relative';
                cardElement.appendChild(nextEpisodeElement);
            }
        }

        // ═══ УМНАЯ ВАЛИДАЦИЯ И ПОИСК TMDB ID ═══

        // Проверка: если ID выглядит как Lampac ID (больше 7 цифр), считаем невалидным
        var isValidTmdbId = realTmdbId && 
                           !isNaN(parseInt(realTmdbId)) && 
                           parseInt(realTmdbId) > 0 && 
                           parseInt(realTmdbId) < 10000000 && // TMDB ID обычно < 1млн
                           !(typeof realTmdbId === 'string' && 
                             (realTmdbId.startsWith('unknown') || realTmdbId.startsWith('unknown_')));

        if (!isValidTmdbId) {
            // ID невалидный - пробуем найти через поиск по названию

            var title = cardData.title || cardData.name || cardData.original_name;
            var year = cardData.first_air_date ? new Date(cardData.first_air_date).getFullYear() : 
                      (cardData.year ? cardData.year : null);

            if (title) {
                searchTmdbIdByTitle(title, year, tmdbApiKey, function(foundId) {
                    if (foundId) {
                        // Нашли ID через поиск - используем его
                        realTmdbId = foundId;

                        queueRequest(function(done) {
                            if (cardData.type === 'tv') {
                                fetchNextEpisodeInfo(realTmdbId, tmdbApiKey, function(result) {
                                    if (result && result.nextEpisodeDate) {
                                        var daysUntil = calculateDaysUntil(result.nextEpisodeDate);
                                        if (nextEpisodeElement && nextEpisodeElement.parentNode) {
                                            if (daysUntil > 0) {
                                                nextEpisodeElement.textContent = daysUntil + ' ' + getDaysLabel(daysUntil);
                                            } else if (daysUntil === 0) {
                                                nextEpisodeElement.textContent = 'Сегодня';
                                            } else if (daysUntil === -1) {
                                                nextEpisodeElement.textContent = 'Вчера';
                                            } else {
                                                nextEpisodeElement.textContent = Math.abs(daysUntil) + ' дн. назад';
                                            }
                                        }
                                    } else {
                                        if (nextEpisodeElement && nextEpisodeElement.parentNode) {
                                            nextEpisodeElement.remove();
                                        }
                                    }
                                    done();
                                });
                            } else {
                                done();
                            }
                        });
                    } else {
                        // Не нашли через поиск - удаляем плашку
                        if (nextEpisodeElement && nextEpisodeElement.parentNode) {
                            nextEpisodeElement.remove();
                        }
                    }
                });
            } else {
                // Нет названия для поиска
                if (nextEpisodeElement && nextEpisodeElement.parentNode) {
                    nextEpisodeElement.remove();
                }
            }
            return;
        }

        // ID валидный - используем напрямую

        queueRequest(function(done) {
        if (cardData.type === 'tv') {
            fetchNextEpisodeInfo(realTmdbId, tmdbApiKey, function(result) {
                if (result && result.nextEpisodeDate) {
                    var daysUntil = calculateDaysUntil(result.nextEpisodeDate);
                    if (nextEpisodeElement && nextEpisodeElement.parentNode) {
                    if (daysUntil > 0) {
                        nextEpisodeElement.textContent = daysUntil + ' ' + getDaysLabel(daysUntil);
                    } else if (daysUntil === 0) {
                        nextEpisodeElement.textContent = 'Сегодня';
                    } else {
                        nextEpisodeElement.textContent = 'Вышло';
                    }
                    }
                        done();
                } else {
                    fetchSeriesInfo(realTmdbId, tmdbApiKey, function(seriesResult) {
                        if (seriesResult && seriesResult.lastAirDate) {
                            var daysUntil = calculateDaysUntil(seriesResult.lastAirDate);
                            if (nextEpisodeElement && nextEpisodeElement.parentNode) {
                            if (daysUntil > 0) {
                                nextEpisodeElement.textContent = daysUntil + ' ' + getDaysLabel(daysUntil);
                            } else if (daysUntil === 0) {
                                nextEpisodeElement.textContent = 'Сегодня';
                            } else {
                                nextEpisodeElement.textContent = 'Вышло';
                                }
                            }
                        } else {
                            if (nextEpisodeElement && nextEpisodeElement.parentNode) {
                            nextEpisodeElement.remove();
                        }
                        }
                            done();
                    });
                }
            });
        } else {
            fetchMovieReleaseDate(realTmdbId, tmdbApiKey, function(result) {
                if (result && result.releaseDate) {
                    var daysUntil = calculateDaysUntil(result.releaseDate);
                    if (nextEpisodeElement && nextEpisodeElement.parentNode) {
                    if (daysUntil > 0) {
                        nextEpisodeElement.textContent = daysUntil + ' ' + getDaysLabel(daysUntil);
                    } else if (daysUntil === 0) {
                        nextEpisodeElement.textContent = 'Сегодня';
                    } else {
                        nextEpisodeElement.textContent = 'Вышло';
                        }
                    }
                } else {
                    if (nextEpisodeElement && nextEpisodeElement.parentNode) {
                    nextEpisodeElement.remove();
                }
                }
                    done();
            });
        }
        });
    }
    function fetchSeriesInfo(tmdbId, apiKey, callback) {
        if (!tmdbId || (typeof tmdbId === 'string' && tmdbId.startsWith('unknown_')) || isNaN(parseInt(tmdbId))) {
            callback(null);
            return;
        }
        var url = 'https://api.themoviedb.org/3/tv/' + tmdbId + '?api_key=' + apiKey + '&language=ru';
        fetch(url)
            .then(function(response) {
                if (!response.ok) throw new Error('HTTP error');
                return response.json();
            })
            .then(function(data) {
                        if (data.last_air_date) {
                            callback({ lastAirDate: data.last_air_date });
                        } else if (data.first_air_date) {
                            callback({ lastAirDate: data.first_air_date });
                        } else {
                            callback(null);
                        }
            })
            .catch(function() {
                        callback(null);
            });
    }
    function fetchMovieReleaseDate(tmdbId, apiKey, callback) {
        if (!tmdbId || (typeof tmdbId === 'string' && tmdbId.startsWith('unknown_')) || isNaN(parseInt(tmdbId))) {
            callback(null);
            return;
        }
        var url = 'https://api.themoviedb.org/3/movie/' + tmdbId + '?api_key=' + apiKey + '&language=ru';
        fetch(url)
            .then(function(response) {
                if (!response.ok) throw new Error('HTTP error');
                return response.json();
            })
            .then(function(data) {
                        if (data.release_date) {
                            callback({ releaseDate: data.release_date });
                        } else {
                            callback(null);
                        }
            })
            .catch(function() {
                        callback(null);
            });
    }
    // ═══ ПОИСК TMDB ID ПО НАЗВАНИЮ (ФОЛБЭК) ═══
    function searchTmdbIdByTitle(title, year, apiKey, callback) {
        if (!title || !apiKey) {
            callback(null);
            return;
        }

        // Очищаем название от лишних символов
        var cleanTitle = title.replace(/[\[\]()]/g, '').trim();
        var searchUrl = 'https://api.themoviedb.org/3/search/tv?api_key=' + apiKey + 
                       '&language=ru&query=' + encodeURIComponent(cleanTitle);

        if (year) {
            searchUrl += '&first_air_date_year=' + year;
        }


        fetch(searchUrl)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('TMDB Search API error: ' + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                if (data.results && data.results.length > 0) {
                    var foundId = data.results[0].id;
                    callback(foundId);
                } else {
                    callback(null);
                }
            })
            .catch(function(error) {
                callback(null);
            });
    }

    function fetchNextEpisodeInfo(tmdbId, apiKey, callback) {
        if (!tmdbId || (typeof tmdbId === 'string' && tmdbId.startsWith('unknown_')) || isNaN(parseInt(tmdbId))) {
            callback(null);
            return;
        }
        var url = 'https://api.themoviedb.org/3/tv/' + tmdbId + '?api_key=' + apiKey + '&language=ru';
        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('TMDB API error: ' + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                if (data.next_episode_to_air) {
                    callback({
                        nextEpisodeDate: data.next_episode_to_air.air_date,
                        episodeNumber: data.next_episode_to_air.episode_number,
                        seasonNumber: data.next_episode_to_air.season_number
                    });
                } else {
                    callback(null);
                }
            })
            .catch(function(error) {
                callback(null);
            });
    }
    function calculateDaysUntil(dateString) {
        var targetDate = new Date(dateString);
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        targetDate.setHours(0, 0, 0, 0);
        var diffTime = targetDate.getTime() - today.getTime();
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
    function initCardListener() {
        if (window.drxaos_card_listener_initialized) {
            return;
        }
        
        // Проверка версии Lampa
        var isLampa3 = window.Lampa && window.Lampa.Manifest && window.Lampa.Manifest.app_digital >= 300;
        
        if (!window.Lampa) {
            setTimeout(initCardListener, 100);
            return;
        }
        
        // Для Lampa 3.0+ используем модульную систему
        if (isLampa3) {
            // В Lampa 3.0 используется событийная система через Lampa.Listener
            // Карточки создаются через Lampa.Maker, события автоматически доступны
            window.drxaos_card_listener_initialized = true;
            log('Lampa 3.0+ detected, using new event system');
            return;
        }
        
        // Для старых версий используем старый метод
        if (!window.Lampa.Card || !window.Lampa.Card.prototype) {
            setTimeout(initCardListener, 100);
            return;
        }
        
        window.drxaos_card_listener_initialized = true;
        Object.defineProperty(window.Lampa.Card.prototype, 'build', {
            get: function() {
                return this._build;
            },
            set: function(value) {
                this._build = function() {
                    value.apply(this);
                    Lampa.Listener.send('card', {
                        type: 'build',
                        object: this
                    });
                }.bind(this);
            }
        });
    }
    initCardListener();
    Lampa.Listener.follow('card', function(event) {
        if (event.type === 'build' && event.object && event.object.card && event.object.data) {
            var cardElement = null;
            if (event.object.card instanceof jQuery || event.object.card.jquery) {
                cardElement = event.object.card[0];
            } else if (event.object.card instanceof HTMLElement) {
                cardElement = event.object.card;
            } else if (typeof event.object.card === 'object' && event.object.card.nodeType === 1) {
                cardElement = event.object.card;
            }
            var cardData = event.object.data;
            if (cardElement && cardData) {
                var normalizedData = {
                    id: cardData.id,
                    tmdb_id: cardData.id,
                    title: cardData.title || cardData.name || '',
                    original_title: cardData.original_title || cardData.original_name || '',
                    type: cardData.name ? 'tv' : 'movie',
                    release_date: cardData.release_date || cardData.first_air_date || ''
                };
                cardDataStorage.set(cardElement, normalizedData);
            }
        }
    });
    if (window.drxaosGlobalObserver) {
        window.drxaosQualityHandler = function(mutations) {
            var hasNewCards = false;
            for (var i = 0; i < mutations.length; i++) {
                var mutation = mutations[i];
                if (mutation.type === 'childList') {
                    var addedNodes = mutation.addedNodes;
                    for (var j = 0; j < addedNodes.length; j++) {
                        var node = addedNodes[j];
                        if (node.nodeType === 1) {
                            if (node.classList && node.classList.contains('card')) {
                                hasNewCards = true;
                            } else if (node.querySelector && node.querySelector('.card')) {
                                hasNewCards = true;
                            }
                        }
                    }
                }
            }
            if (hasNewCards) {
                setTimeout(processAllCards, 100);
                setTimeout(moveAllCardAges, 150);
            }
        };
    } else {
        var observer = new MutationObserver(function(mutations) {
            var hasNewCards = false;
            for (var i = 0; i < mutations.length; i++) {
                var mutation = mutations[i];
                if (mutation.type === 'childList') {
                    var addedNodes = mutation.addedNodes;
                    for (var j = 0; j < addedNodes.length; j++) {
                        var node = addedNodes[j];
                        if (node.nodeType === 1) {
                            if (node.classList && node.classList.contains('card')) {
                                hasNewCards = true;
                            } else if (node.querySelector && node.querySelector('.card')) {
                                hasNewCards = true;
                            }
                        }
                    }
                }
            }
            if (hasNewCards) {
                setTimeout(processAllCards, 100);
                setTimeout(moveAllCardAges, 150);
            }
        });
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    }
    setTimeout(processAllCards, 100);
}
function openApiKeyInput(paramName, title, placeholder) {
    var existingModal = document.querySelector('.drxaos-api-modal');
    if (existingModal) {
        existingModal.remove();
    }
    var modal = document.createElement('div');
    modal.className = 'drxaos-api-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, var(--drxaos-surface-opacity));
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    modal.innerHTML = `
        <div style="
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 20px;
            min-width: 300px;
            max-width: 500px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
        ">
            <h3 style="
                color: #fff;
                margin: 0 0 15px 0;
                font-size: 16px;
                font-weight: 500;
            ">${title}</h3>
            <input type="text" id="api-key-input" placeholder="${placeholder}" style="
                width: 100%;
                padding: 10px;
                border: 1px solid #444;
                border-radius: 4px;
                background: #2a2a2a;
                color: #fff;
                font-size: 14px;
                box-sizing: border-box;
                margin-bottom: 15px;
            " />
            <div style="
                display: flex;
                gap: 10px;
                justify-content: flex-end;
            ">
                <button id="save-api-btn" style="
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                ">Сохранить</button>
                <button id="cancel-api-btn" style="
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                ">Отмена</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    var input = document.getElementById('api-key-input');
    var saveBtn = document.getElementById('save-api-btn');
    var cancelBtn = document.getElementById('cancel-api-btn');
    setTimeout(function() {
        if (input) {
            input.focus();
            input.select();
        }
    }, 100);
    saveBtn.onclick = function() {
        var value = input.value.trim();
        if (value) {
            Lampa.Storage.set(paramName, value);
            if (Lampa.Noty) {
                Lampa.Noty.show('✅ ' + title + ' сохранен!');
            }
            closeApiKeyModal();
            if (paramName === 'tmdb_api_key') {
                applySeasonInfo();
            } else if (paramName === 'jacred_url') {
                applyMovieQuality();
            }
        } else {
            if (Lampa.Noty) {
                Lampa.Noty.show('⚠️ Поле не может быть пустым!');
            }
        }
    };
    cancelBtn.onclick = closeApiKeyModal;
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeApiKeyModal();
        }
    };
    var handleEscape = function(e) {
        if (e.key === 'Escape') {
            closeApiKeyModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    input.onkeydown = function(e) {
        if (e.key === 'Enter') {
            saveBtn.click();
        }
    };
}
function closeApiKeyModal() {
    var modal = document.querySelector('.drxaos-api-modal');
    if (modal) {
        modal.remove();
    }
}
window.openApiKeyInput = openApiKeyInput;
window.closeApiKeyModal = closeApiKeyModal;
function initDrxaosGlobalObserver() {
    if (window.drxaosGlobalObserver) return;
    var observerThrottle = null;
    var pendingMutations = [];
    function processMutations() {
        if (pendingMutations.length === 0) return;
        var mutations = pendingMutations.slice();
        pendingMutations = [];
        if (window.drxaosQualityHandler) {
            requestAnimationFrame(function() {
                window.drxaosQualityHandler(mutations);
            });
        }
        if (window.drxaosLabelsHandler) {
            requestAnimationFrame(function() {
                window.drxaosLabelsHandler(mutations);
            });
        }
        if (window.drxaosSeasonHandler) {
            requestAnimationFrame(function() {
                window.drxaosSeasonHandler(mutations);
            });
        }
    }
    window.drxaosGlobalObserver = new MutationObserver(function(mutations) {
        pendingMutations.push.apply(pendingMutations, mutations);
        if (!observerThrottle) {
            observerThrottle = setTimeout(function() {
                observerThrottle = null;
                processMutations();
            }, 100);
        }
    });
    window.drxaosGlobalObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}
function startPlugin() {
    try {
        console.log('DrXAOS Themes Plugin - unified initialization');
initDrxaosGlobalObserver();
renderingOptimizer.applyOptimizations();
setTimeout(function() {
    renderingOptimizer.fixDeprecatedSliders();
}, 1000);
var dynamicObserver = renderingOptimizer.setupDynamicElementObserver();

addSettings();

var theme = Lampa.Storage.get('drxaos_theme', 'darkred');
applyTheme(theme);
applyAdvancedSettings();
applyFullButtons();
if (window.requestIdleCallback) {
    requestIdleCallback(function() {
        applySeasonInfo();
        applySourceFilter();
        applyMovieQuality();
    }, { timeout: 2000 });
} else {
    setTimeout(function() {
        applySeasonInfo();
        applySourceFilter();
        applyMovieQuality();
    }, 1000);
}
addQuickThemeButton();
reorderButtons();
flattenWatchButtons();
pinSettingsComponentTop();
Lampa.Listener.follow('full', function(e) {
if (e.type === 'complite') {
setTimeout(function() {
    reorderButtons();
    flattenWatchButtons();
}, 300);
}
});
    } catch(e) {
    }
}
if (window.appready) {
    try {
        startPlugin();
    } catch(e) {
    }
} else {
    try {
Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') {
                try {
                    startPlugin();
                } catch(e) {
                }
            }
        });
    } catch(e) {
    }
}
    if (window.Lampa) {
        try {
        $(document).ready(function() {
            setTimeout(function() {
                    try {
                applyAdvancedSettings();
                        var theme = Lampa.Storage.get('drxaos_theme', 'darkred');
                        applyTheme(theme);
                    } catch(e) {
                    }
            }, 1000);
        });
        } catch(e) {
        }
    }
    $(document).on('keydown.drxaosGlobalEsc', function(e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            var $modal = $('.drxaos-quick-theme-modal');
            if ($modal.length > 0 && $modal.is(':visible')) {
                $modal.fadeOut(200, function() {
                    $modal.remove();
                });
                if (document.activeElement && document.activeElement.blur) {
                    document.activeElement.blur();
                }
                setTimeout(function() {
                    var $btn = $('#drxaos-quick-theme-btn');
                    if ($btn.length) {
                        $btn.focus();
                    }
                }, 300);
            }
        }
    });
    setTimeout(function() {
        var filterButtonCSS = `
            div.simple-button.simple-button--filter.filter--filter.selector {
                background: rgba(var(--bg-rgb, 12, 12, 12), var(--drxaos-surface-opacity)) !important;
                border: 2px solid rgba(var(--primary-rgb), 1) !important;
                border-radius: 2em !important;
                color: var(--text-main) !important;
                font-family: var(--font-family) !important;
                font-size: 1em !important;
                padding: 0.8em 1.5em !important;
                margin: 0.3em !important;
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important, opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
                display: flex !important;
                align-items: center !important;
                gap: 0.5em !important;
                min-height: 2.5em !important;
            }
            div.simple-button.simple-button--filter.filter--filter.selector:hover {
                background: rgba(var(--primary-rgb), var(--drxaos-surface-opacity)) !important;
                border: 2px solid rgba(var(--secondary-rgb), 1) !important;
                border-radius: 2.5em !important;
                color: var(--text-main) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
                transform: scale(1.02) !important;
            }
            div.simple-button.simple-button--filter.filter--filter.selector.focus {
                background: rgba(var(--secondary-rgb), var(--drxaos-surface-opacity)) !important;
                border: 2px solid rgba(var(--primary-rgb), 1) !important;
                border-radius: 2.5em !important;
                color: var(--text-main) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
                transform: scale(1.02) !important;
            }
            .modal .simple-button,
            .modal .selector,
            .modal .menu__item,
            .modal .settings-param {
                border: 1px solid var(--theme-primary, #5a3494) !important;
                margin: 0.3em !important;
                padding: 0.8em 1em !important;
                min-height: auto !important;
                display: block !important;
                transition: transform 0.3s ease !important, opacity 0.3s ease !important;
            }
.modal .simple-button:hover,
.modal .selector:hover,
.modal .menu__item:hover,
.modal .settings-param:hover {
    border: 1px solid var(--theme-accent, #0088bb) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
}
        `;
        var style = document.createElement('style');
        style.id = 'drxaos-filter-button-fix';
        style.textContent = filterButtonCSS;
        document.head.appendChild(style);
        setTimeout(function() {
            var filterButtons = document.querySelectorAll('div.simple-button.simple-button--filter.filter--filter.selector');
            filterButtons.forEach(function(button) {
                if (button) {
                    button.style.setProperty('background', 'rgba(var(--bg-rgb, 12, 12, 12), var(--drxaos-surface-opacity))', 'important');
                    button.style.setProperty('border', '2px solid rgba(var(--primary-rgb), 1)', 'important');
                    button.style.setProperty('border-radius', '2em', 'important');
                    button.style.setProperty('color', 'var(--text-main, #ffffff)', 'important');
                    button.style.setProperty('font-family', 'var(--font-family)', 'important');
                    button.style.setProperty('font-size', '0.9em', 'important');
                    button.style.setProperty('padding', '0.8em 1.5em', 'important');
                    button.style.setProperty('margin', '0.3em', 'important');
                    button.style.setProperty('transition', 'all 0.3s ease', 'important');
                    button.style.setProperty('backdrop-filter', 'blur(20px) saturate(180%)', 'important');
                    button.style.setProperty('-webkit-backdrop-filter', 'blur(20px) saturate(180%)', 'important');
                    button.style.setProperty('box-shadow', '0 4px 12px rgba(0, 0, 0, var(--drxaos-surface-opacity))', 'important');
                    button.style.setProperty('display', 'flex', 'important');
                    button.style.setProperty('align-items', 'center', 'important');
                    button.style.setProperty('gap', '0.5em', 'important');
                    button.style.setProperty('min-height', '2.5em', 'important');
                }
            });
        }, 1500);
    }, 1000);
    (function() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                            if (node.classList && node.classList.contains('torrent-serial')) {
                                applyTorrentSerialStyles(node);
                            }
                            var torrentSerials = node.querySelectorAll && node.querySelectorAll('.torrent-serial');
                            if (torrentSerials && torrentSerials.length > 0) {
                                torrentSerials.forEach(function(item) {
                                    applyTorrentSerialStyles(item);
                                });
                            }
                            if (node.classList && node.classList.contains('selectbox-item')) {
                                applySelectboxStyles(node);
                            }
                            var selectboxItems = node.querySelectorAll && node.querySelectorAll('.selectbox-item');
                            if (selectboxItems && selectboxItems.length > 0) {
                                selectboxItems.forEach(function(item) {
                                    applySelectboxStyles(item);
                                });
                            }
                        }
                    });
                }
            });
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
            function applyTorrentSerialStyles(item) {
                item.style.setProperty('display', 'flex', 'important');
                item.style.setProperty('flex-direction', 'row', 'important');
                item.style.setProperty('align-items', 'flex-start', 'important');
                item.style.setProperty('gap', '1em', 'important');
                item.style.setProperty('background', 'rgba(255, 255, 255, 0.03)', 'important');
                item.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.95)', 'important');
                item.style.setProperty('border-radius', '0.5em', 'important');
                item.style.setProperty('padding', '1em', 'important');
                item.style.setProperty('margin', '0.5em 0', 'important');
                item.style.setProperty('min-height', '140px', 'important');
                item.style.setProperty('transition', 'all 0.2s ease', 'important');
                var poster = item.querySelector('.torrent-serial__img');
                if (poster) {
                    poster.style.setProperty('width', '80px', 'important');
                    poster.style.setProperty('height', '120px', 'important');
                    poster.style.setProperty('object-fit', 'cover', 'important');
                    poster.style.setProperty('border-radius', '0.3em', 'important');
                    poster.style.setProperty('flex-shrink', '0', 'important');
                }
                var content = item.querySelector('.torrent-serial__content');
                if (content) {
                    content.style.setProperty('flex', '1', 'important');
                    content.style.setProperty('padding', '0', 'important');
                    content.style.setProperty('min-width', '0', 'important');
                }
                var sections = item.querySelectorAll('.torrent-files, .tracks-metainfo');
                sections.forEach(function(section) {
                    section.style.setProperty('margin-top', '0.5em', 'important');
                    section.style.setProperty('padding', '0', 'important');
                    section.style.setProperty('background', 'transparent', 'important');
                    section.style.setProperty('border', 'none', 'important');
                    section.style.setProperty('border-radius', '0', 'important');
                });
                var audioItems = item.querySelectorAll('.tracks-metainfo__item');
                audioItems.forEach(function(audioItem) {
                    audioItem.style.setProperty('display', 'flex', 'important');
                    audioItem.style.setProperty('flex-direction', 'row', 'important');
                    audioItem.style.setProperty('flex-wrap', 'nowrap', 'important');
                    audioItem.style.setProperty('align-items', 'center', 'important');
                    audioItem.style.setProperty('gap', '0.3em', 'important');
                    audioItem.style.setProperty('padding', '0.4em 0.6em', 'important');
                    audioItem.style.setProperty('margin', '0', 'important');
                    audioItem.style.setProperty('font-size', '0.9em', 'important');
                    audioItem.style.setProperty('background', 'transparent', 'important');
                    audioItem.style.setProperty('border', 'none', 'important');
                    audioItem.style.setProperty('border-bottom', '1px solid rgba(255, 255, 255, 0.05)', 'important');
                    audioItem.style.setProperty('border-radius', '0', 'important');
                    audioItem.style.setProperty('min-height', '2em', 'important');
                    audioItem.style.setProperty('max-height', '3em', 'important');
                    audioItem.style.setProperty('overflow', 'hidden', 'important');
                    var columns = audioItem.querySelectorAll('[class*="tracks-metainfo__column"]');
                    columns.forEach(function(col) {
                        col.style.setProperty('display', 'inline-block', 'important');
                        col.style.setProperty('padding', '0.2em 0.4em', 'important');
                        col.style.setProperty('margin', '0', 'important');
                        col.style.setProperty('font-size', '0.85em', 'important');
                        col.style.setProperty('white-space', 'nowrap', 'important');
                        col.style.setProperty('background', 'rgba(255, 255, 255, 0.05)', 'important');
                        col.style.setProperty('border-radius', '0.2em', 'important');
                        col.style.setProperty('flex-shrink', '0', 'important');
                    });
                });
            var lines = item.querySelectorAll('.tracks-metainfo__line');
            lines.forEach(function(line) {
                line.style.setProperty('display', 'flex', 'important');
                line.style.setProperty('align-items', 'center', 'important');
                line.style.setProperty('gap', '0.5em', 'important');
                line.style.setProperty('padding', '0.4em 0.6em', 'important');
                line.style.setProperty('margin', '0.2em 0', 'important');
                line.style.setProperty('font-size', '0.9em', 'important');
                line.style.setProperty('background', 'transparent', 'important');
                line.style.setProperty('border', 'none', 'important');
                line.style.setProperty('border-bottom', '1px solid rgba(255, 255, 255, 0.05)', 'important');
                line.style.setProperty('border-radius', '0', 'important');
            });
            var scrollBody = item.querySelector('.scroll__body');
            if (scrollBody) {
                scrollBody.style.setProperty('padding', '0', 'important');
            }
            var sectionTitles = item.querySelectorAll('.torrent-files__title, .tracks-metainfo__title');
            sectionTitles.forEach(function(title) {
                title.style.setProperty('font-size', '1em', 'important');
                title.style.setProperty('padding', '0.5em 0', 'important');
                title.style.setProperty('margin', '0', 'important');
                title.style.setProperty('opacity', '0.7', 'important');
            });
        }
        function applySelectboxStyles(item) {
            var poster = item.querySelector('.selectbox-item__poster');
            if (poster) {
                poster.style.setProperty('display', 'none', 'important');
            }
            var icon = item.querySelector('.selectbox-item__icon');
            if (icon) {
                icon.style.setProperty('display', 'none', 'important');
            }
            item.style.setProperty('background', 'transparent', 'important');
            item.style.setProperty('border', 'none', 'important');
            item.style.setProperty('border-bottom', '1px solid rgba(255, 255, 255, 0.95)', 'important');
            item.style.setProperty('border-radius', '0', 'important');
            item.style.setProperty('padding', '0.8em 1em', 'important');
            item.style.setProperty('margin', '0', 'important');
            var title = item.querySelector('.selectbox-item__title');
            if (title) {
                title.style.setProperty('font-size', '1.1em', 'important');
                title.style.setProperty('line-height', '1.3', 'important');
                title.style.setProperty('padding', '0', 'important');
            }
            var subtitle = item.querySelector('.selectbox-item__subtitle');
            if (subtitle) {
                subtitle.style.setProperty('font-size', '0.995em', 'important');
                subtitle.style.setProperty('margin-top', '0.3em', 'important');
                subtitle.style.setProperty('opacity', '0.7', 'important');
            }
        }
        var existingSerials = document.querySelectorAll('.torrent-serial');
        existingSerials.forEach(function(item) {
            applyTorrentSerialStyles(item);
        });
        var existingItems = document.querySelectorAll('.selectbox-item');
        existingItems.forEach(function(item) {
            applySelectboxStyles(item);
        });
        if (typeof MutationObserver !== 'undefined') {
            var tracksObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        var item = mutation.target;
                        if (item.classList.contains('tracks-metainfo__item') && 
                            item.style.flexWrap !== 'nowrap') {
                            item.style.setProperty('flex-wrap', 'nowrap', 'important');
                        }
                    }
                });
            });
            tracksObserver.observe(document.body, {
                attributes: true,
                attributeFilter: ['style'],
                subtree: true,
                attributeOldValue: false
            });
            console.log('[DRXAOS] MutationObserver активирован для tracks.js совместимости');
        } else {
            console.warn('[DRXAOS] MutationObserver не поддерживается, используется setInterval');
        setInterval(function() {
            var allAudioItems = document.querySelectorAll('.tracks-metainfo__item');
            allAudioItems.forEach(function(audioItem) {
                if (audioItem.style.flexWrap !== 'nowrap') {
                    audioItem.style.setProperty('flex-wrap', 'nowrap', 'important');
                }
            });
            }, 100);
        }
    })();
function applyModalOpacity() {
    var opacity = 0.995;
    document.documentElement.style.setProperty('--modal-opacity', opacity);
}
Lampa.Storage.listener.follow('change', function(e) {});
Lampa.Listener.follow('activity', function(e) {
    if (e.type === 'start') {
        setTimeout(applyModalOpacity, 300);
    }
});
Lampa.Listener.follow('activity', function(e) {
    if (e.type === 'start') {
        setTimeout(function() {
            applyButtonIcons();
        }, 500);
    }
});
setTimeout(applyModalOpacity, 500);

    // ╔════════════════════════════════════════════════════════════════════════╗
    // ║                    🛠️ UTILITIES BUTTON MODULE 🛠️                      ║
    // ║  Современный модуль утилит с чистой архитектурой                       ║
    // ╚════════════════════════════════════════════════════════════════════════╝
    
    (function initUtilitiesButton() {
        if (!CONFIG.FEATURES.UTILITIES_BUTTON) return;
        
        var UtilitiesButton = {
            elements: {
                button: null,
                menu: null
            },
            
            state: {
                isMenuOpen: false,
                isEnabled: false,
                controllerActive: false,
                backHandlerAttached: false
            },
            
            icons: {
                utilities: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" fill="currentColor"><path d="m0,12.402,35.687-4.8602,0.0156,34.423-35.67,0.20313zm35.67,33.529,0.0277,34.453-35.67-4.9041-0.002-29.78zm4.3261-39.025,47.318-6.906,0,41.527-47.318,0.37565zm47.329,39.349-0.0111,41.34-47.318-6.6784-0.0663-34.739z"/></svg>'
            },
            
            templates: {
                button: function() {
                    return '<div id="drxaos-utils-btn" class="head__action selector" style="position:relative;">' +
                           '  <div class="utils-icon" style="width:1.5em;height:1.5em;display:flex;align-items:center;justify-content:center;">' + UtilitiesButton.icons.utilities + '</div>' +
                           '</div>';
                },
                
                menu: function() {
                    return '<div id="drxaos-utils-menu" class="drxaos-utils-menu selector" style="display:none;">' +
                           '  <div class="utils-menu-item selector" data-action="reload" tabindex="0">' +
                           '    <span class="utils-menu-icon">🔄</span>' +
                           '    <span class="utils-menu-text">Перезагрузка</span>' +
                           '  </div>' +
                           '  <div class="utils-menu-item selector" data-action="console" tabindex="0">' +
                           '    <span class="utils-menu-icon">💻</span>' +
                           '    <span class="utils-menu-text">Консоль</span>' +
                           '  </div>' +
                           '  <div class="utils-menu-item selector" data-action="exit" tabindex="0">' +
                           '    <span class="utils-menu-icon">❌</span>' +
                           '    <span class="utils-menu-text">Выход</span>' +
                           '  </div>' +
                           '</div>';
                },
                
                styles: function() {
                    return '<style id="drxaos-utils-styles">' +
                           '#drxaos-utils-btn { transition: transform 0.3s ease, opacity 0.3s ease; cursor: pointer !important; }' +
                           '#drxaos-utils-btn:hover { transform: scale(1.15); }' +
                           '#drxaos-utils-btn.focus { transform: scale(1.15); }' +
                           '#drxaos-utils-btn .utils-icon { width: 1.5em; height: 1.5em; display: flex; align-items: center; justify-content: center; }' +
                           '#drxaos-utils-btn .utils-icon svg { width: 100%; height: 100%; fill: currentColor; filter: drop-shadow(0 0 4px var(--theme-primary, #5a3494)); }' +
                           '#drxaos-utils-btn:hover .utils-icon svg, #drxaos-utils-btn.focus .utils-icon svg { filter: drop-shadow(0 0 8px var(--theme-primary, #5a3494)); }' +
                           '.drxaos-utils-menu {' +
                           '  position: absolute;' +
                           '  top: calc(100% + 0.5em);' +
                           '  right: 0;' +
                           '  background: rgba(0, 0, 0, var(--drxaos-surface-opacity));' +
                           '  ' +
                           '  border: 2px solid var(--theme-primary, #5a3494);' +
                           '  border-radius: 0.8em;' +
                           '  padding: 0.5em;' +
                           '  min-width: 14em;' +
                           '  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);' +
                           '  z-index: 10000;' +
                           '  animation: fadeInDown 0.3s ease;' +
                           '}' +
                           '@keyframes fadeInDown {' +
                           '  from { opacity: 0; transform: translateY(-10px); }' +
                           '  to { opacity: 1; transform: translateY(0); }' +
                           '}' +
                           '.utils-menu-item {' +
                           '  display: flex;' +
                           '  align-items: center;' +
                           '  padding: 0.8em 1em;' +
                           '  border-radius: 0.5em;' +
                           '  cursor: pointer;' +
                           '  transition: transform 0.2s ease, opacity 0.2s ease;' +
                           '  gap: 0.8em;' +
                           '  background: transparent;' +
                           '  color: #ffffff;' +
                           '}' +
                           '.utils-menu-item:hover, .utils-menu-item.focus, .utils-menu-item:focus {' +
                           '  background: var(--theme-primary, #5a3494) !important;' +
                           '  color: #ffffff !important;' +
                           '  transform: translateX(4px);' +
                           '  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);' +
                           '  outline: none;' +
                           '}' +
                           '.utils-menu-icon {' +
                           '  font-size: 1.8em;' +
                           '  line-height: 1;' +
                           '  display: flex;' +
                           '  align-items: center;' +
                           '  justify-content: center;' +
                           '  flex-shrink: 0;' +
                           '}' +
                           '.utils-menu-text {' +
                           '  font-size: 1.1em;' +
                           '  font-weight: 500;' +
                           '  white-space: nowrap;' +
                           '  color: inherit;' +
                           '}' +
                           '</style>';
                }
            },
            
            actions: {
                reload: function() {
                    log('Utilities: Перезагрузка...');
                    location.reload();
                },
                
                console: function() {
                    log('Utilities: Открытие консоли...');
                    if (window.Lampa && window.Lampa.Controller) {
                        Lampa.Controller.toggle('console');
                    }
                },
                
                exit: function() {
                    log('Utilities: Выход из приложения...');
                    
                    if (window.Lampa && window.Lampa.Activity) {
                        Lampa.Activity.out();
                    }
                    
                    setTimeout(function() {
                        if (window.Lampa && window.Lampa.Platform) {
                            if (Lampa.Platform.is('tizen')) {
                                try { tizen.application.getCurrentApplication().exit(); } catch(e) {}
                            } else if (Lampa.Platform.is('webos')) {
                                try { window.close(); } catch(e) {}
                            } else if (Lampa.Platform.is('android')) {
                                try { Lampa.Android.exit(); } catch(e) {}
                            } else if (Lampa.Platform.is('orsay')) {
                                try { Lampa.Orsay.exit(); } catch(e) {}
                            }
                        }
                        
                        try { window.close(); } catch(e) {}
                    }, 100);
                }
            },
            
            openMenu: function() {
                if (!UtilitiesButton.elements.menu) return;
                $(UtilitiesButton.elements.menu).show();
                UtilitiesButton.state.isMenuOpen = true;
                UtilitiesButton.focusFirstMenuItem();
            },
            
            toggleMenu: function() {
                if (!UtilitiesButton.elements.menu) return;
                
                if (UtilitiesButton.state.isMenuOpen) {
                    UtilitiesButton.closeMenu();
                } else {
                    UtilitiesButton.openMenu();
                }
            },
            
            closeMenu: function(restoreFocus) {
                if (UtilitiesButton.elements.menu) {
                    $(UtilitiesButton.elements.menu).hide();
                    UtilitiesButton.state.isMenuOpen = false;
                    UtilitiesButton.state.controllerActive = false;
                }
                if (restoreFocus !== false) {
                    UtilitiesButton.restoreFocusToButton();
                }
            },
            
            focusFirstMenuItem: function() {
                if (!UtilitiesButton.elements.menu) return;
                var $menu = $(UtilitiesButton.elements.menu);
                var $items = $menu.find('.utils-menu-item');
                
                if (window.Lampa && window.Lampa.Controller) {
                    if (typeof Lampa.Controller.collectionSet === 'function') {
                        Lampa.Controller.collectionSet($menu);
                    }
                    UtilitiesButton.state.controllerActive = true;
                    var focusTarget = $items.eq(0);
                    setTimeout(function() {
                        if (!focusTarget.length) return;
                        var targetNode = focusTarget.get(0);
                        if (!targetNode) return;
                        if (typeof Lampa.Controller.collectionFocus === 'function') {
                            Lampa.Controller.collectionFocus(targetNode, $menu);
                        } else if (typeof Lampa.Controller.focus === 'function') {
                            Lampa.Controller.focus(targetNode);
                        } else {
                            targetNode.focus();
                        }
                    }, 50);
                } else if ($items.length) {
                    $items.get(0).focus();
                }
            },
            
            restoreFocusToButton: function() {
                if (!UtilitiesButton.elements.button) return;
                if (window.Lampa && window.Lampa.Controller && typeof Lampa.Controller.focus === 'function') {
                    setTimeout(function() {
                        Lampa.Controller.focus(UtilitiesButton.elements.button);
                    }, 30);
                } else {
                    UtilitiesButton.elements.button.focus();
                }
            },
            
            handleMenuItemAction: function(action) {
                UtilitiesButton.closeMenu();
                
                if (UtilitiesButton.actions[action]) {
                    setTimeout(function() {
                        UtilitiesButton.actions[action]();
                    }, 100);
                }
            },
            
            handleBack: function() {
                if (UtilitiesButton.state.isMenuOpen) {
                    UtilitiesButton.closeMenu();
                    return false;
                }
                return true;
            },
            
            registerBackHandler: function() {
                if (UtilitiesButton.state.backHandlerAttached) return;
                if (window.Lampa && window.Lampa.Listener) {
                    Lampa.Listener.follow('back', UtilitiesButton.handleBack);
                    UtilitiesButton.state.backHandlerAttached = true;
                }
            },
            
            bindEvents: function() {
                if (!UtilitiesButton.elements.button) return;
                
                var $btn = $(UtilitiesButton.elements.button);
                
                               
                $btn.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var $menu = $('#drxaos-utils-menu');
                    var isVisible = $menu.is(':visible');

                    var toggleBackTarget = 'head';
                    if (!(window.Lampa && Lampa.Controller && Lampa.Controller.enabled && Lampa.Controller.enabled().name === 'head')) {
                        toggleBackTarget = 'content';
                    }

                    if (isVisible) {
                        $menu.hide();
                        UtilitiesButton.state.isMenuOpen = false;
                        if (window.Lampa && Lampa.Controller) {
                            Lampa.Controller.toggle(toggleBackTarget);
                        }
                    } else {
                        $menu.show();
                        UtilitiesButton.state.isMenuOpen = true;

                        if (window.Lampa && Lampa.Controller) {
                            var utilsController = {
                                toggle: function() {},
                                render: function() { return $menu; },
                                back: function() {
                                    $menu.hide();
                                    UtilitiesButton.state.isMenuOpen = false;
                                    Lampa.Controller.toggle(toggleBackTarget);
                                },
                                left: function() { this.back(); },
                                right: function() { this.back(); },
                                up: function() {
                                    var $items = $('.utils-menu-item');
                                    var $focused = $items.filter('.focus');
                                    if (!$focused.length) { $items.first().addClass('focus').focus(); return; }
                                    var idx = $items.index($focused);
                                    if (idx > 0) { $focused.removeClass('focus'); $items.eq(idx - 1).addClass('focus').focus(); }
                                },
                                down: function() {
                                    var $items = $('.utils-menu-item');
                                    var $focused = $items.filter('.focus');
                                    if (!$focused.length) { $items.first().addClass('focus').focus(); return; }
                                    var idx = $items.index($focused);
                                    if (idx < $items.length - 1) { $focused.removeClass('focus'); $items.eq(idx + 1).addClass('focus').focus(); }
                                },
                                enter: function() {
                                    var $focused = $('.utils-menu-item.focus');
                                    if (!$focused.length) return;
                                    var action = $focused.data('action');
                                    $menu.hide();
                                    UtilitiesButton.state.isMenuOpen = false;
                                    if (action && UtilitiesButton.actions[action]) setTimeout(function() { UtilitiesButton.actions[action](); }, 100);
                                    Lampa.Controller.toggle(toggleBackTarget);
                                }
                            };

                            Lampa.Controller.add('drxaos_utils_modal', utilsController);
                            if (typeof Lampa.Controller.collectionSet === 'function') {
                                Lampa.Controller.collectionSet($menu);
                            }
                            Lampa.Controller.toggle('drxaos_utils_modal');
                        }

                        setTimeout(function() {
                            var $firstItem = $('.utils-menu-item').first();
                            $firstItem.addClass('focus').focus();
                        }, 60);
                    }
                    return false;
                });

                // Поддержка пульта: наводка + enter
                $btn.on('hover:enter hover:click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    $(this).trigger('click');
                    return false;
                });
                
                               
                $(document).on('click', function(e) {
                    if (UtilitiesButton.state.isMenuOpen && 
                        !$(e.target).closest('#drxaos-utils-btn, #drxaos-utils-menu').length) {
                        UtilitiesButton.closeMenu();
                    }
                });
                
                $(document).on('keydown.drxaosUtils', function(e) {
                    if (!UtilitiesButton.state.isMenuOpen) return;
                    var key = e.key || e.code || e.keyCode;
                    var isEscape = key === 'Escape' || key === 'Esc' || key === 27;
                    if (isEscape) {
                        e.preventDefault();
                        e.stopPropagation();
                        UtilitiesButton.closeMenu();
                        return false;
                    }
                });
                
                if (UtilitiesButton.elements.menu) {
                    var $menu = $(UtilitiesButton.elements.menu);
                    
                    $menu.on('click', '.utils-menu-item', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var action = $(this).data('action');
                        UtilitiesButton.handleMenuItemAction(action);
                        return false;
                    });
                    
                    $menu.on('hover:enter hover:click hover:touch', '.utils-menu-item', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var action = $(this).data('action');
                        UtilitiesButton.handleMenuItemAction(action);
                        return false;
                    });
                }
            },
            
            inject: function() {
                var headActions = document.querySelector('.head__actions');
                if (!headActions) {
                    setTimeout(UtilitiesButton.inject, 500);
                    return;
                }
                
                if (document.getElementById('drxaos-utils-btn')) return;
                
                if (!document.getElementById('drxaos-utils-styles')) {
                    $('head').append(UtilitiesButton.templates.styles());
                }
                
                $(headActions).append(UtilitiesButton.templates.button());
                UtilitiesButton.elements.button = document.getElementById('drxaos-utils-btn');
                
                if (!UtilitiesButton.elements.button) return;
                
                $(UtilitiesButton.elements.button).append(UtilitiesButton.templates.menu());
                UtilitiesButton.elements.menu = document.getElementById('drxaos-utils-menu');
                
                if (!UtilitiesButton.elements.menu) return;
                
                UtilitiesButton.bindEvents();
                UtilitiesButton.state.isEnabled = true;
            },
            
            destroy: function() {
                if (UtilitiesButton.elements.button) {
                    $(UtilitiesButton.elements.button).remove();
                }
                $('#drxaos-utils-styles').remove();
                UtilitiesButton.state.isEnabled = false;
            },
            
            init: function() {
                UtilitiesButton.registerBackHandler();
                
                if (window.Lampa && window.Lampa.Listener) {
                    Lampa.Listener.follow('app', function(e) {
                        if (e.type === 'ready') {
                            setTimeout(UtilitiesButton.inject, 1000);
                        }
                    });
                } else {
                    setTimeout(UtilitiesButton.inject, 2000);
                    setTimeout(UtilitiesButton.registerBackHandler, 2000);
                }
            }
        ,

            registerButtonController: function() {
                if (!UtilitiesButton.elements.button) return;
                if (!window.Lampa || !Lampa.Controller) return;

                var $btn = $(UtilitiesButton.elements.button);

                $btn.on('mouseenter focus', function() {
                    if (Lampa.Controller.enabled().name === 'content') {
                        Lampa.Controller.add('drxaos_utils_button', {
                            toggle: function() {},
                            enter: function() {
                                $btn.trigger('click');
                            }
                        });
                        Lampa.Controller.toggle('drxaos_utils_button');
                    }
                });

                $btn.on('mouseleave blur', function() {
                    if (Lampa.Controller.enabled().name === 'drxaos_utils_button') {
                        Lampa.Controller.toggle('content');
                    }
                });
            }

        };
        
        UtilitiesButton.init();
                    UtilitiesButton.registerButtonController();
    })();
    
    // ╚════════════════════════════════════════════════════════════════════════╝

setTimeout(function() {
    var selectboxItems = document.querySelectorAll('.selectbox-item');
    selectboxItems.forEach(function(item) {
        addIconsToSelectboxItem(item);
    });
}, 1000);
})();


// 🎨 Force apply theme background on reload/support
(function forceBackgroundFix() {
    function applyBgFix() {
        try {
            document.querySelectorAll('.background, body').forEach(function(el) {
                var style = el.getAttribute('style');
                if (style && /background(-image)?:\s*url/.test(style)) {
                    var clean = style.replace(/background(-image)?:[^;]+;?/gi, '');
                    clean ? el.setAttribute('style', clean) : el.removeAttribute('style');
                }
            });
        } catch(e) {}
    }
    applyBgFix();
    // Observer for style changes
    var obs = new MutationObserver(function(muts) {
        muts.forEach(function(m) {
            if (m.type === 'attributes' && m.attributeName === 'style') {
                var el = m.target;
                if (el.classList.contains('background') || el.tagName.toLowerCase() === 'body') {
                    setTimeout(applyBgFix, 10);
                }
            }
        });
    });
    setTimeout(function() {
        document.querySelectorAll('.background, body').forEach(function(el) {
            obs.observe(el, { attributes: true, attributeFilter: ['style'] });
        });
    }, 500);
    setInterval(applyBgFix, 2000);
})();
