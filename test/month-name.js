var test         = require('tape'),
    dateEvents   = require('..')

var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

test('month name event', function (t) {
    t.plan(1)
    var clock = dateEvents({ startDate: new Date('2014-01-01') })

    var monthName = months[(new Date).getMonth()]
    clock.once(monthName, function () {
        t.pass('got month name event of: ' + monthName)
        clock.removeAllListeners()
    })
})
