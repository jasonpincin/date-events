var test        = require('tape'),
    dateEvents  = require('..')

test('date event', function (t) {
    t.plan(1)
    var clock = dateEvents({ startDate: new Date('2014-01-01') })
    clock.once('date', function (date) {
        var currentDate = (new Date).getDate()
        t.equal(date, currentDate, 'got date')
        clock.removeAllListeners()
    })
})
