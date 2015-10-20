var EventEmitter = require('events').EventEmitter,
    fmt          = require('util').format

var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

var dFmt  = '%s-%s-%s'
var dtFmt = '%s-%s-%s %s:%s'
var tFmt  = '%s:%s'

module.exports = function createDateEmitter (options) {
    options = typeof options === 'object' ? options : {}
    options.startDate = options.startDate instanceof Date ? options.startDate : new Date

    var emitter       = new EventEmitter,
        listenerCount = 0,
        timeout       = null,
        interval      = null,
        now           = options.startDate,
        last          = {
            year   : now.getFullYear(),
            month  : now.getMonth() + 1,
            date   : now.getDate(),
            weekday: now.getDay(),
            hour   : now.getHours(),
            minute : now.getMinutes()
        }

    emitter.on('newListener', listenerAdded)
    emitter.on('removeListener', listenerRemoved)

    return emitter

    function eachSecond () {
        var now     = new Date,
            year    = now.getFullYear(),
            month   = now.getMonth() + 1,
            date    = now.getDate(),
            weekday = now.getDay(),
            hour    = now.getHours(),
            minute  = now.getMinutes()

        if (date !== last.date) {
            emitter.emit('date', date)
            emitter.emit(fmt(dFmt, year, month, date))

            emitter.emit(fmt(dFmt, year, month, '*'))
            emitter.emit(fmt(dFmt, year, '*', date))
            emitter.emit(fmt(dFmt, year, '*', '*'))

            emitter.emit(fmt(dFmt, '*', month, date))
            emitter.emit(fmt(dFmt, '*', month, '*'))

            emitter.emit(fmt(dFmt, '*', '*', date))
            emitter.emit(fmt(dFmt, '*', '*', '*'))

            last.date = date
        }

        if (minute !== last.minute) {
            emitter.emit('minute', minute)

            [hour, '*'].forEach(function (hour) {
                emitter.emit(fmt(dtFmt, year, month, date, hour, minute))

                emitter.emit(fmt(dtFmt, year, month, '*', hour, minute))
                emitter.emit(fmt(dtFmt, year, '*', date, hour, minute))
                emitter.emit(fmt(dFmt, year, '*', '*', hour, minute))

                emitter.emit(fmt(dtFmt, '*', month, date, hour, minute))
                emitter.emit(fmt(dtFmt, '*', month, '*', hour, minute))

                emitter.emit(fmt(dtFmt, '*', '*', date, hour, minute))
                emitter.emit(fmt(dtFmt, '*', '*', '*', hour, minute))

                emitter.emit(fmt(tFmt, hour, minute))
            })

            last.minute = minute
        }

        if (year !== last.year) {
            emitter.emit('year', year)
            last.year = year
        }

        if (month !== last.month) {
            emitter.emit('month', month, months[month - 1])
            emitter.emit(months[month - 1])
            last.month = month
        }

        if (weekday !== last.weekday) {
            emitter.emit('weekday', weekday, days[weekday - 1])
            emitter.emit(days[weekday - 1])
            last.weekday = weekday
        }

        if (hour !== last.hour) {
            emitter.emit('hour', hour)
            last.hour = hour
        }
    }

    function listenerAdded () {
        listenersCount++
        if (!timeout && !interval) timeout = setTimeout(start, 1000 - (new Date).getMilliseconds())
    }

    function listenerRemoved () {
        listenerCount--
        if (!listenerCount) stop()
    }

    function start () {
        interval = setInterval(eachSecond, 1000)
        eachSecond()
    }

    function stop () {
        clearTimeout(timeout)
        clearInterval(interval)
        timeout = null
        interval = null
    }
}
