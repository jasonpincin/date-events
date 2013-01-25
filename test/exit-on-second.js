var tap         = require("tap")
,   test        = tap.test
,   plan        = tap.plan
,   DateEvents      

test('load module', function (t) {
     DateEvents = require('../index')
     t.ok(DateEvents, 'module loaded')
     t.end()
})

test('second event', function (t) {
    t.plan(1)
    var cal = new DateEvents
    cal.on('second', function () {
        t.ok(true, 'got second event')   
        cal.removeAllListeners()
    })
})
