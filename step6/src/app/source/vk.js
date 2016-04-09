define('app/source/vk', ['module', 'lib/source/vk'], function(module, Source) {
    let config = module.config();

    return new Source(config.apiId, config.perms);
});
