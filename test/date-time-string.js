var test       = require('tape'),
    fmt        = require('util').format,
    dateEvents = require('..')

var dtFmt = '%s-%s-%s %s:%s'

test('date time string', function (t) {

    t.plan(9)
    var clock = dateEvents({ startDate: new Date('2014-01-01') })

    var now = new Date
        currentYear   = now.getFullYear(),
        currentMonth  = ('0' + (now.getMonth() + 1)).slice(-2),
        currentDate   = ('0' + now.getDate()).slice(-2),
        currentHour   = ('0' + now.getHours()).slice(-2),
        currentMinute = ('0' + now.getMinutes()).slice(-2)

    clock.once(fmt(dtFmt, currentYear, currentMonth, currentDate, currentHour, currentMinute), function (date) {
        t.ok(date instanceof Date, 'got yyyy-mm-dd hh:mm')
    })
    clock.once(fmt(dtFmt, currentYear, currentMonth, currentDate, currentHour, '*'), function (date) {
        t.ok(date instanceof Date, 'got yyyy-mm-dd hh:*')
    })
    clock.once(fmt(dtFmt, currentYear, currentMonth, currentDate, '*', currentMinute), function (date) {
        t.ok(date instanceof Date, 'got yyyy-mm-dd *:mm')
    })
    clock.once(fmt(dtFmt, currentYear, currentMonth, '*', currentHour, currentMinute), function (date) {
        t.ok(date instanceof Date, 'got yyyy-mm-* hh:mm')
    })
    clock.once(fmt(dtFmt, currentYear, '*', currentDate, currentHour, currentMinute), function (date) {
        t.ok(date instanceof Date, 'got yyyy-*-dd hh:mm')
    })
    clock.once(fmt(dtFmt, '*', currentMonth, currentDate, currentHour, currentMinute), function (date) {
        t.ok(date instanceof Date, 'got *-mm-dd hh:mm')
    })
    clock.once(fmt(dtFmt, '*', '*', '*', currentHour, currentMinute), function (date) {
        t.ok(date instanceof Date, 'got *-*-* hh:mm')
    })
    clock.once(fmt(dtFmt, currentYear, currentMonth, currentDate, '*', '*'), function (date) {
        t.ok(date instanceof Date, 'got yyyy-mm-dd *:*')
    })
    clock.once('*-*-* *:*', function (date) {
        t.ok(date instanceof Date, 'got *-*-* *:*')
    })

    setTimeout(function () {
        clock.removeAllListeners()
    }, 2500)
})
