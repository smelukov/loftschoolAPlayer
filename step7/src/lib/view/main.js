define('lib/view', ()=> {
    return class {
        constructor(engine, strategy) {
            this._engine = engine;
            this._strategy = strategy;
        }

        get engine() {
            return this._engine;
        }

        get strategy() {
            return this._strategy;
        }

        async render(templateName, model) {
            return Promise.resolve(this.engine.compile(await this.strategy.getSource(templateName), model));
        }

        async renderTo(element, templateName, model) {
            element.innerHTML = this.engine.compile(await this.strategy.getSource(templateName), model);
        }

        async compile(templateName, model) {
            let temp = document.createElement('div');

            await this.renderTo(temp, templateName, model);

            return temp.children;
        }
    };
});
