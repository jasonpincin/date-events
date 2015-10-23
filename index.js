var EventEmitter = require('events').EventEmitter,
    fmt          = require('util').format

var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

var dFmt   = '%s-%s-%s'
var dtFmt  = '%s-%s-%s %s:%s'
var wdtFmt = '%s %s:%s'
var tFmt   = '%s:%s'

module.exports = function createDateEmitter (options) {
    options = typeof options === 'object' ? options : {}
    options.startDate = options.startDate instanceof Date ? options.startDate : new Date
    options.unref = typeof options.unref === 'boolean' ? options.unref : false

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
            minute : now.getMinutes(),
            second : now.getSeconds()
        }

    emitter.on('newListener', listenerAdded)
    emitter.on('removeListener', listenerRemoved)

    return emitter

    function eachSecond () {
        var now     = new Date,
            year    = now.getFullYear(),
            month   = now.getMonth() + 1,
            date    = now.getDate(),
            weekday = now.getDay() + 1,
            hour    = now.getHours(),
            minute  = now.getMinutes()

        var monthPadded, datePadded, hourPadded, minutePadded

        if (date !== last.date) {
            emitter.emit('date', date)
            monthPadded = ('0' + month).slice(-2)
            datePadded = ('0' + date).slice(-2)
            ;[year, '*'].forEach(function (year) {
                ;[monthPadded, '*'].forEach(function (month) {
                    ;[datePadded, '*'].forEach(function (date) {
                        emitter.emit(fmt(dFmt, year, month, date), now)
                    })
                })
            })
            last.date = date
        }

        if (minute !== last.minute) {
            monthPadded = ('0' + month).slice(-2)
            datePadded = ('0' + date).slice(-2)
            hourPadded = ('0' + hour).slice(-2)
            minutePadded = ('0' + minute).slice(-2)
            emitter.emit('minute', minute)
            ;[year, '*'].forEach(function (year) {
                ;[monthPadded, '*'].forEach(function (month) {
                    ;[datePadded, '*'].forEach(function (date) {
                        ;[hourPadded, '*'].forEach(function (hour) {
                            ;[minutePadded, '*'].forEach(function (minute) {
                                emitter.emit(fmt(dtFmt, year, month, date, hour, minute), now)
                            })
                        })
                    })
                })
            })
            ;[hourPadded, '*'].forEach(function (hour) {
                ;[minutePadded, '*'].forEach(function (minute) {
                    emitter.emit(fmt(wdtFmt, days[weekday - 1], hour, minute), now)
                    emitter.emit(fmt(tFmt, hour, minute), now)
                })
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
            hourPadded = ('0' + hour).slice(-2)
            minutePadded = ('0' + minute).slice(-2)
            emitter.emit('weekday', weekday, days[weekday - 1])
            emitter.emit(days[weekday - 1])
            last.weekday = weekday
        }

        if (hour !== last.hour) {
            emitter.emit('hour', hour)
            last.hour = hour
        }

        emitter.emit('second', ++last.second)
    }

    function listenerAdded () {
        listenerCount++
        if (!timeout && !interval) timeout = setTimeout(start, 1000 - (new Date).getMilliseconds())
    }

    function listenerRemoved () {
        listenerCount--
        if (!listenerCount) stop()
    }

    function start () {
        interval = setInterval(eachSecond, 1000)
        if (options.unref) interval.unref()
        eachSecond()
    }

    function stop () {
        clearTimeout(timeout)
        clearInterval(interval)
        timeout = null
        interval = null
    }
}
