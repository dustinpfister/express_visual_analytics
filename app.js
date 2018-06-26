let express = require('express'),
path = require('path'),
buildJSON = require('./lib/build_json.js'),

app = express();

buildJSON.build({

    dir_csv: path.join(__dirname, 'csv')

}).then((files) => {

    app.set('port', 8080);

    app.get('/', function (req, res) {

        res.json({
            mess: 'okay',
            files: files
        });

    });

    app.listen(app.get('port'), () => {

        console.log('express_visual_analytics is up on port: ' + app.get('port'));

    });

}).catch ((mess) => {

    console.log(mess);

});
