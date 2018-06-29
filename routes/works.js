let express = require('express'),
path = require('path'),

works = express();

works.get('/', function (req, res) {

    res.render('index', {});

});

module.exports = function (options) {

    options = options || {};
    options.views = options.views || 'views';

    // ejs rendering
    works.set('view engine', 'ejs');
    works.set('views', options.views);

    return works;

};
