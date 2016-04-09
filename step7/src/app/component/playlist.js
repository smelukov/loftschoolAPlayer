define('app/component/playlist', ['app/component', 'view', 'player'], (Component, view, player) => {
    return class extends Component {
        constructor() {
            super();

            playlist.addEventListener('click', e => {
                let target = e.target;

                if (target.dataset.role === 'playback') {
                    let currentElement = target.closest('[data-role=item]');

                    if (player.manager.current && player.manager.current.id == currentElement.dataset.id) {
                        player.playing = !player.playing;
                    } else {
                        player.manager.current = player.manager.find('id', currentElement.dataset.id);
                        player.playing = true;
                    }
                }
            });

            player.manager.events.on('set next prev', (e, current, prev) => {
                let currentElement = playlist.querySelector(`[data-id="${current.id}"]`),
                    currentPlayback = currentElement.querySelector('[data-role=playback]'),
                    currentProgressbar = currentElement.querySelector('[data-role=progressbar]'),
                    prevElement = this.currentElement;

                this.currentElement = currentElement;
                this.currentPlayback = currentPlayback;
                this.currentProgressbar = currentProgressbar;

                currentElement.classList.add('list-group-item-success');

                if (prevElement) {
                    let prevPlayback = prevElement.querySelector('[data-role=playback]');

                    prevElement.classList.remove('list-group-item-success');

                    this.toPause(prevPlayback);
                }

                this.toPlay(currentPlayback);
            });

            player.events.on('ended', e => {
                player.manager.next();
                player.playing = true;
            });

            player.events.on('timeupdate', (e, current, duration) => {
                let progress = Math.ceil(100 / duration * current);

                this.currentProgressbar.style.width = progress + '%';
            });

            player.events.on('stateChanged', (e, state) => {
                if (state) {
                    this.toPlay(this.currentPlayback);
                } else {
                    this.toPause(this.currentPlayback);
                }
            });
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
            return view.renderTo(playlist, 'playlist', {list: data});
        }
    }
});
