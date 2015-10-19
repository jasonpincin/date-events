var EventEmitter    = require('events').EventEmitter,
    util            = require('util'),
    DateEmitter;

module.exports = DateEmitter = function (precision) {

    var self = this,
        now = new Date(),
        interval = 10000;

    EventEmitter.call(this);

    if (precision && precision <= 3600000) {
        interval = precision;
    }

    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;
    this.date = now.getDate();
    this.weekday = now.getDay();
    this.hour = now.getHours();

    var eventCollection = function() {
        var str = '',
            now = new Date(),

            year = now.getFullYear(),
            month = now.getMonth(),
            date = now.getDate(),
            weekday = now.getDay(),
            hour = now.getHours();

        if (year !== self.year) {
            self.emit('year', year);
            self.year = year;
        }

        if (month + 1 !== self.month) {
            str = '';
            switch (month) {
                case 0:
                    str = 'January';
                    break;
                case 1:
                    str = 'February';
                    break;
                case 2:
                    str = 'March';
                    break;
                case 3:
                    str = 'April';
                    break;
                case 4:
                    str = 'May';
                    break;
                case 5:
                    str = 'June';
                    break;
                case 6:
                    str = 'July';
                    break;
                case 7:
                    str = 'August';
                    break;
                case 8:
                    str = 'September';
                    break;
                case 9:
                    str = 'October';
                    break;
                case 10:
                    str = 'November';
                    break;
                default:
                    str = 'December';

            }
            self.emit('month', month + 1, str);
            self.emit('month-' + str);
            self.emit('month-' + str.substr(0, 3));
            self.emit('month-' + (month + 1));
            self.month = month + 1;
        }

        if (date !== self.date) {
            self.emit('date', date);
            self.emit('date-' + date);
            self.date = date;
        }

        if (weekday !== self.weekday) {
            str = '';
            switch (weekday) {
                case 1:
                    str = 'Monday';
                    break;
                case 2:
                    str = 'Tuesday';
                    break;
                case 3:
                    str = 'Wednesday';
                    break;
                case 4:
                    str = 'Thursday';
                    break;
                case 5:
                    str = 'Friday';
                    break;
                case 6:
                    str = 'Saturday';
                    break;
                default:
                    str = 'Sunday';
            }
            self.emit('weekday', weekday, str);
            self.emit('weekday-' + str);
            self.emit('weekday-' + str.substr(0, 3));
            self.emit('weekday-' + str.substr(0, 2));
            self.emit('weekday-' + weekday);
            self.weekday = weekday;
        }

        if (hour !== self.hour) {
            self.emit('hour', hour);
            self.emit('hour-' + hour);
            if (hour === 0) {
                self.emit('hour-24');
            }
            self.hour = hour;
        }
    };

    var timer = setInterval(eventCollection, interval);

    this.stop = function() {
        if (timer) {
            clearInterval(timer);
            timer = null;
            self.emit('stop');
        }
    };

    this.start = function() {
        if (!timer) {
            timer = setInterval(eventCollection, interval);
            self.emit('start');
        }
    };
};

util.inherits(DateEmitter, EventEmitter);
