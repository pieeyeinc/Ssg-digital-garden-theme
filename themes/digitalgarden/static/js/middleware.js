;(function ($) {
    const whitelistOrigins = ['https://app.dev.pii.ai', 'https://app.pii.ai', 'http://localhost:9927'];
    const _preview = {
        colors: (colors) => {
            let root = document.querySelector(':root');
            colors.forEach(color => {
                if(color.variable && color.value) {
                    root.style.setProperty(color.variable, color.value)
                }
            });
        },
        fonts: (fonts) => {
            let root = document.querySelector(':root');
            fonts.forEach(font => {
                if(font.variable && font.value) {
                    root.style.setProperty(font.variable, font.value)
                }
            });
        },
        configuration: (configuration) => {
            let root = document.querySelector(':root');
            configuration.forEach(config => {
                if(config.variable && config.value) {
                    root.style.setProperty(config.variable, config.value)
                }
            });
        },
        css: () => {}
    }

    function _applyTheme(details) {
        for(let profile in details) {
            _preview[profile]?.(details[profile])
        }
    }

    function _checkLocalTheme() {
        const encodedTheme = localStorage.getItem('theme');
        const theme = window.atob(encodedTheme);
        _applyTheme(JSON.parse(theme))
    }

    function _postMessageHandler(e) {
        if (whitelistOrigins.indexOf(e.origin) === -1) return;
        debugger
        if(e.data && typeof e.data['preview'] === 'object') {
            localStorage.setItem('theme', window.btoa(JSON.stringify(e.data.preview)));
            _applyTheme(e.data['preview'])
        }
    }

    function _visibilityChangeHandler() {
        if (!document.hidden){
            // active tab
            _checkLocalTheme();
        }
    }
    function _addEvents() {
        this.addEventListener('message', _postMessageHandler);
        document.addEventListener('visibilitychange', _visibilityChangeHandler);
    }

    function _init() {
        _addEvents();
        _checkLocalTheme()
    }

    $(_init);
})(jQuery);
