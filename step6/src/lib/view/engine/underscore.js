define('lib/view/engine/underscore', ['underscore', 'lib/view/engine', 'lib/view/helpers'], (_, Engine, helpers)=> {
    return class extends Engine {
        compile(template, model) {
            let templateData = {
                    model: model,
                    helpers: helpers
                },
                templateFn = _.template(template);

            return templateFn(templateData);
        }
    };
});
