// set standard response object defaults
module.exports = function (req, res, next) {

    req.app.locals.jRes = {

        success: false,
        mess: '',
        eMess: '',
        data: {}

    }

    next();

};
