define('app/component', ()=> {
    return class {
        async render() {
            throw new Error('abstract');
        }
    }
});
