var test       = require('tape'),
    dateEvents = require('..')

var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

test('weekday event', function (t) {
    t.plan(2)
    var clock = dateEvents({ startDate: new Date('2014-01-01') })
    clock.once('weekday', function (day, dayStr) {
        var currentDay = (new Date).getDay() + 1
        t.equal(day, currentDay, 'got numeric day')
        t.equal(dayStr, days[currentDay - 1], 'got day of week string')
        clock.removeAllListeners()
    })
})
