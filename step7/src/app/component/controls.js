define('app/component/controls', ['app/component', 'view', 'player'], (Component, view, player) => {
    return class extends Component {
        constructor() {
            super();

            prevSongButton.addEventListener('click', e => {
                player.manager.prev();

                if (player.manager.current) {
                    player.playing = true;
                }
            });

            mainPlaybackButton.addEventListener('click', e => {
                if (!player.manager.current) {
                    player.manager.next();

                    if (player.manager.current) {
                        player.playing = true;
                    }
                } else {
                    player.playing = !player.playing;
                }
            });

            nextSongButton.addEventListener('click', e => {
                player.manager.next();

                if (player.manager.current) {
                    player.playing = true;
                }
            });

            player.events.on('stateChanged', (e, state) => {
                if (state) {
                    this.toPlay(mainPlaybackButton.firstElementChild);
                } else {
                    this.toPause(mainPlaybackButton.firstElementChild);
                }
            });

            document.addEventListener('keydown', function(e) {
                switch (e.keyCode) {
                    case 32:
                    {
                        e.preventDefault();
                        mainPlaybackButton.dispatchEvent(new CustomEvent('click'));

                        break;
                    }
                    case 37:
                    {
                        e.preventDefault();
                        prevSongButton.dispatchEvent(new CustomEvent('click'));

                        break;
                    }
                    case 39:
                    {
                        e.preventDefault();
                        nextSongButton.dispatchEvent(new CustomEvent('click'));

                        break;
                    }
                }
            }, true);
        }

        toPause(target) {
            target.classList.add('glyphicon-play');
            target.classList.remove('glyphicon-pause');
        }

        toPlay(target) {
            target.classList.remove('glyphicon-play');
            target.classList.add('glyphicon-pause');
        }

        async render(data) {
        }
    }
});
