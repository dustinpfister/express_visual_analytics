let FileAsync = require('lowdb/adapters/FileAsync'),
low = require('lowdb');

// get the days database
module.exports = function (req, res, next) {

    let jRes = req.app.locals.jRes;

    try {

        // try to populate req.db
        // req.app should be the app used in the index.js
        // file of json_fly
        let adapt = new FileAsync(req.app.get('path_db'));

        low(adapt).then((db) => {

            // if all goes well continue
            req.db = db;
            next();

        }).catch ((e) => {

            // else spit out an error response
            jRes.mess = 'error getting database';
            jRes.eMess = e.message;
            res.json(jRes);

        });

    } catch (e) {

        // else spit out an error response
        jRes.mess = 'error getting database';
        jRes.eMess = e.message;
        res.json(jRes);

    }

};
