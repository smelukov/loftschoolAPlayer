define('lib/player/html5', ['lib/player'], Player => {
    return class extends Player {
        constructor(manager) {
            super(manager);

            this.player = document.createElement('audio');
            this.manager.events.on('set next prev', (e, song) => {
                this.song = song;
            });
            this.player.addEventListener('timeupdate', () => {
                this.events.trigger('timeupdate', this, this.player.currentTime, this.player.duration);
            });
            this.player.addEventListener('ended', () => {
                this.events.trigger('ended', this);
            });
        }

        set song(song) {
            this.player.pause();
            this.player.src = song.url;
        }

        set playing(state) {
            state ? this.player.play() : this.player.pause();
            super.playing = state;
            this.events.trigger('stateChanged', this, this.playing);
        }

        get playing() {
            return !this.player.paused;
        }
    }
});
