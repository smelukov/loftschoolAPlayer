define('lib/player', ['lib/events'], Events => {
    return class {
        constructor(manager) {
            this._manager = manager;
            this.events = new Events()
        }

        set manager(manager) {
            this._manager = manager;
        }

        get manager() {
            return this._manager;
        }

        set song(song) {
            throw new Error('abstract');
        }

        set playing(state) {
            if (state && !this.playing) {
                this.events.trigger('play', this);
            } else if (!state && this.playing) {
                this.events.trigger('pause', this);
            }
        }

        get playing() {
            throw new Error('abstract');
        }
    }
});
