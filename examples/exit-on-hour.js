var DateEvents  = require('../index'),
    dtEvents    = new DateEvents();

dtEvents.on('hour', function(h) {
    console.log('It\'s now %s o\'clock!', h);
});

dtEvents.once('date', function() {
    console.log('Welcome to a new day!');
    process.exit(); // or dtEvents.stop();
});

console.log('Script running, will print time each hour and exit once the day changes.');
