var test       = require('tape'),
    fmt        = require('util').format,
    dateEvents = require('..')

var dFmt = '%s-%s-%s'

test('date string', function (t) {

    t.plan(5)
    var clock = dateEvents({ startDate: new Date('2014-01-01') })

    var now          = new Date,
        currentYear  = now.getFullYear(),
        currentMonth = ('0' + (now.getMonth() + 1)).slice(-2),
        currentDate  = ('0' + now.getDate()).slice(-2)

    clock.once(fmt(dFmt, currentYear, currentMonth, currentDate), function (date) {
        t.ok(date instanceof Date, 'got yyyy-mm-dd')
    })
    clock.once(fmt(dFmt, currentYear, currentMonth, '*'), function (date) {
        t.ok(date instanceof Date, 'got yyyy-mm-*')
    })
    clock.once(fmt(dFmt, currentYear, '*', currentDate), function (date) {
        t.ok(date instanceof Date, 'got yyyy-*-dd')
    })
    clock.once(fmt(dFmt, '*', currentMonth, currentDate), function (date) {
        t.ok(date instanceof Date, 'got *-mm-dd')
    })
    clock.once(fmt(dFmt, '*', '*', '*'), function (date) {
        t.ok(date instanceof Date, 'got *-*-*')
    })

    setTimeout(function () {
        clock.removeAllListeners()
    }, 2500)
})
