require.config({
    paths: {
        vk: 'http://vk.com/js/api/openapi'
    },
    map: {
        '*': {
            'source': 'app/source/vk'
        }
    },
    config: {
        'app/source/vk': {
            apiId: 5267932,
            perms: 8
        }
    },
    catchError: true
});

define(['source'], source => {
    source.name.then((headerText)=> {
        let h1 = document.createElement('h1');

        h1.textContent = headerText;
        headerInfo.appendChild(h1);
    });
});
