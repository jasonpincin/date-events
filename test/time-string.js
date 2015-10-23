var test       = require('tape'),
    dateEvents = require('..')

test('time string', function (t) {

    t.plan(4)
    var clock = dateEvents({ startDate: new Date('2014-01-01') })

    var now           = new Date,
        currentHour   = ('0' + now.getHours()).slice(-2),
        currentMinute = ('0' + now.getMinutes()).slice(-2)

    clock.once(currentHour + ':' + currentMinute, function (date) {
        t.ok(date instanceof Date, 'got hh:mm')
    })
    clock.once('*:' + currentMinute, function (date) {
        t.ok(date instanceof Date, 'got *:mm')
    })
    clock.once(currentHour + ':*', function (date) {
        t.ok(date instanceof Date, 'got hh:*')
    })
    clock.once('*:*', function (date) {
        t.ok(date instanceof Date, 'got *:*')
    })

    setTimeout(function () {
        clock.removeAllListeners()
    }, 2500)
})
