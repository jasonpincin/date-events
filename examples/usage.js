var clock = require('..')()

console.log('Count-down until next minute...')

clock.on('second', function (sec) {
    console.log(60 - sec)
})

clock.on('minute', function (min) {
    console.log('Minute ' + min + ' has arrived!')
})

// alternate syntax (every minute of every hour)
clock.on('*:*', function (date) {
    console.log('Also known as ' + date)
    clock.removeAllListeners()
})
