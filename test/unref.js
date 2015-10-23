var test       = require('tape'),
    dateEvents = require('..')

test('unref', function (t) {
    t.plan(1)
    var clock = dateEvents({ unref: true })
    clock.once('second', function (sec) {
        t.pass('removes need for removeAllListeners')
    })
})
