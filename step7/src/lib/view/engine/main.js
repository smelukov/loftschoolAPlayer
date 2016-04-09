define('lib/view/engine', ()=> {
    return class {
        async compile(template, model) {
            throw new Error('abstract');
        }
    }
});
