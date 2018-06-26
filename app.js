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
    app.set('port', 8080);

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
