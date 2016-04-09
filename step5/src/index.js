require.config({
    paths: {
        vk: 'http://vk.com/js/api/openapi'
    },
    map: {
        '*': {
            'view': 'app/view/remoteUnderscore',
            'source': 'app/source/vk',
            'player': 'app/player/html5'
        }
    },
    config: {
        'app/source/vk': {
            apiId: 5267932,
            perms: 8
        },
        'app/view/domHandlebars': {
            prefix: 'default'
        },
        'app/view/remoteUnderscore': {
            prefix: 'default',
            baseUrl: '/templates'
        }
    },
    catchError: true
});

define(['source', 'view', 'player', 'lib/song'], async function(source, view, player, Song) {
    view.renderTo(headerInfo, 'me', {text: await source.name});
    view.renderTo(playlist, 'playlist', {list: await source.playlist});

    (await source.playlist).forEach(song=> {
        player.manager.add(new Song(song.id, song.title, song.artist, song.duration, song.url));
    });

});
