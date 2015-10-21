# date-events

[![NPM version](https://badge.fury.io/js/date-events.png)](http://badge.fury.io/js/date-events)
[![Build Status](https://travis-ci.org/jasonpincin/date-events.svg?branch=master)](https://travis-ci.org/jasonpincin/date-events)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/date-events/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/date-events?branch=master)

Instance of EventEmitter that emits date/time events.

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

* `year`
* `month`
* `date`
* `weekday`
* `hour`
* `minute`
* `second`

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

### hour

* standard event: "hour"
  * will be emitted each full hour of the day
  * there is one argument: the hour as a Number of 0 to 23
* more detailed: "hour-[0-24]"
  * will be emitted on the defined hour every day
  * there is no argument

Examples:

The time changes form 10:59pm to 11:00pm
``` js
dtEvents.on('hour', function (hour) {
    console.log('It\'s now %s o\'clock!', h); // It's now 23 o'clock!
});

dtEvents.on('hour-11', function () { // will not be triggered
    console.log('It\'s now 11am o\'clock!');
});

dtEvents.on('hour-23', function () {
    console.log('It\'s now 11pm o\'clock!'); // It's now 11pm o'clock!
});
```

### weekday

* standard event: "weekday"
  * will be emitted each day at midnight
  * there are two arguments: the weekday as a number (0-6; 0 = Sunday) and as a string
* more detailed: "weekday-[0-6|Su-Sa|Sun-Sat|Sunday-Saturday]"
  * will be emitted once a week
  * there is no argument

Examples:

The day changes form Sunday 11:59pm to Monday 0:00am
``` js
dtEvents.on('weekday', function (day, weekday) {
    console.log('It\'s day %d of the week. A beautiful %s.', day, weekday);
    // It's day 1 of the week. A beautiful Monday.
});

dtEvents.on('weekday-1', function () {
    console.log('It\'s Monday!'); // It's Monday!
});

dtEvents.on('weekday-Mo', function () {
    console.log('It\'s Monday!'); // It's Monday!
});

dtEvents.on('weekday-Mon', function () {
    console.log('It\'s Monday!'); // It's Monday!
});

dtEvents.on('weekday-Monday', function () {
    console.log('It\'s Monday!'); // It's Monday!
});

dtEvents.on('weekday-Su', function () { // will not be triggered
    console.log('It\'s now 11pm o\'clock!');
});
```

### date

* standard event: "date"
  * will be emitted each day at midnight
  * there is one argument: date as a number (1-31)
* more detailed: "date-[1-31]"
  * will be emitted once a month (with some exceptions (31.Feb for example ;) )) 
  * there is no argument

Examples:

The day changes form 28.February to 1.March
``` js
dtEvents.on('date', function (d) {
    console.log('It\'s day %d of the month.', d);
    // It's day 1 of the month.
});

dtEvents.on('date-1', function () {
    console.log('It\'s the 1st!'); // It's the 1st!
});

dtEvents.on('date-28', function () { // will not be triggered
    console.log('It\'s the 28th!');
});

dtEvents.on('date-29', function () { // will not be triggered
    console.log('It\'s the 29th!');
});
```

### month

* standard event: "month"
  * will be emitted each new month in a year
  * there are two arguments: the month as a number (1-12) and as a string
* more detailed: "month-[1-12|Jan-Dec|January-December]"
  * will be emitted once a year
  * there is no argument

Examples:

The day changes form 28.February to 1.March
``` js
dtEvents.on('month', function (number, name) {
    console.log('%s is month number %d in the year.', name, number);
    // March is month number 3 in the year.
});

dtEvents.on('month-3', function () {
    console.log('It\'s March!'); // It's March!
});

dtEvents.on('month-Mar', function () {
    console.log('It\'s March!'); // It's March!
});

dtEvents.on('month-March', function () {
    console.log('It\'s March!'); // It's March!
});

dtEvents.on('month-Feb', function () { // will not be triggered
    console.log('It\'s February!');
});
```

### year

* standard event: "year"
  * will be emitted each New Year's Eve
  * there is one argument: the year as a number
* more detailed: "year-[2016-9999]"
  * will be emitted once
  * there is no argument

Examples:

The day changes form 31.Dec to 1.Jan 2016
``` js
dtEvents.on('year', function (y) {
    console.log('Welcome to year %d!', y);
    // Welcome to year 2016!
});

dtEvents.on('year-2015', function () { // will never be triggered
    console.log('Welcome to year 2015!');
});

dtEvents.on('year-2016', function () {
    console.log('Welcome to year 2016!'); // Welcome to year 2016!
});

dtEvents.on('year-2017', function () {
    console.log('Welcome to year 2017!'); // will be triggered next year
});
```

## Methods

### dtEvents.stop()

Stops emitting events.

Be careful: After stopping there are no more events of `dtEvents` in the Event-Loop.
Your application can now stop automatically.

### dtEvents.start()

Restarts the emitting of events after `dtEvents.stop()`.

## install

With [npm](https://npmjs.org) do:

```
npm install date-events
```

## testing

`npm test [--dot | --spec] [--grep=pattern]`

Specifying `--dot` or `--spec` will change the output from the default TAP style. 
Specifying `--grep` will only run the test files that match the given pattern.

### coverage

`npm run coverage [--html]`

This will output a textual coverage report. Including `--html` will also open 
an HTML coverage report in the default browser.
