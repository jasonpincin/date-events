var test        = require('tape'),
    dateEvents  = require('..'),
    currentYear = (new Date).getFullYear()

test('year event', function (t) {
    t.plan(1)
    var clock = dateEvents({ startDate: new Date('2014-01-01') })
    clock.once('year', function (year) {
        t.equal(year, currentYear, 'got year')
        clock.removeAllListeners()
    })
})
