// respond if sd, and ed
module.exports = function (req, res, next) {

    let jRes = req.app.locals.jRes;

    if (req.query.sd) {

        let sort = req.query.sort || 'timestamp';

        let sd = req.query.sd.split('/'),
        ed = sd;

        if (req.query.ed) {

            ed = req.query.ed.split('/');

        }

        sd = new Date('20' + sd[2], sd[0] - 1, sd[1]);
        ed = new Date('20' + ed[2], ed[0] - 1, ed[1]);

        req.db.get('days')
        .filter((day) => {

            // filter by date
            let date = new Date(day.timeStamp);

            return date >= sd && date <= ed;

        })

        // lodash sortby
        .sortBy(function (day) {

            if (sort === 'users') {

                return Number(day.users);

            }

            return day[sort];

        })

        // Array.sort
        /*
        .sort(function (dayA, dayB) {

        if (sort === 'users') {

        return Number(dayB.users) - Number(dayA.users);

        }

        if (sort === 'timestamp') {

        return new Date(dayB[sort]).getTime() -new Date(dayA[sort]).getTime();

        }

        return dayA[sort] > dayB[sort];

        })


         */
        .write().then((data) => {

            jRes.success = true;
            jRes.mess = 'data for days ' +
                (sd.getMonth() + 1) + '/' + sd.getDay() + '/' + sd.getFullYear() + ' to ' +
                (ed.getMonth() + 1) + '/' + ed.getDay() + '/' + ed.getFullYear()
                jRes.data = data;
            res.json(jRes);

        }).catch ((e) => {

            jRes.mess = 'error';
            res.json(jRes);

        });

    } else {

        next();

    }

};
