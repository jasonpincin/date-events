var tap         = require("tap"),
    test        = tap.test,
    DateEvents;

test('load module', function(t) {
     DateEvents = require('../index');
     t.ok(DateEvents, 'module loaded');
     t.end();
});

test('hour event', function(t) {
    t.plan(1);
    var cal = new DateEvents();
    cal.once('hour', function() {
        t.ok(true, 'got hour event');
        t.end();
        cal.removeAllListeners();
    });
});
