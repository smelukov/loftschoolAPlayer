define('lib/song', () => {
    return class {
        constructor(id, title, artist, duration, url) {
            this.id = id;
            this.title = title;
            this.artist = artist;
            this.duration = duration;
            this.url = url;
        }
    }
});
