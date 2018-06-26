let express = require('express'),
path = require('path'),
buildJSON = require('./lib/build_json.js'),

app = express();

// build json files from csv
buildJSON.build({

    dir_csv: path.join(__dirname, 'csv'),
    dir_json: path.join(__dirname, 'json')

}).then((obj) => {

    // if build goes well start app
    app.set('port', 8080); // just set port 8080
    app.set('theme', 'bootstrap'); // only one them for now so.

    app.set('views', path.join(__dirname, 'themes', app.get('theme')));
    app.set('view engine', 'ejs');

    app.get('/', function (req, res) {

        res.json({
            mess: 'looks good',
            obj: obj
        });

    });

    app.listen(app.get('port'), () => {

        console.log('express_visual_analytics is up on port: ' + app.get('port'));

    });

}).catch ((mess) => {

    // else logg what went wrong
    console.log(mess);

});
