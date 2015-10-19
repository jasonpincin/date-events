date-events
==================

Instance of EventEmitter that emits date/time events.

If you are interested in minute or second, better use `setInterval()` or `setTimeout()`.

## Install

`npm install date-events`

## Supported Events

* [`hour`](#hour)
* [`weekday`](#weekday)
* [`date`](#date)
* [`month`](#month)
* [`year`](#year)

## Usage

``` js
var DateEvents  = require('date-events'),
	dtEvents    = new DateEvents(); // you can pass in a precision in ms
    // (default: 10s; max: 1h)

dtEvents.on('someEvent', function () {
    ; /* some function body that is called on each trigger of "someEvent"
    In all event-callbacks you have access to the numerical properties
    identical to the standard event-names.
    For example in the ".on('date', ...)" callback you can use "this.month"
    to get the month. */
});

dtEvents.once('otherEvent', function () {
    ; //an other function body that is called only once after "otherEvent"
});
```

You can use the standard methods of [Node's EventEmitter](https://nodejs.org/api/events.html) for adding and removing listeners.

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

## Testing

`npm test`

Better do this some minutes before the next hour.
