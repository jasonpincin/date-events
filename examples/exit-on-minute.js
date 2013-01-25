var DateEvents  = require('../index')
,   dtEvents    = new DateEvents

dtEvents.on('second', function (d) {
    console.log('+1 second = %s', d)
})
dtEvents.on('minute', function (d) {
    dtEvents.removeAllListeners() // Without removing listeners, program will not exit
})

console.log('Script running, will print time each second and exit once the minute changes.')