define('lib/events', ()=> {
    return class {
        constructor() {
            this.handlers = {};
        }

        on(event, fn) {
            let events = Array.isArray(event) ? event : event.trim().split(' ');

            events.forEach((eventName)=> {
                if (eventName) {
                    this.handlers[eventName] = this.handlers[eventName] || [];

                    if (this.handlers[eventName].indexOf(fn) === -1) {
                        this.handlers[eventName].push(fn);
                    }
                }
            })
        }

        off(event, fn) {
            if (!arguments.length) {
                this.handlers = {};
            } else {
                let events = Array.isArray(event) ? event : event.trim().split(' ');

                events.forEach((eventName)=> {
                    if (!fn) {
                        delete this.handlers[eventName];
                    } else if (this.handlers[eventName]) {
                        let ix = this.handlers[eventName].indexOf(fn);

                        if (ix === -1) {
                            this.handlers[eventName].splice(ix, 1);

                            if (!this.handlers[event].length) {
                                delete this.handlers[event];
                            }
                        }
                    }
                });
            }
        }

        trigger(event, target, ...args) {
            if (this.handlers[event]) {
                this.handlers[event].forEach((fn)=> {
                    fn.call(target, {type: event, target: target}, ...args);
                });
            }
        }
    }
});
