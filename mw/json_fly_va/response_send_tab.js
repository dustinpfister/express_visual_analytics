let _ = require('lodash');

// trying out new tabulation method
module.exports = function (req, res, next) {

    // must send tab bool is true, and a start date is given
    if (req.query.tab && req.query.sd) {

        let jRes = req.app.locals.jRes,
        sd = req.query.sd.split('/'), // start date
        days = Number(req.query.days) || 28, // number of days to tabulate
        count = req.query.count || 1, // number of times to go back a count of days.
        startDate = new Date('20' + sd[2], sd[0] - 1, sd[1]); // standard javaScript Date instance of sd

        // start by getting days
        req.db.get('days')

        // filter days that are not part of the desired time range
        .filter(function (day) {

            let thisDate = new Date(day.timeStamp),
            time = startDate - thisDate;

            // filter any days that come after sd
            if (thisDate.getTime() > startDate.getTime()) {

                return false;

            }

            // return true if it is a day that I want
            return day.date === req.query.sd || time < (days * 24 * 60 * 60 * 1000 * count);

        }).write().then(function (data) {

            // make sure we have a proper array
            if (data.length > days * count) {

                // drop any extra days.
                data = _.drop(data, data.length - days * count);

            }

            // chunk the data by days
            data = _.chunk(data, days);

            // tabulate totals
            let totals = [];
            data.forEach(function (dayArray) {

                let t = 0;
                dayArray.forEach(function (day) {
                    t += Number(day.users);
                });

                // push an object that contains the total, along with other relavent info
                totals.push({
                    userTotal: t,
                    sd: dayArray[0].date,
                    ed: dayArray[dayArray.length - 1].date,
                    days: dayArray
                });

            });

            // send the response.
            jRes.success = true;
            jRes.mess = 'tabulation from ' + req.query.sd + ' going back ' + days + ' days' + ' ' + count + ' times.';
            jRes.data = totals;
            res.json(jRes);

        }).catch (function (e) {

            // send an error response if something goes wrong.
            res.eMess = e.message;
            res.json(jRes);

        });

    } else {

        // continue on as the query string is no good.
        next();

    }

};
