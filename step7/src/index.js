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
        'app/view/domHandlebars': {
            prefix: 'default'
        },
        'app/view/remoteUnderscore': {
            prefix: 'default',
            baseUrl: '/templates'
        },
        'app/source/vk': {
            apiId: 5267932,
            perms: 8
        }
    },
    catchError: true
});

define(['lib/song', 'view', 'source', 'player', 'app/component/header', 'app/component/playlist', 'app/component/controls'], async function(Song, view, source, player, CompHeader, CompPlaylist, CompControls) {
    let headerComp = new CompHeader(),
        playlistComp = new CompPlaylist(),
        controlsComp = new CompControls();

    (await source.playlist).forEach(song=> {
        player.manager.add(new Song(song.id, song.title, song.artist, song.duration, song.url));
    });

    await headerComp.render(await source.name);
    await playlistComp.render(player.manager.all());
    await controlsComp.render();
});
