require.config({
    paths: {
        vk: 'http://vk.com/js/api/openapi'
    },
    map: {
        '*': {
            'view': 'app/view/remoteUnderscore',
            'source': 'app/source/vk'
        }
    },
    config: {
        'app/source/vk': {
            apiId: 5267932,
            perms: 8
        },
        'app/view/domHandlebars': {
            prefix: 'light'
        },
        'app/view/remoteUnderscore': {
            prefix: 'default',
            baseUrl: '/templates'
        }
    },
    catchError: true
});

define(['source', 'view'], async function(source, view) {
    view.renderTo(headerInfo, 'me', {text: await source.name});
    view.renderTo(playlist, 'playlist', {list: await source.playlist});
});
