let _ = require('lodash');

// trying out new tabulation method
module.exports = function (req, res, next) {

    // must set tab bool true, and give a start date
    if (req.query.tab && req.query.sd) {

        let jRes = req.app.locals.jRes,
        days = Number(req.query.days) || 28,
        count = req.query.count || 1,
        sd = req.query.sd.split('/'),
        startDate = new Date('20' + sd[2], sd[0] - 1, sd[1]);

        req.db.get('days')

        .filter(function (day) {

            let thisDate = new Date(day.timeStamp),
            time = startDate - thisDate;

            if (thisDate.getTime() > startDate.getTime()) {

                return false;

            }

            return day.date === req.query.sd || time < (days * 24 * 60 * 60 * 1000 * count);

        }).write().then(function (data) {

            
            let total = 0;
            data.forEach(function (day) {

            total += Number(day.users);

            });
             
			

            // chunk the data by days
            data = _.chunk(data, days);

            let totals = [];
            data.forEach(function (days) {

                let t = 0;
                days.forEach(function (day) {

                    t += Number(day.users);

                });

                totals.push({

                    userTotal: t,
                    days: days

                });

            });


            jRes.success = true;
            jRes.mess = 'tabulation from ' + req.query.sd + ' going back ' + days + ' days';
            jRes.data = totals;

            res.json(jRes);

        }).catch (function (e) {

            res.eMess = e.message;
            res.json(jRes);

        });

    } else {

        next();

    }

};
