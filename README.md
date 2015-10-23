# date-events

[![NPM version](https://badge.fury.io/js/date-events.png)](http://badge.fury.io/js/date-events)
[![Build Status](https://travis-ci.org/jasonpincin/date-events.svg?branch=master)](https://travis-ci.org/jasonpincin/date-events)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/date-events/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/date-events?branch=master)

EventEmitter that emits date/time events.

## usage

``` js
var clock = require('date-events')()

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
```

## api

```
var dateEvents = require('date-events')
```

### var clock = dateEvents(options)

Create a new [EventEmitter](https://nodejs.org/api/events.html) that emits date
and time events. Valid options include:

* `startDate` (optional) - `Date` object representing the the Date to start the
  Emitter object at. The first tick will bring the object to the current date
  and time and produce any relevant events in the process.
* `unref` (optional) - A `boolean` value indicating whether the internal
  interval that generates events should be 
  [unreferenced](https://nodejs.org/api/timers.html#timers_unref), allowing the 
  program to exit if despite it being on the event loop.

### events

The following events will be emitted at the proper times:

* `year` - emitted with 4-digit year number
* `month` - emitted with two values: month number (1-12) and (lowercase) month name
* `date` - emitted with day of month number (1-31)
* `weekday` - emitted with two values: weekday number (1 - 7) and (lowercase) day name
* `hour` - emitted with hour number (0-23)
* `minute` - emitted with minute number (0-59)
* `second` - emitted with second number (0-59)
* `january` through `december` - emitted at start of corresponding month, with no value
* `sunday` through `saturday` - emitted at start of corresponding days, with no value
* `sunday HH:MM` through `saturday HH:MM` - emitted at appropriate time of corresponding day
* `YYYY-MM-DD` - emitted with Javascript `Date` object
* `YYYY-MM-DD HH:MM` - emiitetd with Javascript `Date` object
* `HH:MM` - emitted with Javascript `Date` object

#### wildcards

In the above events, wildcards (`*`) may be substituded in place of any of the following: `YYYY`, `MM`, `DD`, `HH`, or `MM`. The wildcard will match any value. So to match every day of June, in every year for example, the event would look like: `*-06-*`.

### exiting

This module will keep your program alive as long as there are listeners, unless
you passed `{unref: true}` as an option at creation time. If the module was not
passed the `unref` option, you must `removeAllListeners` in order to allow the
program to exit cleanly.

### additional examples

```javascript
// Do something at 15 minutes past every hour:
clock.on('*:15', function (date) {})

// Do something every New Years day at midnight
clock.on('*-01-01 00:00', function (date) {})

// Do something every Sunday at 4pm
clock.on('sunday 16:00', function (date) {})
```

## install

With [npm](https://npmjs.org) do:

```
npm install date-events
```

## testing

`npm test`

### coverage

`npm run view-cover`

This will output a textual coverage report.

`npm run open-cover`

This will open an HTML coverage report in the default browser.
