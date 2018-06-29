
var getData = (function () {

    var api = {};

    api.dbUrl = '/json/db.json';

    api.get = function (done) {

        $.ajax({

            url: api.dbUrl

        }).done(function (res) {

            var data = {
                days: [],
                bestDay: -1,
            };

            if (res.days) {

                data.days = res.days;

            }

            if (res.constructor.name === 'Array') {

                data.days = res;

            }

            // reference data.days
            var days = data.days;

            // find the best day once for data.bestDay
            var bestDay = (function (data) {

                data.bestDay = -1;

                data.days.forEach(function (day) {

                    if (Number(day.users) > data.bestDay) {

                        data.bestDay = Number(day.users);

                    }

                });

                return data.bestDay;

            }
                (data));

            // jsDate should be part of a day object
            (function () {

                data.latest = {

                    date: new Date(0),
                    dayIndex: 0

                };

                data.days.forEach(function (day, i) {

                    // get jsDate
                    var d = day.date.split('/');

                    day.jsDate = new Date('20' + d[2], d[0] - 1, d[1]);

                    if (day.jsDate > data.latest.date) {

                        data.latest = {

                            date: day.jsDate,
                            dayIndex: i

                        };

                    }

                });

            }
                ());

            console.log('latest: ' + data.latest.date);

            done(data);

        });

    };

    return api;

}());
