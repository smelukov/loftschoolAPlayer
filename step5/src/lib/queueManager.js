define('lib/queue-manager', ['lib/events'], (Events)=> {
    return class {
        constructor() {
            this.events = new Events();
            this.clear();
            this.queue = [];
        }

        add(item) {
            if (this.queue.indexOf(item) === -1) {
                this.queue.push(item);
                this.events.trigger('add', this, item);
            }
        }

        next() {
            if (this._current < this.queue.length - 1) {
                this._current++;
                this.events.trigger('next', this, this.queue[this._current], this.queue[this._current - 1]);
            }
        }

        prev() {
            if (this._current > 0) {
                this._current--;
                this.events.trigger('prev', this, this.queue[this._current], this.queue[this._current + 1]);
            }
        }

        exists(song) {
            return this.queue.indexOf(song) > -1;
        }

        find(by, val) {
            let res,
                all = this.all(),
                length = all.length;

            for (let i = 0; i < length; i++) {
                if (all[i][by] == val) {
                    res = all[i];
                    break;
                }
            }

            return res;
        }

        set current(song) {
            let ix = this.queue.indexOf(song),
                oldIx = this._current;

            if (ix > -1) {
                this._current = ix;
                this.events.trigger('set', this, this.queue[this._current], this.queue[oldIx]);
            }
        }

        get current() {
            return this.queue[this._current];
        }

        all() {
            return this.queue.slice();
        }

        clear() {
            this.queue = [];
            this._current = -1;
            this.events.off();
        }
    }
});
