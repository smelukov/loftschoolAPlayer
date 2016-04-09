define('lib/source', ()=> {
    return class {
        get name() {
            throw new Error('abstract');
        }

        get playlist() {
            throw new Error('abstract');
        }
    };
});
