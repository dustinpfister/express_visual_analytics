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

// MAIN INDEX
app.get('/', function (req, res) {

    res.render('index', {

        layout: 'home'

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
