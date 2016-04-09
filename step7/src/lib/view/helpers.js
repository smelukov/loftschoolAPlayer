define('lib/view/helpers', ()=> {
    return {
        formatTime: timestamp=> {
            var minutes = parseInt(timestamp / 60),
                seconds = timestamp - minutes * 60;

            minutes = ('' + minutes).length === 1 ? '0' + minutes : minutes;
            seconds = ('' + seconds).length === 1 ? '0' + seconds : seconds;

            return minutes + ':' + seconds;
        }
    }
});
