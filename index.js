var EventEmitter = require('events').EventEmitter

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

module.exports = function createDateEmitter () {

    var emitter  = new EventEmitter,
        now      = new Date,
        last     = {
            year   : now.getFullYear(),
            month  : now.getMonth() + 1,
            date   : now.getDate(),
            weekday: now.getDay(),
            hour   : now.getHours(),
            minute : now.getMinutes()
        }

    return emitter

    function eachSecond () {
        var now     = new Date,
            year    = now.getFullYear(),
            month   = now.getMonth() + 1,
            date    = now.getDate(),
            weekday = now.getDay(),
            hour    = now.getHours(),
            minute  = now.getMinutes()

        if (year !== last.year) {
            emitter.emit('year', year)
            last.year = year
        }

        if (month !== last.month) {
            emitter.emit('month', month, months[month - 1])
            emitter.emit('month-' + months[month - 1])
            emitter.emit('month-' + months[month - 1].substr(0, 3))
            emitter.emit('month-' + month)
            last.month = month
        }

        if (date !== last.date) {
            emitter.emit('date', date)
            emitter.emit('date-' + date)
            last.date = date
        }

        if (weekday !== last.weekday) {
            emitter.emit('weekday', weekday, days[weekday - 1])
            emitter.emit('weekday-' + days[weekday - 1])
            emitter.emit('weekday-' + days[weekday - 1].substr(0, 3))
            emitter.emit('weekday-' + weekday)
            last.weekday = weekday
        }

        if (hour !== last.hour) {
            emitter.emit('hour', hour)
            emitter.emit('hour-' + hour)
            last.hour = hour
        }

        if (minute !== last.minute) {
            emitter.emit('minute', minute)
            emitter.emit('minute-' + minute)
            last.minute = minute
        }
    }
}
