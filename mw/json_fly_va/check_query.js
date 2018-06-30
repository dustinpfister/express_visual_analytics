// check for query string
module.exports = function (req, res, next) {

    let jRes = req.app.locals.jRes,
    qKeys = Object.keys(req.query);

    // if no query string just give stats
    // not the whole db
    if (qKeys.length === 0) {

        jRes.success = true;
        jRes.mess = 'No query string given, so just giving database stats';
        jRes.data = {

            dayCount: req.db.get('days').value().length

        };
        res.json(jRes);

    } else {

        next();

    }

};
