var test         = require('tape'),
    dateEvents   = require('..')

var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

test('month event', function (t) {
    t.plan(2)
    var clock = dateEvents({ startDate: new Date('2014-01-01') })
    clock.once('month', function (month, monthStr) {
        var currentMonth = (new Date).getMonth() + 1
        t.equal(month, currentMonth, 'got numeric month')
        t.equal(monthStr, months[currentMonth - 1], 'got month string')
        clock.removeAllListeners()
    })
})
