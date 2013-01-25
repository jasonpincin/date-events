date-events
==================

Instance of EventEmitter that emits date/time events as time advances.

# Install

`npm install date-events`

# Usage

``` js
var DateEvents  = require('date-events')
,   dtEvents    = new DateEvents

dtEvents.on('second', function (d) {
    console.log('+1 second = %s', d)
})
dtEvents.on('minute', function (d) {
    dtEvents.removeAllListeners() // Without removing listeners, program will not exit
})

console.log('Script running, will print time each second and exit once the minute changes.')
```

# Methods

## .createEmitter()
-------------------
Returns a new instance of date-events emitter. Equivalent to `new require('date-events')`

# Supported Events

* `second`
* `minute`
* `hour`
* `day`

Should probably add more...

# Testing

`npm test`