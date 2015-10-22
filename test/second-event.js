var test       = require('tape'),
    dateEvents = require('..')

test('second event', function (t) {
    t.plan(1)
    var clock = dateEvents()
    clock.once('second', function (sec) {
        t.equal(typeof sec, 'number', 'got numeric second')
        clock.removeAllListeners()
    })
})
