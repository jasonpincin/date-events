var test       = require('tape'),
    dateEvents = require('..')

var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

test('weekday name event', function (t) {
    t.plan(1)
    var clock = dateEvents({ startDate: new Date('2014-01-01') })

    var dayName = days[(new Date).getDay()]
    clock.once(dayName, function () {
        t.pass('got weekday name event of: ' + dayName)
        clock.removeAllListeners()
    })
})

test('weekday with time', function (t) {

    t.plan(4)
    var clock = dateEvents({ startDate: new Date('2014-01-01') })

    var dayName       = days[(new Date).getDay()],
        currentHour   = ('0' + (new Date).getHours()).slice(-2),
        currentMinute = ('0' + (new Date).getMinutes()).slice(-2)

    clock.once(dayName + ' ' + currentHour + ':' + currentMinute, function (date) {
        t.ok(date instanceof Date, 'got weekday + hh:mm')
    })
    clock.once(dayName + ' ' + '*:' + currentMinute, function (date) {
        t.ok(date instanceof Date, 'got weekday + *:mm')
    })
    clock.once(dayName + ' ' + currentHour + ':*', function (date) {
        t.ok(date instanceof Date, 'got weekday + hh:*')
    })
    clock.once(dayName + ' *:*', function (date) {
        t.ok(date instanceof Date, 'got weekday + *:*')
    })

    setTimeout(function () {
        clock.removeAllListeners()
    }, 2500)
})
