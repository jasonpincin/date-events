var test        = require('tape'),
    dateEvents  = require('..')

test('hour event', function (t) {
    t.plan(1)
    var clock = dateEvents({ startDate: new Date('2014-01-01') })
    clock.once('hour', function (hour) {
        var currentHour = (new Date).getHours()
        t.equal(hour, currentHour, 'got hour')
        clock.removeAllListeners()
    })
})
