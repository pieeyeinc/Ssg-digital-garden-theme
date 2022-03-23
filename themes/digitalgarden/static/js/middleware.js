;(function ($) {
    const whitelistOrigins = ['https://app.dev.pii.ai', 'https://app.pii.ai', 'http://localhost:9927', 'http://localhost:58063'];

    const state = {}

    const _preview = {
        colors: (colors) => {
            let root = document.querySelector(':root');
            if (state['colors'] !== window.btoa(JSON.stringify(colors))) {
                colors.forEach(color => {
                    if (color.variable && color.value) {
                        root.style.setProperty(color.variable, color.value);
                    }
                });
                state['colors'] = window.btoa(JSON.stringify(colors));
            }
        },
        font: (request) => {
            const identifier = 'font-styling';
            if (request && request.data && typeof request.data === 'object' && state['fonts'] !== window.btoa(JSON.stringify(request.data))) {
                const font = request.data;
                const css = [
                    `@import url('https://fonts.googleapis.com/css?family=${font.value}');`,
                    `body { font-family: '${font.label}'; }`
                ]

                updateCSS(identifier, css.join(''), request.included);
                state['fonts'] = window.btoa(JSON.stringify(request.data));

            } else if (request && typeof request.included === "boolean" && !request.included) {
                removeExistingElement(identifier)
                state['fonts'] = null
            }
        },
        logo: (request) => {
            const logoElement = document.querySelector('#logo');
            if (request && request.data && state['logo'] !== request.data) {
                // update DOM & state
                if(logoElement) {
                    logoElement.setAttribute('src', request.data || '');
                    state['logo'] = request.data;
                }

            } else if (request && typeof request.included === "boolean" && !request.included) {
                // disable or remove logo
                if(logoElement) {
                    logoElement.setAttribute('src', '');
                    state['logo'] = null
                }
            }
        },
        header: (request) => {
            const headerElement = document.querySelector('.header');
            if (request && request.data && state['header'] !== request.data) {
                // update DOM & state
                if(headerElement) {
                    headerElement.innerHTML = window.atob(request.data);
                    state['header']  = request.data;
                }

            } else if (request && typeof request.included === "boolean" && !request.included) {
                // disable or remove element
                if(headerElement) {
                    headerElement.innerHTML = ''
                    state['header'] = null
                    state['header'] = null
                }
            }
        },
        footer: (request) => {
            const footerElement = document.querySelector('.footer');
            if (request && request.data && state['footer'] !== request.data) {
                // update DOM & state
                if(footerElement) {
                    footerElement.innerHTML = window.atob(request.data);
                    state['footer']  = request.data;
                }

            } else if (request && typeof request.included === "boolean" && !request.included) {
                // disable or remove element
                if(footerElement) {
                    footerElement.innerHTML = '';
                    state['footer'] = null
                }
            }
        },
        additionalCSS: (request) => {
            const identifier = 'additional-css';
            if (request && request.data && typeof request.data === "string" && state['css'] !== request.data) {
                const css = request.data;
                updateCSS(identifier, window.atob(css), request.included);
                state['css'] = request.data

            } else if (request && typeof request.included === "boolean" && !request.included) {
                removeExistingElement(identifier)
                state['css'] = null
            }
        }
    }

    function removeExistingElement(identifier) {
        const existingElement = document.querySelector(`head #${identifier}`);
        if (existingElement) {
            existingElement.remove();
        }
    }

    function updateCSS(identifier, css, render) {
        removeExistingElement(identifier)

        if (render === false) {
            return;
        }

        var element = document.createElement('style');
        element.type = 'text/css';
        element.id = identifier;
        element.appendChild(document.createTextNode(css))
        document.getElementsByTagName('head')[0].appendChild(element);
    }

    function _applyTheme(details) {
        for (let profile in details) {
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
        // debugger
        if (e.data && typeof e.data['preview'] === 'object') {
            localStorage.setItem('theme', window.btoa(JSON.stringify(e.data.preview)));
            _applyTheme(e.data['preview'])
        }
    }

    function _addEvents() {
        this.addEventListener('message', _postMessageHandler);
    }

    function _dispatchEvents(eventType) {
        if (window.opener) {
            window.opener.postMessage({'action': eventType}, '*');
        } else if (parent) {
            parent.postMessage({'action': eventType}, '*');
        }
    }

    function _init() {
        _addEvents();
        _dispatchEvents('DOM_READY')
    }

    $(_init);
})(jQuery);