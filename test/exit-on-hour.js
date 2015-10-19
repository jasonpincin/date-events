var test       = require('tape'),
    DateEvents = require('..')

test('hour event', function (t) {
    t.plan(1)
    var cal = new DateEvents()
    cal.once('hour', function () {
        t.ok(true, 'got hour event')
        t.end()
        cal.removeAllListeners()
    })
})
