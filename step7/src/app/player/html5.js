define('app/player/html5', ['lib/player/html5', 'lib/queue-manager'], function(Player, Manager) {
    return new Player(new Manager());
});
