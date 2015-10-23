var test          = require('tape'),
    dateEvents    = require('..')

test('minute event', function (t) {
    t.plan(1)
    var clock = dateEvents({ startDate: new Date('2014-01-01') })
    clock.once('minute', function (minute) {
        var currentMinute = (new Date).getMinutes()
        t.equal(minute, currentMinute, 'got minute')
        clock.removeAllListeners()
    })
})
