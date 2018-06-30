let fs = require('fs-extra'),
path = require('path')

    module.exports = function (options) {

    options = options = {};

    // if not given a path, just assume it is at root
    options.dir_pkg = options.dir_pkg || './';

    return function (req, res, next) {

        req.pkg = {

            name: 'unknown',
            version: '0.0.0'

        };

        // read json
        fs.readFile(path.join(options.dir_pkg, 'package.json'), 'utf8').then(function (json) {

            try {

                req.pkg = JSON.parse(json);

            } catch (e) {

                console.log(e);

            }

            next();

        }).catch (function () {

            next();

        });

    };

};
