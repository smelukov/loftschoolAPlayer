require.config({
    paths: {
        vk: 'http://vk.com/js/api/openapi'
    },
    map: {
        '*': {
            'view': 'app/view/domHandlebars',
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

define(['lib/song', 'view', 'source', 'player', 'app/component/header', 'app/component/playlist'], async function(Song, view, source, player, CompHeader, CompPlaylist) {
    let headerComp = new CompHeader(),
        playlistComp = new CompPlaylist();

    (await source.playlist).forEach(song=> {
        player.manager.add(new Song(song.id, song.title, song.artist, song.duration, song.url));
    });

    await headerComp.render(await source.name);
    await playlistComp.render(player.manager.all());
});
