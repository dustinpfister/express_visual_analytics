let express = require('express'),
path = require('path'),
fs = require('fs-extra'),

works = express();

// main index
works.get('/', function (req, res) {

    fs.readdir(works.get('dir_works')).then(function (folders) {

        res.render('index', {

            layout: 'work_index',
            folders: folders

        });

    });

});

// work path
works.get(/.+/, function (req, res) {

    res.render('index', {

        layout: 'work',
        workname: req.url.split('/')[1]

    });

})

module.exports = function (options) {

    options = options || {};
    options.views = options.views || 'views';
    options.dir_works = options.dir_works || 'works';

    // ejs rendering
    works.set('view engine', 'ejs');
    works.set('views', options.views);
    works.set('dir_works', options.dir_works);

    return works;

};
