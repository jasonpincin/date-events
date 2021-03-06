var test        = require('tape'),
    dateEvents  = require('..')

test('year event', function (t) {
    t.plan(1)
    var clock = dateEvents({ startDate: new Date('2014-01-01') })
    clock.once('year', function (year) {
        var currentYear = (new Date).getFullYear()
        t.equal(year, currentYear, 'got year')
        clock.removeAllListeners()
    })
})
