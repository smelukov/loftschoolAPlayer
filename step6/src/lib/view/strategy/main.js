define('lib/view/strategy', ()=> {
    return class {
        constructor(prefix = '') {
            this.prefix = prefix;
        }

        set prefix(prefix) {
            this._prefix = prefix ? prefix + '_' : '';
        }

        get prefix() {
            return this._prefix;
        }

        async getSource(name) {
            throw new Error('abstract');
        }
    }
});
