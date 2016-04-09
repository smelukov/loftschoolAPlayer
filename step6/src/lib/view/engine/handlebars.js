define('lib/view/engine/handlebars', ['handlebars', 'lib/view/engine', 'lib/view/helpers'], (Handlebars, Engine, helpers)=> {
    Object.keys(helpers).forEach(helperName=> {
        Handlebars.registerHelper(helperName, helpers[helperName]);
    });

    return class extends Engine {
        compile(template, model) {
            let templateFn = Handlebars.compile(template);

            return templateFn(model);
        }
    }
});
