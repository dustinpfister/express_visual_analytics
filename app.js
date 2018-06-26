let express = require('express'),
path = require('path'),
buildJSON = require('./lib/build_json.js'),

app = express();

// build json files from csv
buildJSON.build({

    dir_csv: path.join(__dirname, 'csv'),
    dir_json: path.join(__dirname, 'public/json')

}).then((obj) => {

    // if build goes well start app
    app.set('port', 8080); // just set port 8080
    app.set('theme', 'bootstrap'); // only one them for now so.

    app.set('views', path.join(__dirname, 'themes', app.get('theme')));
    app.set('view engine', 'ejs');

    // static paths
    app.use('/js', express.static('public/js'));
    app.use('/json', express.static('public/json'));

    // main index
    app.get('/', function (req, res) {

        res.render('index', {});

    });

    app.listen(app.get('port'), () => {

        console.log('express_visual_analytics is up on port: ' + app.get('port'));

    });

}).catch ((mess) => {

    // else logg what went wrong
    console.log(mess);

});
