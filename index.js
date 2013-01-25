var EventEmitter    = require('events').EventEmitter
,   util            = require('util')
,   DateEmitter

module.exports = DateEmitter = function () {

    if ( !(this instanceof DateEmitter) ) 
        return new DateEmitter()

    self = this
    this.timeouts = {
        second  : null,
        minute  : null,
        hour    : null,
        day     : null
    }

    EventEmitter.call(this)

    this.on('newListener', this.activateTimer.bind(this))
}
util.inherits(DateEmitter, EventEmitter)

DateEmitter.prototype.activateTimer = function (t) {
    var self = this

    if (t in next && this.timeouts[t] === null) {
        function emitTimer () {
            self.timeouts[t] = setTimeout( emitTimer, next[t]() )
            self.emit( t, new Date )
        }

        this.timeouts[t] = setTimeout( emitTimer, next[t]() )
    }
} 
DateEmitter.prototype.removeListener = function (evt, listener) {
    DateEmitter.super_.prototype.removeListener.apply(this, arguments)
    this.onRemoveListener()
}
DateEmitter.prototype.removeAllListeners = function (evt) {
    DateEmitter.super_.prototype.removeAllListeners.apply(this, arguments)
    this.onRemoveListener()
}
DateEmitter.prototype.onRemoveListener = function () {
    for (t in this.timeouts) {
        if (this.listeners(t).length === 0 && this.timeouts[t]) {
            clearTimeout(this.timeouts[t])
            this.timeouts[t] = null
        }
    }
}

var next = {
    second : function (d) {
        var  d = new Date
        ,   _d = new Date(d)
        _d.setSeconds(d.getSeconds()+1)
        _d.setMilliseconds(0)
        return _d - d
    },

    minute : function (d) {
        var  d = d || new Date
        ,   _d = new Date(d)
        _d.setMinutes(d.getMinutes()+1)
        _d.setSeconds(0)
        _d.setMilliseconds(0)
        return _d - d
    },

    hour : function (d) {
        var  d = d || new Date
        ,   _d = new Date(d)
        _d.setHours(d.getHours()+1)
        _d.setMinutes(0)
        _d.setSeconds(0)
        _d.setMilliseconds(0)
        return _d - d
    },

    day : function (d) {
        var  d = d || new Date
        ,   _d = new Date(d)
        _d.setDate(d.getDate()+1)
        _d.setHours(0)
        _d.setMinutes(0)
        _d.setSeconds(0)
        _d.setMilliseconds(0)
        return _d - d
    }
}

DateEmitter.createEmitter = function () {
    return new DateEmitter()
}