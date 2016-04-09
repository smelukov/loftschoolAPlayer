define('app/view/remoteUnderscore', ['module', 'lib/view', 'lib/view/engine/underscore', 'lib/view/strategy/remote'], function(module, View, Engine, Strategy) {
    let config = module.config();

    return new View(new Engine(), new Strategy(config.prefix, config.baseUrl));
});
