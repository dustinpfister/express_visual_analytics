let express = require('express'),
path = require('path'),

app = express();

// SETTINGS
app.set('port', 8080); // just set port 8080
app.set('theme', 'bootstrap'); // only one them for now so.
app.set('views', path.join(__dirname, 'themes', app.get('theme')));
app.set('view engine', 'ejs');

// STATIC PATHS
app.use('/js', express.static('public/js'));
app.use('/json', express.static('public/json'));
app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/img'));

// theme statics
app.use('/theme/js', express.static(path.join(__dirname, 'themes', app.get('theme'), 'js')));
app.use('/theme/fonts', express.static(path.join(__dirname, 'themes', app.get('theme'), 'fonts')));
app.use('/theme/css', express.static(path.join(__dirname, 'themes', app.get('theme'), 'css')));

// using fly_json
app.use('/flyjson', require('./mw/json_fly_va')({
        path_db: path.join(__dirname, 'db', 'db.json')
    }));

// MAIN INDEX
app.get('/',

    require('./mw/get_pkg_json')(),

    function (req, res) {

    res.render('index', {

        layout: 'home',
        pkg: req.pkg

    });

});

// WORKS PATH
app.use('/works', require('./routes/works')({
        views: app.get('views'),
        dir_works: path.join(__dirname, 'public/js/visual_analytics/works')
    }));

// START LISTENING
app.listen(app.get('port'), () => {

    console.log('express_visual_analytics is up on port: ' + app.get('port'));

});
