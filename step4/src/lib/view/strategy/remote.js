define('lib/view/strategy/remote', ['lib/view/strategy'], (Strategy)=> {
    return class extends Strategy {
        constructor(prefix, baseUrl = '/') {
            super(prefix);

            this.cache = {};
            this.baseUrl = baseUrl;
        }

        set baseUrl(url) {
            this._baseUrl = url;

            if (!this._baseUrl.endsWith('/')) {
                this._baseUrl += '/';
            }
        }

        get baseUrl() {
            return this._baseUrl;
        }

        async getSource(name) {
            let templateName = `${this.prefix.replace(/_$/, '/')}${name}`;

            if (this.cache[templateName]) {
                return Promise.resolve(this.cache[templateName]);
            }

            return new Promise((resolve, reject)=> {
                let xhr = new XMLHttpRequest();

                xhr.open('GET', `${this.baseUrl}${templateName}.html`, true);
                xhr.onerror = ()=> {
                    reject(new Error(`${xhr.status} - ${xhr.statusText}`));
                };

                xhr.onload = ()=> {
                    this.cache[templateName] = xhr.responseText;
                    resolve(xhr.responseText);
                };

                xhr.send();
            });
        }
    }
});
