
module.exports = [

    // get db, and set time stamps
    function (req, res, next) {

        req.db = require('../public/json/days.json');

        req.db.days.forEach(function (day) {

            if (day.date.match(/\d+\/\d+\/\d+/)) {

                var d = day.date.split('/'),

                jsDate = new Date('20' + d[2], d[0] - 1, d[1]);

                day.timeStamp = jsDate;

            }

        });

        next();

    },

    function (req, res) {

        res.json(req.db);

    }

];
