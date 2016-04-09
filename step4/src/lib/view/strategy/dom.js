define('lib/view/strategy/dom', ['lib/view/strategy'], (Strategy)=> {
    return class extends Strategy {
        constructor(prefix, format = '{{name}}Template') {
            super(prefix);

            this.format = format;
        }

        async getSource(name) {
            let templateName = this.format.replace(/\{\{name}}/g, `${this.prefix}${name}`),
                templateEl = document.getElementById(templateName);

            if (!templateEl) {
                throw new Error(`Не удалось найти шаблон ${this.prefix}${name}`);
            }

            return Promise.resolve(templateEl.innerHTML);
        }
    }
});
