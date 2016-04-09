define('app/view/domUnderscore', ['module', 'lib/view', 'lib/view/engine/underscore', 'lib/view/strategy/dom'], (module, View, Engine, Strategy) => {
    let config = module.config();

    return new View(new Engine(), new Strategy(config.prefix));
});
